const fs = require("fs");
const shell = require("shelljs");
const axios = require("axios");
const utils = require("./utils");

const cloneRepos = async (fileName) => {
    let missingRepo = [];
    return new Promise(async (resolve, reject) => {
        const repo = utils.readJsonFile(`./data/${fileName}.json`);
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
        shell.cd(`${__dirname}/repo`);
        resolve(missingRepo);
    });
};

module.exports = { cloneRepos };
