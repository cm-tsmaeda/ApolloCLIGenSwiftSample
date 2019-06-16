const exec = require('child_process').exec;
const fs = require('fs');
const settings = require('./settings');

function buildCommand(queryPath, swiftPath){
    const mainCommand = "apollo client:codegen";
    const parameters = {
        "includes": queryPath,
        "localSchemaFile": `${settings.schemaPath}`,
        "target": "swift"
    };
    const output = swiftPath;

    let result = mainCommand;
    result += ` ${output}`;
    for(let key in parameters){
        result += ` --${key}="${parameters[key]}"`;
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

async function getFilePathList(inputDirPath, outputDirPath) {
    return new Promise((resolve, reject) => {
        let list = [];
        fs.readdir(inputDirPath, (err, files)=>{
            if (err) {
                reject(err);
                return;
            }
            files.forEach((file) => {
                let fileComps = file.split('.');
                const filePath = {
                    input: inputDirPath + "/" + file,
                    output: outputDirPath + "/" + fileComps[0] + ".swift"
                }
                list.push(filePath);
            })
            resolve(list);
        });
    });
}

async function generateCode(index, list) {
    if (list.length == 0) {
        return;
    }
    const filePath = list[index];
    const command = buildCommand(filePath.input, filePath.output);
    console.log(command);
    const result = await executeCommand(command);
    console.log(result);
    index++;
    if (index >= list.length) {
        console.log('generating codes complete');
    } else {
        await generateCode(index, list);
    }
}

async function main() {
    // query
    let list = await getFilePathList(settings.inputQueryDirPath,
                                     settings.outputQuerySwiftDirPath);
    await generateCode(0, list);

    // mutation
    list = await getFilePathList(settings.inputMutationDirPath,
                                 settings.outputMutationSwiftDirPath);
    await generateCode(0, list);
}

main();

