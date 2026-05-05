---
title: "リール台本：通販で買った自転車、半年後に何が起きる？"
character: チェーンくん
duration: 60秒
brand: cycleZ
related_post: online-vs-shop-buying-bicycle
date: 2026-05-06
---

# リール台本：通販で買った自転車、半年後どうなる？

メインキャラ：**チェーンくん**（cycleZの3Dマスコット／岡山弁で熱弁）

---

## シーン構成（全6カット・60秒）

### シーン1（0-10秒）— ツカミ

**画面**：チェーンくんが段ボール箱の前で困った顔。箱から半組立のロードバイクが頭を出している。

**セリフ（約5.5秒）**：
> 「なんでこれで届くん！？通販で買うた自転車、最後の組み立て自分でやらんといけんのよ。」

**Geminiプロンプト（画像）**：
```
3D Pixar-style cartoon chain character, golden bicycle chain with eyes and small arms, standing in front of a large cardboard box with a half-assembled road bike sticking out, warehouse background, dramatic surprise expression, single light source from above, cinematic composition, no text
```

**Grokプロンプト（動画）**：
```
The character looks at the box, then turns to camera with shocked expression, mouth open wide yelling, hands on cheeks, slight zoom-in. No speech bubbles, no text overlays, no captions, no dialogue boxes. Documentary feel, candid moment. Duration: 10 seconds.
```

---

### シーン2（10-20秒）— 問題提起

**画面**：チェーンくんが工具を持って汗だくで組み立て中。ハンドルが斜め。

**セリフ（約6秒）**：
> 「ほんでハンドルちょっと斜め、ブレーキ片効き、変速も決まらん。これで走るんけ？危ねぇて。」

**Geminiプロンプト**：
```
3D Pixar-style chain character sweating with wrench in hand, tightening a road bike with crooked handlebars and uneven brake pads, screws scattered on garage floor, anxious sweating face, warm garage lighting
```

**Grokプロンプト**：
```
Character struggling to tighten a bolt with a wrench, sweat drops flying, slight head shake of concern, camera dollies in. No speech bubbles, no text overlays, no captions, no dialogue boxes. Duration: 10 seconds.
```

---

### シーン3（20-30秒）— あるある描写

**画面**：半年経過のテロップなしで、チェーンくんがcycleZ店頭にトボトボ持ち込み。

**セリフ（約6秒）**：
> 「で、半年したらブレーキ効かんようになって、結局店に持ち込むんよ。最初から相談しときゃええんに。」

**Geminiプロンプト**：
```
3D Pixar-style chain character pushing a worn road bike into a stylish bike shop entrance with cycleZ-style interior, hanging head, shop staff visible at counter, warm shop lighting, lifestyle photography feel
```

**Grokプロンプト**：
```
Character slowly pushes the bike forward with a sad expression, head down, slight forward motion. No speech bubbles, no text overlays, no captions, no dialogue boxes. Duration: 10 seconds.
```

---

### シーン4（30-40秒）— 数字で正直に

**画面**：チェーンくんの横にホワイトボード風の比較表（直販18万 vs 店舗20万、5年トータルでほぼ同額の図）。

**セリフ（約6.5秒）**：
> 「最初は2万安く見えても、5年走ったらほぼ一緒。後の調整代、ポジション、保証、全部入れたらな。」

**Geminiプロンプト**：
```
3D Pixar-style chain character standing next to a clean whiteboard showing a simple cost comparison chart with two columns labeled in plain bars (no readable text), pointing at the chart with one arm, bright shop interior background
```

**Grokプロンプト**：
```
Character points to the right column of the chart with a serious explanatory face, slight nod, camera holds steady. No speech bubbles, no text overlays, no captions, no dialogue boxes. Duration: 10 seconds.
```

---

### シーン5（40-50秒）— 店舗購入の価値

**画面**：チェーンくんが店主と笑顔で試乗中。背景にBASSO・GIOSが並ぶcycleZの店内。

**セリフ（約6秒）**：
> 「困ったとき駆け込める場所があるんが一番デカい。これは値段表に載らんやつなんよ。」

**Geminiプロンプト**：
```
3D Pixar-style chain character riding a small road bike inside a stylish bicycle shop, BASSO and GIOS bikes lined up against the wall, shop owner silhouette giving thumbs up, warm afternoon sunlight, documentary lifestyle photography feel
```

**Grokプロンプト**：
```
Character pedals slowly with a happy grin, slight bobbing motion, camera follows from the side. No speech bubbles, no text overlays, no captions, no dialogue boxes. Duration: 10 seconds.
```

---

### シーン6（50-60秒）— CTA

**画面**：チェーンくんがcycleZの看板の前で手を振る。

**セリフ（約5秒）**：
> 「買う前に一回寄ってみてや。岡山駅から自転車で数分、cycleZで待っとるけぇ。」

**Geminiプロンプト**：
```
3D Pixar-style chain character waving in front of a stylish bicycle shop storefront with cycleZ-style signage, late afternoon golden hour lighting, friendly inviting mood
```

**Grokプロンプト**：
```
Character waves enthusiastically with both arms, big grin, slight bounce. No speech bubbles, no text overlays, no captions, no dialogue boxes. Duration: 10 seconds.
```

---

## 音声生成コマンド（一括）

```bash
cd ~/開発プロジェクト/cycleZ/reel-audio

# シーン1
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs \
  "なんでこれで届くん！？通販で買うた自転車、最後の組み立て自分でやらんといけんのよ。" \
  --voice sekishusai --target 10 --speed 1.8 \
  --output cyclez_chain_online_01.mp3

# シーン2
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs \
  "ほんでハンドルちょっと斜め、ブレーキ片効き、変速も決まらん。これで走るんけ？危ねぇて。" \
  --voice sekishusai --target 10 --speed 1.8 \
  --output cyclez_chain_online_02.mp3

# シーン3
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs \
  "で、半年したらブレーキ効かんようになって、結局店に持ち込むんよ。最初から相談しときゃええんに。" \
  --voice sekishusai --target 10 --speed 1.8 \
  --output cyclez_chain_online_03.mp3

# シーン4
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs \
  "最初は2万安く見えても、5年走ったらほぼ一緒。後の調整代、ポジション、保証、全部入れたらな。" \
  --voice sekishusai --target 10 --speed 1.8 \
  --output cyclez_chain_online_04.mp3

# シーン5
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs \
  "困ったとき駆け込める場所があるんが一番デカい。これは値段表に載らんやつなんよ。" \
  --voice sekishusai --target 10 --speed 1.8 \
  --output cyclez_chain_online_05.mp3

# シーン6
node ~/開発プロジェクト/03_FIREFITNESS/firefitness-lp/scripts/generate-reel-audio.mjs \
  "買う前に一回寄ってみてや。岡山駅から自転車で数分、cycleZで待っとるけぇ。" \
  --voice sekishusai --target 10 --speed 1.8 \
  --output cyclez_chain_online_06.mp3
```

## 投稿時キャプション案（Instagram）

> 通販で買うた自転車、半年後どうなる？
>
> 最初の値段は安く見えても、後の調整・ポジション・保証を入れたら5年でほぼ同じ。
> 困ったとき駆け込める場所があるかどうか、これがいちばん効いてくる。
>
> 詳しくは記事に書いたけぇ、買う前に読んでみて。
> プロフィールのリンク → ブログ「メーカー直販で買えば安いは本当か」
>
> #cyclez #岡山自転車 #ロードバイク岡山 #クロスバイク岡山 #自転車選び #岡山駅 #チェーンくん
