# Hasura Cloud practice

Hasura Cloud とはクラウドに存在するデータを GraphQL もしくは REST API を使用して、フロントと API 連携が行えるクラウドサービスです。

## Develop enviroment

- OS: macOS
- TextEditor: Visual studio code

## Required

- Node

## Setup

Hasura cloud と通信を行うため、エンドポイントをソースコードに記述する必要があります。
詳細は下記ソースコードを参照。

#### src/libs/apolloClient.ts

```typescript:src/libs/apolloClient.ts
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://********/graphql' // ←左記をエンドポイントに変更してください。
    }),
    cache: new InMemoryCache(),
  })
}
```

既存の GraphQL コードを追加・変更・削除する場合は、以下を変更してください。

#### codegen.yml

```yml
overwrite: true
schema: 'https://********/graphql' # ←左記をエンドポイントに変更してください。
documents: 'src/queries/**/*.ts'
generates:
  src/types/generated/graphql.tsx:
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
```

## Run command

```bash
npm instaii
# or
yarn install
```

```bash
npm run dev
# or
yarn dev
```
