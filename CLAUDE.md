# CLAUDE.md

becraft-sdk の使用方法を示すサンプルアプリケーション集。各サブディレクトリが独立したアプリケーション。

## リポジトリ構成

```
astro/           — Astro 5 + React Islands（SSG）
tanstack-start/  — TanStack Start + React 19（SSR）
```

## 共通規約

### パッケージマネージャ

- **pnpm** を使用（各プロジェクトの `engines` で pnpm >= 9.0.0 を要求）

### コードスタイル

- **Prettier**: printWidth=100, singleQuote=true, trailingComma='all', semi=true
- **ESLint**: Flat Config 形式、TypeScript + React + Prettier 統合
- unused vars は `_` プレフィックスで許容（`argsIgnorePattern: '^_'`）

### TypeScript

- strict モード有効
- パスエイリアス: `@/*` → `./src/*`

### becraft-sdk

- `BeCraftClient` でコンテンツ・カテゴリ・タグの API を呼び出す
- API キーはサーバーサイドのみで使用（ブラウザに公開しない）
- 環境変数: `BECRAFT_API_URL`, `BECRAFT_API_KEY`

### ディレクトリ構成パターン（feature-based）

両プロジェクトで共通の構成:

```
src/
├── api/          # サーバーサイド API クライアント
├── components/
│   ├── layout/   # レイアウトコンポーネント
│   └── ui/       # 汎用 UI コンポーネント（shadcn/ui）
├── features/     # 機能モジュール（components/, utils/, types.ts）
├── lib/          # 共通ユーティリティ（cn() など）
```

### スタイリング

- Tailwind CSS + shadcn/ui パターン
- CSS 変数ベースのカラーシステム（`hsl(var(--primary))` 等）
- `cn()` ユーティリティ（clsx + tailwind-merge）でクラス名を結合

### コマンド

各プロジェクトディレクトリ内で実行:

```bash
pnpm dev        # 開発サーバー起動
pnpm build      # ビルド
pnpm lint       # ESLint 実行
pnpm format     # Prettier チェック
```
