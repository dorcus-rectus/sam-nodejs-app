# SAM Node.js App

このプロジェクトは、AWS Serverless Application Model (SAM) を使用して構築された Node.js アプリケーションです。

## プロジェクトのセットアップ

### 前提条件

- Node.js (最新バージョン)
- AWS CLI
- AWS SAM CLI

### インストール

1. リポジトリをクローンします。

    ```bash
    git clone https://github.com/your-repo/sam-nodejs-app.git
    cd sam-nodejs-app
    ```

2. 依存関係をインストールします。

    ```bash
    npm install
    ```

### ビルド

プロジェクトをビルドするには、以下のコマンドを実行します。

```bash
sam build
```

### デプロイ

プロジェクトをデプロイするには、以下のコマンドを実行します。

```bash
sam deploy --guided
```

### テスト

ローカルでテストを実行するには、以下のコマンドを実行します。

```bash
npm test
```

### GitHub ActionsによるCI/CD

このプロジェクトではGitHub Actionsを使用してCI/CDパイプラインを構築しています。以下の手順で設定を行います。

1. `.github/workflows` ディレクトリを作成し、`ci-cd.yml` ファイルを追加します。

    ```yaml
    name: CI/CD Pipeline

    on:
      push:
        branches:
          - main
      pull_request:
        branches:
          - main

    jobs:
      build:
        runs-on: ubuntu-latest

        steps:
        - name: Check out code
          uses: actions/checkout@v2

        - name: Set up Node.js
          uses: actions/setup-node@v2
          with:
            node-version: 'lts/*'

        - name: Install dependencies
          run: npm install

        - name: Run tests
          run: npm test

        - name: Build project
          run: sam build

        - name: Configure AWS credentials
          uses: aws-actions/configure-aws-credentials@v1
          with:
            role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
            aws-region: ap-northeast-1

        - name: Deploy to AWS
          run: sam deploy --no-confirm-changeset --no-fail-on-empty-changeset --stack-name sam-nodejs-app
    ```

2. GitHubリポジトリのSecretsにAWSのロールARNを追加します。

    - `AWS_ROLE_TO_ASSUME`

## ディレクトリ構成

```
sam-nodejs-app/
├── src/                # ソースコード
├── tests/              # テストコード
├── template.yaml       # SAM テンプレート
├── .github/            # GitHub Actions ワークフロー
│   └── workflows/
│       └── ci-cd.yml   # CI/CD パイプライン設定
└── README.md           # このファイル
```

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細については、LICENSE ファイルを参照してください。
