# TanStack Start サンプル

[becraft-sdk](https://github.com/BeCraft-CMS/becraft-sdk) を使用した SSR 対応のフルスタック React アプリケーション。

## 技術スタック

- **フレームワーク**: React 19 + TanStack Start (SSR)
- **ルーティング**: TanStack Router
- **スタイリング**: Tailwind CSS + shadcn/ui
- **ビルドツール**: Vite

## 機能

- 記事一覧の表示
- 記事詳細ページ
- カテゴリ・タグによるフィルタリング
- ソート機能（新しい順、古い順、タイトル順）
- 動的メタタグ（title）
- サーバーサイドレンダリング（SSR）

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

**注意**: API キーはサーバーサイドでのみ使用され、ブラウザには公開されません。

### 開発サーバーの起動

```bash
pnpm dev
```

### ビルド

```bash
pnpm build
```

### プロダクションサーバーの起動

```bash
pnpm start
```

## ディレクトリ構成

```
src/
├── api/                          # サーバーサイド API
│   ├── client.server.ts          # BeCraftClient インスタンス
│   └── articles.server.ts        # 記事関連のサーバー関数
├── components/                   # 共通 UI コンポーネント
│   ├── layout/                   # レイアウトコンポーネント
│   │   └── Header.tsx
│   ├── ui/                       # shadcn/ui コンポーネント
│   └── NotFound.tsx              # 404 ページ
├── features/                     # 機能モジュール
│   └── articles/                 # 記事機能
│       ├── components/           # 記事関連コンポーネント
│       │   ├── ArticleCard.tsx
│       │   └── ArticleFilter.tsx
│       ├── types.ts              # 型定義
│       ├── utils.ts              # ユーティリティ関数
│       └── index.ts              # エクスポート
├── lib/                          # 共通ユーティリティ
├── routes/                       # ページコンポーネント (TanStack Router)
│   ├── __root.tsx                # ルートレイアウト (HTML 構造)
│   ├── index.tsx                 # 記事一覧ページ
│   └── articles/
│       └── $articleId.tsx        # 記事詳細ページ
├── router.tsx                    # ルーター設定
└── index.css                     # グローバルスタイル
```
