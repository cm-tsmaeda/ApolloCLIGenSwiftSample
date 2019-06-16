// API end point
const APIEndPoint = "https://api.github.com/graphql";

// トークン
const authToken = "Your token is here!";

// スキーマの出力パス
const schemaPath = "./output/github_schema.json";

// 入力Queryファイルのディレクトリ
const inputQueryDirPath = "./input/query";

// 入力Mutationファイルのディレクトリ
const inputMutationDirPath = "./input/mutation";

// 出力QuerySwiftファイルのディレクトリ
const outputQuerySwiftDirPath = "./output/query";

// 出力MutationSwiftファイルのディレクトリ
const outputMutationSwiftDirPath = "./output/mutation";

// exports
exports.APIEndPoint = APIEndPoint;
exports.authToken = authToken;
exports.schemaPath = schemaPath;
exports.inputQueryDirPath = inputQueryDirPath;
exports.inputMutationDirPath = inputMutationDirPath;
exports.outputQuerySwiftDirPath = outputQuerySwiftDirPath;
exports.outputMutationSwiftDirPath = outputMutationSwiftDirPath;
