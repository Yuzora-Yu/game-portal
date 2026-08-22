# 実装引継ぎ 2026-08-22

## 作業場所

`C:\Users\surfa\Documents\Codex\yu-zora-game-portal_20260822`

元のゲームポータル、YU-ZORA母艦、PRISMA ABYSSリポジトリには変更を加えていません。

## 実施内容

### ページと画像

- `game-prisma-abyss.html` を `GAME01_prisma-abyss.html` へ改名
- `game-kanji-crash-keyboard.html` を `GAME02_kanji-crash-keyboard.html` へ改名
- GAME01固有画像を `assets/game-pages/GAME01_prisma-abyss/` へ集約
- GAME02固有画像を `assets/game-pages/GAME02_kanji-crash-keyboard/` へ集約
- 一覧、CSS、JavaScript、canonical、Open Graph画像の参照を更新
- 旧紹介URLから新URLへの308転送をWorkerへ追加

### 紹介ページ

- 両ページ下部の長い注意書きを `※掲載画面は開発中のものです。` へ簡略化
- GAME02へ専用V2スタイルとページ内ナビゲーションを追加
- GAME02のcanonicalとOpen Graph情報を追加

### NEWS

- 原因: ソースHTMLには「読み込み中」だけがあり、記事2件はJavaScript実行後に生成されていた
- `scripts/news-data.js` を唯一のデータ源として維持
- ビルド時にトップへ最新3件まで、一覧へ全記事を通常の `<a href>` 付きで初期HTML出力
- 初期HTMLがある場合、`scripts/news-render.js` は再描画せず二重表示を防止
- 記事0件ではビルドを失敗させる

### 管理

- `config/game-pages.json` にページ台帳を追加
- `tools/validate-structure.mjs` にページ名、画像配置、参照、NEWS記事の検証を追加
- `docs/` と `config/` はビルド成果物から除外

## 検証結果

`npm test` 成功:

```text
Structure validation passed: 2 game pages, 34 referenced assets, 2 news posts.
Build complete: static game portal copied to dist/; 2 news posts pre-rendered.
```

ブラウザ確認:

- 1280×720: トップ、NEWS一覧、GAME02を確認
- 390×844: GAME01、GAME02を確認
- 両ゲーム紹介ページで画像参照切れなし
- ページ全体の横あふれなし
- 主要ボタン高さ56px
- トップ初期HTMLに2件（全記事数が2件のため、上限3件内）
- NEWS一覧初期HTMLに全2件
- JavaScript実行後も2件のままで二重表示なし

## 管理者による反映時の確認

1. 作業コピーと本番リポジトリの最新差分を確認する。
2. 必要な変更を本番リポジトリへ手動反映する。
3. `npm test` を再実行する。
4. 旧紹介URLの308転送と新URLのcanonicalをステージングで確認する。
5. 公開後、HTMLソース上でトップとNEWS一覧に `data-news-id` 付き項目が存在することを確認する。
