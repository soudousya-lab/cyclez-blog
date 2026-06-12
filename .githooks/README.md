# Git Hooks

このディレクトリは `git config core.hooksPath .githooks` で有効化される。
リポジトリをクローンした新環境で有効化する場合は次のコマンドを実行：

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```

## pre-commit

`content/posts/*.md` がステージされていたら `npm run lint:articles:staged` を実行。
リンターエラーがあればコミットを停止する。

緊急時に回避する場合のみ：

```bash
git commit --no-verify -m "..."
```
