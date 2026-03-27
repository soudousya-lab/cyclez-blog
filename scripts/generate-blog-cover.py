#!/usr/bin/env python3
"""
cycleZ ブログ用アイソメトリック3Dミニチュアイラスト生成スクリプト

使い方:
  python scripts/generate-blog-cover.py "記事テーマの説明" --output ファイル名.webp
  python scripts/generate-blog-cover.py "クロスバイク通学ガイド" --output blog-cover-commute.webp

環境変数:
  GEMINI_API_KEY: Google AI Studio の API キー
"""

import os
import sys
import argparse
from pathlib import Path
from datetime import datetime

# firefitness_image_generator の venv を使う
VENV_PACKAGES = Path(__file__).resolve().parent.parent.parent / "06_ツール・ユーティリティ" / "firefitness_image_generator" / "venv" / "lib"
for p in VENV_PACKAGES.glob("python*/site-packages"):
    sys.path.insert(0, str(p))

from google import genai
from google.genai import types

# cycleZ ブランドカラー定義
CYCLEZ_STYLE = """
STYLE REQUIREMENTS - STRICT:
- Isometric 3D miniature diorama illustration (45-degree top-down angle)
- Clay/plastic rendering style with soft shadows
- Color palette:
  - Primary: Deep red (#c41e3a) for accent elements, furniture frames, decorative items
  - Secondary: Dark charcoal gray (#333333) for structures, walls, floor edges
  - Background: Clean white/very light gray (#f5f5f5) surrounding the diorama
  - Neutral: Warm beige/cream (#f0e6d3) for floors and walls inside the diorama
  - Accent: Silver/chrome for bicycle parts and metallic elements
- The diorama should be a cut-away room/scene viewed from isometric perspective
- Characters should be cute, simplified 3D figures (not realistic)
- Include relevant props and details that tell the story of the scene
- No text, no labels, no speech bubbles in the image
- Professional, clean, modern illustration suitable for a bicycle shop blog
- High detail, 4K quality rendering
"""


def generate_cover(theme: str, output_name: str) -> str:
    """アイソメトリック3Dイラストを生成"""

    # APIキー取得
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        # firefitness の .env から読み込み
        env_path = Path(__file__).resolve().parent.parent.parent / "06_ツール・ユーティリティ" / "firefitness_image_generator" / ".env"
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                if line.startswith("GEMINI_API_KEY="):
                    api_key = line.split("=", 1)[1].strip()
                    break

    if not api_key:
        print("❌ GEMINI_API_KEY が見つかりません")
        sys.exit(1)

    # 出力先
    output_dir = Path(__file__).resolve().parent.parent / "public" / "images" / "blog"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / output_name

    # プロンプト構築
    prompt = f"""Create an isometric 3D miniature diorama illustration for a bicycle shop blog article.

ARTICLE THEME: {theme}

{CYCLEZ_STYLE}

The scene should clearly represent the article's theme through visual storytelling.
Generate a 16:9 aspect ratio image with clean white background surrounding the isometric diorama.
"""

    print(f"🎨 cycleZ ブログカバー画像を生成中...")
    print(f"   テーマ: {theme}")
    print(f"   出力先: {output_path}")

    try:
        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            )
        )

        # レスポンス処理
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                image_data = part.inline_data.data

                # WebP で保存（PNG入力でもWebPとして保存）
                if output_name.endswith(".webp"):
                    # まずPNGで一時保存してからsipsでWebP変換
                    temp_path = output_path.with_suffix(".png")
                    with open(temp_path, "wb") as f:
                        f.write(image_data)

                    # sips で WebP に変換
                    os.system(f'sips -s format webp "{temp_path}" --out "{output_path}" 2>/dev/null')
                    if output_path.exists():
                        temp_path.unlink()  # 一時PNGを削除
                        print(f"✅ WebP で保存: {output_path}")
                    else:
                        # sips 変換失敗時はPNGのまま
                        temp_path.rename(output_path.with_suffix(".png"))
                        print(f"✅ PNG で保存: {output_path.with_suffix('.png')}")
                else:
                    with open(output_path, "wb") as f:
                        f.write(image_data)
                    print(f"✅ 保存: {output_path}")

                return str(output_path)

            elif part.text is not None:
                print(f"📝 Gemini: {part.text[:200]}")

        print("❌ 画像が生成されませんでした")
        sys.exit(1)

    except Exception as e:
        print(f"❌ エラー: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="cycleZ ブログカバー画像生成")
    parser.add_argument("theme", help="記事テーマの説明（日本語OK）")
    parser.add_argument("--output", "-o", default=None, help="出力ファイル名 (例: blog-cover-commute.webp)")
    parser.add_argument("--dry-run", action="store_true", help="プロンプトのみ表示（API呼び出しなし）")

    args = parser.parse_args()

    # 出力ファイル名のデフォルト
    if args.output is None:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        args.output = f"blog-cover-{timestamp}.webp"

    if args.dry_run:
        print(f"テーマ: {args.theme}")
        print(f"出力: {args.output}")
        print(f"\n--- プロンプト ---")
        print(f"ARTICLE THEME: {args.theme}")
        print(CYCLEZ_STYLE)
        return

    generate_cover(args.theme, args.output)


if __name__ == "__main__":
    main()
