#!/usr/bin/env python3
"""
GIOS AMPIO の車体画像を3色分生成するスクリプト
"""

import os
import sys
from pathlib import Path

VENV_PACKAGES = Path(__file__).resolve().parent.parent.parent / "06_ツール・ユーティリティ" / "firefitness_image_generator" / "venv" / "lib"
for p in VENV_PACKAGES.glob("python*/site-packages"):
    sys.path.insert(0, str(p))

from google import genai
from google.genai import types

# .envからAPIキー読み込み
env_path = Path(__file__).resolve().parent.parent.parent / "06_ツール・ユーティリティ" / "firefitness_image_generator" / ".env"
api_key = None
if env_path.exists():
    for line in env_path.read_text().splitlines():
        if line.startswith("GEMINI_API_KEY="):
            api_key = line.split("=", 1)[1].strip()
            break

if not api_key:
    api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("GEMINI_API_KEY not found")
    sys.exit(1)

output_dir = Path(__file__).resolve().parent.parent / "public" / "images"

BIKE_PROMPT_BASE = """Create a clean product photograph of a GIOS AMPIO chromoly flat-bar road bike on a pure white background.

BIKE SPECIFICATIONS:
- Chromoly steel frame (4130 CR-MO SPECIAL TUBING) with thin, elegant round tubes
- Flat handlebar (not drop bar)
- Front single gear (1x8 speed) - only ONE chainring at the front, no front derailleur
- Thin road-style tires (700x25C)
- Silver/chrome components (crankset, stem, seatpost)
- "GIOS" text logo on the down tube in white block letters
- Classic road bike geometry with slim chromoly silhouette
- Side profile view (left side facing camera)

COLOR: {color_desc}

STYLE:
- Clean product photography on pure white (#ffffff) background
- Studio lighting, no shadows on background
- High resolution, sharp details
- Professional e-commerce style product shot
- The bike should fill most of the frame
- 16:9 aspect ratio

NO text overlays, NO watermarks, NO badges, NO price tags.
"""

bikes = [
    {
        "color_desc": "GIOS BLUE - a deep, rich cobalt blue (the iconic Gios Blue). The entire frame and fork are this distinctive blue color. This is the signature color of GIOS bicycles.",
        "output": "gios-ampio-2026-blue.png"
    },
    {
        "color_desc": "MATTE BLACK - the entire frame and fork are matte black with subtle GIOS branding.",
        "output": "gios-ampio-2026-black.png"
    },
    {
        "color_desc": "PEARL WHITE - the entire frame and fork are pearl white/cream white with subtle GIOS branding.",
        "output": "gios-ampio-2026-white.png"
    },
]

client = genai.Client(api_key=api_key)

for bike in bikes:
    prompt = BIKE_PROMPT_BASE.format(color_desc=bike["color_desc"])
    output_path = output_dir / bike["output"]

    print(f"\n🚲 生成中: {bike['output']}...")

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            )
        )

        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                with open(output_path, "wb") as f:
                    f.write(part.inline_data.data)
                print(f"   ✅ {output_path}")
                break
            elif part.text is not None:
                print(f"   📝 {part.text[:100]}")

    except Exception as e:
        print(f"   ❌ {e}")
        continue

print("\n完了！")
