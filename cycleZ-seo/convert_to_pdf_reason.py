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
        self.cell(0, 10, 'cycleZ SEO分析', new_x='LMARGIN', new_y='NEXT', align='R')
        self.ln(3)

    def footer(self):
        self.set_y(-15)
        self.set_font('NotoSansJP', '', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'- {self.page_no()} -', align='C')

# PDFを作成
pdf = PDF()
pdf.add_page()

# タイトル
pdf.set_font('NotoSansJP', 'B', 20)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 15, '「岡山 ロードバイク 初心者」1位', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.cell(0, 15, 'だけではダメな3つの理由', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.ln(10)

pdf.set_draw_color(196, 30, 58)
pdf.set_line_width(0.8)
pdf.line(30, pdf.get_y(), 180, pdf.get_y())
pdf.ln(15)

# 現状確認
pdf.set_font('NotoSansJP', 'B', 12)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 8, '【現状】', new_x='LMARGIN', new_y='NEXT')
pdf.set_font('NotoSansJP', '', 11)
pdf.multi_cell(0, 7, '「岡山 ロードバイク 初心者」でGoogle検索すると、cycleZの初心者講習会ページが1位に表示される。これは事実であり、素晴らしい成果。')
pdf.ln(5)

pdf.set_font('NotoSansJP', 'B', 12)
pdf.set_text_color(255, 0, 0)
pdf.cell(0, 8, '【しかし、これだけでは不十分な理由がある】', new_x='LMARGIN', new_y='NEXT')
pdf.ln(10)

# 理由1
pdf.set_fill_color(255, 245, 245)
pdf.set_draw_color(196, 30, 58)
pdf.rect(10, pdf.get_y(), 190, 65, 'DF')
pdf.set_xy(15, pdf.get_y() + 5)

pdf.set_font('NotoSansJP', 'B', 14)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 10, '理由1: 検索ボリュームが小さすぎる', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(15)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(180, 6, '''
キーワード別の月間検索数（推定）:

  「岡山 ロードバイク」        500〜1,000回/月  → cycleZ圏外
  「岡山 自転車屋」           1,000〜2,000回/月 → cycleZ圏外
  「岡山 ロードバイク 初心者」  50〜100回/月    → cycleZ 1位

「初心者」を付けると検索数は1/10以下に激減する。
月100人しか検索しないキーワードで1位を取っても、月1,000人が検索する
メイン市場を丸ごと逃している。
''')

pdf.ln(70)

# 理由2
pdf.set_fill_color(255, 250, 240)
pdf.set_draw_color(200, 150, 0)
pdf.rect(10, pdf.get_y(), 190, 70, 'DF')
pdf.set_xy(15, pdf.get_y() + 5)

pdf.set_font('NotoSansJP', 'B', 14)
pdf.set_text_color(200, 130, 0)
pdf.cell(0, 10, '理由2: 購買意欲の高いユーザーを逃している', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(15)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(180, 6, '''
「岡山 ロードバイク」で検索する人の心理:
  →「岡山でロードバイク買いたい」「どの店がいいか比較したい」
  →「今週末に店に行こう」= 購買に近い、熱いユーザー

「岡山 ロードバイク 初心者」で検索する人の心理:
  →「初心者でも大丈夫かな...」「まだ情報収集の段階」
  →「いつか始めたい」= まだ購買から遠い、冷たいユーザー

厳しく言うと:「初心者」で1位を取っても、
来店・購買に繋がりにくいユーザーしか集められていない。
''')

pdf.add_page()

# 理由3
pdf.set_fill_color(240, 248, 255)
pdf.set_draw_color(0, 100, 180)
pdf.rect(10, pdf.get_y(), 190, 75, 'DF')
pdf.set_xy(15, pdf.get_y() + 5)

pdf.set_font('NotoSansJP', 'B', 14)
pdf.set_text_color(0, 100, 180)
pdf.cell(0, 10, '理由3: 競合は「複数キーワード」で上位を取っている', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(15)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(180, 6, '''
キーワード別の順位比較:

                          Freedom    WAVE BIKES    cycleZ
  岡山 ロードバイク           1位         2位        圏外
  岡山 ロードバイク ショップ    上位        上位        圏外
  岡山 サイクリング            上位        上位        圏外
  岡山 ロードバイク 初心者     圏外        圏外        1位

FreedomやWAVE BIKESは複数のキーワードで上位を取っている。
cycleZは「初心者」という1つのニッチなキーワードだけ。
これでは流入の総量で圧倒的に負ける。
''')

pdf.ln(80)

# 具体的な数字
pdf.set_font('NotoSansJP', 'B', 12)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 10, '【具体的な数字で比較】月間の検索流入（推定）', new_x='LMARGIN', new_y='NEXT')
pdf.ln(3)

# テーブル
pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_fill_color(196, 30, 58)
pdf.set_text_color(255, 255, 255)
pdf.cell(60, 8, '店舗', 1, 0, 'C', True)
pdf.cell(80, 8, '主要KWからの流入', 1, 0, 'C', True)
pdf.cell(50, 8, '合計', 1, 1, 'C', True)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_text_color(51, 51, 51)
pdf.set_fill_color(249, 249, 249)
pdf.cell(60, 8, 'Freedom', 1, 0, 'L', True)
pdf.cell(80, 8, '岡山ロードバイク(150)+その他(200)', 1, 0, 'L', True)
pdf.set_font('NotoSansJP', 'B', 10)
pdf.cell(50, 8, '350人/月', 1, 1, 'C', True)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_fill_color(255, 255, 255)
pdf.cell(60, 8, 'WAVE BIKES', 1, 0, 'L', True)
pdf.cell(80, 8, '岡山ロードバイク(100)+その他(300)', 1, 0, 'L', True)
pdf.set_font('NotoSansJP', 'B', 10)
pdf.cell(50, 8, '400人/月', 1, 1, 'C', True)

pdf.set_font('NotoSansJP', '', 10)
pdf.set_fill_color(255, 240, 240)
pdf.cell(60, 8, 'cycleZ', 1, 0, 'L', True)
pdf.cell(80, 8, '初心者(30)+ブランド検索(50)', 1, 0, 'L', True)
pdf.set_font('NotoSansJP', 'B', 10)
pdf.set_text_color(255, 0, 0)
pdf.cell(50, 8, '80人/月', 1, 1, 'C', True)

pdf.ln(5)
pdf.set_font('NotoSansJP', 'B', 11)
pdf.set_text_color(255, 0, 0)
pdf.cell(0, 8, 'cycleZは競合の1/4〜1/5しかWebから集客できていない', new_x='LMARGIN', new_y='NEXT', align='C')

pdf.ln(10)

# 結論
pdf.set_draw_color(196, 30, 58)
pdf.set_line_width(1)
pdf.rect(10, pdf.get_y(), 190, 45, 'D')
pdf.set_xy(15, pdf.get_y() + 5)

pdf.set_font('NotoSansJP', 'B', 12)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 8, '【厳しい結論】', new_x='LMARGIN', new_y='NEXT')
pdf.set_x(15)

pdf.set_font('NotoSansJP', '', 11)
pdf.set_text_color(51, 51, 51)
pdf.multi_cell(180, 7, '''「岡山 ロードバイク 初心者」で1位 = ニッチ市場の王者
「岡山 ロードバイク」で圏外 = メイン市場に存在しない

例えるなら:
・「岡山駅の改札横」に店があるのがFreedomとWAVE BIKES
・「岡山駅から徒歩15分の路地裏」に店があるのがcycleZ''')

# 次のアクション
pdf.add_page()

pdf.set_font('NotoSansJP', 'B', 16)
pdf.set_text_color(0, 128, 0)
pdf.cell(0, 15, 'じゃあどうすればいいか？', new_x='LMARGIN', new_y='NEXT', align='C')
pdf.ln(5)

pdf.set_font('NotoSansJP', 'B', 12)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 10, '「初心者」1位を足がかりに、上位キーワードを攻める', new_x='LMARGIN', new_y='NEXT')
pdf.ln(5)

# ステップ
pdf.set_fill_color(230, 255, 230)
pdf.set_draw_color(0, 150, 0)

steps = [
    ('STEP 1', '「岡山 ロードバイク 初心者」', '1位を維持（現状）'),
    ('STEP 2', '「岡山 ロードバイク 女性」', '狙える（cycleZの強み）'),
    ('STEP 3', '「岡山 ロードバイク おすすめ」', '記事を書いて狙う'),
    ('STEP 4', '「岡山 ロードバイク」', '最終目標'),
]

y_pos = pdf.get_y()
for i, (step, keyword, action) in enumerate(steps):
    pdf.rect(10, y_pos, 190, 20, 'DF')
    pdf.set_xy(15, y_pos + 3)
    pdf.set_font('NotoSansJP', 'B', 11)
    pdf.set_text_color(0, 128, 0)
    pdf.cell(30, 7, step)
    pdf.set_font('NotoSansJP', 'B', 11)
    pdf.set_text_color(51, 51, 51)
    pdf.cell(80, 7, keyword)
    pdf.set_font('NotoSansJP', '', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(60, 7, action)
    y_pos += 25

    # 矢印
    if i < len(steps) - 1:
        pdf.set_xy(100, y_pos - 7)
        pdf.set_font('NotoSansJP', 'B', 14)
        pdf.set_text_color(0, 128, 0)
        pdf.cell(10, 5, '↓', align='C')

pdf.ln(110)

# 最終メッセージ
pdf.set_draw_color(196, 30, 58)
pdf.set_fill_color(255, 245, 245)
pdf.rect(10, pdf.get_y(), 190, 30, 'DF')
pdf.set_xy(15, pdf.get_y() + 8)

pdf.set_font('NotoSansJP', 'B', 14)
pdf.set_text_color(196, 30, 58)
pdf.cell(0, 10, '初心者1位は「武器」だけど、それだけでは「戦場」に立てていない', new_x='LMARGIN', new_y='NEXT', align='C')

# PDFを保存
pdf.output('/Users/soudousya/cycleZ-seo/初心者1位だけではダメな理由.pdf')
print("PDF作成完了: /Users/soudousya/cycleZ-seo/初心者1位だけではダメな理由.pdf")
