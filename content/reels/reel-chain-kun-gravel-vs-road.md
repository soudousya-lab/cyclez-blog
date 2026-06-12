# リール台本：チェーンくん「グラベルバイクって何が違うん？」

## 概要
- キャラ：チェーンくん（メイン）、タイヤくん（相方）
- テーマ：グラベルバイク vs ロードバイク の違い
- 尺：60秒
- トーン：岡山弁、テンポ良く、初心者にも分かりやすく
- ブログ連動：`/blog/gravel-bike-beginner-guide-2026`

---

## シーン構成

### シーン1（0:00-0:08）— フック
**チェーンくん**（画面中央、砂利道の背景）
「なぁタイヤくん、最近グラベルグラベルゆう客が増えとるんじゃけど、ありゃ何なん？」

**タイヤくん**（横から登場、太いタイヤ姿）
「ワシのことじゃが！！」

### シーン2（0:08-0:20）— 違いを説明
**チェーンくん**（ロードバイクとグラベルバイクの比較イメージ背景）
「ロードバイクは舗装路をビューン！と走る専門家じゃろ？」

**タイヤくん**（得意げ）
「グラベルは砂利道も舗装路も両方いけるんじゃ。ワシが太いけん、段差もへっちゃらよ」

**チェーンくん**
「つまり…どっちも走れる万能型ってことか」

### シーン3（0:20-0:35）— メリット
**チェーンくん**（河川敷の背景）
「でも速さはロードに負けるんじゃろ？」

**タイヤくん**
「時速3〜5kmくらいは遅くなるわ。じゃけど通勤にも使える、キャンプにも行ける、河川敷も走れる。**1台でできることの数が段違いなんよ**」

**チェーンくん**（感心）
「岡山は晴れの日が全国1位じゃし、旭川の河川敷もあるし…グラベル向きじゃのう」

### シーン4（0:35-0:50）— 選び方
**タイヤくん**（真剣な顔）
「ほんでな、初めてならBASSOのマルテ。イタリアのクロモリで20万円くらい。クセがのうて乗りやすい」

**チェーンくん**
「もうちょい本気でいくなら？」

**タイヤくん**
「SCOTTのグラベルか、Chapter2のKAHA。うちのスタッフ仙田がKAHA乗っとるけど、舗装路もバリバリ走れるゆうとったわ」

### シーン5（0:50-0:60）— CTA
**チェーンくん＆タイヤくん**（cycleZ店内背景）
「迷うとる人は、cycleZで両方乗り比べてみんちゃい！」

**チェーンくん**（カメラ目線）
「乗りゃあ分かる。詳しくはプロフィールのリンクから記事も読めるけん！」

テキスト表示：「グラベルバイク入門ガイド → プロフのリンクから」

---

## Gemini画像生成プロンプト

### チェーンくん
```
Pixar-style 3D animated character. A cheerful bicycle chain link character with expressive eyes, small arms and legs. Metallic silver-gray color with oil sheen. Energetic personality. Simple clean background. No text, no speech bubbles.
```

### タイヤくん
```
Pixar-style 3D animated character. A confident bicycle tire character, wider/thicker than normal (gravel tire style). Black rubber texture with knobby tread pattern. Bright expressive eyes, muscular stance. No text, no speech bubbles.
```

## Grok動画生成プロンプト

### シーン1（砂利道）
```
The chain character stands on a gravel path looking confused, then a wide tire character rolls in from the right side with a proud expression. Camera: medium shot, slight dolly in. Background: sunny gravel trail with green trees. Natural daylight, warm tones. No speech bubbles, no text overlays, no captions, no dialogue boxes. Duration: 10 seconds.
```

### シーン3（河川敷）
```
Two characters (chain and tire) standing on a riverside path. The tire character gestures enthusiastically while the chain character nods in amazement. Camera: wide shot showing the river and path. Golden hour lighting, warm atmosphere. No speech bubbles, no text overlays, no captions, no dialogue boxes. Duration: 10 seconds.
```

## 音声生成コマンド

```bash
# チェーンくん（シーン1）
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs "なぁタイヤくん、最近グラベルグラベルゆう客が増えとるんじゃけど、ありゃ何なん？" --output chain-gravel-01.mp3 --speed 1.8

# タイヤくん（シーン1）
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs "ワシのことじゃが！！" --output tire-gravel-01.mp3 --speed 1.8

# チェーンくん（シーン5 CTA）
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs "迷うとる人は、サイクルゼットで両方乗り比べてみんちゃい！" --output chain-gravel-cta.mp3 --speed 1.8
```
