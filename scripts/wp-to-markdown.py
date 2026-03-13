#!/usr/bin/env python3
"""
WordPress記事をMarkdownに変換するスクリプト
cycle-z.com の全ブログ記事をREST APIから取得してMarkdownファイルに変換する
"""

import json
import html
import re
import os
import subprocess
import time

# 設定
BASE_URL = "https://cycle-z.com/wp-json/wp/v2"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "content", "wp-posts")
PER_PAGE = 100

# カテゴリマッピング
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

def fetch_json(url):
    """curlでJSONを取得"""
    result = subprocess.run(
        ["curl", "-s", url],
        capture_output=True, text=True, timeout=30
    )
    return json.loads(result.stdout)

def html_to_markdown(html_content):
    """HTMLをMarkdownに簡易変換"""
    text = html_content

    # 改行を保持
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

    # div, span等
    text = re.sub(r'<div[^>]*>', '\n', text)
    text = re.sub(r'</div>', '\n', text)

    # iframeをリンクに
    def iframe_replace(match):
        tag = match.group(0)
        src_match = re.search(r'src="([^"]*)"', tag)
        if src_match:
            return f'\n[埋め込みコンテンツ]({src_match.group(1)})\n\n'
        return ''
    text = re.sub(r'<iframe[^>]*>.*?</iframe>', iframe_replace, text, flags=re.DOTALL)
    text = re.sub(r'<iframe[^>]*/>', iframe_replace)

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

    all_posts = []
    page = 1

    print("記事を取得中...")
    while True:
        url = f"{BASE_URL}/posts?per_page={PER_PAGE}&page={page}&_fields=id,slug,title,content,date,categories,link"
        try:
            posts = fetch_json(url)
            if not posts or isinstance(posts, dict):
                break
            all_posts.extend(posts)
            print(f"  ページ {page}: {len(posts)}件取得 (累計: {len(all_posts)}件)")
            if len(posts) < PER_PAGE:
                break
            page += 1
            time.sleep(0.5)
        except Exception as e:
            print(f"  ページ {page} でエラー: {e}")
            break

    print(f"\n合計 {len(all_posts)}件の記事を取得")

    # リダイレクトマップ
    redirect_map = []

    for post in all_posts:
        post_id = post['id']
        slug = post['slug']
        title = html.unescape(post['title']['rendered'])
        date = post['date'][:10]
        content_html = post['content']['rendered']
        categories = post.get('categories', [])
        link = post['link']

        # カテゴリ名を取得
        cat_names = [CATEGORIES.get(c, 'other') for c in categories]
        primary_cat = cat_names[0] if cat_names else 'uncategorized'

        # Markdown変換
        content_md = html_to_markdown(content_html)

        # ファイル名
        filename = f"{slug}.md"
        filepath = os.path.join(OUTPUT_DIR, filename)

        # front matter
        escaped_title = title.replace('"', '\\"')
        tags_str = ', '.join(f'"{c}"' for c in cat_names)
        front_matter = f"""---
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

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(front_matter)

        # リダイレクトマップ
        # WP: /blog/2026/03/02/slug/ -> 新: /blog/slug
        old_path = link.replace('https://cycle-z.com', '')
        redirect_map.append({
            'old': old_path.rstrip('/'),
            'new': f'/blog/{slug}',
            'title': title
        })

    # リダイレクトマップを保存
    redirect_path = os.path.join(os.path.dirname(OUTPUT_DIR), '..', 'docs', 'wp-migration', 'redirect-map.json')
    with open(redirect_path, 'w', encoding='utf-8') as f:
        json.dump(redirect_map, f, ensure_ascii=False, indent=2)

    print(f"\n{len(all_posts)}件のMarkdownファイルを {OUTPUT_DIR} に保存")
    print(f"リダイレクトマップを {redirect_path} に保存")

if __name__ == '__main__':
    main()
