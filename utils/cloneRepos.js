const shell = require("shelljs");
const axios = require("axios");
const {isFileExists, readJsonFile} = require("./utils");
const fs = require("fs");

const cloneRepos = async (fileName, repoName) => {
  let missingRepo = [];
  return new Promise(async (resolve, reject) => {
    const repo = readJsonFile(`./data/json/${fileName}`);
    for (const student of repo) {
      await axios
        .get(
          `https://ytrack.learn.ynov.com/git/api/v1/repos/${student.ytrackName}/${repoName}?token=${process.env.API_KEY}`
        )
        .then((response) => {
          if (
            !isFileExists(
              `repo/${fileName.replace(".json", "")}_${repoName}/${student.lastName.replaceAll(
                " ",
                "-"
              )}_${student.firstName}`
            )
          ) {
            console.log(
              `Clone du repo de ${student.lastName} ${student.firstName}`
            );
            shell.exec(
              `git clone ${
                response.data.clone_url
              } repo/${fileName.replace(".json", "")}_${repoName}/${student.lastName.replaceAll(
                " ",
                "-"
              )}_${student.firstName}`
            );
          }
        })
        .catch((error) => {
          missingRepo.push(student.lastName);
        });
    }
    resolve(missingRepo);
  });
};
module.exports = {cloneRepos};
