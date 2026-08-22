# ゲーム紹介ページ管理ルール

更新日: 2026-08-22

## 1. 正本

- ページ台帳: `config/game-pages.json`
- 紹介ページ: リポジトリ直下の `GAME{NN}_{slug}.html`
- ページ別画像: `assets/game-pages/GAME{NN}_{slug}/`
- 一覧導線: `index.html`
- 共通表示: `styles.css`
- 旧URL転送: `worker/index.js`

HTMLや画像を追加する前にページ台帳へ登録し、最後に `npm test` を実行します。

## 2. 命名規則

ページと画像フォルダは同じ識別子を使います。

```text
GAME01_prisma-abyss.html
assets/game-pages/GAME01_prisma-abyss/
```

- `GAME` は大文字固定。
- 番号は2桁固定。公開後の番号は欠番になっても再利用しない。
- slugは英小文字・数字・ハイフンだけを使用する。
- HTMLと画像フォルダの `GAME{NN}_{slug}` を必ず一致させる。
- 表示上の `GAME FILE 01` も同じ番号にする。

## 3. 掲載画像

ゲーム紹介ページ固有の画像は、すべて対応するページフォルダへ置きます。`assets/` 直下へゲーム名付き画像を増やしません。

```text
assets/
├── favicon/                         全ページ共有
├── game-pages/
│   ├── GAME01_prisma-abyss/         GAME01専用
│   └── GAME02_kanji-crash-keyboard/ GAME02専用
└── yuu_mintia.jpg                   開発者ページ共有
```

ページフォルダ内は、枚数が増えた段階で用途別サブフォルダを使います。

- `characters/` または既存のキャラクター群
- `screens/` またはPC／スマートフォン画面
- `showcase/` または世界・装備・モンスター紹介
- ロゴ、アイコン、キービジュアルはページフォルダ直下

同じ画像を別ページで使う場合も、まず所有ページを決めます。本当に全ページ共通のブランド素材だけを共有フォルダへ昇格させます。

## 4. 新しいゲーム紹介ページの追加

1. 未使用の次番号とslugを決める。
2. `config/game-pages.json` に1件追加する。
3. `GAME{NN}_{slug}.html` を作る。
4. `assets/game-pages/GAME{NN}_{slug}/` を作り、掲載画像を置く。
5. `index.html` に通常の `<a href>` で紹介ページとゲーム本体への導線を追加する。
6. canonical、Open Graph URL、OG画像を本番URLに合わせる。
7. 下部注記は原則 `※掲載画面は開発中のものです。` の一文にする。
8. PC幅1280×720とスマートフォン幅390×844を確認する。
9. `npm test` を実行する。

## 5. URL変更

紹介ページを改名した場合は、次を同時に行います。

- `index.html` の全リンクを更新
- canonicalと`og:url`を更新
- READMEとページ台帳を更新
- `worker/index.js` に旧URLから新URLへの308転送を追加

既に公開したURLを単純削除しません。検索結果、共有済みリンク、ブックマークを新URLへ引き継ぎます。

## 6. 更新時の表示ルール

- 見出し構造は `h1` をページの主題に1つ、以降を `h2` / `h3` とする。
- 画像には内容を説明する `alt` と実寸の `width` / `height` を付ける。
- 主要導線はJavaScriptなしでも通常の `<a href>` で辿れるようにする。
- スマートフォンで遊べないゲームでも、紹介ページ自体はスマートフォンで読めるようにする。
- タップ対象は原則44px以上、主要ボタンは48px以上を目安にする。
- 横スクロールを使うギャラリー以外でページ全体の横あふれを発生させない。

## 7. 完了確認

```powershell
npm test
```

検証は、台帳とページ名の一致、画像フォルダ、画像参照、旧ページ名の残存、NEWS記事ファイル、ビルド時の静的NEWS出力を確認します。
