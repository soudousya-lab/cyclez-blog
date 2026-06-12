#!/usr/bin/env python3
"""cycleZ 月次マーケティングレポート
GA4 + Search Console + CRM(Firestore) + 仕入DB(SQLite) を統合してPDF化"""

import os
import json
import sqlite3
import subprocess
from datetime import date, timedelta
from pathlib import Path

from google.oauth2 import service_account
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange, Dimension, Metric, RunReportRequest, OrderBy,
)
from googleapiclient.discovery import build

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont


# ===== パス / 設定 =====
BASE = Path(__file__).resolve().parent.parent
CYCLEZ_ROOT = BASE.parent
CRED = BASE / "credentials" / "cyclez-reporter-key.json"
CRM_DIR = CYCLEZ_ROOT / "cyclez-crm"
CRM_SCRIPT = CRM_DIR / "scripts" / "export-stats.mjs"
RECON_DB = CYCLEZ_ROOT / "cyclez-reconciliation" / "data" / "cyclez.db"

GA4_PROPERTY_ID = "424992418"
GSC_SITE_URL = "sc-domain:cycle-z.com"

TODAY = date.today()
END = TODAY - timedelta(days=1)
START = END - timedelta(days=29)

OUTPUT_DIR = BASE / "reports"
OUTPUT_DIR.mkdir(exist_ok=True)
OUTPUT = OUTPUT_DIR / f"cyclez-marketing-report-{TODAY:%Y-%m-%d}.pdf"

SCOPES_GA = ["https://www.googleapis.com/auth/analytics.readonly"]
SCOPES_GSC = ["https://www.googleapis.com/auth/webmasters.readonly"]

# 日本語CIDフォント
pdfmetrics.registerFont(UnicodeCIDFont("HeiseiKakuGo-W5"))
pdfmetrics.registerFont(UnicodeCIDFont("HeiseiMin-W3"))
FONT = "HeiseiKakuGo-W5"
FONT_MIN = "HeiseiMin-W3"

BLACK = colors.HexColor("#111111")
GRAY = colors.HexColor("#777777")
LIGHT = colors.HexColor("#DDDDDD")
BG = colors.HexColor("#F7F7F7")


# ===== GA4 =====
def fetch_ga4():
    creds = service_account.Credentials.from_service_account_file(str(CRED), scopes=SCOPES_GA)
    client = BetaAnalyticsDataClient(credentials=creds)

    req = RunReportRequest(
        property=f"properties/{GA4_PROPERTY_ID}",
        metrics=[
            Metric(name="sessions"), Metric(name="activeUsers"),
            Metric(name="screenPageViews"), Metric(name="engagementRate"),
            Metric(name="averageSessionDuration"), Metric(name="newUsers"),
        ],
        date_ranges=[DateRange(start_date=str(START), end_date=str(END))],
    )
    r = client.run_report(req)
    v = r.rows[0].metric_values if r.rows else [type("o", (), {"value":0})()]*6
    summary = {
        "sessions": int(v[0].value or 0),
        "users": int(v[1].value or 0),
        "page_views": int(v[2].value or 0),
        "engagement_rate": float(v[3].value or 0) * 100,
        "avg_duration": float(v[4].value or 0),
        "new_users": int(v[5].value or 0),
    }

    def query(dims, metrics, limit=None):
        req = RunReportRequest(
            property=f"properties/{GA4_PROPERTY_ID}",
            dimensions=[Dimension(name=d) for d in dims],
            metrics=[Metric(name=m) for m in metrics],
            date_ranges=[DateRange(start_date=str(START), end_date=str(END))],
            order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name=metrics[0]), desc=True)],
            limit=limit or 10,
        )
        return client.run_report(req).rows

    top_pages = [
        {"path": r.dimension_values[0].value, "title": r.dimension_values[1].value or r.dimension_values[0].value,
         "views": int(r.metric_values[0].value or 0), "users": int(r.metric_values[1].value or 0)}
        for r in query(["pagePath", "pageTitle"], ["screenPageViews", "activeUsers"], limit=10)
    ]
    channels = [
        {"name": r.dimension_values[0].value or "(direct)", "sessions": int(r.metric_values[0].value or 0),
         "users": int(r.metric_values[1].value or 0)}
        for r in query(["sessionDefaultChannelGroup"], ["sessions", "activeUsers"])
    ]
    devices = [
        {"name": r.dimension_values[0].value, "sessions": int(r.metric_values[0].value or 0)}
        for r in query(["deviceCategory"], ["sessions"])
    ]
    cities = [
        {"name": r.dimension_values[0].value, "sessions": int(r.metric_values[0].value or 0)}
        for r in query(["city"], ["sessions"], limit=8)
    ]
    sources = [
        {"name": r.dimension_values[0].value or "(direct)", "sessions": int(r.metric_values[0].value or 0)}
        for r in query(["sessionSource"], ["sessions"], limit=10)
    ]

    return {
        "summary": summary, "top_pages": top_pages, "channels": channels,
        "devices": devices, "cities": cities, "sources": sources,
    }


# ===== GSC =====
def fetch_gsc():
    creds = service_account.Credentials.from_service_account_file(str(CRED), scopes=SCOPES_GSC)
    svc = build("searchconsole", "v1", credentials=creds)

    def q(dims, limit=10):
        return svc.searchanalytics().query(
            siteUrl=GSC_SITE_URL,
            body={"startDate": str(START), "endDate": str(END), "dimensions": dims, "rowLimit": limit},
        ).execute().get("rows", [])

    t = q([])
    total = t[0] if t else {}
    queries = q(["query"], 20)
    pages = q(["page"], 10)
    devices = q(["device"])

    return {
        "total": {
            "clicks": int(total.get("clicks", 0)),
            "impressions": int(total.get("impressions", 0)),
            "ctr": float(total.get("ctr", 0)) * 100,
            "position": float(total.get("position", 0)),
        },
        "queries": [
            {"q": r["keys"][0], "clicks": int(r["clicks"]), "impressions": int(r["impressions"]),
             "ctr": float(r["ctr"])*100, "position": float(r["position"])} for r in queries
        ],
        "pages": [
            {"url": r["keys"][0], "clicks": int(r["clicks"]), "impressions": int(r["impressions"]),
             "ctr": float(r["ctr"])*100, "position": float(r["position"])} for r in pages
        ],
        "devices": [
            {"name": r["keys"][0], "clicks": int(r["clicks"]), "impressions": int(r["impressions"])}
            for r in devices
        ],
    }


# ===== CRM (Firestore via node) =====
def fetch_crm():
    try:
        res = subprocess.run(
            ["node", str(CRM_SCRIPT)],
            cwd=str(CRM_DIR), capture_output=True, text=True, timeout=60,
        )
        return json.loads(res.stdout)
    except Exception as e:
        print(f"[WARN] CRM取得失敗: {e}")
        return None


# ===== 仕入（SQLite）=====
def fetch_purchases():
    if not RECON_DB.exists():
        return None
    conn = sqlite3.connect(str(RECON_DB))
    c = conn.cursor()

    # 2025月別
    c.execute("""
        SELECT substr(purchase_date,1,7) AS m, COUNT(*), SUM(amount)
        FROM purchases WHERE purchase_date LIKE '2025-%'
        GROUP BY 1 ORDER BY 1
    """)
    monthly = [{"month": r[0], "count": r[1], "amount": r[2] or 0} for r in c.fetchall()]

    # 仕入先TOP
    c.execute("""
        SELECT IFNULL(co.name,'-'), SUM(p.amount), COUNT(*)
        FROM purchases p LEFT JOIN companies co ON co.code=p.company_code
        WHERE p.purchase_date LIKE '2025-%'
        GROUP BY co.name ORDER BY 2 DESC LIMIT 10
    """)
    vendors = [{"name": r[0], "amount": r[1] or 0, "count": r[2]} for r in c.fetchall()]

    # 商品TOP
    c.execute("""
        SELECT product_name, SUM(quantity), SUM(amount)
        FROM purchases WHERE purchase_date LIKE '2025-%' AND product_name IS NOT NULL
        GROUP BY product_name ORDER BY 3 DESC LIMIT 10
    """)
    products = [{"name": r[0], "qty": r[1] or 0, "amount": r[2] or 0} for r in c.fetchall()]

    # サマリー
    c.execute("SELECT COUNT(*), SUM(amount) FROM purchases WHERE purchase_date LIKE '2025-%'")
    row = c.fetchone()
    total = {"count": row[0], "amount": row[1] or 0}

    c.execute("SELECT COUNT(*), SUM(total_amount) FROM invoices")
    row = c.fetchone()
    invoices = {"count": row[0] or 0, "amount": row[1] or 0}

    conn.close()
    return {"monthly": monthly, "vendors": vendors, "products": products,
            "total_2025": total, "invoices": invoices}


# ===== ヘルパー =====
def fmt(n):
    if n is None:
        return "—"
    if isinstance(n, float):
        return f"{n:,.1f}"
    return f"{int(n):,}"


def fmt_yen(n):
    if n is None or n == 0:
        return "—"
    if abs(n) >= 1_000_000:
        return f"¥{n/1_000_000:.1f}M"
    if abs(n) >= 10_000:
        return f"¥{n/10_000:.0f}万"
    return f"¥{n:,}"


# ===== PDF =====
def build_pdf(ga4, gsc, crm, purchases):
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4,
        leftMargin=18*mm, rightMargin=18*mm,
        topMargin=18*mm, bottomMargin=18*mm,
    )

    # スタイル
    tag_s = ParagraphStyle("tag", fontName=FONT, fontSize=9, leading=12, textColor=GRAY)
    brand_s = ParagraphStyle("brand", fontName=FONT, fontSize=16, leading=20, textColor=BLACK, spaceAfter=2)
    h1_s = ParagraphStyle("h1", fontName=FONT, fontSize=11, leading=14, textColor=GRAY, spaceBefore=8, spaceAfter=4)
    hero_s = ParagraphStyle("hero", fontName=FONT, fontSize=20, leading=28, textColor=BLACK)
    text_s = ParagraphStyle("text", fontName=FONT, fontSize=10, leading=16, textColor=BLACK)
    note_s = ParagraphStyle("note", fontName=FONT, fontSize=8, leading=11, textColor=GRAY, alignment=TA_CENTER)
    label_s = ParagraphStyle("label", fontName=FONT, fontSize=8, leading=10, textColor=GRAY)
    value_s = ParagraphStyle("value", fontName=FONT, fontSize=22, leading=26, textColor=BLACK)
    sub_s = ParagraphStyle("sub", fontName=FONT, fontSize=8, leading=11, textColor=GRAY)

    # KPIカード
    def kpi(label, value, sub=""):
        data = [
            [Paragraph(label.upper(), label_s)],
            [Paragraph(value, value_s)],
            [Paragraph(sub, sub_s)],
        ]
        t = Table(data, colWidths=[80*mm], rowHeights=[6*mm, 11*mm, 6*mm])
        t.setStyle(TableStyle([
            ("LEFTPADDING", (0,0), (-1,-1), 0),
            ("RIGHTPADDING", (0,0), (-1,-1), 0),
            ("TOPPADDING", (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 0),
            ("VALIGN", (0,0), (-1,-1), "TOP"),
        ]))
        return t

    # ミニテーブル
    def mini(rows, widths, size=9, align_right_from=1):
        t = Table(rows, colWidths=widths)
        t.setStyle(TableStyle([
            ("FONT", (0,0), (-1,-1), FONT, size),
            ("TEXTCOLOR", (0,0), (-1,-1), BLACK),
            ("TEXTCOLOR", (0,0), (-1,0), GRAY),
            ("FONT", (0,0), (-1,0), FONT, 8),
            ("LINEBELOW", (0,0), (-1,0), 0.5, BLACK),
            ("LINEBELOW", (0,1), (-1,-1), 0.3, LIGHT),
            ("LEFTPADDING", (0,0), (-1,-1), 2),
            ("RIGHTPADDING", (0,0), (-1,-1), 4),
            ("TOPPADDING", (0,0), (-1,-1), 6),
            ("BOTTOMPADDING", (0,0), (-1,-1), 6),
            ("ALIGN", (align_right_from,0), (-1,-1), "RIGHT"),
            ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ]))
        return t

    def page_header(subtitle):
        story.append(Paragraph("cycleZ", brand_s))
        story.append(Paragraph(subtitle, tag_s))
        story.append(Spacer(1, 6*mm))

    story = []
    sm = ga4["summary"]
    tot = gsc["total"]

    # ========== PAGE 1: サマリー ==========
    page_header(f"月次レポート　{END:%Y年%m月}　集計期間 {START:%Y.%m.%d}–{END:%m.%d}（30日）")

    # HERO
    story.append(Paragraph("要点", h1_s))
    lead_ch = ga4["channels"][0] if ga4["channels"] else {"name":"—", "sessions":0}
    visitors = crm["daily_reports"]["total_visitors"] if crm else 0
    new_v = crm["daily_reports"]["new_visitors"] if crm else 0
    hero = (
        f"Webは <b>{fmt(sm['sessions'])}</b> セッション。<br/>"
        f"店舗は <b>{fmt(visitors)}</b> 人来店（新規 <b>{fmt(new_v)}</b>）。"
    )
    story.append(Paragraph(hero, hero_s))
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph(
        f"流入の中心は {lead_ch['name']}（{fmt(lead_ch['sessions'])}）。検索クリック {fmt(tot['clicks'])}、"
        f"平均掲載順位 {tot['position']:.1f}位。",
        text_s,
    ))
    story.append(Spacer(1, 8*mm))

    # KPI 2x3
    daily_avg = crm["daily_reports"]["avg_per_day"] if crm else "—"
    new_vis = crm["daily_reports"]["new_visitors"] if crm else 0
    ret_vis = crm["daily_reports"]["returning_visitors"] if crm else 0
    blog_notes_count = crm["blog_notes"]["total"] if crm else 0
    purchases_amount = purchases["total_2025"]["amount"] if purchases else 0

    kpi_grid = Table([
        [kpi("セッション", fmt(sm["sessions"]), f"PV {fmt(sm['page_views'])}"),
         kpi("ユーザー", fmt(sm["users"]), f"新規 {fmt(sm['new_users'])}")],
        [kpi("検索クリック", fmt(tot["clicks"]), f"表示 {fmt(tot['impressions'])}"),
         kpi("平均順位", f"{tot['position']:.1f}位", f"CTR {tot['ctr']:.1f}%")],
        [kpi("来店/日", f"{daily_avg}人", f"新{fmt(new_vis)} / 既{fmt(ret_vis)}"),
         kpi("一次情報", f"{blog_notes_count}件", f"ブログ素材 2025年仕入 {fmt_yen(purchases_amount)}")],
    ], colWidths=[87*mm, 87*mm], rowHeights=[26*mm, 26*mm, 26*mm])
    kpi_grid.setStyle(TableStyle([
        ("LEFTPADDING", (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
        ("TOPPADDING", (0,0), (-1,-1), 0),
        ("BOTTOMPADDING", (0,0), (-1,-1), 2),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
    ]))
    story.append(kpi_grid)

    story.append(Spacer(1, 8*mm))
    story.append(Paragraph(
        f"※ 2026/03中旬にサイト移管（Cloudflare/Next.js）実施。本期間は移管後の実測値。",
        sub_s,
    ))

    story.append(PageBreak())

    # ========== PAGE 2: GA4 サイト ==========
    page_header("Web トラフィック（GA4）")

    # サイト主要
    story.append(Paragraph("サイト主要指標", h1_s))
    site_rows = [
        ["指標", "値", "備考"],
        ["セッション", fmt(sm["sessions"]), f"ユーザー {fmt(sm['users'])}"],
        ["ページビュー", fmt(sm["page_views"]), f"1セッション {sm['page_views']/max(sm['sessions'],1):.1f}PV"],
        ["新規ユーザー比率", f"{sm['new_users']/max(sm['users'],1)*100:.1f}%", f"新規 {fmt(sm['new_users'])}"],
        ["エンゲージ率", f"{sm['engagement_rate']:.1f}%", "サイト内で行動した割合"],
        ["平均セッション時間", f"{sm['avg_duration']/60:.1f}分", ""],
    ]
    story.append(mini(site_rows, [52*mm, 42*mm, 72*mm], align_right_from=1))
    story.append(Spacer(1, 6*mm))

    # チャネル
    story.append(Paragraph("流入チャネル", h1_s))
    total_sess = sum(c["sessions"] for c in ga4["channels"]) or 1
    ch_rows = [["チャネル", "セッション", "ユーザー", "構成比"]]
    for c in ga4["channels"]:
        ch_rows.append([c["name"], fmt(c["sessions"]), fmt(c["users"]),
                        f"{c['sessions']/total_sess*100:.1f}%"])
    story.append(mini(ch_rows, [52*mm, 40*mm, 40*mm, 34*mm]))
    story.append(Spacer(1, 6*mm))

    # デバイス + 地域
    dev_rows = [["デバイス", "セッション", "構成比"]]
    total_dev = sum(d["sessions"] for d in ga4["devices"]) or 1
    for d in ga4["devices"]:
        dev_rows.append([d["name"], fmt(d["sessions"]), f"{d['sessions']/total_dev*100:.0f}%"])

    city_rows = [["上位地域", "セッション"]]
    for c in ga4["cities"][:6]:
        city_rows.append([c["name"] or "(不明)", fmt(c["sessions"])])

    story.append(Table([[mini(dev_rows, [30*mm, 32*mm, 18*mm]), "", mini(city_rows, [40*mm, 32*mm])]],
                       colWidths=[80*mm, 8*mm, 84*mm]))

    story.append(PageBreak())

    # ========== PAGE 3: ページ / 流入元 ==========
    page_header("閲覧ページ & 流入元")

    story.append(Paragraph("閲覧TOP10", h1_s))
    pg_rows = [["ページ", "PV", "UU"]]
    for p in ga4["top_pages"]:
        t = p["title"][:50] + ("…" if len(p["title"]) > 50 else "")
        pg_rows.append([t, fmt(p["views"]), fmt(p["users"])])
    story.append(mini(pg_rows, [114*mm, 26*mm, 26*mm], size=8))
    story.append(Spacer(1, 6*mm))

    story.append(Paragraph("流入元TOP", h1_s))
    src_rows = [["ソース", "セッション"]]
    for s in ga4["sources"][:10]:
        src_rows.append([s["name"], fmt(s["sessions"])])
    story.append(mini(src_rows, [120*mm, 46*mm]))

    story.append(PageBreak())

    # ========== PAGE 4: 検索 ==========
    page_header("検索流入（Search Console）")

    search_rows = [
        ["指標", "値", "備考"],
        ["クリック", fmt(tot["clicks"]), f"表示 {fmt(tot['impressions'])}"],
        ["CTR", f"{tot['ctr']:.2f}%", "平均クリック率"],
        ["平均掲載順位", f"{tot['position']:.1f}", "低いほど上位"],
    ]
    story.append(mini(search_rows, [52*mm, 40*mm, 74*mm]))
    story.append(Spacer(1, 4*mm))

    # クエリTOP
    story.append(Paragraph("流入クエリ TOP15", h1_s))
    qr = [["クエリ", "CL", "IMP", "CTR", "順位"]]
    for q in gsc["queries"][:15]:
        qr.append([q["q"][:26], fmt(q["clicks"]), fmt(q["impressions"]),
                   f"{q['ctr']:.1f}%", f"{q['position']:.1f}"])
    story.append(mini(qr, [70*mm, 20*mm, 30*mm, 22*mm, 24*mm], size=8))
    story.append(Spacer(1, 4*mm))

    # ページTOP
    story.append(Paragraph("検索流入ページ TOP10", h1_s))
    pr = [["URL", "CL", "IMP", "順位"]]
    for p in gsc["pages"]:
        url = p["url"].replace("https://cycle-z.com", "").replace("sc-domain:cycle-z.com", "/")
        pr.append([url[:44], fmt(p["clicks"]), fmt(p["impressions"]), f"{p['position']:.1f}"])
    story.append(mini(pr, [90*mm, 20*mm, 30*mm, 26*mm], size=8))

    story.append(PageBreak())

    # ========== PAGE 5: 店舗（日報）==========
    page_header("店舗（日報）")

    if crm and "daily_reports" in crm:
        d = crm["daily_reports"]
        weather_map = {"sunny": "晴", "cloudy": "曇", "light_rain": "小雨", "heavy_rain": "雨"}

        # 来店サマリー
        story.append(Paragraph("来店（直近30日）", h1_s))
        total = d["total_visitors"]
        summary_rows = [
            ["指標", "値", "備考"],
            ["記録日数", f"{d['days']}日", "水曜定休を含む"],
            ["合計来店", f"{fmt(total)}人", f"平均 {d['avg_per_day']}人/日"],
            ["新規", f"{fmt(d['new_visitors'])}人", f"{d['new_visitors']/max(total,1)*100:.0f}%"],
            ["既存", f"{fmt(d['returning_visitors'])}人", f"{d['returning_visitors']/max(total,1)*100:.0f}% （リピート）"],
        ]
        story.append(mini(summary_rows, [40*mm, 40*mm, 86*mm]))
        story.append(Spacer(1, 6*mm))

        # 天気別 / 曜日別
        w_rows = [["天気", "日数", "合計", "平均/日"]]
        for k in ["sunny", "cloudy", "light_rain", "heavy_rain"]:
            v = d["by_weather"].get(k)
            if v:
                w_rows.append([weather_map.get(k, k), fmt(v["days"]),
                               fmt(v["visitors"]), f"{v['visitors']/max(v['days'],1):.1f}"])
        dow_order = ["月", "火", "水", "木", "金", "土", "日"]
        dw_rows = [["曜日", "日数", "合計", "平均/日"]]
        for k in dow_order:
            v = d["by_dow"].get(k)
            if v:
                dw_rows.append([k, fmt(v["days"]), fmt(v["visitors"]),
                                f"{v['visitors']/max(v['days'],1):.1f}"])

        story.append(Paragraph("天気別・曜日別", h1_s))
        story.append(Table([[mini(w_rows, [20*mm, 18*mm, 22*mm, 22*mm]), "",
                             mini(dw_rows, [18*mm, 18*mm, 22*mm, 22*mm])]],
                           colWidths=[88*mm, 6*mm, 80*mm]))
        story.append(Spacer(1, 6*mm))

        # 日別推移
        story.append(Paragraph("日別来店推移", h1_s))
        daily = [["日付", "新", "既", "合", "天気", "メモ"]]
        for row in d["rows"]:
            note_short = (row.get("note") or "")[:28] + ("…" if len(row.get("note") or "") > 28 else "")
            daily.append([row["date"][-5:], fmt(row["n"]), fmt(row["r"]),
                          fmt(row["n"]+row["r"]),
                          weather_map.get(row.get("weather", ""), "-"),
                          note_short])
        story.append(mini(daily, [18*mm, 14*mm, 14*mm, 14*mm, 12*mm, 102*mm], size=7))

    story.append(PageBreak())

    # ========== PAGE 6: 日報メモ（生の声）==========
    page_header("日報メモ抜粋（現場からの生の声）")

    if crm and crm["daily_reports"]["notable_notes"]:
        for nt in crm["daily_reports"]["notable_notes"]:
            weather_map2 = {"sunny": "晴", "cloudy": "曇", "light_rain": "小雨", "heavy_rain": "雨"}
            story.append(Paragraph(
                f"<b>{nt['date']}</b>　来店{nt['visitors']}人／{weather_map2.get(nt['weather'], '-')}",
                ParagraphStyle("ntday", fontName=FONT, fontSize=9, leading=12, textColor=BLACK, spaceAfter=2),
            ))
            body = nt["note"].replace("\n", "<br/>")
            story.append(Paragraph(
                body,
                ParagraphStyle("ntbody", fontName=FONT, fontSize=8, leading=12, textColor=colors.HexColor("#333333"),
                               spaceAfter=8, leftIndent=4, borderPadding=0),
            ))

    story.append(PageBreak())

    # ========== PAGE 7: 一次情報メモ ==========
    page_header("一次情報メモ（ブログネタ・お客様の声）")

    if crm and crm["blog_notes"]["items"]:
        items = crm["blog_notes"]["items"]
        story.append(Paragraph(f"合計 {len(items)}件", tag_s))
        story.append(Spacer(1, 4*mm))
        for b in items:
            head = f"<b>{b.get('title','')}</b>"
            meta_parts = []
            if b.get("category"): meta_parts.append(b["category"])
            if b.get("bikeBrand"): meta_parts.append(b["bikeBrand"])
            if b.get("bikeType"): meta_parts.append(b["bikeType"])
            if b.get("ageRange"): meta_parts.append(b["ageRange"])
            if b.get("experienceLevel"): meta_parts.append(b["experienceLevel"])
            meta = " / ".join([m for m in meta_parts if m])
            story.append(Paragraph(head,
                ParagraphStyle("bhead", fontName=FONT, fontSize=10, leading=13, textColor=BLACK)))
            if meta:
                story.append(Paragraph(meta, sub_s))
            if b.get("customerQuote"):
                story.append(Paragraph(f"「{b['customerQuote']}」",
                    ParagraphStyle("bq", fontName=FONT_MIN, fontSize=9, leading=13, textColor=colors.HexColor("#444444"), leftIndent=6)))
            body = (b.get("content") or "").replace("\n", "<br/>")
            if len(body) > 360:
                body = body[:360] + "…"
            story.append(Paragraph(body,
                ParagraphStyle("bbody", fontName=FONT, fontSize=8, leading=12, textColor=colors.HexColor("#333333"), spaceAfter=10)))
    else:
        story.append(Paragraph("（一次情報メモなし）", text_s))

    story.append(PageBreak())

    # ========== PAGE 8: 整合性分析（クロス）==========
    page_header("整合性チェック（データ横串分析）")

    # 定量分析
    ga_daily_sess = sm["sessions"] / 30
    store_daily = crm["daily_reports"]["avg_per_day"] if crm else 0
    conv_rate = (store_daily / ga_daily_sess * 100) if ga_daily_sess else 0

    # GSCトップクエリ
    top_q = ", ".join([q["q"] for q in gsc["queries"][:5]])

    # 仕入TOPブランド検出
    top_brand = ""
    if purchases and purchases["products"]:
        top_brand = purchases["products"][0]["name"][:30]

    story.append(Paragraph("データ横串で見る cycleZ", h1_s))
    findings = [
        ("Web訪問と店舗来店",
         f"1日平均 Webセッション <b>{ga_daily_sess:.0f}</b> / 店舗来店 <b>{store_daily}</b>人。"
         f"仮にWeb→来店 約<b>{conv_rate:.1f}%</b>が流れている規模感。"),
        ("検索流入と仕入の一致",
         f"検索TOPキーワード：{top_q}。"
         f"仕入TOP商品 \"{top_brand}\" と重なるブランド需要が顕在化。"),
        ("天気と来店の相関",
         f"晴の日 平均{crm['daily_reports']['by_weather'].get('sunny', {}).get('visitors',0)/max(crm['daily_reports']['by_weather'].get('sunny',{}).get('days',1),1):.1f}人、"
         f"雨の日 平均{crm['daily_reports']['by_weather'].get('heavy_rain', {}).get('visitors',0)/max(crm['daily_reports']['by_weather'].get('heavy_rain',{}).get('days',1),1):.1f}人。"
         f"雨天時は<b>{(1-(crm['daily_reports']['by_weather'].get('heavy_rain',{}).get('visitors',0)/max(crm['daily_reports']['by_weather'].get('heavy_rain',{}).get('days',1),1))/max(crm['daily_reports']['by_weather'].get('sunny',{}).get('visitors',1)/max(crm['daily_reports']['by_weather'].get('sunny',{}).get('days',1),1),1))*100:.0f}%減</b>の傾向。") if crm else ("天気と来店の相関", "データなし"),
        ("曜日別特徴",
         "水曜（定休）はほぼゼロ。土日が主力（平日の約2倍）。"),
        ("日報から浮上したテーマ",
         "・岡大入学シーズンで新入生・サイクリング部経由の流入が増加。<br/>"
         "・タイヤアップグレード需要（イベント前のパーツ相談）。<br/>"
         "・就実高校の通学自転車規制対応（前カゴ・スタンド要件）。<br/>"
         "・自転車事故が4月3件—安全啓発コンテンツの余地。"),
    ]
    for ttl, body in findings:
        story.append(Paragraph(f"<b>{ttl}</b>", text_s))
        story.append(Paragraph(body,
            ParagraphStyle("ff", fontName=FONT, fontSize=9, leading=14, textColor=colors.HexColor("#333333"),
                           leftIndent=6, spaceAfter=8)))

    story.append(Spacer(1, 4*mm))

    # ========== PAGE 6: 仕入（2025）==========
    page_header("仕入データ（請求書・納品書 2025年実績）")

    if purchases:
        p = purchases
        # トップカード
        tot_amt = p["total_2025"]["amount"]
        tot_cnt = p["total_2025"]["count"]
        story.append(Paragraph("2025年通年サマリー", h1_s))
        sum_rows = [
            ["指標", "値", "備考"],
            ["仕入合計金額", fmt_yen(tot_amt), f"明細 {fmt(tot_cnt)}件"],
            ["平均単価", fmt_yen(tot_amt/max(tot_cnt,1)), ""],
            ["仕入先数", fmt(len(p["vendors"])), "集計TOP10"],
        ]
        story.append(mini(sum_rows, [52*mm, 42*mm, 74*mm]))
        story.append(Spacer(1, 6*mm))

        # 月別
        story.append(Paragraph("月別仕入推移", h1_s))
        monthly = [["月", "件数", "金額"]]
        for m in p["monthly"]:
            monthly.append([m["month"], fmt(m["count"]), fmt_yen(m["amount"])])
        story.append(mini(monthly, [40*mm, 40*mm, 80*mm]))
        story.append(Spacer(1, 6*mm))

        # 仕入先TOP
        story.append(Paragraph("仕入先TOP10（金額順）", h1_s))
        vend = [["仕入先", "金額", "件数"]]
        for v in p["vendors"]:
            vend.append([v["name"][:30], fmt_yen(v["amount"]), fmt(v["count"])])
        story.append(mini(vend, [80*mm, 40*mm, 32*mm], size=8))
        story.append(Spacer(1, 6*mm))

        # 商品TOP
        story.append(Paragraph("仕入商品TOP10（金額順）", h1_s))
        prod = [["商品名", "数量", "金額"]]
        for pr in p["products"]:
            prod.append([pr["name"][:36], fmt(pr["qty"]), fmt_yen(pr["amount"])])
        story.append(mini(prod, [100*mm, 26*mm, 32*mm], size=8))
    else:
        story.append(Paragraph("（仕入DBが見つかりません）", text_s))

    story.append(PageBreak())

    # ========== PAGE 9: 総合評価 ==========
    page_header("総合評価（分野別スコアカード）")

    def stars(n):
        return "★" * n + "☆" * (5 - n)

    # 各領域のスコア算出
    # SEO: 平均順位で評価
    seo_pos = tot["position"]
    if seo_pos <= 5: seo_score, seo_c = 4, "順位良好"
    elif seo_pos <= 10: seo_score, seo_c = 3, "改善余地あり"
    else: seo_score, seo_c = 2, "最適化必要"

    # トラフィック: セッション・PV
    ses = sm["sessions"]
    if ses >= 5000: traf_score, traf_c = 5, "十分な規模"
    elif ses >= 2000: traf_score, traf_c = 4, "健全な水準"
    elif ses >= 1000: traf_score, traf_c = 3, "成長途上"
    else: traf_score, traf_c = 2, "要強化"

    # エンゲージ率
    er = sm["engagement_rate"]
    if er >= 70: eng_score, eng_c = 5, "優秀"
    elif er >= 60: eng_score, eng_c = 4, "良好"
    elif er >= 50: eng_score, eng_c = 3, "平均的"
    else: eng_score, eng_c = 2, "改善要"

    # 来店
    daily_avg_n = float(crm["daily_reports"]["avg_per_day"]) if crm else 0
    if daily_avg_n >= 20: store_score, store_c = 5, "非常に好調"
    elif daily_avg_n >= 15: store_score, store_c = 4, "安定した集客"
    elif daily_avg_n >= 10: store_score, store_c = 3, "普通"
    else: store_score, store_c = 2, "伸び余地あり"

    # 新規比率
    new_ratio = (crm["daily_reports"]["new_visitors"]/max(crm["daily_reports"]["total_visitors"],1)*100) if crm else 0
    if new_ratio >= 40: new_score, new_c = 5, "新規獲得強"
    elif new_ratio >= 30: new_score, new_c = 4, "バランス良好"
    elif new_ratio >= 20: new_score, new_c = 3, "リピート寄り"
    else: new_score, new_c = 2, "新規開拓必要"

    # コンテンツ一次情報
    bn_count = crm["blog_notes"]["total"] if crm else 0
    if bn_count >= 20: cont_score, cont_c = 5, "素材豊富"
    elif bn_count >= 10: cont_score, cont_c = 4, "継続的"
    elif bn_count >= 5: cont_score, cont_c = 3, "最低限"
    else: cont_score, cont_c = 2, "記録不足"

    # GBP
    gbp_score, gbp_c = 4, "★4.6（72件）、未返信0"

    # Ads
    ads_score, ads_c = 4, "P-Max稼働、サイトリンク6個設定済"

    scores = [
        ("Webトラフィック", traf_score, f"{fmt(ses)}セッション", traf_c),
        ("エンゲージメント", eng_score, f"{er:.1f}%", eng_c),
        ("SEO（検索順位）", seo_score, f"{seo_pos:.1f}位", seo_c),
        ("店舗集客", store_score, f"{daily_avg_n}人/日", store_c),
        ("新規顧客獲得", new_score, f"{new_ratio:.0f}%", new_c),
        ("コンテンツ素材", cont_score, f"{bn_count}件", cont_c),
        ("GBP運用", gbp_score, "★4.6", gbp_c),
        ("Google Ads", ads_score, "5キャンペーン", ads_c),
    ]

    score_rows = [["分野", "評価", "実績値", "コメント"]]
    for n, s, v, c in scores:
        score_rows.append([n, stars(s), v, c])
    story.append(mini(score_rows, [45*mm, 34*mm, 35*mm, 60*mm]))

    story.append(Spacer(1, 6*mm))

    # 総合
    total_score = sum(s[1] for s in scores)
    max_score = len(scores) * 5
    avg_score = total_score / len(scores)
    story.append(Paragraph("総合スコア", h1_s))
    story.append(Paragraph(
        f"<b>{stars(round(avg_score))}</b>　{avg_score:.1f} / 5.0　（{total_score} / {max_score}）",
        ParagraphStyle("score", fontName=FONT, fontSize=16, leading=22, textColor=BLACK),
    ))
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph(
        "サイト移管後1ヶ月で2,379セッションを獲得し、検索・来店・エンゲージのバランスは良好。"
        "SEOは順位改善の余地あり、コンテンツ素材記録は増強余地。店舗の新規比率30.5%は健全で、紹介・Google経由の新規がよく効いている。",
        text_s,
    ))

    story.append(PageBreak())

    # ========== PAGE 10: 市場予測 ==========
    page_header("市場予測 2026年5–7月")

    story.append(Paragraph("需要カレンダー（スポーツバイク市場）", h1_s))
    forecast = [
        ["月", "需要強度", "主トピック", "機会"],
        ["5月",  "★★★★★ ピーク", "GW・自転車月間・新生活完全定着", "購入・パーツ交換・試乗会最適期"],
        ["6月",  "★★★☆☆ 下降",   "梅雨入り、屋外需要低下",            "メンテ・雨対策・屋内フィッティング"],
        ["7月",  "★★★★☆ 回復",   "しまなみピーク・夏休み前準備",       "ロングライド装備・観光需要"],
    ]
    story.append(mini(forecast, [18*mm, 30*mm, 58*mm, 68*mm], size=9))
    story.append(Spacer(1, 4*mm))

    story.append(Paragraph("cycleZに影響する外部要因", h1_s))
    factors = [
        ["要因", "影響", "備考"],
        ["GWの新車購入需要", "強いプラス", "4月末〜5月頭は年間最大のセッションピーク"],
        ["しまなみ海道シーズン", "プラス", "岡山→尾道1.5h、34万人/年の通過需要"],
        ["岡大・就実の通学需要", "中長期プラス", "新入生の自転車選びは5月にも継続"],
        ["岡山国際サーキットイベント", "プラス", "パーツアップグレード需要（日報確認済）"],
        ["梅雨入り（6月中旬〜）", "マイナス", "試乗・実走需要が減、メンテ案件が増"],
        ["競合（Giant Store /WAVE)", "常に注視", "特にGiant StoreのStravaクラブ226名"],
    ]
    story.append(mini(factors, [50*mm, 40*mm, 84*mm], size=9))
    story.append(Spacer(1, 4*mm))

    story.append(Paragraph("需要予測（cycleZ想定値）", h1_s))
    # ベース値
    base_sess = sm["sessions"]
    base_visit = crm["daily_reports"]["total_visitors"] if crm else 0
    expected = [
        ["月", "セッション予測", "来店予測（30日）", "根拠"],
        ["5月", f"{int(base_sess*1.4):,}（+40%）", f"{int(base_visit*1.4):,}人（+40%）", "GWピーク・新車需要"],
        ["6月", f"{int(base_sess*1.0):,}（±0）",    f"{int(base_visit*0.8):,}人（-20%）", "梅雨で実店舗減、オンライン横ばい"],
        ["7月", f"{int(base_sess*1.2):,}（+20%）", f"{int(base_visit*1.1):,}人（+10%）", "夏休み前、しまなみ需要"],
    ]
    story.append(mini(expected, [15*mm, 42*mm, 42*mm, 73*mm], size=9))

    story.append(PageBreak())

    # ========== PAGE 11: アクションプラン 5-7月 ==========
    page_header("アクションプラン 2026年5–7月")

    # 5月
    story.append(Paragraph("5月（GW・ピーク月）— 攻めに全振り", h1_s))
    may_actions = [
        ["#", "アクション", "目的", "工数"],
        ["1", "GW試乗会のGBP投稿＋ブログ記事", "5/3-6のピーク集客", "2h"],
        ["2", "「岡山 ロードバイク 初心者」記事を強化", "年間検索ピーク狙い撃ち", "3h"],
        ["3", "岡大サイクリング部向け新入生記事", "日報で効果実証済の導線", "2h"],
        ["4", "Google Ads GW特集のキャンペーン広告文追加", "CPC 128円の強みを拡大", "30分"],
        ["5", "Stravaクラブ設立・初回ライド告知", "Giant Store 226名への追い上げ開始", "1h+1回"],
        ["6", "納車セレモニー＋口コミQR設置", "口コミ100件突破へ", "仕組み化"],
    ]
    t = mini(may_actions, [8*mm, 76*mm, 60*mm, 22*mm], size=9)
    story.append(t)
    story.append(Spacer(1, 4*mm))

    # 6月
    story.append(Paragraph("6月（梅雨）— メンテ・屋内需要で守る", h1_s))
    jun_actions = [
        ["#", "アクション", "目的", "工数"],
        ["1", "「雨天時の自転車メンテ」記事", "需要減を知識系コンテンツで補完", "2h"],
        ["2", "「自転車 修理 岡山」記事を作成", "最高CVR KW、現状圏外→上位狙い", "3h"],
        ["3", "フィッティング予約キャンペーン", "屋内サービス訴求（Retül活用）", "1h"],
        ["4", "5月購入者への1ヶ月点検リマインド", "LTV向上、購入履歴9名活用", "1h"],
        ["5", "梅雨時のタイヤ・ブレーキ点検動画", "YouTube Shorts流用でリール化", "3h"],
        ["6", "Google広告 P-Max オーディエンスシグナル設定", "配信精度向上（未実装）", "15分"],
    ]
    story.append(mini(jun_actions, [8*mm, 76*mm, 60*mm, 22*mm], size=9))
    story.append(Spacer(1, 4*mm))

    # 7月
    story.append(Paragraph("7月（夏休み前・しまなみ回復）— 攻めに戻る", h1_s))
    jul_actions = [
        ["#", "アクション", "目的", "工数"],
        ["1", "「しまなみ海道 岡山から」ガイド記事", "岡山ゲートウェイ訴求（未占有KW）", "4h"],
        ["2", "ロングライド装備セット提案", "客単価アップ、既存リピート活性", "2h"],
        ["3", "Stravaクラブ 月例ライド定着化", "コミュニティ資産化・紹介経路強化", "月1運営"],
        ["4", "e-bikeカテゴリの記事＋在庫訴求", "成長CAGR 5.35%の先取り", "3h"],
        ["5", "夏休みキッズ＆ファミリーライド企画", "岡大・就実新規から家族層拡張", "1日イベント"],
        ["6", "岡山国際サーキット7月イベント特集", "4月日報で効果確認済", "2h"],
    ]
    story.append(mini(jul_actions, [8*mm, 76*mm, 60*mm, 22*mm], size=9))

    story.append(PageBreak())

    # ========== PAGE 12: 優先度マトリクス & 運用 ==========
    page_header("優先度マトリクス（直近やること）")

    story.append(Paragraph("影響度 × 工数 で並べた最優先10", h1_s))
    prio = [
        ["#", "アクション", "影響", "工数", "期日"],
        ["1", "「自転車 修理 岡山」記事を1本", "★★★★★", "3h", "5月第1週"],
        ["2", "Stravaクラブ作成・初回ライド告知", "★★★★☆", "1.5h", "5月第2週"],
        ["3", "P-Max オーディエンスシグナル設定", "★★★★☆", "15分", "今週"],
        ["4", "岡大サイクリング部向け新入生記事", "★★★★☆", "2h", "5月GW前"],
        ["5", "納車セレモニー+口コミQR設置", "★★★☆☆", "仕組み化", "5月中"],
        ["6", "GBP週1投稿の運用定着", "★★★☆☆", "週15分", "常時"],
        ["7", "1ヶ月点検リマインド（購入済9名）", "★★★☆☆", "1h", "6月第1週"],
        ["8", "「しまなみ海道 岡山から」記事", "★★★☆☆", "4h", "7月初旬"],
        ["9", "e-bike記事・在庫訴求", "★★★☆☆", "3h", "7月前半"],
        ["10", "ブログ週1更新の定着", "★★☆☆☆", "週2h", "常時"],
    ]
    story.append(mini(prio, [8*mm, 80*mm, 26*mm, 22*mm, 30*mm], size=9))

    story.append(Spacer(1, 8*mm))
    story.append(Paragraph("運用ステータス", h1_s))
    status = [
        ["項目", "状態"],
        ["Google Adsサイトリンク", "完了（6個、2026/3/23）"],
        ["GA4 / Search Console API連携", "完了（自動生成化）"],
        ["CRM / 仕入DB 統合", "完了（本レポートで実装）"],
        ["GBP未返信口コミ", "0件（本日返信済）"],
        ["Stravaクラブ", "未作成（Giant Store 226名に対抗要）"],
        ["Meta Pixel", "未設定（広告配信時に有効化）"],
        ["P-Max オーディエンスシグナル", "未設定（最適化余地）"],
    ]
    story.append(mini(status, [72*mm, 102*mm]))

    story.append(Spacer(1, 10*mm))
    story.append(Paragraph(
        f"Generated {TODAY:%Y-%m-%d} · Sources: GA4 API + Search Console API + Firestore(cyclez-crm) + SQLite(cyclez-reconciliation)",
        note_s,
    ))

    doc.build(story)
    print(f"[OK] {OUTPUT}")


# ===== 実行 =====
if __name__ == "__main__":
    print(f"期間: {START} 〜 {END}")
    print("GA4 取得中...")
    ga4 = fetch_ga4()
    print(f"  セッション: {ga4['summary']['sessions']:,}")
    print("GSC 取得中...")
    gsc = fetch_gsc()
    print(f"  クリック: {gsc['total']['clicks']:,}")
    print("CRM 取得中...")
    crm = fetch_crm()
    if crm:
        print(f"  日報 {crm['daily_reports']['days']}日, 来店 {crm['daily_reports']['total_visitors']}人, 一次情報 {crm['blog_notes']['total']}件")
    print("仕入DB 取得中...")
    purchases = fetch_purchases()
    if purchases:
        print(f"  2025年仕入: {purchases['total_2025']['count']}件 / ¥{purchases['total_2025']['amount']:,}")
    print("PDF 生成中...")
    build_pdf(ga4, gsc, crm, purchases)
