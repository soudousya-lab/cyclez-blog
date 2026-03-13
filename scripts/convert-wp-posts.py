#!/usr/bin/env python3
"""
ダウンロード済みのWP JSONファイルからMarkdownに変換
"""

import json
import html
import re
import os
import glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MIGRATION_DIR = os.path.join(BASE_DIR, "docs", "wp-migration")
OUTPUT_DIR = os.path.join(BASE_DIR, "content", "wp-posts")

CATEGORIES = {
    15: "event",
    27: "event-report",
    14: "voice",
    7: "news",
    19: "maintenance-blog",
    13: "lineup",
    17: "road-bike",
    16: "beginner-training",
    28: "movie",
    1: "uncategorized"
}

def html_to_markdown(html_content):
    """HTMLをMarkdownに簡易変換"""
    text = html_content
    text = text.replace('\n', '')

    # ブロック要素
    text = re.sub(r'<h1[^>]*>(.*?)</h1>', r'# \1\n\n', text)
    text = re.sub(r'<h2[^>]*>(.*?)</h2>', r'## \1\n\n', text)
    text = re.sub(r'<h3[^>]*>(.*?)</h3>', r'### \1\n\n', text)
    text = re.sub(r'<h4[^>]*>(.*?)</h4>', r'#### \1\n\n', text)

    # リスト
    text = re.sub(r'<li[^>]*>(.*?)</li>', r'- \1\n', text)
    text = re.sub(r'<[/]?[ou]l[^>]*>', '\n', text)

    # 画像
    def img_replace(match):
        tag = match.group(0)
        src_match = re.search(r'src="([^"]*)"', tag)
        alt_match = re.search(r'alt="([^"]*)"', tag)
        if src_match:
            src = src_match.group(1)
            alt = alt_match.group(1) if alt_match else ''
            return f'![{alt}]({src})\n\n'
        return ''
    text = re.sub(r'<img[^>]*/?>', img_replace, text)

    # リンク
    text = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', r'[\2](\1)', text)

    # 太字・斜体
    text = re.sub(r'<strong>(.*?)</strong>', r'**\1**', text)
    text = re.sub(r'<b>(.*?)</b>', r'**\1**', text)
    text = re.sub(r'<em>(.*?)</em>', r'*\1*', text)

    # 段落
    text = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n\n', text, flags=re.DOTALL)
    text = re.sub(r'<br\s*/?>', '\n', text)

    # div
    text = re.sub(r'<div[^>]*>', '\n', text)
    text = re.sub(r'</div>', '\n', text)

    # iframe
    def iframe_replace(match):
        tag = match.group(0)
        src_match = re.search(r'src="([^"]*)"', tag)
        if src_match:
            return f'\n[埋め込みコンテンツ]({src_match.group(1)})\n\n'
        return ''
    text = re.sub(r'<iframe[^>]*>.*?</iframe>', iframe_replace, text, flags=re.DOTALL)
    text = re.sub(r'<iframe[^>]*/>', iframe_replace)

    # テーブル
    text = re.sub(r'<table[^>]*>', '\n', text)
    text = re.sub(r'</table>', '\n', text)
    text = re.sub(r'<tr[^>]*>', '', text)
    text = re.sub(r'</tr>', '\n', text)
    text = re.sub(r'<t[dh][^>]*>(.*?)</t[dh]>', r'| \1 ', text)

    # 残りのHTMLタグを除去
    text = re.sub(r'<[^>]+>', '', text)

    # HTMLエンティティ
    text = html.unescape(text)

    # 余分な空行を整理
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = text.strip()

    return text

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 統合JSONを読み込み
    json_path = os.path.join(MIGRATION_DIR, "all-posts-full.json")
    with open(json_path, 'r', encoding='utf-8') as f:
        all_posts = json.load(f)
    print(f"JSONから {len(all_posts)}件読み込み")

    print(f"\n合計 {len(all_posts)}件の記事を変換中...")

    redirect_map = []
    converted = 0
    errors = 0

    for post in all_posts:
        try:
            post_id = post['id']
            slug = post['slug']
            title = html.unescape(post['title']['rendered'])
            date = post['date'][:10]
            content_obj = post.get('content', {})
            if content_obj is None:
                content_obj = {}
            content_html = content_obj.get('rendered', '') or ''
            categories = post.get('categories', [])
            link = post.get('link', '')

            # カテゴリ名
            cat_names = [CATEGORIES.get(c, 'other') for c in categories]
            primary_cat = cat_names[0] if cat_names else 'uncategorized'

            # Markdown変換
            content_md = html_to_markdown(content_html)

            # front matter作成
            escaped_title = title.replace('"', '\\"')
            tags_str = ', '.join(f'"{c}"' for c in cat_names)

            md_content = f"""---
title: "{escaped_title}"
date: "{date}"
description: ""
category: "{primary_cat}"
tags: [{tags_str}]
wp_id: {post_id}
wp_url: "{link}"
---

{content_md}
"""

            # ファイル保存
            filename = f"{slug}.md"
            filepath = os.path.join(OUTPUT_DIR, filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(md_content)

            # リダイレクトマップ
            old_path = link.replace('https://cycle-z.com', '').rstrip('/')
            redirect_map.append({
                'old': old_path,
                'new': f'/blog/{slug}',
                'title': title
            })

            converted += 1
        except Exception as e:
            print(f"  エラー: {post.get('slug', 'unknown')} - {e}")
            errors += 1

    # リダイレクトマップ保存
    redirect_path = os.path.join(MIGRATION_DIR, 'redirect-map.json')
    with open(redirect_path, 'w', encoding='utf-8') as f:
        json.dump(redirect_map, f, ensure_ascii=False, indent=2)

    print(f"\n完了:")
    print(f"  変換成功: {converted}件")
    print(f"  エラー: {errors}件")
    print(f"  出力先: {OUTPUT_DIR}")
    print(f"  リダイレクトマップ: {redirect_path}")

if __name__ == '__main__':
    main()
