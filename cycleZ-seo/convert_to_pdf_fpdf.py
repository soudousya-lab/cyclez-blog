#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from fpdf import FPDF
import re

class PDF(FPDF):
    def __init__(self):
        super().__init__()
        # 日本語フォントを追加（システムフォントを使用）
        self.add_font('NotoSansJP', '', '/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc', uni=True)
        self.add_font('NotoSansJP', 'B', '/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc', uni=True)

    def header(self):
        self.set_font('NotoSansJP', 'B', 10)
        self.set_text_color(196, 30, 58)
        self.cell(0, 10, 'cycleZ SEO分析レポート', 0, 1, 'R')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('NotoSansJP', '', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'- {self.page_no()} -', 0, 0, 'C')

    def chapter_title(self, title, level=1):
        if level == 1:
            self.set_font('NotoSansJP', 'B', 18)
            self.set_text_color(196, 30, 58)
            self.cell(0, 12, title, 0, 1, 'L')
            self.set_draw_color(196, 30, 58)
            self.set_line_width(0.8)
            self.line(10, self.get_y(), 200, self.get_y())
            self.ln(8)
        elif level == 2:
            self.set_font('NotoSansJP', 'B', 14)
            self.set_text_color(196, 30, 58)
            self.set_fill_color(196, 30, 58)
            self.rect(10, self.get_y(), 3, 8, 'F')
            self.set_x(15)
            self.cell(0, 8, title, 0, 1, 'L')
            self.ln(4)
        elif level == 3:
            self.set_font('NotoSansJP', 'B', 12)
            self.set_text_color(51, 51, 51)
            self.cell(0, 8, title, 0, 1, 'L')
            self.ln(2)

    def body_text(self, text):
        self.set_font('NotoSansJP', '', 10)
        self.set_text_color(51, 51, 51)
        self.multi_cell(0, 6, text)
        self.ln(3)

    def bullet_point(self, text):
        self.set_font('NotoSansJP', '', 10)
        self.set_text_color(51, 51, 51)
        self.set_x(15)
        self.multi_cell(0, 6, f'• {text}')

    def add_table(self, headers, data):
        self.set_font('NotoSansJP', 'B', 9)
        col_width = (self.w - 20) / len(headers)

        # ヘッダー
        self.set_fill_color(196, 30, 58)
        self.set_text_color(255, 255, 255)
        for header in headers:
            self.cell(col_width, 8, header, 1, 0, 'C', True)
        self.ln()

        # データ
        self.set_font('NotoSansJP', '', 9)
        self.set_text_color(51, 51, 51)
        fill = False
        for row in data:
            if fill:
                self.set_fill_color(249, 249, 249)
            else:
                self.set_fill_color(255, 255, 255)
            for item in row:
                self.cell(col_width, 7, str(item), 1, 0, 'L', True)
            self.ln()
            fill = not fill
        self.ln(5)

# PDFを作成
pdf = PDF()
pdf.add_page()

# タイトル
pdf.set_font('NotoSansJP', 'B', 24)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 20, 'cycleZ（サイクルゼット）', 0, 1, 'C')
pdf.set_font('NotoSansJP', 'B', 18)
pdf.cell(0, 10, 'SEO分析・競合調査レポート', 0, 1, 'C')
pdf.ln(10)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 6, '調査日: 2026年1月31日', 0, 1, 'C')
pdf.cell(0, 6, '調査対象: cycleZ（サイクルゼット）- 岡山市北区島田本町1-1-47', 0, 1, 'C')
pdf.cell(0, 6, 'URL: https://cycle-z.com/', 0, 1, 'C')
pdf.ln(15)

# 1. エグゼクティブサマリー
pdf.chapter_title('1. エグゼクティブサマリー', 1)

pdf.chapter_title('総合評価: 62点/100点', 3)

pdf.add_table(
    ['評価項目', 'スコア', '判定'],
    [
        ['ローカルSEO（Googleマップ）', '85/100', '優秀'],
        ['自然検索SEO', '40/100', '要改善'],
        ['コンテンツ充実度', '45/100', '要改善'],
        ['テクニカルSEO', '55/100', '要改善'],
        ['Googleビジネスプロフィール', '90/100', '優秀'],
    ]
)

pdf.chapter_title('主な発見事項', 3)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(0, 128, 0)
pdf.cell(0, 6, '【強み】', 0, 1)
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('Googleマップ検索で「岡山 ロードバイク」1位')
pdf.bullet_point('口コミ評価4.6（72件）で地域トップクラス')
pdf.bullet_point('「初心者・女性向け」という明確な差別化')
pdf.ln(3)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(255, 0, 0)
pdf.cell(0, 6, '【致命的な課題】', 0, 1)
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('meta descriptionが未設定')
pdf.bullet_point('自然検索（オーガニック）で圏外')
pdf.bullet_point('ブログ/コラムコンテンツが不足')
pdf.ln(5)

# 2. 勢力図
pdf.add_page()
pdf.chapter_title('2. 岡山市ロードバイクショップ勢力図', 1)

pdf.body_text('岡山市のロードバイクショップ市場は、以下のように4つのポジションに分類できます。')
pdf.ln(5)

# 勢力図を表で表現
pdf.chapter_title('市場ポジショニング', 3)

pdf.add_table(
    ['ポジション', '店舗名', '特徴'],
    [
        ['競技志向・上級者向け', 'BPSなかやま', 'レースチーム運営、ブログ充実'],
        ['競技志向・上級者向け', 'WAVE BIKES', '岡山・香川で最大規模、3店舗'],
        ['初心者・カジュアル向け', 'cycleZ', '初心者講習会、女性向けサービス'],
        ['価格重視', 'サイクルセンター岡山', '低価格、他店購入車も対応'],
        ['フィールド重視', 'cycle shop Freedom', 'MTBにも強い、好立地'],
    ]
)

pdf.chapter_title('競合5社の比較表', 3)

pdf.add_table(
    ['店舗名', 'Google評価', '口コミ数', 'ECサイト', 'ブログ'],
    [
        ['cycleZ', '4.6', '72件', '×', '△'],
        ['WAVE BIKES', '4.6', '多数', '○', '○'],
        ['BPSなかやま', '4.6', '89件', '○', '○'],
        ['cycle shop Freedom', '-', '-', '×', '○'],
        ['サイクルセンター岡山', '3.0', '98件', '×', '×'],
    ]
)

pdf.chapter_title('cycleZの勝てるポジション', 3)
pdf.body_text('「ガチ勢向けショップは怖い...」という初心者の心理的バリアを取り除く「初心者のためのサイクルショップ」というポジションを明確に打ち出すことで差別化可能。')

# 3. 検索順位調査結果
pdf.add_page()
pdf.chapter_title('3. 検索順位調査結果', 1)

pdf.chapter_title('主要キーワード順位（2026年1月31日時点）', 3)

pdf.add_table(
    ['キーワード', 'ローカルパック', '自然検索', '備考'],
    [
        ['cycleZ 岡山', '1位', '1位', 'ブランド検索は良好'],
        ['岡山 ロードバイク', '1位', '圏外', '重要KW、改善必要'],
        ['岡山市 ロードバイク ショップ', '1位', '圏外', '改善必要'],
        ['岡山 ロードバイク 初心者', '-', '1位', '強み！'],
    ]
)

pdf.body_text('【問題点】ローカルパックでは1位だが、自然検索では競合に大きく負けている。自然検索上位は cycle shop Freedom、WAVE BIKES、BPSなかやま など。')

# 4. サイトSEO診断
pdf.add_page()
pdf.chapter_title('4. cycleZサイトSEO診断', 1)

pdf.chapter_title('テクニカルSEO診断結果', 3)

pdf.add_table(
    ['項目', '状態', '評価', '優先度'],
    [
        ['SSL（HTTPS）', '対応済み', '良好', '-'],
        ['モバイル対応', '対応済み', '良好', '-'],
        ['canonical URL', '設定済み', '良好', '-'],
        ['meta description', '未設定', '致命的', '最優先'],
        ['OG description', '未設定', '問題あり', '高'],
        ['OG image', 'デフォルト画像', '問題あり', '高'],
        ['構造化データ', 'BreadcrumbListのみ', '改善余地', '中'],
    ]
)

pdf.chapter_title('コンテンツ診断', 3)

pdf.add_table(
    ['項目', '現状', '問題点'],
    [
        ['トップページ文字数', '約140語', '少なすぎる（最低500語推奨）'],
        ['ブログ記事', 'イベント告知のみ', 'SEO効果のある記事がない'],
        ['イベントレポート', '2023年で更新停止', '古い印象を与える'],
        ['内部リンク数', '97件', '良好'],
    ]
)

# 5. アクションプラン
pdf.add_page()
pdf.chapter_title('5. アクションプラン', 1)

pdf.chapter_title('Phase 1: 緊急対応（今週中）', 2)

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '1-1. meta descriptionの設定 【最優先】', 0, 1)
pdf.set_text_color(51, 51, 51)
pdf.set_font('NotoSansJP', '', 10)
pdf.body_text('推奨文（120文字以内）:')
pdf.body_text('「岡山駅徒歩5分のロードバイク専門店cycleZ。初心者・女性向けの無料講習会を毎月開催。カウンセリング接客でお客様に合った一台をご提案。☎086-252-7744」')

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '1-2. OG画像の変更 【優先度:高】', 0, 1)
pdf.set_text_color(51, 51, 51)
pdf.set_font('NotoSansJP', '', 10)
pdf.body_text('現状: noimg.png（デフォルト画像）→ 店舗外観または女性サイクリストの写真（1200x630px）に変更。SNSでシェアされた際の印象が大幅に改善。')

pdf.chapter_title('Phase 2: 短期施策（1ヶ月以内）', 2)

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '2-1. ブログ記事の作成開始 【SEO効果:大】', 0, 1)
pdf.set_text_color(51, 51, 51)
pdf.set_font('NotoSansJP', '', 10)
pdf.body_text('目標: 月2〜4記事')
pdf.body_text('おすすめ記事テーマ:')
pdf.bullet_point('岡山のおすすめサイクリングコース5選')
pdf.bullet_point('ロードバイク初心者が最初に揃えるべきアイテム10選')
pdf.bullet_point('女性がロードバイクを始めるときの完全ガイド')
pdf.bullet_point('ロードバイクとクロスバイクの違い｜選び方ガイド')

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '2-2. お客様の声ページの作成', 0, 1)
pdf.set_text_color(51, 51, 51)
pdf.set_font('NotoSansJP', '', 10)
pdf.body_text('「社会的証明」効果で来店への心理的ハードルを下げる。初心者から始めた方、女性ライダー、通勤利用者の声を掲載。')

pdf.chapter_title('Phase 3: 中期施策（3ヶ月以内）', 2)
pdf.bullet_point('取扱ブランド・試乗車一覧ページ作成')
pdf.bullet_point('FAQ（よくある質問）ページ作成 → 構造化データでリッチスニペット獲得')
pdf.bullet_point('イベントレポートの更新（2023年で止まっている）')

pdf.chapter_title('Phase 4: 長期施策（6ヶ月〜）', 2)
pdf.bullet_point('Googleビジネスプロフィールに週1回投稿')
pdf.bullet_point('YouTubeチャンネル強化（メンテナンス方法、コース紹介等）')
pdf.bullet_point('SNS連携強化（Instagram埋め込み、LINE公式アカウント）')

# 6. まとめ
pdf.add_page()
pdf.chapter_title('6. まとめ', 1)

pdf.chapter_title('改善後の期待効果', 3)

pdf.add_table(
    ['指標', '現状', '3ヶ月後目標', '6ヶ月後目標'],
    [
        ['「岡山 ロードバイク」自然検索', '圏外', '10位以内', '5位以内'],
        ['月間サイト訪問者数', '推定500PV', '1,500PV', '3,000PV'],
        ['問い合わせ数', '-', '+30%', '+50%'],
    ]
)

pdf.chapter_title('今すぐ始めるべき3つのこと', 3)

pdf.set_fill_color(255, 245, 245)
pdf.set_draw_color(196, 30, 58)
pdf.rect(10, pdf.get_y(), 190, 50, 'D')
pdf.set_xy(15, pdf.get_y() + 5)

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '1. meta descriptionを設定する【所要時間：5分】', 0, 1)
pdf.set_x(20)
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 6, '→ Google検索結果での表示が改善', 0, 1)

pdf.set_x(15)
pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '2. ブログ記事を月2本ペースで書く【継続的】', 0, 1)
pdf.set_x(20)
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 6, '→ 「岡山 ロードバイク」で上位表示を狙う', 0, 1)

pdf.set_x(15)
pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '3. Googleビジネスプロフィールに週1回投稿【継続的】', 0, 1)
pdf.set_x(20)
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 6, '→ ローカルSEOをさらに強化', 0, 1)

pdf.ln(20)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 6, 'レポート作成: 2026年1月31日', 0, 1, 'C')
pdf.cell(0, 6, '次回レビュー推奨: 2026年4月（3ヶ月後）', 0, 1, 'C')

# PDFを保存
pdf.output('/Users/soudousya/cycleZ-seo/cycleZ_SEO分析レポート.pdf')
print("PDF作成完了: /Users/soudousya/cycleZ-seo/cycleZ_SEO分析レポート.pdf")
