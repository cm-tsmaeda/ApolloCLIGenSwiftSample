# Apollo CLI for iOS swift サンプル

Apollo CLIを使って、swiftファイルを書き出すサンプル。

このサンプルではGithubのgraphqlAPIにアクセスします。<br>
https://developer.github.com/v4/guides/using-the-explorer/

## インストール

[Apollo CLI](https://github.com/apollographql/apollo-tooling) をインストールします


```
npm install
```

## 設定

```
src/settings.js
```
の中の `authToken` を書き換えます。

## Query / Mutation ファイルを作成

```
input/query
```

の中にGraphQLファイルを作成します。<br>
ここでは  `Sample1.graphql` としました。<br>
このファイル名がそのまま書き出し後の swift ファイルになります。

今回はqueryファイルのみ作成しました。 mutationも作成すれば書き出されます。 

## Schemaファイルをダウンロード

以下のコマンドで Schema をダウンロードします
```
npm run schema
```

保存先
```
output/github_schema.json
```

## Swiftファイルの書き出し

以下のコマンドでSwiftファイルが出力されます。
```
npm run codegen
```

出力先
```
output/query
```