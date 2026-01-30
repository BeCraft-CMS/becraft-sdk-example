# コントリビューションガイド

## 開発の始め方

1. リポジトリをフォークする
2. ローカルにクローンする
   ```bash
   git clone https://github.com/<your-username>/becraft-sdk-example.git
   cd becraft-sdk-example
   ```
3. 作業用ブランチを作成する
   ```bash
   git checkout -b feature/your-feature-name
   ```

## サンプルの追加

新しいサンプルを追加する場合は、以下のガイドラインに従ってください。

### ディレクトリ構成

- 各サンプルは独立したディレクトリに配置する
- ディレクトリ名は使用する主要な技術やフレームワークを反映させる

### 必須ファイル

- `README.md` - サンプルの説明、セットアップ手順、使用方法を記載
- `package.json` - 依存関係とスクリプトを定義

### README の記載事項

- サンプルの概要
- 使用している技術スタック
- セットアップ手順
- 実行方法
- becraft-sdk の使用例の説明

## プルリクエスト

1. 変更をコミットする
   ```bash
   git add .
   git commit -m "feat: 変更内容の説明"
   ```
2. フォークにプッシュする
   ```bash
   git push origin feature/your-feature-name
   ```
3. GitHub でプルリクエストを作成する

### コミットメッセージの規約

[Conventional Commits](https://www.conventionalcommits.org/) に従ってください。

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメントのみの変更
- `refactor:` リファクタリング
- `chore:` ビルドプロセスやツールの変更

## コードスタイル

- TypeScript を使用する
- ESLint / Prettier の設定がある場合はそれに従う

## 質問・提案

Issue を作成してお気軽にご連絡ください。
