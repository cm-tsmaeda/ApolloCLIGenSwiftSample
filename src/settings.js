// API end point
const APIEndPoint = "https://api.github.com/graphql";

// トークン
const authToken = "Your token is here!";

// スキーマの出力パス
const schemaPath = "./output/github_schema.json";

// 入力ファイルのディレクトリ
const inputDirPath = "./input";

// 出力Swiftファイルのディレクトリ
const outputSwiftDirPath = "./output";

// 出力Swiftファイルの名前
const outputSwiftFileName = "GeneratedGraphQLTypes.swift";

// exports
exports.APIEndPoint = APIEndPoint;
exports.authToken = authToken;
exports.schemaPath = schemaPath;
exports.inputDirPath = inputDirPath;
exports.outputSwiftDirPath = outputSwiftDirPath;
exports.outputSwiftFileName = outputSwiftFileName;
