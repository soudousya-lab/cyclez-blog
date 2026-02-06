#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import markdown
from weasyprint import HTML, CSS

# Markdownファイルを読み込む
with open('/Users/soudousya/cycleZ-seo/cycleZ_SEO分析レポート.md', 'r', encoding='utf-8') as f:
    md_content = f.read()

# MarkdownをHTMLに変換
html_content = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])

# 完全なHTMLドキュメントを作成
full_html = f'''
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>cycleZ SEO分析レポート</title>
</head>
<body>
{html_content}
</body>
</html>
'''

# CSSスタイルを定義
css = CSS(string='''
    @page {{
        size: A4;
        margin: 2cm;
    }}
    body {{
        font-family: "Hiragino Kaku Gothic Pro", "Yu Gothic", "Meiryo", sans-serif;
        font-size: 11pt;
        line-height: 1.6;
        color: #333;
    }}
    h1 {{
        font-size: 24pt;
        color: #c41e3a;
        border-bottom: 3px solid #c41e3a;
        padding-bottom: 10px;
        margin-top: 30px;
    }}
    h2 {{
        font-size: 18pt;
        color: #c41e3a;
        border-left: 5px solid #c41e3a;
        padding-left: 10px;
        margin-top: 25px;
    }}
    h3 {{
        font-size: 14pt;
        color: #333;
        margin-top: 20px;
    }}
    h4 {{
        font-size: 12pt;
        color: #666;
    }}
    table {{
        border-collapse: collapse;
        width: 100%;
        margin: 15px 0;
        font-size: 10pt;
    }}
    th, td {{
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }}
    th {{
        background-color: #c41e3a;
        color: white;
    }}
    tr:nth-child(even) {{
        background-color: #f9f9f9;
    }}
    code {{
        background-color: #f4f4f4;
        padding: 2px 5px;
        border-radius: 3px;
        font-family: "Menlo", "Monaco", monospace;
        font-size: 10pt;
    }}
    pre {{
        background-color: #f4f4f4;
        padding: 15px;
        border-radius: 5px;
        overflow-x: auto;
        font-size: 9pt;
        line-height: 1.4;
    }}
    pre code {{
        background-color: transparent;
        padding: 0;
    }}
    strong {{
        color: #c41e3a;
    }}
    hr {{
        border: none;
        border-top: 2px solid #ddd;
        margin: 30px 0;
    }}
    ul, ol {{
        margin-left: 20px;
    }}
    li {{
        margin-bottom: 5px;
    }}
''')

# HTMLをPDFに変換
HTML(string=full_html).write_pdf(
    '/Users/soudousya/cycleZ-seo/cycleZ_SEO分析レポート.pdf',
    stylesheets=[css]
)

print("PDF作成完了: /Users/soudousya/cycleZ-seo/cycleZ_SEO分析レポート.pdf")
