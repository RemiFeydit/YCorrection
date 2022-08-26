const fs = require("fs");
const shell = require("shelljs");
const axios = require("axios");

const readJsonFile = (file) => {
    let bufferData = fs.readFileSync(file);
    let stData = bufferData.toString();
    let data = JSON.parse(stData);
    return data;
};

const cloneRepos = async (fileName) => {
    let missingRepo = [];
    return new Promise(async (resolve, reject) => {
        const repo = readJsonFile(`./data/${fileName}.json`);
        shell.mkdir("repo");
        for (const student of repo) {
            await axios
                .get(`${student.repoApiLink}`)
                .then((response) => {
                    shell.cd(__dirname + "/repo");
                    shell.exec(
                        `git clone ${student.repoLink} ${student.lastName}_${student.firstName}`
                    );
                })
                .catch((error) => {
                    missingRepo.push(student.lastName);
                });
        }
        resolve(missingRepo);
    });
};

module.exports = cloneRepos;
