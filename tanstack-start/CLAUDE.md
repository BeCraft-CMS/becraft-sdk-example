# CLAUDE.md — TanStack Start サンプル

## 概要

TanStack Start による SSR 対応のフルスタック React アプリケーション。TanStack Router でルーティングし、サーバー関数で API 呼び出しを行う。

## 技術スタック

- React 19 + TanStack Start（SSR）
- TanStack Router（ファイルベースルーティング + 自動ルートツリー生成）
- Tailwind CSS **v3** + tailwindcss-animate
- shadcn/ui（Button, Card, Select）
- Vite 7

## 開発コマンド

```bash
pnpm dev      # 開発サーバー (port 3000)
pnpm build    # ビルド → .output/
pnpm start    # プロダクションサーバー起動 (node .output/server/index.mjs)
pnpm lint     # ESLint
pnpm format   # Prettier チェック
```

## ディレクトリ構成

```
src/
├── api/                        # サーバーサイド API（.server.ts）
│   ├── client.server.ts        # BeCraftClient インスタンス
│   └── articles.server.ts      # 記事関連サーバー関数
├── components/
│   ├── layout/                 # Header
│   ├── ui/                     # shadcn/ui (Button, Card, Select)
│   └── NotFound.tsx            # 404 ページ
├── features/articles/          # 記事機能モジュール
│   ├── components/             # ArticleCard, ArticleFilter
│   ├── utils/                  # ソートロジック
│   └── types.ts                # SortOption 型
├── lib/                        # cn() ユーティリティ
├── routes/                     # TanStack Router ページ
│   ├── __root.tsx              # ルートレイアウト
│   ├── index.tsx               # 記事一覧
│   └── articles/$articleId.tsx # 記事詳細
├── router.tsx                  # ルーター設定
├── routeTree.gen.ts            # 自動生成（編集不可）
└── index.css                   # グローバルスタイル
```

## TanStack Start 固有の注意事項

### Tailwind CSS v3

- `tailwind.config.js` でテーマを定義（v4 の `@theme` 構文ではない）
- `postcss.config.js` で Tailwind + autoprefixer を統合
- `tailwindcss-animate` プラグインで Radix UI アニメーション対応
- shadcn/ui 設定: `components.json`

### サーバーサイド API

- `.server.ts` サフィックスのファイルはサーバーサイドのみで実行される
- `process.env` で環境変数にアクセス（`import.meta.env` ではない）
- `createServerFn` でサーバー関数を定義

### ルーティング

- `src/routes/` 以下のファイルから `routeTree.gen.ts` が自動生成される
- `routeTree.gen.ts` は手動編集不可（ビルド時/開発時に自動更新）
- `<Link>` コンポーネントでクライアントサイドナビゲーション
- ルートパラメータ: `$paramName` 形式（例: `$articleId.tsx`）

### shadcn/ui

- `components.json` に設定あり（style: default, baseColor: slate）
- コンポーネント追加: `npx shadcn@latest add <component>`
- エイリアス: `@/components`, `@/lib/utils`
