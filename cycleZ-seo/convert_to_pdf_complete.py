#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from fpdf import FPDF

class PDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_font('NotoSansJP', '', '/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc')
        self.add_font('NotoSansJP', 'B', '/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc')

    def header(self):
        self.set_font('NotoSansJP', 'B', 10)
        self.set_text_color(196, 30, 58)
        self.cell(0, 10, 'cycleZ SEO分析レポート【総合版】', new_x='LMARGIN', new_y='NEXT', align='R')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('NotoSansJP', '', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'- {self.page_no()} -', align='C')

    def chapter_title(self, title, level=1):
        if level == 1:
            self.set_font('NotoSansJP', 'B', 18)
            self.set_text_color(196, 30, 58)
            self.cell(0, 12, title, new_x='LMARGIN', new_y='NEXT')
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
            self.cell(0, 8, title, new_x='LMARGIN', new_y='NEXT')
            self.ln(4)
        elif level == 3:
            self.set_font('NotoSansJP', 'B', 12)
            self.set_text_color(51, 51, 51)
            self.cell(0, 8, title, new_x='LMARGIN', new_y='NEXT')
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

    def add_table(self, headers, data, col_widths=None):
        self.set_font('NotoSansJP', 'B', 9)
        if col_widths is None:
            col_widths = [(self.w - 20) / len(headers)] * len(headers)

        # ヘッダー
        self.set_fill_color(196, 30, 58)
        self.set_text_color(255, 255, 255)
        for i, header in enumerate(headers):
            self.cell(col_widths[i], 8, header, 1, 0, 'C', True)
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
            for i, item in enumerate(row):
                self.cell(col_widths[i], 7, str(item), 1, 0, 'L', True)
            self.ln()
            fill = not fill
        self.ln(5)

    def highlight_box(self, text, color='red'):
        if color == 'red':
            self.set_fill_color(255, 240, 240)
            self.set_draw_color(196, 30, 58)
        elif color == 'green':
            self.set_fill_color(240, 255, 240)
            self.set_draw_color(0, 128, 0)
        elif color == 'blue':
            self.set_fill_color(240, 248, 255)
            self.set_draw_color(0, 100, 200)

        self.set_font('NotoSansJP', '', 10)
        self.set_text_color(51, 51, 51)
        y_start = self.get_y()
        self.set_x(15)
        self.multi_cell(180, 6, text)
        y_end = self.get_y()
        self.rect(10, y_start - 2, 190, y_end - y_start + 4, 'D')
        self.ln(5)

# PDFを作成
pdf = PDF()
pdf.add_page()

# タイトル
pdf.set_font('NotoSansJP', 'B', 24)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 20, 'cycleZ（サイクルゼット）', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.set_font('NotoSansJP', 'B', 18)
pdf.cell(0, 10, 'SEO分析・競合調査レポート【総合版】', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.ln(10)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 6, '調査日: 2026年1月31日', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.cell(0, 6, '調査対象: cycleZ（サイクルゼット）- 岡山市北区島田本町1-1-47', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.cell(0, 6, 'URL: https://cycle-z.com/', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.ln(10)

# 目次
pdf.set_font('NotoSansJP', 'B', 12)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 8, '【目次】', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 10)
pdf.cell(0, 6, '1. エグゼクティブサマリー', new_x='LMARGIN', new_y='NEXT')
pdf.cell(0, 6, '2. 岡山市ロードバイクショップ勢力図', new_x='LMARGIN', new_y='NEXT')
pdf.cell(0, 6, '3. 検索順位調査結果', new_x='LMARGIN', new_y='NEXT')
pdf.cell(0, 6, '4. 【図解】ローカルパックと自然検索の違い', new_x='LMARGIN', new_y='NEXT')
pdf.cell(0, 6, '5. cycleZサイトSEO診断', new_x='LMARGIN', new_y='NEXT')
pdf.cell(0, 6, '6. 【図解】meta description未設定のデメリット', new_x='LMARGIN', new_y='NEXT')
pdf.cell(0, 6, '7. 競合と比較して足りないコンテンツ', new_x='LMARGIN', new_y='NEXT')
pdf.cell(0, 6, '8. アクションプラン', new_x='LMARGIN', new_y='NEXT')
pdf.cell(0, 6, '9. まとめ', new_x='LMARGIN', new_y='NEXT')
pdf.ln(5)

# 1. エグゼクティブサマリー
pdf.add_page()
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
pdf.cell(0, 6, '【強み】', new_x='LMARGIN', new_y='NEXT')
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('Googleマップ検索で「岡山 ロードバイク」1位')
pdf.bullet_point('口コミ評価4.6（72件）で地域トップクラス')
pdf.bullet_point('「初心者・女性向け」という明確な差別化')
pdf.bullet_point('「岡山 ロードバイク 初心者」で自然検索1位')
pdf.ln(3)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(255, 0, 0)
pdf.cell(0, 6, '【致命的な課題】', new_x='LMARGIN', new_y='NEXT')
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('meta descriptionが未設定 → 検索結果の説明文をコントロールできていない')
pdf.bullet_point('「岡山 ロードバイク」の自然検索で圏外（10位以下）')
pdf.bullet_point('ブログ/コラムコンテンツが不足 → サイトの情報量が競合に負けている')
pdf.ln(5)

# 2. 勢力図
pdf.add_page()
pdf.chapter_title('2. 岡山市ロードバイクショップ勢力図', 1)

pdf.body_text('岡山市のロードバイクショップ市場は、以下のように4つのポジションに分類できます。')
pdf.ln(3)

pdf.chapter_title('市場ポジショニングマップ', 3)

pdf.set_font('NotoSansJP', '', 9)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(0, 5, '''
【競技志向・上級者向け】
    BPSなかやま（評価4.6/89件）... レースチーム運営、ブログ充実
    WAVE BIKES（評価4.6/複数店舗）... 岡山・香川で最大規模

【初心者・カジュアル向け】← cycleZの主戦場
    cycleZ（評価4.6/72件）... 初心者講習会、女性向けサービス

【価格重視】
    サイクルセンター岡山（評価3.0/98件）... 低価格、他店購入車も対応

【フィールド重視】
    cycle shop Freedom ... MTBにも強い、好立地
''')
pdf.ln(3)

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
pdf.highlight_box('「ガチ勢向けショップは怖い...」という初心者の心理的バリアを取り除く\n「初心者のためのサイクルショップ」というポジションを明確に打ち出すことで差別化可能。', 'blue')

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

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(255, 0, 0)
pdf.cell(0, 8, '【重大な問題点】', new_x='LMARGIN', new_y='NEXT')
pdf.set_text_color(51, 51, 51)
pdf.set_font('NotoSansJP', '', 10)
pdf.body_text('ローカルパック（地図表示）では1位だが、自然検索では競合に大きく負けている。')
pdf.body_text('「岡山 ロードバイク」自然検索の上位サイト:')
pdf.bullet_point('1位: cycle shop Freedom（livfre.jp）')
pdf.bullet_point('2位: WAVE BIKES（wavebikes.jp）')
pdf.bullet_point('3位: サイクルスタート（ポータルサイト）')
pdf.bullet_point('4位: BICYCLE PRO SHOP なかやま')
pdf.bullet_point('... cycleZは10位以下（圏外）')

# 4. 【図解】ローカルパックと自然検索の違い
pdf.add_page()
pdf.chapter_title('4.【図解】ローカルパックと自然検索の違い', 1)

pdf.body_text('Google検索結果には「2つの全く別のエリア」があります。これを理解することが重要です。')
pdf.ln(3)

pdf.chapter_title('検索結果画面の構成', 3)

pdf.set_font('NotoSansJP', '', 9)
pdf.set_draw_color(100, 100, 100)

# ローカルパックの説明ボックス
pdf.set_fill_color(230, 255, 230)
pdf.rect(10, pdf.get_y(), 90, 55, 'DF')
pdf.set_xy(12, pdf.get_y() + 2)
pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(0, 128, 0)
pdf.cell(0, 6, '【ローカルパック】', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(12)
pdf.set_font('NotoSansJP', '', 9)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(85, 5, '地図付きの「場所」エリア\n\n1位: cycleZ ⭐4.6\n2位: サイクルセンター\n3位: BPSなかやま\n\n→ cycleZは1位！OK')

# 自然検索の説明ボックス
pdf.set_xy(105, pdf.get_y() - 55)
pdf.set_fill_color(255, 230, 230)
pdf.rect(105, pdf.get_y(), 95, 55, 'DF')
pdf.set_xy(107, pdf.get_y() + 2)
pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(255, 0, 0)
pdf.cell(0, 6, '【自然検索（オーガニック）】', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(107)
pdf.set_font('NotoSansJP', '', 9)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(90, 5, '通常のWebサイト一覧\n\n1位: Freedom\n2位: WAVE BIKES\n3位: ポータルサイト\n...\ncycleZは圏外！問題')

pdf.ln(60)

pdf.chapter_title('それぞれ何で順位が決まる？', 3)

pdf.add_table(
    ['項目', 'ローカルパック', '自然検索'],
    [
        ['何が表示される？', '地図+店舗3件', 'Webサイト一覧'],
        ['順位決定要因', 'Googleマイビジネス評価', 'サイトのコンテンツ量・質'],
        ['cycleZの順位', '1位 ✓', '圏外 ✗'],
        ['改善に必要なこと', '口コミを増やす', 'ブログ記事を書く'],
    ],
    [47, 47, 47, 47]
)

pdf.chapter_title('なぜ自然検索が重要なのか？', 3)

pdf.body_text('「岡山 ロードバイク」で検索する人の目的は2種類あります:')
pdf.ln(2)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.bullet_point('① 今すぐ店に行きたい人 → ローカルパック（地図）を見る')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_x(20)
pdf.cell(0, 6, '「近くの店どこかな？」', new_x='LMARGIN', new_y='NEXT')
pdf.ln(2)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.bullet_point('② 情報収集したい人 → 自然検索を見る ← こっちが多い！')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_x(20)
pdf.cell(0, 6, '「岡山でロードバイク始めるには？」「どの店がいいかな？」', new_x='LMARGIN', new_y='NEXT')

pdf.ln(5)
pdf.highlight_box('情報収集したい人がスクロールして自然検索を見たとき、\ncycleZは表示されない → 存在すら知られない', 'red')

# 5. サイトSEO診断
pdf.add_page()
pdf.chapter_title('5. cycleZサイトSEO診断', 1)

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

# 6. 【図解】meta description未設定のデメリット
pdf.add_page()
pdf.chapter_title('6.【図解】meta description未設定のデメリット', 1)

pdf.body_text('meta descriptionとは、Google検索結果に表示される「説明文」のことです。')
pdf.ln(3)

pdf.chapter_title('【実例】cycleZの現在の検索結果', 3)

pdf.set_fill_color(255, 245, 245)
pdf.set_draw_color(200, 200, 200)
pdf.rect(10, pdf.get_y(), 190, 35, 'DF')
pdf.set_xy(12, pdf.get_y() + 3)
pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(26, 13, 171)
pdf.cell(0, 6, 'CycleZ（サイクルゼット）岡山駅すぐのロードバイク...', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(12)
pdf.set_font('NotoSansJP', '', 9)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(185, 5, '岡山にあるロードバイク・クロスバイク・スポーツ自転車・サイクルウェアを楽しめる\nサイクルショップ. 営業時間【11：00〜19：00】定休日：水曜日. 〒700-0033 岡山県岡山...')

pdf.ln(40)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(255, 0, 0)
pdf.cell(0, 6, '【問題点】', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('Googleがページ内のテキストを「勝手に抜き出して」表示している')
pdf.bullet_point('「営業時間」「住所」など事務的な情報が目立つ')
pdf.bullet_point('cycleZの強み（初心者歓迎、女性向け、無料講習会）が全く伝わらない')
pdf.ln(5)

pdf.chapter_title('【比較】競合WAVE BIKESの検索結果', 3)

pdf.set_fill_color(240, 255, 240)
pdf.set_draw_color(200, 200, 200)
pdf.rect(10, pdf.get_y(), 190, 35, 'DF')
pdf.set_xy(12, pdf.get_y() + 3)
pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(26, 13, 171)
pdf.cell(0, 6, 'WAVE BIKES 岡山店｜岡山・香川でロードバイク', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(12)
pdf.set_font('NotoSansJP', '', 9)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(185, 5, '岡山県初の『TREK』コンセプトストア。TREK専門店としてバイクはもちろん\nアクセサリーやグッズも豊富に展示致しております。ロードバイク、クロスバイク...')

pdf.ln(40)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(0, 128, 0)
pdf.cell(0, 6, '【良い点】', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('「岡山県初」「TREK専門店」という差別化ポイントが明確')
pdf.bullet_point('「豊富に展示」で品揃えの良さをアピール')
pdf.bullet_point('訪問したくなる具体的な魅力が伝わる')
pdf.ln(5)

pdf.chapter_title('ユーザー心理への影響（行動経済学的視点）', 3)

pdf.body_text('初心者女性が「岡山 ロードバイク」で検索した場合:')
pdf.ln(2)
pdf.highlight_box('cycleZの説明を見て →「普通の自転車屋さんかな...ガチ勢向けかも...」\nWAVE BIKESの説明を見て →「TREK専門店！品揃え良さそう！」\n\n結果：WAVE BIKESをクリック', 'red')

pdf.body_text('クリック率（CTR）の差:')
pdf.bullet_point('meta description未設定: CTR 約2〜3%')
pdf.bullet_point('meta description最適化: CTR 約5〜8%（2〜3倍に改善可能）')

pdf.add_page()
pdf.chapter_title('cycleZが設定すべきmeta description', 3)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(255, 0, 0)
pdf.cell(0, 6, '【現状】Googleが勝手に生成した文章', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 9)
pdf.set_text_color(100, 100, 100)
pdf.multi_cell(0, 5, '岡山にあるロードバイク・クロスバイク・スポーツ自転車・サイクルウェアを楽しめる\nサイクルショップ. 営業時間【11：00〜19：00】定休日：水曜日...')
pdf.ln(3)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(0, 128, 0)
pdf.cell(0, 6, '【改善案】cycleZの強みが伝わる文章', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.highlight_box('岡山駅徒歩5分のロードバイク専門店。初心者・女性の方も安心！\n毎月無料の初心者講習会を開催中。カウンセリング接客であなたにぴったりの\n一台をご提案します。おしゃれなウェアも豊富。☎086-252-7744', 'green')

pdf.body_text('この文章で伝わること:')
pdf.bullet_point('✓ 初心者OK（心理的ハードルを下げる）')
pdf.bullet_point('✓ 女性歓迎（ターゲットに刺さる）')
pdf.bullet_point('✓ 無料講習会（来店のきっかけ）')
pdf.bullet_point('✓ カウンセリング接客（差別化）')
pdf.bullet_point('✓ おしゃれなウェア（独自の強み）')

pdf.ln(5)
pdf.set_font('NotoSansJP', 'B', 12)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, 'meta description未設定は「店の看板がない」のと同じ', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.body_text('・未設定 = 看板に「自転車屋 営業中」とだけ書いてある')
pdf.body_text('・最適化 = 看板に「初心者・女性大歓迎！無料講習会開催中」と書いてある')
pdf.body_text('設定は5分で完了します。WordPressならYoast SEOプラグインで簡単に設定可能。')

# 7. 競合と比較して足りないコンテンツ
pdf.add_page()
pdf.chapter_title('7. 競合と比較して足りないコンテンツ', 1)

pdf.body_text('なぜcycleZは自然検索で圏外なのか？答えは「サイトの情報量が圧倒的に少ない」からです。')
pdf.ln(3)

pdf.chapter_title('競合サイトのコンテンツ量比較', 3)

pdf.add_table(
    ['コンテンツ', 'Freedom', 'WAVE BIKES', 'BPSなかやま', 'cycleZ'],
    [
        ['ブログ記事（月間）', '4〜5本', '10本以上', '8〜10本', 'ほぼ0'],
        ['初心者向け記事', 'あり', 'あり', 'あり', 'なし'],
        ['商品紹介記事', 'あり', '大量', '大量', 'なし'],
        ['コース紹介', 'あり', 'あり', 'あり', 'なし'],
        ['お客様の声', 'なし', 'あり', 'なし', 'なし'],
        ['FAQ', 'なし', 'あり', 'なし', 'なし'],
    ],
    [40, 32, 35, 40, 40]
)

pdf.chapter_title('Googleの判断基準', 3)

pdf.set_fill_color(240, 248, 255)
pdf.set_draw_color(0, 100, 200)
pdf.rect(10, pdf.get_y(), 90, 40, 'DF')
pdf.set_xy(12, pdf.get_y() + 3)
pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(0, 100, 200)
pdf.cell(0, 6, '【競合サイトの評価】', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(12)
pdf.set_font('NotoSansJP', '', 9)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(85, 5, '「このサイトは"岡山 ロードバイク"\nについて詳しい情報がたくさんある」\n\n→ 検索上位に表示')

pdf.set_xy(105, pdf.get_y() - 40)
pdf.set_fill_color(255, 240, 240)
pdf.set_draw_color(200, 0, 0)
pdf.rect(105, pdf.get_y(), 95, 40, 'DF')
pdf.set_xy(107, pdf.get_y() + 3)
pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(200, 0, 0)
pdf.cell(0, 6, '【cycleZの評価】', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(107)
pdf.set_font('NotoSansJP', '', 9)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(90, 5, '「このサイトは情報が少ない」\n\n→ 検索上位に表示しない')

pdf.ln(45)

pdf.ln(5)
pdf.chapter_title('cycleZのサイト構成（現状）', 3)
pdf.bullet_point('トップページ（140文字程度）')
pdf.bullet_point('イベント告知ページ')
pdf.bullet_point('店舗情報ページ')
pdf.ln(2)
pdf.body_text('たったこれだけ。読み物コンテンツがほぼゼロ。')

pdf.chapter_title('今すぐ作るべき記事（優先度順）', 3)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 6, '1.「岡山 ロードバイク 初心者」で1位を強化する記事', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('「ロードバイク初心者が最初に買うべきもの10選」')
pdf.bullet_point('「初めてのロードバイク、予算別おすすめ」')
pdf.bullet_point('「初心者講習会に参加したお客様の声」')
pdf.ln(2)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 6, '2.「岡山 ロードバイク」で上位を狙う記事', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('「岡山のおすすめサイクリングコース5選」')
pdf.bullet_point('「岡山駅周辺でロードバイクを始めるならcycleZ」')
pdf.bullet_point('「岡山でロードバイクを買うときの店選びのポイント」')
pdf.ln(2)

pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 6, '3. 女性向け記事（cycleZの強みを活かす）', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.bullet_point('「女性がロードバイクを始めるときの完全ガイド」')
pdf.bullet_point('「おしゃれなサイクルウェアの選び方」')

# 8. アクションプラン
pdf.add_page()
pdf.chapter_title('8. アクションプラン', 1)

pdf.chapter_title('Phase 1: 緊急対応（今週中）', 2)

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '1-1. meta descriptionの設定 【最優先・5分で完了】', new_x='LMARGIN', new_y='NEXT')
pdf.set_text_color(51, 51, 51)
pdf.set_font('NotoSansJP', '', 10)
pdf.body_text('推奨文（120文字以内）:')
pdf.highlight_box('岡山駅徒歩5分のロードバイク専門店cycleZ。初心者・女性向けの無料講習会を\n毎月開催。カウンセリング接客でお客様に合った一台をご提案。☎086-252-7744', 'green')

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '1-2. OG画像の変更 【優先度:高】', new_x='LMARGIN', new_y='NEXT')
pdf.set_text_color(51, 51, 51)
pdf.set_font('NotoSansJP', '', 10)
pdf.body_text('現状: noimg.png（デフォルト画像）→ 店舗外観または女性サイクリストの写真（1200x630px）に変更。SNSでシェアされた際の印象が大幅に改善。')

pdf.chapter_title('Phase 2: 短期施策（1ヶ月以内）', 2)

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '2-1. ブログ記事の作成開始 【SEO効果:最大】', new_x='LMARGIN', new_y='NEXT')
pdf.set_text_color(51, 51, 51)
pdf.set_font('NotoSansJP', '', 10)
pdf.body_text('目標: 月2〜4記事')
pdf.body_text('おすすめ記事テーマ:')
pdf.bullet_point('岡山のおすすめサイクリングコース5選')
pdf.bullet_point('ロードバイク初心者が最初に揃えるべきアイテム10選')
pdf.bullet_point('女性がロードバイクを始めるときの完全ガイド')
pdf.bullet_point('ロードバイクとクロスバイクの違い｜選び方ガイド')
pdf.ln(2)

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '2-2. お客様の声ページの作成', new_x='LMARGIN', new_y='NEXT')
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

# 9. まとめ
pdf.add_page()
pdf.chapter_title('9. まとめ', 1)

pdf.chapter_title('現状の整理', 3)

pdf.add_table(
    ['項目', 'ローカルパック', '自然検索'],
    [
        ['cycleZの順位', '1位 ✓', '圏外 ✗'],
        ['何で決まる？', 'Googleマイビジネス評価', 'サイトのコンテンツ量'],
        ['今足りないもの', '特になし', 'ブログ記事、情報コンテンツ'],
    ]
)

pdf.body_text('要するに:')
pdf.bullet_point('ローカルパック → 口コミ頑張ってる、OK')
pdf.bullet_point('自然検索 → サイトに読み物が全然ないから圏外')

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
pdf.rect(10, pdf.get_y(), 190, 55, 'D')
pdf.set_xy(15, pdf.get_y() + 5)

pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '1. meta descriptionを設定する【所要時間：5分】', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(20)
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 6, '→ Google検索結果での表示が改善', new_x='LMARGIN', new_y='NEXT')

pdf.set_x(15)
pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '2. ブログ記事を月2本ペースで書く【継続的】', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(20)
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 6, '→ 「岡山 ロードバイク」で上位表示を狙う', new_x='LMARGIN', new_y='NEXT')

pdf.set_x(15)
pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '3. Googleビジネスプロフィールに週1回投稿【継続的】', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(20)
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 6, '→ ローカルSEOをさらに強化', new_x='LMARGIN', new_y='NEXT')

pdf.ln(25)

pdf.set_font('NotoSansJP', 'B', 12)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '月2〜4本のブログ記事を書き始めれば、', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.cell(0, 8, '3〜6ヶ月で自然検索順位の大幅な改善が見込めます。', new_x='LMARGIN', new_y='NEXT', align='C')

pdf.ln(10)
pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 6, 'レポート作成: 2026年1月31日', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.cell(0, 6, '次回レビュー推奨: 2026年4月（3ヶ月後）', new_x='LMARGIN', new_y='NEXT', align='C')

# PDFを保存
pdf.output('/Users/soudousya/cycleZ-seo/cycleZ_SEO分析レポート_総合版.pdf')
print("PDF作成完了: /Users/soudousya/cycleZ-seo/cycleZ_SEO分析レポート_総合版.pdf")
