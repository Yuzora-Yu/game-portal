# NEWS初期HTML生成

更新日: 2026-08-22

## 目的

JavaScriptを実行しない検索エンジン、AI点検、テキストクローラからも、NEWS記事数と記事リンクを認識できるようにします。

## データの正本

`scripts/news-data.js` の `window.NEWS_POSTS` だけを記事一覧データの正本とします。HTMLへ手作業で同じ記事を追記しません。

## ビルド処理

`tools/build.mjs` が正本データを読み込み、次の初期HTMLを `dist/` に生成します。

- `dist/index.html`: 日付順の最新3件
- `dist/news.html`: 全記事

各項目は通常の `<a href="./news/...html">` を持ちます。記事詳細HTMLは従来どおり `news/` に置きます。

## JavaScript

`scripts/news-render.js` は、初期HTMLに `data-news-id` が存在する場合は何も再描画しません。これにより二重表示を防ぎます。

ビルド前のソースHTMLを直接開いた場合だけ、従来どおり `scripts/news-data.js` から一覧を補完します。本番では初期HTMLが正本です。

## 更新手順

1. `scripts/news-data.js` の先頭へ新しい記事を追加する。
2. `news/<記事ID>.html` を追加する。
3. `npm test` を実行する。
4. `dist/index.html` が最新3件、`dist/news.html` が全件を含むことを確認する。

記事が0件の場合、ビルドは失敗します。誤って空のNEWS一覧を公開しません。
