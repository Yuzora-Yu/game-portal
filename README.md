# YU-ZORA GAME PORTAL

自作ブラウザゲームをまとめる静的ポータルサイトです。レトロな同人ゲーム雑誌・印刷物を中心コンセプトに、ゲーム本体と紹介・更新情報を分離しています。

## 主なファイル

- `index.html`: トップページ。ゲーム詳細、ニュース、開発者、各ポリシーへの導線
- `game-prisma-abyss.html`: PRISMA ABYSS 詳細ページ
- `game-kanji-crash-keyboard.html`: 漢字 de クラッシュキーボード 詳細ページ
- `news.html`: お知らせ一覧
- `news/*.html`: お知らせ詳細ページ
- `scripts/news-data.js`: トップと一覧に表示するお知らせデータの正本
- `scripts/news-render.js`: お知らせ一覧の描画
- `developer.html`: 開発者情報とXタイムライン
- `developer/news-editor.html`: お知らせ作成用エディタ
- `developer/news-editor.js`: エディタ処理
- `privacy.html` / `terms.html` / `disclaimer.html`: YU-ZORA PORTAL 側の共通ポリシーへ案内する移転ページ
- `styles.css`: 全ページ共通スタイル
- `assets/`: ポータル表示用のゲーム画像


## 親サイト

このゲームポータルは YU-ZORA のゲーム配下として公開します。各ページのヘッダーとフッターには、母艦へ戻るための `https://yu-zora.com/` リンクを設置しています。

## ローカル確認

`file://` でも基本表示できますが、公開時と同じ相対パス確認のため、HTTPサーバーを推奨します。

```bash
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。

## お知らせ投稿手順

1. `developer/news-editor.html` を開く
2. 公開日、カテゴリ、タイトル、記事ID、概要、本文を入力
3. 「詳細HTMLをダウンロード」を押し、生成ファイルを `news/` へ配置
4. 「更新済みデータをダウンロード」を押し、`scripts/news-data.js` を置換
5. トップ、お知らせ一覧、詳細リンクを確認してコミット

エディタは静的なローカル生成ツールで、リポジトリへ直接投稿しません。認証機能もないため、公開環境に置く場合はアクセス制限を行うか、デプロイ対象から除外してください。

## 広告導入前の確認

共通のプライバシーポリシー・利用規約・免責事項は `https://yu-zora.com/` 側で管理します。ゲームポータル内の導線も親サイトの各ポリシーへ向けています。広告配信を開始する場合は、親サイト側のプライバシーポリシー、同意管理、`ads.txt` 等を実際の運用に合わせて更新してください。

## Xタイムライン

`developer.html` 内の以下2種類のURLを変更すると、表示アカウントを切り替えられます。

- `https://x.com/yuu_mintia`
- `https://twitter.com/yuu_mintia`（埋め込みウィジェット用）

外部スクリプトやトラッキング防止設定により表示されない場合があるため、プロフィールへの通常リンクも併設しています。

## 画像素材

ゲーム詳細ページでは、ゲーム内素材をポータル用に複製・WebP化して使用しています。漢字 de クラッシュキーボードは、10語モードとCPU戦を追加した最新開発版の仕様・提供画面に合わせて紹介内容を更新しています。

- 横長背景: `assets/prisma-medal-hall.webp`
- 漢字 de クラッシュキーボード: `assets/kanji-crash-start.webp`、`assets/kanji-crash-play.webp`、`assets/kanji-crash-cpu.webp`、`assets/kanji-crash-icon.svg`（配布ZIP内アイコンをそのまま使用）
- キャラクター: ジョセフ、エリーゼ、リーシア
- モンスター: かえんりゅう、アクアリリィ、ブリーズリザード

## 公開

静的HTMLのためビルドコマンドは不要です。リポジトリ直下を公開する場合、出力ディレクトリは `.` です。ゲーム本体は別URLのまま起動します。
