# YU-ZORA GAMES 引継ぎ資料

このフォルダは、ゲーム紹介ページ、掲載画像、NEWS、公開URLを継続管理するための正本資料です。

## 参照順

1. `GAME_PAGE_MANAGEMENT.md` — 命名規則、画像管理、追加・更新手順
2. `CURRENT_PAGE_INVENTORY.md` — 現在のページ・URL・画像フォルダ台帳
3. `NEWS_STATIC_RENDERING.md` — NEWSをクローラから認識可能にする生成方式
4. `IMPLEMENTATION_HANDOFF_20260822.md` — 今回の変更内容と検証結果

機械可読なページ台帳は `config/game-pages.json`、構造検証は `npm run validate` を正本とします。

## 作業上の前提

- PCとスマートフォンの両方を標準確認対象にする。
- 物理キーボード前提など、ゲーム固有の端末制約は許容し、紹介ページで明示する。
- ゲーム番号は公開後に再利用しない。
- 公開リポジトリへのコミットと本番反映は管理者が手動で行う。
- `docs/` と `config/` は管理用であり、ビルド成果物には含めない。
