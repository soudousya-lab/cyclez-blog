# SNS流入計測メモ

Instagramなどのプロフィール/ハイライト/ストーリーズリンクは、直接 `/` に貼らずに計測用リンクを使う。

## 基本リンク

```text
https://cycle-z.com/sns/instagram?content=bio
```

上記は下記に302リダイレクトされる。

```text
https://cycle-z.com/?utm_source=instagram&utm_medium=social&utm_campaign=instagram_profile&utm_content=bio
```

## 用途別リンク

```text
プロフィール:
https://cycle-z.com/sns/instagram?content=bio

ハイライト「初めての方」:
https://cycle-z.com/sns/instagram?content=highlight_beginner

ハイライト「試乗会」:
https://cycle-z.com/sns/instagram?content=highlight_test_ride

ハイライト「修理/料金」:
https://cycle-z.com/sns/instagram?content=highlight_maintenance

ストーリーズ投稿:
https://cycle-z.com/sns/instagram?content=story_YYYYMMDD
```

## GA4で見るイベント

- イベント名: `social_landing`
- 主なパラメータ:
  - `social_platform`
  - `traffic_source`
  - `traffic_medium`
  - `traffic_campaign`
  - `traffic_content`
  - `page_path`

標準の集客レポートでは `utm_source=instagram` / `utm_medium=social` として集計される。
細かいリンク別比較は `traffic_content` で見る。

## Clarityで見るタグ

- `social_platform`
- `traffic_source`
- `traffic_medium`
- `traffic_campaign`
- `traffic_content`

