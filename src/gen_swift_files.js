const exec = require('child_process').exec;
const fs = require('fs');
const settings = require('./settings');

const WORKING_FILE_PATH = "./input/temp.graphql";

function removeLastFileSeparatorIfNeeds(path) {
    if(path.length === 0){
        return "";
    }
    let lastChar = path.substr(-1);
    if(lastChar === '/'){
        return path.substr(0, path.length - 1);
    }
    return path;
}

function buildCodeGenCommand(graphqlPath, swiftPath){
    const mainCommand = "apollo client:codegen";
    const parameters = {
        "includes": graphqlPath,
        "localSchemaFile": `${settings.schemaPath}`,
        "target": "swift",
        "passthroughCustomScalars" : null
    };
    const output = swiftPath;

    let result = mainCommand;
    result += ` ${output}`;
    for(let key in parameters){
        if(parameters[key] === null) {
            result += ` --${key}`;
        } else {
            result += ` --${key}="${parameters[key]}"`;
        }
    }
    return result;
}

async function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (stderr) {
                //console.log(stderr);
                reject(stderr);
                return;
            }
            //console.log(stdout);
            resolve(stdout);
        });
    });
}

async function removeFileIfExists(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (accessError)=>{
            if (accessError) {
                // 存在しないので成功とする
                resolve(true);
                return;
            }
            fs.unlink(filePath, (removeError)=>{
                if(removeError){
                    reject(removeError);
                    return;
                }
                resolve(true);
            })
        });
    });
}

async function concatGraphQLFiles(inputDir) {
    return new Promise(async (resolve, reject) => {
        let modifiedInputPath = removeLastFileSeparatorIfNeeds(inputDir);
        let concatCommand = `cat ${modifiedInputPath}/*.graphql > ${WORKING_FILE_PATH}`;
        console.log('command: ', concatCommand);
        await executeCommand(concatCommand);
        resolve(WORKING_FILE_PATH);
    });
}

async function main() {
    await removeFileIfExists(WORKING_FILE_PATH);
    await concatGraphQLFiles(settings.inputDirPath);
    const swiftPath = removeLastFileSeparatorIfNeeds(settings.outputSwiftDirPath) + "/" + settings.outputSwiftFileName;
    const command = buildCodeGenCommand(WORKING_FILE_PATH, swiftPath);
    console.log(command);
    const result = await executeCommand(command);
    console.log(result);
    await removeFileIfExists(WORKING_FILE_PATH);
}

main();
