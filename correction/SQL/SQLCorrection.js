const utils = require("./utils");
const shell = require("shelljs");
const fs = require("fs");
const axios = require("axios");
const {
  inverseStringCorrection,
  manipArrayCorrection,
  lettersOccurenceCorrection,
  TCGBattleCorrection,
  extractObjectCorrection,
} = require("../correction/JAVASCRIPT/JSCorrection");

const correctionExamJS = (fileName) => {
  return new Promise(async (resolve, reject) => {
    let res = [];
    let repoName = "";
    const repos = utils.readJsonFile(
      `${__dirname.replace("/utils", "")}/data/${fileName}.json`
    );
    for (let repo of repos) {
      let grades = { lastName: repo.lastName };
      await axios
        .get(
          `https://ytrack.learn.ynov.com/git/api/v1/repos/${repo.ytrackName}/${repoName}?token=${process.env.API_KEY}`
        )
        .then((response) => {
          grades.lastPush = utils.convertDate(response.data.updated_at);
        })
        .catch((error) => {
          grades.lastPush = "N/A";
        });
      for (let i = 1; i <= 5; i++) {
        grades[`exercice${i}`] = 0;
      }
      grades.total = 0;
      resolve(res);
    }
    let csvData = utils.convertJSONDatatoCSVData(res);
    if (!fs.existsSync(`./results`)) {
      shell.exec(`mkdir ./results`);
    }
    fs.writeFileSync(`./results/${fileName}_jsResults.csv`, csvData);
    console.clear();
    console.log("Correction terminé");
  });
};

module.exports = { correctionExamJS };
