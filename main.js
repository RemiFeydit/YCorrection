const cloneRepos = require("./clone");
const csvToJSON = require("./csvToJson");

const main = async () => {
    const arg = process.argv.slice(2);
    if (arg.length < 2) {
        console.log("Veuillez rentrer un nom de fichier CSV et un nom de repo");
        return;
    }
    const fileName = arg[0];
    const repoName = arg[1];
    const noJson = arg.length == 3 ? arg[2] : false;
    if (noJson) {
        await csvToJSON(fileName, repoName);
    }
    let missingRepos = await cloneRepos(fileName);
    let res = "Les repos suivant sont manquants ou mal nommés : \n";
    for (const missingRepo of missingRepos) {
        res += `- ${missingRepo} \n`;
    }
    console.log(res);
};

main();
