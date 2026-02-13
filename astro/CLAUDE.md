# CLAUDE.md — Astro サンプル

## 概要

Astro 5 による静的ビルド（SSG）+ React Islands アーキテクチャ。フィルタリング/ソートと HTML レンダラーのみ React Island として動作。

## 技術スタック

- Astro 5（静的ビルド）
- React 19（`@astrojs/react` — Islands `client:load`）
- Tailwind CSS **v4**（Vite プラグイン統合）
- shadcn/ui（Select コンポーネントのみ）

## 開発コマンド

```bash
pnpm dev      # 開発サーバー (port 3000)
pnpm build    # 静的ビルド → dist/
pnpm preview  # ビルド結果のプレビュー
pnpm lint     # ESLint
pnpm format   # Prettier チェック
```

## ディレクトリ構成

```
src/
├── api/                    # BeCraftClient + API 関数
├── components/
│   ├── layout/             # Header.astro
│   ├── ArticleContent.tsx  # BeCraftHTMLRenderer ラッパー（React Island）
│   └── ui/                 # shadcn/ui Select
├── features/articles/      # 記事機能モジュール
│   ├── components/         # ArticleCard, ArticleFilter, ArticleList
│   ├── utils/              # ソートロジック
│   └── types.ts            # SortOption 型
├── layouts/                # BaseLayout.astro
├── lib/                    # cn() ユーティリティ
├── pages/                  # ファイルベースルーティング
└── styles/                 # global.css（Tailwind v4 テーマ）
```

## Astro 固有の注意事項

### Tailwind CSS v4

- `@import 'tailwindcss'` / `@plugin` / `@theme` 構文を使用（v3 の `@tailwind` ディレクティブではない）
- `@tailwindcss/vite` プラグインとして `astro.config.ts` で統合
- `tailwind.config.js` は存在しない — テーマ定義は `global.css` 内の `@theme` ブロック
- カスタムユーティリティは `@utility` ディレクティブで定義

### React Islands

- `.tsx` コンポーネントを `.astro` ファイル内で `client:load` で呼び出す
- Astro コンポーネント（`.astro`）は React ではなくテンプレート構文
- サーバーサイドロジックは `.astro` のフロントマター（`---` ブロック）内で実行

### 環境変数

- `import.meta.env.BECRAFT_API_URL` でアクセス（Astro の Vite ベース環境変数）
- `VITE_` プレフィックスなし = サーバーサイド専用（ブラウザに露出しない）

### 静的ビルド

- `getStaticPaths()` で動的ルートを事前生成
- ビルド時に全 API データを取得し静的 HTML を生成
