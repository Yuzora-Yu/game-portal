# YUZORA GAME ARCHIVE — portal draft

自作ブラウザゲームをまとめるポータルサイトの静的HTML案です。

## ファイル

- `index.html`: トップページ
- `privacy.html`: プライバシーポリシー案
- `styles.css`: 共通スタイル
- `assets/`: RPG-TESTリポジトリから使用した画像
- `ads.txt.example`: AdSense承認後に書き換えるひな型
- `robots.txt`: クローラー設定

## 公開前に必ず変更する箇所

1. `YOUR-EMAIL@example.com` を問い合わせ先へ変更
2. `privacy.html` の制定日・最終改定日を変更
3. `index.html` のゲームURLを本番URLへ変更
4. 実際に利用する広告・解析サービスに合わせてプライバシーポリシーを確認
5. AdSense承認後に広告コードと `ads.txt` を設定
6. サイト名を変更する場合は、HTMLのtitle・見出し・footerを一括変更

## 推奨構成

ソースコードはGitHubに置いたまま、公開先だけCloudflare Pagesにします。

```text
GitHub
├─ portal repository  ──> Cloudflare Pages ──> example.com
└─ RPG-TEST repository ─> Cloudflare Pages ──> prisma.example.com
```

ポータル内にゲーム紹介ページを追加し、実際のゲームは各サブドメインで起動する形が管理しやすいです。

## Cloudflare Pages設定（静的HTML）

- Framework preset: `None`
- Production branch: `main`
- Build command: 空欄
- Build output directory: ポータルファイルを置いたディレクトリ（リポジトリ直下なら `.`）

## デザイン方針

- レトロな同人誌・ゲーム雑誌の紙面をイメージ
- 角丸、半透明カード、大きなグラデーションを避ける
- 色、余白、罫線、影をCSS変数で統一
- 日本語本文は読みやすいシステムフォントを使用
- スマートフォンでは1カラム化
- キーボードフォーカスと `prefers-reduced-motion` に対応

## 注意

プライバシーポリシーは一般的な文案です。実際の運用、利用サービス、対象地域に応じて確認し、必要に応じて専門家へ相談してください。
