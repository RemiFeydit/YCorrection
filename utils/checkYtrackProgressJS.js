const {
  readJsonFile,
  convertDate,
  convertJSONDatatoCSVData,
} = require("./utils");
const axios = require("axios");
const {
  inverseStringCorrection,
  manipArrayCorrection,
  lettersOccurenceCorrection,
  TCGBattleCorrection,
  extractObjectCorrection,
} = require("../correction/JAVASCRIPT/JSCorrection");
const fs = require("fs");
const shell = require("shelljs");
const { JSCheckQuest } = require("../correction/JAVASCRIPT/JSCheck");
const { JSQuest1 } = require("./dataYTrack/JSQuests");

const checkYtrackProgressJS = (fileName, repoName) => {
  let isWin = process.platform === "win32";
  let filePath = isWin
    ? `${__dirname.replace("\\utils", "")}\\data\\${fileName}.json`
    : `${__dirname.replace("/utils", "")}/data/${fileName}.json`;
  return new Promise(async (resolve, reject) => {
    let res = [];
    const repos = readJsonFile(filePath);
    for (let repo of repos) {
      let progress = { lastName: repo.lastName.replaceAll(" ", "-") };
      await axios
        .get(
          `https://ytrack.learn.ynov.com/git/api/v1/repos/${repo.ytrackName}/${repoName}?token=${process.env.API_KEY}`
        )
        .catch(() => {});
      for (let i = 1; i <= 5; i++) {
        progress[`quest${i}`] = 0;
      }
      console.log("\x1b[31m%s\x1b[0m", `${progress.lastName}`);
      console.log("\x1b[36m%s\x1b[0m", "quête1");
      progress.quest1 = JSCheckQuest(
        JSQuest1,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        16
      );
      res.push(progress);
      resolve(res);
    }
    let csvData = convertJSONDatatoCSVData(res);
    if (!fs.existsSync(`./results`)) {
      shell.exec(`mkdir results`);
    }
    fs.writeFileSync(`./results/${fileName}_YTrackProgressJS.csv`, csvData);
    console.clear();
    console.log("Correction terminé");
  });
};

module.exports = { checkYtrackProgressJS };
