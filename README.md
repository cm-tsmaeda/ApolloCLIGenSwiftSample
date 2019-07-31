# Apollo CLI for iOS swift サンプル

Apollo CLIを使って、Swiftファイルを書き出すサンプル。

このサンプルではGithubのgraphqlAPIにアクセスします。<br>
https://developer.github.com/v4/guides/using-the-explorer/

`input/query` `input/mutation` にある *.graphql ファイルをSwiftファイルに変換して `output` に格納します。

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
inputフォルダ
```

の中にQueryやMutationのGraphQLファイルを複数作成します。（1枚のみでも可）<br>
ここでは  `Sample1.graphql` としました。<br>

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
