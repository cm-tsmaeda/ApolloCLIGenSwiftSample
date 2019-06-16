const exec = require('child_process').exec;
const settings = require('./settings');

const mainCommand = "apollo client:download-schema";
const parameters = {
    "endpoint": `${settings.APIEndPoint}`,
    "header": `Authorization: Bearer ${settings.authToken}`
};
const output = `${settings.schemaPath}`;

function buildCommand(mainCommand, parameters, output){
    let result = mainCommand;
    result += ` ${output}`;
    for(let key in parameters){
        result += ` --${key}="${parameters[key]}"`;
    }
    return result;
}

let command = buildCommand(mainCommand, parameters, output);
console.log(command);

exec(command, (err, stdout, stderr) => {
    if (stderr) {
        console.log(stderr);
    }
    console.log(stdout);
});
