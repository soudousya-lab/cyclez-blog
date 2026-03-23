#!/usr/bin/env python3
"""
cycleZ ウェブサイト機能追加 提案資料PDF生成
A4縦 / 日本語対応 / reportlab Platypus
"""

import os
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

# 日本語フォント登録
pdfmetrics.registerFont(UnicodeCIDFont("HeiseiKakuGo-W5"))
FONT = "HeiseiKakuGo-W5"

# カラー定義
RED = HexColor("#c41e3a")
DARK = HexColor("#1a1a1a")
GRAY = HexColor("#555555")
LIGHT_GRAY = HexColor("#999999")
BLUE = HexColor("#2563eb")
DARK_BLUE = HexColor("#1e40af")
GREEN = HexColor("#16a34a")
PURPLE = HexColor("#7c3aed")
BG_LIGHT = HexColor("#f5f5f5")
BG_RED = HexColor("#fff5f5")
BG_BLUE = HexColor("#f0f7ff")
BG_GREEN = HexColor("#f0fdf4")
WHITE = white

W, H = A4
MARGIN = 20 * mm

# ─── スタイル定義 ─────────────────────────────────────
styles = {}

styles["title"] = ParagraphStyle(
    "title", fontName=FONT, fontSize=20, leading=28,
    textColor=DARK, alignment=TA_CENTER, spaceAfter=2 * mm,
)
styles["subtitle"] = ParagraphStyle(
    "subtitle", fontName=FONT, fontSize=10, leading=14,
    textColor=GRAY, alignment=TA_CENTER, spaceAfter=1 * mm,
)
styles["date"] = ParagraphStyle(
    "date", fontName=FONT, fontSize=8, leading=12,
    textColor=LIGHT_GRAY, alignment=TA_CENTER, spaceAfter=4 * mm,
)
styles["body"] = ParagraphStyle(
    "body", fontName=FONT, fontSize=9, leading=14,
    textColor=DARK, alignment=TA_LEFT,
)
styles["body_sm"] = ParagraphStyle(
    "body_sm", fontName=FONT, fontSize=8, leading=12,
    textColor=DARK, alignment=TA_LEFT,
)
styles["body_gray"] = ParagraphStyle(
    "body_gray", fontName=FONT, fontSize=8, leading=12,
    textColor=GRAY, alignment=TA_LEFT,
)
styles["body_white"] = ParagraphStyle(
    "body_white", fontName=FONT, fontSize=8.5, leading=13,
    textColor=WHITE, alignment=TA_LEFT,
)
styles["bullet"] = ParagraphStyle(
    "bullet", fontName=FONT, fontSize=8.5, leading=13,
    textColor=DARK, leftIndent=5 * mm, bulletIndent=0,
    spaceBefore=0.5 * mm, spaceAfter=0.5 * mm,
)
styles["label_red"] = ParagraphStyle(
    "label_red", fontName=FONT, fontSize=7, leading=10,
    textColor=RED,
)
styles["label_gray"] = ParagraphStyle(
    "label_gray", fontName=FONT, fontSize=7, leading=10,
    textColor=LIGHT_GRAY,
)
styles["label_blue"] = ParagraphStyle(
    "label_blue", fontName=FONT, fontSize=7, leading=10,
    textColor=BLUE,
)
styles["label_green"] = ParagraphStyle(
    "label_green", fontName=FONT, fontSize=7, leading=10,
    textColor=GREEN,
)
styles["effect"] = ParagraphStyle(
    "effect", fontName=FONT, fontSize=8.5, leading=13,
    textColor=DARK_BLUE,
)
styles["goal"] = ParagraphStyle(
    "goal", fontName=FONT, fontSize=8.5, leading=13,
    textColor=GREEN,
)
styles["center_bold"] = ParagraphStyle(
    "center_bold", fontName=FONT, fontSize=11, leading=16,
    textColor=DARK, alignment=TA_CENTER,
)
styles["center_gray"] = ParagraphStyle(
    "center_gray", fontName=FONT, fontSize=8.5, leading=13,
    textColor=GRAY, alignment=TA_CENTER,
)
styles["note"] = ParagraphStyle(
    "note", fontName=FONT, fontSize=7, leading=11,
    textColor=LIGHT_GRAY, spaceBefore=1 * mm,
)
styles["feature_num"] = ParagraphStyle(
    "feature_num", fontName=FONT, fontSize=18, leading=22,
    textColor=RED,
)
styles["feature_title"] = ParagraphStyle(
    "feature_title", fontName=FONT, fontSize=12, leading=16,
    textColor=DARK,
)
styles["table_header"] = ParagraphStyle(
    "table_header", fontName=FONT, fontSize=8, leading=12,
    textColor=WHITE,
)
styles["table_cell"] = ParagraphStyle(
    "table_cell", fontName=FONT, fontSize=8, leading=12,
    textColor=DARK,
)
styles["table_cell_green"] = ParagraphStyle(
    "table_cell_green", fontName=FONT, fontSize=8, leading=12,
    textColor=GREEN,
)


# ─── カスタムFlowable ─────────────────────────────────
class SectionHeader(Flowable):
    """赤帯のセクションヘッダー"""
    def __init__(self, text, sub="", width=None):
        super().__init__()
        self.text = text
        self.sub = sub
        self._width = width or (W - 2 * MARGIN)
        self.height = 10 * mm
        self.spaceAfter = 4 * mm

    def draw(self):
        c = self.canv
        w = self._width
        c.setFillColor(RED)
        c.roundRect(0, 0, w, self.height, 2 * mm, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(FONT, 11)
        c.drawString(6 * mm, 3 * mm, self.text)
        if self.sub:
            c.setFont(FONT, 7)
            c.drawRightString(w - 6 * mm, 3.5 * mm, self.sub)


class RedLine(Flowable):
    """赤い装飾ライン"""
    def __init__(self, width=60 * mm):
        super().__init__()
        self._width = width
        self.height = 2 * mm

    def draw(self):
        c = self.canv
        c.setStrokeColor(RED)
        c.setLineWidth(1.5)
        x = (W - 2 * MARGIN - self._width) / 2
        c.line(x, 1 * mm, x + self._width, 1 * mm)


class DownArrow(Flowable):
    """下矢印"""
    def __init__(self):
        super().__init__()
        self.height = 5 * mm
        self.width = W - 2 * MARGIN

    def draw(self):
        c = self.canv
        cx = self.width / 2
        c.setFillColor(RED)
        p = c.beginPath()
        p.moveTo(cx - 4 * mm, self.height)
        p.lineTo(cx, 0)
        p.lineTo(cx + 4 * mm, self.height)
        p.close()
        c.drawPath(p, fill=1, stroke=0)


class FlowArrow(Flowable):
    """フロー図（5ステップ）"""
    def __init__(self):
        super().__init__()
        self.width = W - 2 * MARGIN
        self.height = 22 * mm

    def draw(self):
        c = self.canv
        steps = [
            ("Google検索 /", "Instagram", BG_LIGHT, GRAY),
            ("トップページ", "閲覧", BG_LIGHT, GRAY),
            ("バイク診断 /", "ルートマップ", BG_RED, RED),
            ("LINE登録 /", "メンテ予約", BG_GREEN, GREEN),
            ("来店 /", "購入", BG_BLUE, BLUE),
        ]
        n = len(steps)
        total_w = self.width
        arrow_w = 4 * mm
        gap = 2 * mm
        box_w = (total_w - (n - 1) * (arrow_w + gap * 2)) / n
        box_h = 14 * mm
        base_y = self.height - 2 * mm - box_h

        for i, (line1, line2, bg, fg) in enumerate(steps):
            x = i * (box_w + arrow_w + gap * 2)
            # ボックス
            c.setFillColor(bg)
            c.setStrokeColor(fg)
            c.setLineWidth(0.8)
            c.roundRect(x, base_y, box_w, box_h, 2.5 * mm, fill=1, stroke=1)
            # テキスト
            c.setFillColor(fg)
            c.setFont(FONT, 7.5)
            tw1 = pdfmetrics.stringWidth(line1, FONT, 7.5)
            tw2 = pdfmetrics.stringWidth(line2, FONT, 7.5)
            c.drawString(x + (box_w - tw1) / 2, base_y + box_h / 2 + 1 * mm, line1)
            c.drawString(x + (box_w - tw2) / 2, base_y + box_h / 2 - 4 * mm, line2)
            # 矢印
            if i < n - 1:
                ax = x + box_w + gap
                ay = base_y + box_h / 2
                c.setFillColor(LIGHT_GRAY)
                p = c.beginPath()
                p.moveTo(ax, ay + 2 * mm)
                p.lineTo(ax + arrow_w, ay)
                p.lineTo(ax, ay - 2 * mm)
                p.close()
                c.drawPath(p, fill=1, stroke=0)

        # 「新機能で強化」ラベル
        # 3番目ボックスの下
        bx = 2 * (box_w + arrow_w + gap * 2)
        c.setStrokeColor(RED)
        c.setLineWidth(1)
        label_y = base_y - 3 * mm
        c.line(bx, label_y, bx + box_w, label_y)
        c.setFillColor(RED)
        c.setFont(FONT, 7)
        tw = pdfmetrics.stringWidth("新機能で強化", FONT, 7)
        c.drawString(bx + (box_w - tw) / 2, label_y - 4 * mm, "新機能で強化")


# ─── ビルダー関数 ─────────────────────────────────────
def make_feature_block(num, title, before_text, after_text, effect_text, goal_text):
    """BEFORE / AFTER + 効果 + ゴール の機能ブロック"""
    content_w = W - 2 * MARGIN
    half_w = content_w * 0.48

    # 番号+タイトル行
    title_table = Table(
        [[Paragraph(num, styles["feature_num"]),
          Paragraph(title, styles["feature_title"])]],
        colWidths=[12 * mm, content_w - 12 * mm],
    )
    title_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    # BEFORE / AFTER 横並び
    before_content = [
        [Paragraph("BEFORE（旧サイト）", styles["label_gray"])],
        [Paragraph(before_text, styles["body_gray"])],
    ]
    before_tbl = Table(before_content, colWidths=[half_w - 6 * mm])
    before_tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (0, 0), 2 * mm),
        ("BOTTOMPADDING", (-1, -1), (-1, -1), 2 * mm),
    ]))

    after_content = [
        [Paragraph("AFTER（新機能）", styles["label_red"])],
        [Paragraph(after_text, styles["body_sm"])],
    ]
    after_tbl = Table(after_content, colWidths=[half_w - 6 * mm])
    after_tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (0, 0), 2 * mm),
        ("BOTTOMPADDING", (-1, -1), (-1, -1), 2 * mm),
    ]))

    ba_table = Table(
        [[before_tbl, after_tbl]],
        colWidths=[half_w, half_w],
        spaceBefore=2 * mm,
    )
    ba_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), HexColor("#efefef")),
        ("BACKGROUND", (1, 0), (1, 0), BG_RED),
        ("BOX", (1, 0), (1, 0), 0.5, RED),
        ("ROUNDEDCORNERS", [2 * mm, 2 * mm, 2 * mm, 2 * mm]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))

    # 効果ボックス
    effect_content = [
        [Paragraph("期待される効果", styles["label_blue"]),
         Paragraph(effect_text, styles["effect"])],
    ]
    effect_tbl = Table(effect_content, colWidths=[24 * mm, content_w - 24 * mm - 6 * mm])
    effect_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_BLUE),
        ("ROUNDEDCORNERS", [2 * mm, 2 * mm, 2 * mm, 2 * mm]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
    ]))

    # ゴールボックス
    goal_content = [
        [Paragraph("最終ゴール", styles["label_green"]),
         Paragraph(goal_text, styles["goal"])],
    ]
    goal_tbl = Table(goal_content, colWidths=[20 * mm, content_w - 20 * mm - 6 * mm])
    goal_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_GREEN),
        ("ROUNDEDCORNERS", [2 * mm, 2 * mm, 2 * mm, 2 * mm]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
    ]))

    return KeepTogether([
        title_table,
        ba_table,
        Spacer(1, 1.5 * mm),
        DownArrow(),
        Spacer(1, 1.5 * mm),
        effect_tbl,
        Spacer(1, 2 * mm),
        goal_tbl,
        Spacer(1, 6 * mm),
    ])


def header_footer(canvas_obj, doc):
    """全ページ共通のヘッダー・フッター"""
    c = canvas_obj
    page = doc.page

    if page == 1:
        # 表紙: 上部に赤帯のみ
        c.setFillColor(RED)
        c.rect(0, H - 6 * mm, W, 6 * mm, fill=1, stroke=0)
    else:
        # 2ページ目以降: 上部薄い赤帯 + ドキュメントタイトル
        c.setFillColor(RED)
        c.rect(0, H - 3 * mm, W, 3 * mm, fill=1, stroke=0)
        c.setFillColor(DARK)
        c.setFont(FONT, 7.5)
        c.drawString(MARGIN, H - 10 * mm, "cycleZ ウェブサイト 機能追加のご提案")
        c.setStrokeColor(HexColor("#e0e0e0"))
        c.setLineWidth(0.3)
        c.line(MARGIN, H - 12 * mm, W - MARGIN, H - 12 * mm)

    # フッター
    c.setStrokeColor(HexColor("#e0e0e0"))
    c.setLineWidth(0.3)
    c.line(MARGIN, 12 * mm, W - MARGIN, 12 * mm)
    c.setFillColor(LIGHT_GRAY)
    c.setFont(FONT, 7)
    c.drawString(MARGIN, 7 * mm, "cycleZ（サイクルゼット）  086-252-7744  cycle-z.com")
    c.drawRightString(W - MARGIN, 7 * mm, f"{page}")


def build_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
    )
    story = []
    content_w = W - 2 * MARGIN

    # ===== PAGE 1 =====
    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph("cycleZ ウェブサイト<br/>機能追加のご提案", styles["title"]))
    story.append(RedLine())
    story.append(Spacer(1, 2 * mm))
    story.append(Paragraph("ユーザー体験の向上と来店コンバージョン強化", styles["subtitle"]))
    story.append(Paragraph("2026年3月　cycleZ Web担当", styles["date"]))

    # 背景・課題
    story.append(SectionHeader("背景・課題", "WHY"))
    story.append(Spacer(1, 2 * mm))

    issues = [
        "現在のサイトは「情報を見る」だけの構造。ユーザーが能動的に参加できるコンテンツが少ない",
        "初めてサイトに来た人が「自分に合うバイクがわからない」まま離脱している可能性が高い",
        "競合（WAVE BIKES・Giant Store等）がコミュニティ機能やSNS連携を強化している",
        "LINE登録やメンテナンス予約への導線が弱く、来店前に接点を作れていない",
        "岡山のサイクリング情報が分散しており、cycleZが情報ハブになれていない",
    ]
    for issue in issues:
        story.append(Paragraph(
            f'<font color="#c41e3a">●</font>　{issue}',
            styles["bullet"]
        ))
    story.append(Spacer(1, 2 * mm))

    # 最終ゴール
    story.append(SectionHeader("最終ゴール", "GOAL"))
    story.append(Spacer(1, 2 * mm))
    goal_box = Table(
        [[Paragraph("サイト訪問 → LINE登録 / メンテナンス予約 → 来店", styles["center_bold"])],
         [Paragraph("「見るだけ」のサイトから「体験して、つながる」サイトへ転換する", styles["center_gray"])]],
        colWidths=[content_w - 8 * mm],
    )
    goal_box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_RED),
        ("BOX", (0, 0), (-1, -1), 0.5, RED),
        ("ROUNDEDCORNERS", [3 * mm, 3 * mm, 3 * mm, 3 * mm]),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
    ]))
    story.append(goal_box)
    story.append(Spacer(1, 3 * mm))

    # フロー図
    story.append(SectionHeader("ユーザー導線フロー", "USER FLOW"))
    story.append(Spacer(1, 2 * mm))
    story.append(FlowArrow())
    story.append(Spacer(1, 3 * mm))

    # 機能一覧サマリー
    story.append(SectionHeader("追加機能一覧（6項目）", "FEATURES"))
    story.append(Spacer(1, 2 * mm))

    summary_data = [
        [Paragraph("No.", styles["table_header"]),
         Paragraph("機能名", styles["table_header"]),
         Paragraph("狙い", styles["table_header"])],
        [Paragraph("01", styles["table_cell"]),
         Paragraph("バイク診断クイズ", styles["table_cell"]),
         Paragraph("初訪問者の離脱防止、自分ゴト化", styles["table_cell"])],
        [Paragraph("02", styles["table_cell"]),
         Paragraph("おすすめルートマップ", styles["table_cell"]),
         Paragraph("岡山の情報ハブとしてのポジション獲得", styles["table_cell"])],
        [Paragraph("03", styles["table_cell"]),
         Paragraph("メンテナンス予約フォーム", styles["table_cell"]),
         Paragraph("来店障壁を下げ、予約CVを獲得", styles["table_cell"])],
        [Paragraph("04", styles["table_cell"]),
         Paragraph("フローティングSNSボタン", styles["table_cell"]),
         Paragraph("全ページでSNS接点を確保", styles["table_cell"])],
        [Paragraph("05", styles["table_cell"]),
         Paragraph("背景動画セクション", styles["table_cell"]),
         Paragraph("サイトの没入感・ブランド体験を向上", styles["table_cell"])],
        [Paragraph("06", styles["table_cell"]),
         Paragraph("HOW TOタグクラウド", styles["table_cell"]),
         Paragraph("421記事の資産を活かし回遊率UP", styles["table_cell"])],
    ]
    summary_tbl = Table(summary_data, colWidths=[12 * mm, 48 * mm, content_w - 60 * mm - 4 * mm])
    summary_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        *[("BACKGROUND", (0, i), (-1, i), BG_LIGHT if i % 2 == 0 else WHITE) for i in range(1, 7)],
        ("ROUNDEDCORNERS", [2 * mm, 2 * mm, 2 * mm, 2 * mm]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, HexColor("#e0e0e0")),
    ]))
    story.append(summary_tbl)
    story.append(PageBreak())

    # ===== PAGE 2: 機能詳細 01-03 =====
    story.append(Spacer(1, 4 * mm))
    story.append(SectionHeader("機能詳細", "01 - 03"))
    story.append(Spacer(1, 4 * mm))

    story.append(make_feature_block(
        "01", "バイク診断クイズ（5問）",
        "初訪問者は「自分に合うバイクがわからない」状態。取扱ブランドページを見ても選べず、そのまま離脱。",
        "5つの質問に答えるだけで、最適なバイクタイプ（エントリー / エンデュランス / レーシング等）を診断。結果からブランド・試乗予約へ直結。",
        "初訪問者の「何を選べばいいかわからない」不安を解消 → 滞在時間UP・直帰率DOWN",
        "診断結果ページの「店舗で試乗する」ボタン → お問い合わせ or 来店",
    ))
    story.append(make_feature_block(
        "02", "おすすめルートマップ（地図連動）",
        "岡山のサイクリングコース情報がサイト上にない。情報を探すユーザーは他サイトへ流出。",
        "吉備路・旭川・蒜山高原・しまなみ海道の4コースを地図上に表示。距離・難易度・見どころを一覧で比較できる。",
        "「岡山 サイクリング コース」の検索流入を獲得 → cycleZが岡山の自転車情報ハブに",
        "コース情報で来店きっかけ作り → 「cycleZで相談してから走ろう」の導線構築",
    ))
    story.append(make_feature_block(
        "03", "メンテナンス予約フォーム（4ステップ）",
        "メンテナンスしたいが「電話が面倒」「営業時間内に連絡できない」→ 結局予約せず来店しない。",
        "メニュー選択 → 日時指定 → 顧客情報 → 確認の4ステップ。水曜定休は自動ブロック。24時間いつでも予約可能。",
        "電話ハードルの解消 → 夜間・休日の予約取りこぼしゼロへ。メンテ来店頻度の向上",
        "定期メンテナンス → パーツ購入 → 新車検討 のLTV向上サイクルを形成",
    ))
    story.append(PageBreak())

    # ===== PAGE 3: 機能詳細 04-06 =====
    story.append(Spacer(1, 4 * mm))
    story.append(SectionHeader("機能詳細", "04 - 06"))
    story.append(Spacer(1, 4 * mm))

    story.append(make_feature_block(
        "04", "フローティングSNSボタン（常時表示）",
        "SNSリンクはフッターにしかなく、スクロールしないとたどり着けない。接触機会が限定的。",
        "画面右下にInstagram・YouTube・LINEのボタンを常時フロート表示。どのページ・どのスクロール位置からでもワンタップで遷移。",
        "SNSフォロー率の向上（特にLINE登録）。全ページで接点を確保し、離脱前にキャッチ",
        "LINE友だち追加 → クーポン・イベント告知 → 来店リピート率の向上",
    ))
    story.append(make_feature_block(
        "05", "背景動画セクション（YouTube透過）",
        "静止画のみの画面構成。スクロールしても変化が少なく、ページ中盤で離脱されやすい。",
        "YouTubeをミュート自動再生で背景に埋め込み、半透明オーバーレイで重ねる。CTA・イベント・HOW TOなど計4箇所に配置。",
        "動きのある画面で離脱率を低減。実際のライド映像で「自分もやりたい」の感情を喚起",
        "没入感のあるブランド体験 → 「このお店なら楽しそう」→ 来店意欲を醸成",
    ))
    story.append(make_feature_block(
        "06", "HOW TO タグクラウド",
        "421記事のブログ資産があるが、トップページからの導線が弱く発見されにくい。",
        "「空気の入れ方」「チェーン洗浄」「輪行のやり方」など12個のタグをワンタップでアクセス。既存記事・新機能ページへ誘導。",
        "記事への回遊率UP → ページ / セッション数の増加 → SEO評価の底上げ",
        "HOW TO記事で信頼獲得 → 「ここに相談しよう」→ メンテ予約・来店へ転換",
    ))
    story.append(PageBreak())

    # ===== PAGE 4: まとめ =====
    story.append(Spacer(1, 4 * mm))
    story.append(SectionHeader("全体の狙い：離脱ポイントをつぶし、接点を増やす", "SUMMARY"))
    story.append(Spacer(1, 4 * mm))

    # まとめ表
    summary2 = [
        [Paragraph("離脱ポイント", styles["table_header"]),
         Paragraph("解決する機能", styles["table_header"]),
         Paragraph("期待効果", styles["table_header"])],
        [Paragraph("自分に合うバイクがわからない", styles["table_cell"]),
         Paragraph("バイク診断クイズ", styles["table_cell"]),
         Paragraph("滞在時間2倍、直帰率 -20%", styles["table_cell_green"])],
        [Paragraph("サイクリング情報が見つからない", styles["table_cell"]),
         Paragraph("ルートマップ", styles["table_cell"]),
         Paragraph("「岡山 サイクリング」検索1位", styles["table_cell_green"])],
        [Paragraph("電話予約が面倒", styles["table_cell"]),
         Paragraph("メンテ予約フォーム", styles["table_cell"]),
         Paragraph("予約数 +30%（夜間含む）", styles["table_cell_green"])],
        [Paragraph("SNSに気づかない", styles["table_cell"]),
         Paragraph("フローティングSNS", styles["table_cell"]),
         Paragraph("LINE登録率 +50%", styles["table_cell_green"])],
        [Paragraph("ページ中盤で飽きる", styles["table_cell"]),
         Paragraph("背景動画セクション", styles["table_cell"]),
         Paragraph("スクロール深度 +25%", styles["table_cell_green"])],
        [Paragraph("ブログ記事に到達しない", styles["table_cell"]),
         Paragraph("HOW TOタグクラウド", styles["table_cell"]),
         Paragraph("回遊率 +40%、PV/session +1.5", styles["table_cell_green"])],
    ]
    sum2_tbl = Table(summary2, colWidths=[50 * mm, 40 * mm, content_w - 90 * mm - 4 * mm])
    sum2_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), DARK),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        *[("BACKGROUND", (0, i), (-1, i), BG_LIGHT if i % 2 == 0 else WHITE) for i in range(1, 7)],
        ("ROUNDEDCORNERS", [2 * mm, 2 * mm, 2 * mm, 2 * mm]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, HexColor("#e0e0e0")),
    ]))
    story.append(sum2_tbl)
    story.append(Spacer(1, 6 * mm))

    # コンバージョン導線
    story.append(SectionHeader("コンバージョン導線の設計思想", "CONVERSION PATH"))
    story.append(Spacer(1, 4 * mm))

    paths = [
        ("#c41e3a", "診断クイズ → 結果ページ「店舗で試乗する」→ お問い合わせページ → 来店"),
        ("#2563eb", "ルートマップ → コース詳細 → 「出発前にcycleZでチェック」→ 来店"),
        ("#16a34a", "HOW TO記事 → メンテナンス予約フォーム → 24時間予約完了 → 来店"),
        ("#7c3aed", "全ページ → フローティングLINEボタン → LINE友だち追加 → イベント告知 → 来店"),
    ]
    for color, text in paths:
        story.append(Paragraph(
            f'<font color="{color}">●</font>　{text}',
            styles["bullet"],
        ))
    story.append(Spacer(1, 6 * mm))

    # 実装状況
    story.append(SectionHeader("実装状況", "STATUS"))
    story.append(Spacer(1, 4 * mm))
    status_box = Table(
        [[Paragraph("全6機能、ローカル環境で実装完了", styles["center_bold"])],
         [Paragraph("ご確認いただき、問題なければ本番環境（cycle-z.com）に反映いたします", styles["center_gray"])]],
        colWidths=[content_w - 8 * mm],
    )
    status_box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_GREEN),
        ("BOX", (0, 0), (-1, -1), 0.8, GREEN),
        ("ROUNDEDCORNERS", [3 * mm, 3 * mm, 3 * mm, 3 * mm]),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
    ]))
    story.append(status_box)
    story.append(Spacer(1, 6 * mm))

    # 注意書き
    story.append(Paragraph("※ 期待効果の数値は、同業界の導入事例・GA4データをもとにした推定値です", styles["note"]))
    story.append(Paragraph("※ 全機能は既存デザインに合わせて実装しており、サイトの統一感を損ないません", styles["note"]))
    story.append(Paragraph("※ 本番反映後、GA4・Clarityで効果測定し、改善サイクルを回していきます", styles["note"]))

    # ビルド
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f"PDF generated: {output_path}")


if __name__ == "__main__":
    output_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(output_dir, "cyclez_website_upgrade_proposal.pdf")
    build_pdf(output_path)
