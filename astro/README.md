# Astro サンプル

[@becraft/sdk](https://www.npmjs.com/package/@becraft/sdk) を使用した Astro アプリケーション。静的ビルドと React Islands アーキテクチャで構成されています。

## 技術スタック

- **フレームワーク**: Astro 5（静的ビルド）
- **UI Islands**: React 19（`@astrojs/react`）
- **スタイリング**: Tailwind CSS v4 + shadcn/ui（Select）
- **コンテンツ描画**: @becraft/sdk `BeCraftHTMLRenderer`（React Island）

## 機能

- 記事一覧の表示
- 記事詳細ページ
- カテゴリ・タグによるフィルタリング（クライアントサイド）
- ソート機能（新しい順、古い順、タイトル順）
- 動的メタタグ（title）
- 静的ビルド（SSG）— ビルド時に全ページを事前生成
- Islands Architecture — フィルタリング/ソートと HTML レンダラーのみ React を使用

## セットアップ

### 依存パッケージのインストール

```bash
pnpm install
```

### 環境変数の設定

`.env.example` を `.env` にコピーして環境変数を設定してください：

```bash
cp .env.example .env
```

| 変数名            | 説明                                 |
| ----------------- | ------------------------------------ |
| `BECRAFT_API_URL` | BeCraft API のベース URL             |
| `BECRAFT_API_KEY` | BeCraft API キー（`bcak-` で始まる） |

**注意**: API キーはビルド時のサーバーサイドでのみ使用され、ブラウザには公開されません。

### 開発サーバーの起動

```bash
pnpm dev
```

### ビルド

```bash
pnpm build
```

### プロダクションビルドのプレビュー

```bash
pnpm preview
```

## ディレクトリ構成

```
src/
├── api/                          # サーバーサイド API
│   ├── articles.ts               # 記事 API 関数
│   └── client.ts                 # BeCraftClient インスタンス
├── components/
│   ├── layout/
│   │   └── Header.astro          # ヘッダー (Astro)
│   ├── ArticleContent.tsx        # HTML レンダラー (React Island)
│   └── ui/
│       └── select.tsx            # shadcn/ui Select
├── features/
│   └── articles/
│       ├── components/
│       │   ├── ArticleCard.tsx    # 記事カード表示
│       │   ├── ArticleFilter.tsx  # カテゴリ・タグフィルター UI
│       │   ├── ArticleList.tsx    # 一覧 orchestrator (React Island)
│       │   └── index.ts          # バレルエクスポート
│       ├── utils/
│       │   ├── sort.ts           # ソートユーティリティ
│       │   └── index.ts
│       ├── types.ts              # SortOption 型定義
│       └── index.ts
├── lib/
│   └── utils.ts                  # cn() ユーティリティ (clsx + tailwind-merge)
├── layouts/
│   └── BaseLayout.astro          # 共通レイアウト
├── pages/
│   ├── index.astro               # 記事一覧ページ
│   └── articles/
│       └── [articleId].astro     # 記事詳細ページ (getStaticPaths で事前生成)
└── styles/
    └── global.css                # Tailwind CSS v4 + テーマ CSS 変数
```

## @becraft/sdk の使用例

このサンプルでは、以下の @becraft/sdk 機能を使用しています：

- `BeCraftClient` — コンテンツ・カテゴリ・タグの API クライアント
- `parseHtmlOnServer` — `BeCraftHTMLRenderer` 用のサーバーサイド HTML パース
- `BeCraftHTMLRenderer` — リッチコンテンツを描画する React コンポーネント（Astro React Island として使用）
