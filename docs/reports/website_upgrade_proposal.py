#!/usr/bin/env python3
"""
cycleZ ウェブサイト機能追加 提案資料PDF生成（最終版）
A4縦 / 日本語対応 / reportlab Platypus
分析レポートのGA4・GSC・Clarity・Ads実データを統合
"""

import os
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    KeepTogether, PageBreak, Flowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont

pdfmetrics.registerFont(UnicodeCIDFont("HeiseiKakuGo-W5"))
FONT = "HeiseiKakuGo-W5"

# カラー
RED = HexColor("#c41e3a")
DARK = HexColor("#1a1a1a")
GRAY = HexColor("#555555")
LGRAY = HexColor("#999999")
BLUE = HexColor("#2563eb")
DBLUE = HexColor("#1e40af")
GREEN = HexColor("#16a34a")
PURPLE = HexColor("#7c3aed")
ORANGE = HexColor("#ea580c")
BG = HexColor("#f5f5f5")
BR = HexColor("#fff5f5")
BB = HexColor("#f0f7ff")
BG2 = HexColor("#f0fdf4")
BO = HexColor("#fff7ed")
W, H = A4
M = 18 * mm

# スタイル
def ps(name, **kw):
    defaults = {"fontName": FONT, "fontSize": 8, "leading": 12, "textColor": DARK}
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

S = {
    "title": ps("title", fontSize=20, leading=28, alignment=TA_CENTER, spaceAfter=2*mm),
    "sub": ps("sub", fontSize=10, leading=14, textColor=GRAY, alignment=TA_CENTER, spaceAfter=1*mm),
    "date": ps("date", fontSize=8, textColor=LGRAY, alignment=TA_CENTER, spaceAfter=3*mm),
    "body": ps("body", fontSize=8.5, leading=13),
    "sm": ps("sm", fontSize=7.5, leading=11),
    "smg": ps("smg", fontSize=7.5, leading=11, textColor=GRAY),
    "bul": ps("bul", fontSize=8, leading=12, leftIndent=5*mm, spaceBefore=0.3*mm, spaceAfter=0.3*mm),
    "buls": ps("buls", fontSize=7.5, leading=11, leftIndent=5*mm, spaceBefore=0.2*mm, spaceAfter=0.2*mm),
    "lr": ps("lr", fontSize=6.5, leading=9, textColor=RED),
    "lg": ps("lg", fontSize=6.5, leading=9, textColor=LGRAY),
    "lb": ps("lb", fontSize=6.5, leading=9, textColor=BLUE),
    "lgr": ps("lgr", fontSize=6.5, leading=9, textColor=GREEN),
    "lo": ps("lo", fontSize=6.5, leading=9, textColor=ORANGE),
    "eff": ps("eff", fontSize=8, leading=12, textColor=DBLUE),
    "goal": ps("goal", fontSize=8, leading=12, textColor=GREEN),
    "cb": ps("cb", fontSize=11, leading=16, alignment=TA_CENTER),
    "cs": ps("cs", fontSize=9, leading=13, alignment=TA_CENTER),
    "cg": ps("cg", fontSize=8, leading=12, textColor=GRAY, alignment=TA_CENTER),
    "note": ps("note", fontSize=6.5, leading=10, textColor=LGRAY, spaceBefore=0.5*mm),
    "kn": ps("kn", fontSize=16, leading=20, textColor=RED, alignment=TA_CENTER),
    "kl": ps("kl", fontSize=7, leading=10, textColor=GRAY, alignment=TA_CENTER),
    "fn": ps("fn", fontSize=16, leading=20, textColor=RED),
    "ft": ps("ft", fontSize=11, leading=15),
    "th": ps("th", fontSize=7.5, leading=11, textColor=white),
    "td": ps("td", fontSize=7.5, leading=11),
    "tg": ps("tg", fontSize=7.5, leading=11, textColor=GREEN),
    "tr": ps("tr", fontSize=7.5, leading=11, textColor=RED),
}


class SH(Flowable):
    """セクションヘッダー"""
    def __init__(self, text, sub=""):
        super().__init__()
        self.text = text; self.sub = sub
        self.height = 9*mm; self.spaceAfter = 3*mm
    def draw(self):
        c = self.canv; w = W - 2*M
        c.setFillColor(RED)
        c.roundRect(0, 0, w, self.height, 2*mm, fill=1, stroke=0)
        c.setFillColor(white); c.setFont(FONT, 10)
        c.drawString(5*mm, 2.5*mm, self.text)
        if self.sub:
            c.setFont(FONT, 6.5)
            c.drawRightString(w - 5*mm, 3*mm, self.sub)


class RL(Flowable):
    """赤ライン"""
    def __init__(self, w=50*mm):
        super().__init__(); self._w = w; self.height = 2*mm
    def draw(self):
        c = self.canv; x = (W - 2*M - self._w) / 2
        c.setStrokeColor(RED); c.setLineWidth(1.5)
        c.line(x, 1*mm, x + self._w, 1*mm)


class DA(Flowable):
    """下矢印"""
    def __init__(self):
        super().__init__(); self.height = 4*mm; self.width = W - 2*M
    def draw(self):
        c = self.canv; cx = self.width / 2
        c.setFillColor(RED); p = c.beginPath()
        p.moveTo(cx-3*mm, self.height); p.lineTo(cx, 0); p.lineTo(cx+3*mm, self.height)
        p.close(); c.drawPath(p, fill=1, stroke=0)


class FA(Flowable):
    """フロー図"""
    def __init__(self):
        super().__init__(); self.width = W - 2*M; self.height = 20*mm
    def draw(self):
        c = self.canv
        steps = [
            ("Google検索 /", "Instagram", BG, GRAY),
            ("トップページ", "閲覧", BG, GRAY),
            ("バイク診断 /", "ルートマップ", BR, RED),
            ("LINE登録 /", "メンテ予約", BG2, GREEN),
            ("来店 /", "購入", BB, BLUE),
        ]
        n = len(steps); aw = 3.5*mm; g = 1.5*mm
        bw = (self.width - (n-1)*(aw + g*2)) / n
        bh = 13*mm; by = self.height - 2*mm - bh
        for i, (l1, l2, bg, fg) in enumerate(steps):
            x = i * (bw + aw + g*2)
            c.setFillColor(bg); c.setStrokeColor(fg); c.setLineWidth(0.6)
            c.roundRect(x, by, bw, bh, 2*mm, fill=1, stroke=1)
            c.setFillColor(fg); c.setFont(FONT, 7)
            tw1 = pdfmetrics.stringWidth(l1, FONT, 7)
            tw2 = pdfmetrics.stringWidth(l2, FONT, 7)
            c.drawString(x + (bw-tw1)/2, by + bh/2 + 1*mm, l1)
            c.drawString(x + (bw-tw2)/2, by + bh/2 - 3.5*mm, l2)
            if i < n-1:
                ax = x + bw + g; ay = by + bh/2
                c.setFillColor(LGRAY); p = c.beginPath()
                p.moveTo(ax, ay+1.5*mm); p.lineTo(ax+aw, ay); p.lineTo(ax, ay-1.5*mm)
                p.close(); c.drawPath(p, fill=1, stroke=0)
        bx = 2*(bw + aw + g*2)
        c.setStrokeColor(RED); c.setLineWidth(0.8)
        ly = by - 2*mm; c.line(bx, ly, bx + bw, ly)
        c.setFillColor(RED); c.setFont(FONT, 6.5)
        tw = pdfmetrics.stringWidth("新機能で強化", FONT, 6.5)
        c.drawString(bx + (bw-tw)/2, ly - 3.5*mm, "新機能で強化")


def kpi_bar():
    cw = W - 2*M
    kpis = [("298", "アクティブユーザー"), ("+2,107%", "前期比成長"), ("913", "GSCクリック"),
            ("93.8%", "モバイル比率"), ("91/100", "パフォーマンス")]
    cells = []
    for n, l in kpis:
        t = Table([[Paragraph(n, S["kn"])], [Paragraph(l, S["kl"])]], colWidths=[cw/5 - 2*mm])
        cells.append(t)
    tbl = Table([cells], colWidths=[cw/5]*5)
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), BG), ("ROUNDEDCORNERS", [2*mm]*4),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("TOPPADDING", (0,0), (-1,-1), 2*mm), ("BOTTOMPADDING", (0,0), (-1,-1), 2*mm),
        ("LEFTPADDING", (0,0), (-1,-1), 1*mm), ("RIGHTPADDING", (0,0), (-1,-1), 1*mm),
    ]))
    return tbl


def feat(num, title, data, bef, aft, eff, gl):
    cw = W - 2*M; hw = cw * 0.48
    tt = Table([[Paragraph(num, S["fn"]), Paragraph(title, S["ft"])]], colWidths=[10*mm, cw-10*mm])
    tt.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LEFTPADDING",(0,0),(-1,-1),0), ("RIGHTPADDING",(0,0),(-1,-1),0),
        ("TOPPADDING",(0,0),(-1,-1),0), ("BOTTOMPADDING",(0,0),(-1,-1),0)]))

    db = Table([[Paragraph("データ根拠", S["lo"]), Paragraph(data, ps("d", fontSize=7.5, leading=11, textColor=ORANGE))]],
        colWidths=[16*mm, cw-16*mm-4*mm])
    db.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BO), ("ROUNDEDCORNERS",[1.5*mm]*4),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"), ("LEFTPADDING",(0,0),(-1,-1),2.5*mm),
        ("RIGHTPADDING",(0,0),(-1,-1),2.5*mm), ("TOPPADDING",(0,0),(-1,-1),1.5*mm),
        ("BOTTOMPADDING",(0,0),(-1,-1),1.5*mm)]))

    bt = Table([[Paragraph("BEFORE（旧サイト）", S["lg"])], [Paragraph(bef, S["smg"])]],
        colWidths=[hw-4*mm])
    bt.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"), ("LEFTPADDING",(0,0),(-1,-1),2.5*mm),
        ("RIGHTPADDING",(0,0),(-1,-1),2.5*mm), ("TOPPADDING",(0,0),(0,0),1.5*mm),
        ("BOTTOMPADDING",(-1,-1),(-1,-1),1.5*mm)]))

    at = Table([[Paragraph("AFTER（新機能）", S["lr"])], [Paragraph(aft, S["sm"])]],
        colWidths=[hw-4*mm])
    at.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"), ("LEFTPADDING",(0,0),(-1,-1),2.5*mm),
        ("RIGHTPADDING",(0,0),(-1,-1),2.5*mm), ("TOPPADDING",(0,0),(0,0),1.5*mm),
        ("BOTTOMPADDING",(-1,-1),(-1,-1),1.5*mm)]))

    ba = Table([[bt, at]], colWidths=[hw, hw], spaceBefore=1.5*mm)
    ba.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),HexColor("#efefef")),
        ("BACKGROUND",(1,0),(1,0),BR), ("BOX",(1,0),(1,0),0.5,RED),
        ("VALIGN",(0,0),(-1,-1),"TOP"), ("LEFTPADDING",(0,0),(-1,-1),0),
        ("RIGHTPADDING",(0,0),(-1,-1),0), ("TOPPADDING",(0,0),(-1,-1),0),
        ("BOTTOMPADDING",(0,0),(-1,-1),0)]))

    et = Table([[Paragraph("期待される効果", S["lb"]), Paragraph(eff, S["eff"])]],
        colWidths=[22*mm, cw-22*mm-4*mm])
    et.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BB), ("ROUNDEDCORNERS",[1.5*mm]*4),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"), ("LEFTPADDING",(0,0),(-1,-1),2.5*mm),
        ("RIGHTPADDING",(0,0),(-1,-1),2.5*mm), ("TOPPADDING",(0,0),(-1,-1),2*mm),
        ("BOTTOMPADDING",(0,0),(-1,-1),2*mm)]))

    gt = Table([[Paragraph("最終ゴール", S["lgr"]), Paragraph(gl, S["goal"])]],
        colWidths=[18*mm, cw-18*mm-4*mm])
    gt.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BG2), ("ROUNDEDCORNERS",[1.5*mm]*4),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"), ("LEFTPADDING",(0,0),(-1,-1),2.5*mm),
        ("RIGHTPADDING",(0,0),(-1,-1),2.5*mm), ("TOPPADDING",(0,0),(-1,-1),2*mm),
        ("BOTTOMPADDING",(0,0),(-1,-1),2*mm)]))

    return KeepTogether([tt, Spacer(1,1*mm), db, ba, Spacer(1,1*mm), DA(),
        Spacer(1,1*mm), et, Spacer(1,1.5*mm), gt, Spacer(1,4*mm)])


def hf(c, doc):
    p = doc.page
    if p == 1:
        c.setFillColor(RED); c.rect(0, H-5*mm, W, 5*mm, fill=1, stroke=0)
    else:
        c.setFillColor(RED); c.rect(0, H-3*mm, W, 3*mm, fill=1, stroke=0)
        c.setFillColor(DARK); c.setFont(FONT, 7)
        c.drawString(M, H-9*mm, "cycleZ ウェブサイト 機能追加のご提案")
        c.setStrokeColor(HexColor("#e0e0e0")); c.setLineWidth(0.3)
        c.line(M, H-11*mm, W-M, H-11*mm)
    c.setStrokeColor(HexColor("#e0e0e0")); c.setLineWidth(0.3)
    c.line(M, 11*mm, W-M, 11*mm)
    c.setFillColor(LGRAY); c.setFont(FONT, 6.5)
    c.drawString(M, 6*mm, "cycleZ（サイクルゼット）  086-252-7744  cycle-z.com")
    c.drawRightString(W-M, 6*mm, f"Page {p}")


def build_pdf(output_path):
    doc = SimpleDocTemplate(output_path, pagesize=A4, leftMargin=M, rightMargin=M,
        topMargin=16*mm, bottomMargin=16*mm)
    st = []
    cw = W - 2*M

    # ===== P1: 表紙 =====
    st.append(Spacer(1, 4*mm))
    st.append(Paragraph("cycleZ ウェブサイト<br/>機能追加のご提案", S["title"]))
    st.append(RL())
    st.append(Spacer(1, 1.5*mm))
    st.append(Paragraph("データ分析に基づくユーザー体験向上と来店コンバージョン強化", S["sub"]))
    st.append(Paragraph("2026年3月　cycleZ Web担当", S["date"]))

    # KPI
    st.append(SH("現在のサイト状況（GA4 / GSC / Clarity 実データ）", "DATA"))
    st.append(Spacer(1, 2*mm))
    st.append(kpi_bar())
    st.append(Spacer(1, 1.5*mm))

    # 課題
    st.append(SH("データから見える課題", "ISSUES"))
    st.append(Spacer(1, 1*mm))
    for i in [
        "リピーター率 12.18%（新規87.82%）→ 再訪問の仕組みがなく、一度きりの訪問で終わっている",
        "クイックバック率 23.62%（Clarity）→ ファーストビューで「求めていたものと違う」と判断されている",
        "モバイル93.8% → スマホユーザーが大半だが能動的に操作できるコンテンツがない",
        "ブログ421記事の資産があるが、トップページからの導線が弱く発見されにくい",
        "LINE登録・メンテ予約への導線が弱く、来店前に接点を作れていない",
    ]:
        st.append(Paragraph(f'<font color="#c41e3a">●</font>　{i}', S["buls"]))
    st.append(Spacer(1, 1.5*mm))

    # ゴール
    st.append(SH("最終ゴール", "GOAL"))
    st.append(Spacer(1, 1.5*mm))
    gb = Table(
        [[Paragraph("サイト訪問 → LINE登録 / メンテナンス予約 → 来店", S["cs"])],
         [Paragraph("「見るだけ」のサイトから「体験して、つながる」サイトへ転換する", S["cg"])]],
        colWidths=[cw-6*mm])
    gb.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BR), ("BOX",(0,0),(-1,-1),0.5,RED),
        ("ROUNDEDCORNERS",[2.5*mm]*4), ("ALIGN",(0,0),(-1,-1),"CENTER"),
        ("TOPPADDING",(0,0),(-1,-1),2*mm), ("BOTTOMPADDING",(0,0),(-1,-1),2*mm),
        ("LEFTPADDING",(0,0),(-1,-1),3*mm), ("RIGHTPADDING",(0,0),(-1,-1),3*mm)]))
    st.append(gb)
    st.append(Spacer(1, 2*mm))

    # フロー図
    st.append(SH("ユーザー導線フロー", "USER FLOW"))
    st.append(Spacer(1, 1.5*mm))
    st.append(FA())
    st.append(Spacer(1, 2*mm))

    # 機能一覧
    st.append(SH("追加機能一覧（6項目）", "FEATURES"))
    st.append(Spacer(1, 1.5*mm))
    sd = [
        [Paragraph("No.", S["th"]), Paragraph("機能名", S["th"]),
         Paragraph("狙い", S["th"]), Paragraph("根拠データ", S["th"])],
        [Paragraph("01", S["td"]), Paragraph("バイク診断クイズ", S["td"]),
         Paragraph("初訪問者の離脱防止", S["td"]), Paragraph("クイックバック23.62%", S["tr"])],
        [Paragraph("02", S["td"]), Paragraph("おすすめルートマップ", S["td"]),
         Paragraph("情報ハブ化", S["td"]), Paragraph("GSC「岡山 サイクリング」圏外", S["tr"])],
        [Paragraph("03", S["td"]), Paragraph("メンテ予約フォーム", S["td"]),
         Paragraph("来店障壁を下げる", S["td"]), Paragraph("Clarityアクセス集中確認", S["tr"])],
        [Paragraph("04", S["td"]), Paragraph("フローティングSNS", S["td"]),
         Paragraph("SNS接点確保", S["td"]), Paragraph("リピーター12.18%", S["tr"])],
        [Paragraph("05", S["td"]), Paragraph("背景動画セクション", S["td"]),
         Paragraph("没入感向上", S["td"]), Paragraph("スクロール深度62.7%", S["tr"])],
        [Paragraph("06", S["td"]), Paragraph("HOW TOタグクラウド", S["td"]),
         Paragraph("回遊率UP", S["td"]), Paragraph("ブログ421記事未活用", S["tr"])],
    ]
    st1 = Table(sd, colWidths=[9*mm, 38*mm, 30*mm, cw-77*mm-2*mm])
    st1.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),DARK),
        *[("BACKGROUND",(0,i),(-1,i),BG if i%2==0 else white) for i in range(1,7)],
        ("ROUNDEDCORNERS",[1.5*mm]*4), ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LEFTPADDING",(0,0),(-1,-1),2*mm), ("RIGHTPADDING",(0,0),(-1,-1),2*mm),
        ("TOPPADDING",(0,0),(-1,-1),1.2*mm), ("BOTTOMPADDING",(0,0),(-1,-1),1.2*mm),
        ("LINEBELOW",(0,0),(-1,-2),0.2,HexColor("#e0e0e0"))]))
    st.append(st1)
    st.append(PageBreak())

    # ===== P2: 機能01-03 =====
    st.append(Spacer(1, 2*mm))
    st.append(SH("機能詳細", "01 - 03"))
    st.append(Spacer(1, 2*mm))

    st.append(feat("01", "バイク診断クイズ（5問）",
        "Clarityクイックバック率23.62% → 「自分に合うバイクがわからない」まま離脱している",
        "初訪問者は「自分に合うバイクがわからない」状態。取扱ブランドページを見ても選べず、そのまま離脱。",
        "5つの質問に答えるだけで、最適なバイクタイプを診断。結果からブランド・試乗予約へ直結。",
        "初訪問者の「何を選べばいいかわからない」不安を解消 → 滞在時間UP・直帰率DOWN",
        "診断結果ページの「店舗で試乗する」ボタン → お問い合わせ or 来店"))

    st.append(feat("02", "おすすめルートマップ（地図連動）",
        "GSCで「岡山 サイクリング コース」圏外。年間34万人のしまなみ海道サイクリストを取り込めていない",
        "岡山のサイクリングコース情報がサイト上にない。情報を探すユーザーは他サイトへ流出。",
        "吉備路・旭川・蒜山高原・しまなみ海道の4コースを地図上に表示。距離・難易度を一覧比較。",
        "「岡山 サイクリング コース」の検索流入を獲得 → cycleZが岡山の自転車情報ハブに",
        "コース情報で来店きっかけ作り → 「cycleZで相談してから走ろう」の導線構築"))

    st.append(feat("03", "メンテナンス予約フォーム（4ステップ）",
        "Clarityで「アクセスページ」への集中訪問パターンを確認。来店準備行動のデジタル化需要がある",
        "メンテしたいが「電話が面倒」「営業時間内に連絡できない」→ 結局予約せず来店しない。",
        "メニュー選択→日時指定→顧客情報→確認の4ステップ。水曜定休自動ブロック。24時間受付。",
        "電話ハードルの解消 → 夜間・休日の予約取りこぼしゼロへ。メンテ来店頻度の向上",
        "定期メンテナンス → パーツ購入 → 新車検討 のLTV向上サイクルを形成"))
    st.append(PageBreak())

    # ===== P3: 機能04-06 =====
    st.append(Spacer(1, 2*mm))
    st.append(SH("機能詳細", "04 - 06"))
    st.append(Spacer(1, 2*mm))

    st.append(feat("04", "フローティングSNSボタン（常時表示）",
        "リピーター率12.18%。SNSリンクはフッターのみでスクロールしないと到達できない",
        "SNSリンクはフッターにしかなく、接触機会が限定的。",
        "画面右下にInstagram・YouTube・LINEを常時フロート表示。どのページからでもワンタップで遷移。",
        "SNSフォロー率向上（特にLINE登録）。全ページで接点確保、離脱前にキャッチ",
        "LINE友だち追加 → クーポン・イベント告知 → 来店リピート率の向上"))

    st.append(feat("05", "背景動画セクション（YouTube透過）",
        "Clarityスクロール深度62.7%。ページ中盤での離脱が発生している",
        "静止画のみの画面構成。スクロールしても変化が少なく、ページ中盤で離脱されやすい。",
        "YouTubeをミュート自動再生で背景に埋め込み、半透明オーバーレイで重ねる。計4箇所に配置。",
        "動きのある画面で離脱率を低減。実際のライド映像で「自分もやりたい」の感情を喚起",
        "没入感のあるブランド体験 → 「このお店なら楽しそう」→ 来店意欲を醸成"))

    st.append(feat("06", "HOW TO タグクラウド",
        "ブログ421記事の資産があるがトップからの導線が弱く回遊率が低い",
        "421記事のブログ資産があるが、トップページからの導線が弱く発見されにくい。",
        "「空気の入れ方」「チェーン洗浄」「輪行」など12個のタグをワンタップでアクセス。",
        "記事への回遊率UP → ページ/セッション数の増加 → SEO評価の底上げ",
        "HOW TO記事で信頼獲得 → 「ここに相談しよう」→ メンテ予約・来店へ転換"))
    st.append(PageBreak())

    # ===== P4: 競合+まとめ =====
    st.append(Spacer(1, 2*mm))
    st.append(SH("岡山市内 競合比較（実データ）", "COMPETITOR"))
    st.append(Spacer(1, 1.5*mm))

    cd = [
        [Paragraph("店舗", S["th"]), Paragraph("口コミ", S["th"]),
         Paragraph("Ads", S["th"]), Paragraph("ブログ", S["th"]),
         Paragraph("Strava", S["th"]), Paragraph("技術", S["th"])],
        [Paragraph("cycleZ", S["td"]), Paragraph("★4.6/72", S["td"]),
         Paragraph("P-Max稼働", S["td"]), Paragraph("421記事", S["td"]),
         Paragraph("なし", S["tr"]), Paragraph("Next.js 16", S["tg"])],
        [Paragraph("WAVE BIKES", S["td"]), Paragraph("★4.5/177", S["td"]),
         Paragraph("なし", S["td"]), Paragraph("あり", S["td"]),
         Paragraph("なし", S["td"]), Paragraph("Nuxt.js", S["td"])],
        [Paragraph("なかやま", S["td"]), Paragraph("★4.6/89", S["td"]),
         Paragraph("稼働中", S["td"]), Paragraph("毎日更新", S["td"]),
         Paragraph("チーム有", S["tg"]), Paragraph("WordPress", S["td"])],
        [Paragraph("Giant Store", S["td"]), Paragraph("★4.9/47", S["td"]),
         Paragraph("不明", S["td"]), Paragraph("あり", S["td"]),
         Paragraph("226名", S["tg"]), Paragraph("本社CMS", S["td"])],
    ]
    ct = Table(cd, colWidths=[26*mm, 22*mm, 22*mm, 22*mm, 20*mm, cw-112*mm])
    ct.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),DARK),
        ("BACKGROUND",(0,1),(-1,1),BR), ("BOX",(0,1),(-1,1),0.5,RED),
        *[("BACKGROUND",(0,i),(-1,i),BG if i%2==0 else white) for i in range(2,5)],
        ("ROUNDEDCORNERS",[1.5*mm]*4), ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LEFTPADDING",(0,0),(-1,-1),2*mm), ("RIGHTPADDING",(0,0),(-1,-1),2*mm),
        ("TOPPADDING",(0,0),(-1,-1),1.2*mm), ("BOTTOMPADDING",(0,0),(-1,-1),1.2*mm),
        ("LINEBELOW",(0,0),(-1,-2),0.2,HexColor("#e0e0e0"))]))
    st.append(ct)
    st.append(Spacer(1, 0.5*mm))
    st.append(Paragraph("→ cycleZの最大の優位性: 岡山の自転車店で唯一JSON-LD構造化データを実装。技術基盤で圧倒的にリード。", S["buls"]))
    st.append(Spacer(1, 2.5*mm))

    # まとめ表
    st.append(SH("離脱ポイント → 解決機能 → 期待効果", "SUMMARY"))
    st.append(Spacer(1, 1.5*mm))
    sm = [
        [Paragraph("離脱ポイント", S["th"]), Paragraph("解決機能", S["th"]),
         Paragraph("根拠指標", S["th"]), Paragraph("期待効果", S["th"])],
        [Paragraph("バイク選びがわからない", S["td"]), Paragraph("バイク診断", S["td"]),
         Paragraph("QB率23.62%", S["tr"]), Paragraph("直帰率 -20%", S["tg"])],
        [Paragraph("コース情報がない", S["td"]), Paragraph("ルートマップ", S["td"]),
         Paragraph("GSC圏外", S["tr"]), Paragraph("検索流入獲得", S["tg"])],
        [Paragraph("電話予約が面倒", S["td"]), Paragraph("メンテ予約", S["td"]),
         Paragraph("アクセスPG集中", S["tr"]), Paragraph("予約数 +30%", S["tg"])],
        [Paragraph("SNSに気づかない", S["td"]), Paragraph("フローティングSNS", S["td"]),
         Paragraph("リピーター12.18%", S["tr"]), Paragraph("LINE登録 +50%", S["tg"])],
        [Paragraph("ページ中盤で飽きる", S["td"]), Paragraph("背景動画", S["td"]),
         Paragraph("深度62.7%", S["tr"]), Paragraph("深度 +25%", S["tg"])],
        [Paragraph("記事が見つからない", S["td"]), Paragraph("HOW TOタグ", S["td"]),
         Paragraph("421記事未活用", S["tr"]), Paragraph("回遊率 +40%", S["tg"])],
    ]
    smt = Table(sm, colWidths=[34*mm, 28*mm, 30*mm, cw-92*mm-4*mm])
    smt.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),DARK),
        *[("BACKGROUND",(0,i),(-1,i),BG if i%2==0 else white) for i in range(1,7)],
        ("ROUNDEDCORNERS",[1.5*mm]*4), ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LEFTPADDING",(0,0),(-1,-1),2*mm), ("RIGHTPADDING",(0,0),(-1,-1),2*mm),
        ("TOPPADDING",(0,0),(-1,-1),1.2*mm), ("BOTTOMPADDING",(0,0),(-1,-1),1.2*mm),
        ("LINEBELOW",(0,0),(-1,-2),0.2,HexColor("#e0e0e0"))]))
    st.append(smt)
    st.append(Spacer(1, 2.5*mm))

    # コンバージョン導線
    st.append(SH("コンバージョン導線の設計思想", "CONVERSION PATH"))
    st.append(Spacer(1, 1*mm))
    for c, t in [
        ("#c41e3a", "診断クイズ → 結果ページ「店舗で試乗する」→ お問い合わせ → 来店"),
        ("#2563eb", "ルートマップ → コース詳細 → 「出発前にcycleZでチェック」→ 来店"),
        ("#16a34a", "HOW TO記事 → メンテ予約フォーム → 24時間予約完了 → 来店"),
        ("#7c3aed", "全ページ → フローティングLINE → 友だち追加 → イベント告知 → 来店"),
    ]:
        st.append(Paragraph(f'<font color="{c}">●</font>　{t}', S["buls"]))
    st.append(Spacer(1, 2.5*mm))

    # 実装状況
    st.append(SH("実装状況", "STATUS"))
    st.append(Spacer(1, 1.5*mm))
    sb = Table(
        [[Paragraph("全6機能、ローカル環境で実装完了", S["cb"])],
         [Paragraph("ご確認いただき、問題なければ本番環境（cycle-z.com）に反映いたします", S["cg"])]],
        colWidths=[cw-6*mm])
    sb.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BG2), ("BOX",(0,0),(-1,-1),0.8,GREEN),
        ("ROUNDEDCORNERS",[2.5*mm]*4), ("ALIGN",(0,0),(-1,-1),"CENTER"),
        ("TOPPADDING",(0,0),(-1,-1),2.5*mm), ("BOTTOMPADDING",(0,0),(-1,-1),2.5*mm),
        ("LEFTPADDING",(0,0),(-1,-1),3*mm), ("RIGHTPADDING",(0,0),(-1,-1),3*mm)]))
    st.append(sb)
    st.append(Spacer(1, 2.5*mm))

    st.append(Paragraph("※ 期待効果の数値は、GA4・Clarity・GSCの実データと同業界事例をもとにした推定値です", S["note"]))
    st.append(Paragraph("※ 全機能は既存デザインに合わせて実装しており、サイトの統一感を損ないません", S["note"]))
    st.append(Paragraph("※ 本番反映後、GA4・Clarityで効果測定し、改善サイクルを回していきます", S["note"]))

    doc.build(st, onFirstPage=hf, onLaterPages=hf)
    print(f"PDF generated: {output_path}")


if __name__ == "__main__":
    d = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(d, "cyclez_website_upgrade_proposal.pdf")
    build_pdf(out)
    # publicにコピー
    pub = os.path.join(d, "..", "..", "public", "cyclez_website_upgrade_proposal.pdf")
    shutil.copy2(out, pub)
    print(f"Copied to: {pub}")
