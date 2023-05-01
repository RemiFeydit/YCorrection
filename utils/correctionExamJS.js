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
  let isWin = process.platform === "win32";
  let filePath = isWin
    ? `${__dirname.replace("\\utils", "")}\\data\\${fileName}.json`
    : `${__dirname.replace("/utils", "")}/data/${fileName}.json`;
  console.log(filePath);
  return new Promise(async (resolve, reject) => {
    let res = [];
    let repoName = "eval-js";
    const repos = utils.readJsonFile(filePath);
    for (let repo of repos) {
      console.log("\x1b[31m%s\x1b[0m", `${repo.lastName} ${repo.firstName}`);
      let grades = { lastName: repo.lastName.replaceAll(" ", "-") };
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
      grades.exercice1 = inverseStringCorrection(
        grades.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice2 = manipArrayCorrection(
        grades.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice3 = lettersOccurenceCorrection(
        grades.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice4 = TCGBattleCorrection(
        grades.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice5 = extractObjectCorrection(
        grades.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.total =
        grades.exercice1 +
        grades.exercice2 +
        grades.exercice3 +
        grades.exercice4 +
        grades.exercice5;
      res.push(grades);
      resolve(res);
    }
    let csvData = utils.convertJSONDatatoCSVData(res);
    if (!fs.existsSync(`./results`)) {
      shell.exec(`mkdir results`);
    }
    fs.writeFileSync(`./results/${fileName}_jsResults.csv`, csvData);
    console.clear();
    console.log("Correction terminé");
  });
};

module.exports = { correctionExamJS };
