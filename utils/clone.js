const fs = require("fs");
const shell = require("shelljs");
const axios = require("axios");
const utils = require("./utils");

const cloneRepos = async (fileName, repoName) => {
  let missingRepo = [];
  return new Promise(async (resolve, reject) => {
    const repo = utils.readJsonFile(`./data/${fileName}.json`);
    if (!fs.existsSync(`./repo`)) {
      console.log("create folder file");
      shell.mkdir("./repo");
    }
    for (const student of repo) {
      await axios
        .get(
          `https://ytrack.learn.ynov.com/git/api/v1/repos/${student.ytrackName}/${repoName}?token=${process.env.API_KEY}`
        )
        .then((response) => {
          if (!fs.existsSync(`repo/${fileName}_${repoName}`)) {
            shell.mkdir(`repo/${fileName}_${repoName}`);
          }
          if (
            !fs.existsSync(
              `repo/${fileName}_${repoName}/${student.lastName}_${student.firstName}`
            )
          ) {
            shell.exec(
              `git clone ${response.data.clone_url} repo/${fileName}_${repoName}/${student.lastName}_${student.firstName}`
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
module.exports = { cloneRepos };
