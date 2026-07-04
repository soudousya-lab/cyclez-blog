#!/usr/bin/env python3
"""GSC (Google Search Console) データ取得スクリプト
cyclez-reporter サービスアカウントで cycle-z.com の検索パフォーマンスを取得し、
/data/gsc-imports/ にCSVとして保存する。

使い方:
  python scripts/fetch-gsc-data.py              # 直近28日
  python scripts/fetch-gsc-data.py --days 90    # 直近90日
"""

import csv
import json
import os
import sys
from datetime import date, timedelta
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build

# ===== 設定 =====
BASE = Path(__file__).resolve().parent.parent
CRED = BASE / "credentials" / "cyclez-reporter-key.json"
OUTPUT_DIR = BASE / "data" / "gsc-imports"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

GSC_SITE_URL = "sc-domain:cycle-z.com"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

# コアKW 7語（PDCA KPI: core_kw_top_rank で追跡対象）
CORE_KEYWORDS = [
    "岡山 ロードバイク",
    "岡山 クロスバイク",
    "ロードバイク 初心者 岡山",
    "岡山 自転車屋 おすすめ",
    "岡山 自転車 修理",
    "岡山 サイクリング",
    "グラベルバイク 岡山",
]

TODAY = date.today()

# ===== 引数パース =====
days = 28
if "--days" in sys.argv:
    idx = sys.argv.index("--days")
    if idx + 1 < len(sys.argv):
        days = int(sys.argv[idx + 1])

END = TODAY - timedelta(days=1)  # GSCは前日まで
START = END - timedelta(days=days - 1)


def main():
    print(f"[GSC Fetch] 期間: {START} ~ {END} ({days}日間)")
    print(f"[GSC Fetch] サイト: {GSC_SITE_URL}")

    # 認証
    creds = service_account.Credentials.from_service_account_file(
        str(CRED), scopes=SCOPES
    )
    svc = build("searchconsole", "v1", credentials=creds)

    # --- 1. 全クエリ取得（上位1000件） ---
    print("[GSC Fetch] 全クエリデータ取得中...")
    all_queries = fetch_queries(svc, dims=["query"], limit=1000)
    print(f"  → {len(all_queries)} クエリ取得")

    # --- 2. ページ別データ取得 ---
    print("[GSC Fetch] ページ別データ取得中...")
    all_pages = fetch_queries(svc, dims=["page"], limit=500)
    print(f"  → {len(all_pages)} ページ取得")

    # --- 3. クエリ×ページ（上位500件） ---
    print("[GSC Fetch] クエリ×ページデータ取得中...")
    query_page = fetch_queries(svc, dims=["query", "page"], limit=500)
    print(f"  → {len(query_page)} 行取得")

    # --- 4. デバイス別 ---
    print("[GSC Fetch] デバイス別データ取得中...")
    devices = fetch_queries(svc, dims=["device"], limit=10)

    # --- 5. 日別トレンド ---
    print("[GSC Fetch] 日別トレンド取得中...")
    daily = fetch_queries(svc, dims=["date"], limit=days + 5)

    # ===== CSV出力 =====
    timestamp = TODAY.strftime("%Y-%m-%d")

    # 全クエリCSV
    queries_csv = OUTPUT_DIR / f"gsc-queries-{timestamp}.csv"
    write_csv(queries_csv, ["query", "clicks", "impressions", "ctr", "position"], all_queries, key_names=["query"])

    # ページ別CSV
    pages_csv = OUTPUT_DIR / f"gsc-pages-{timestamp}.csv"
    write_csv(pages_csv, ["page", "clicks", "impressions", "ctr", "position"], all_pages, key_names=["page"])

    # クエリ×ページCSV
    qp_csv = OUTPUT_DIR / f"gsc-query-page-{timestamp}.csv"
    write_csv(qp_csv, ["query", "page", "clicks", "impressions", "ctr", "position"], query_page, key_names=["query", "page"])

    # デバイス別CSV
    dev_csv = OUTPUT_DIR / f"gsc-devices-{timestamp}.csv"
    write_csv(dev_csv, ["device", "clicks", "impressions", "ctr", "position"], devices, key_names=["device"])

    # 日別CSV
    daily_csv = OUTPUT_DIR / f"gsc-daily-{timestamp}.csv"
    write_csv(daily_csv, ["date", "clicks", "impressions", "ctr", "position"], daily, key_names=["date"])

    print(f"\n[GSC Fetch] 全CSV出力完了: {OUTPUT_DIR}/")

    # ===== コアKW分析 =====
    print("\n" + "=" * 60)
    print("コアKW 7語 ベースライン")
    print("=" * 60)

    core_baseline = []
    for kw in CORE_KEYWORDS:
        match = next((q for q in all_queries if q["keys"][0] == kw), None)
        if match:
            core_baseline.append({
                "keyword": kw,
                "clicks": int(match["clicks"]),
                "impressions": int(match["impressions"]),
                "ctr": round(float(match["ctr"]) * 100, 2),
                "position": round(float(match["position"]), 1),
            })
            print(f"  {kw}: 順位={match['position']:.1f} CTR={float(match['ctr'])*100:.1f}% クリック={int(match['clicks'])} 表示={int(match['impressions'])}")
        else:
            core_baseline.append({
                "keyword": kw,
                "clicks": 0,
                "impressions": 0,
                "ctr": 0,
                "position": 0,
            })
            print(f"  {kw}: データなし（圏外またはクエリ不一致）")

    # コアKW CSV
    core_csv = OUTPUT_DIR / f"gsc-core-kw-baseline-{timestamp}.csv"
    with open(core_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "clicks", "impressions", "ctr", "position"])
        w.writeheader()
        w.writerows(core_baseline)
    print(f"\n  → {core_csv}")

    # ===== CTR改善候補（表示回数TOP30 × CTR下位30%） =====
    print("\n" + "=" * 60)
    print("CTR改善候補（表示回数TOP30 × CTR下位30%）")
    print("=" * 60)

    # 表示回数でソート → TOP30
    sorted_by_imp = sorted(all_queries, key=lambda x: int(x["impressions"]), reverse=True)[:30]

    # CTR昇順でソート → 下位30%（= 9件）
    sorted_by_ctr = sorted(sorted_by_imp, key=lambda x: float(x["ctr"]))
    bottom_30pct = sorted_by_ctr[: max(1, len(sorted_by_ctr) * 30 // 100)]

    ctr_candidates = []
    for q in bottom_30pct:
        entry = {
            "keyword": q["keys"][0],
            "clicks": int(q["clicks"]),
            "impressions": int(q["impressions"]),
            "ctr": round(float(q["ctr"]) * 100, 2),
            "position": round(float(q["position"]), 1),
        }
        ctr_candidates.append(entry)
        print(f"  [{entry['position']}位] {entry['keyword']} — 表示{entry['impressions']} / CTR{entry['ctr']}% / クリック{entry['clicks']}")

    # CTR改善候補CSV
    ctr_csv = OUTPUT_DIR / f"gsc-ctr-improvement-candidates-{timestamp}.csv"
    with open(ctr_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "clicks", "impressions", "ctr", "position"])
        w.writeheader()
        w.writerows(ctr_candidates)
    print(f"\n  → {ctr_csv}")

    # ===== サマリJSON（PDCAエンジンが読む用） =====
    summary = {
        "fetched_at": timestamp,
        "period": {"start": str(START), "end": str(END), "days": days},
        "total_queries": len(all_queries),
        "total_pages": len(all_pages),
        "core_kw_baseline": core_baseline,
        "ctr_improvement_candidates": ctr_candidates,
        "devices": [
            {"device": d["keys"][0], "clicks": int(d["clicks"]), "impressions": int(d["impressions"])}
            for d in devices
        ],
    }
    summary_json = OUTPUT_DIR / f"gsc-summary-{timestamp}.json"
    with open(summary_json, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print(f"\n[GSC Fetch] サマリJSON: {summary_json}")

    return summary


def fetch_queries(svc, dims, limit=1000):
    """GSC Search Analytics API からデータ取得"""
    return svc.searchanalytics().query(
        siteUrl=GSC_SITE_URL,
        body={
            "startDate": str(START),
            "endDate": str(END),
            "dimensions": dims,
            "rowLimit": limit,
        },
    ).execute().get("rows", [])


def write_csv(path, headers, rows, key_names):
    """GSC API レスポンスの rows をCSVに変換"""
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(headers)
        for r in rows:
            keys = r.get("keys", [])
            row = list(keys) + [
                int(r["clicks"]),
                int(r["impressions"]),
                round(float(r["ctr"]) * 100, 2),
                round(float(r["position"]), 1),
            ]
            w.writerow(row)
    print(f"  → {path}")


if __name__ == "__main__":
    main()
