const utils = require("./utils");

const writeResultsExam = (fileName) => {
    const repo = utils.readJsonFile(`./data/${fileName}.json`);
    const results = [];
    let result = {};
    for (let student of repo) {
        result = {};
        result.lastName = student.lastName;
        result.firstName = student.firstName;
        results.push(result);
    }
    return results;
};

console.log(writeResultsExam("B1"));
