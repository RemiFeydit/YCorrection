const {
  readJsonFile, convertJSONDatatoXLSXData,
} = require("../utils");
const axios = require("axios");
const fs = require("fs");
const shell = require("shelljs");
const {questChecker} = require("../questChecker");
const {
  GoLangQuest1, GoLangQuest2, GoLangQuest3, GoLangQuest4, GoLangQuest5, GoLangQuest6, GoLangQuest7, GoLangQuest8,
  GoLangQuest9
} = require("../dataYTrack/GOLangQuest");

const checkYtrackProgressGoLang = (fileName, repoName) => {
  let isWin = process.platform === "win32";
  let filePath = isWin
    ? `${__dirname.replace("\\utils\\checkYtrackProgress", "")}\\data\\json\\${fileName}.json`
    : `${__dirname.replace("/utils/checkYtrackProgress", "")}/data/json/${fileName}.json`;
  return new Promise(async (resolve, reject) => {
    let res = [];
    const repos = readJsonFile(filePath);
    for (let repo of repos) {
      let progress = {lastName: repo.lastName.replaceAll(" ", "-")};
      await axios
        .get(
          `https://ytrack.learn.ynov.com/git/api/v1/repos/${repo.ytrackName}/${repoName}?token=${process.env.API_KEY}`
        )
        .catch(() => {
        });
      for (let i = 1; i <= 10; i++) {
        progress[`quest${i}`] = 0;
      }
      console.log("\x1b[31m%s\x1b[0m", `${progress.lastName}`);
      progress.quest1 = questChecker(
        GoLangQuest1,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        5
      );

      progress.quest2 = questChecker(
        GoLangQuest2,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );

      progress.quest3 = questChecker(
        GoLangQuest3,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        8
      );

      progress.quest4 = questChecker(
        GoLangQuest4,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        19
      );

      progress.quest5 = questChecker(
        GoLangQuest5,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        5
      );

      progress.quest6 = questChecker(
        GoLangQuest6,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        5
      );

      progress.quest7 = questChecker(
        GoLangQuest7,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        4
      );

      progress.quest8 = questChecker(
        GoLangQuest8,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        7
      );
      progress.total = `${Math.round(((progress.quest1.required + progress.quest1.bonus) +
        (progress.quest2.required + progress.quest2.bonus) +
        (progress.quest3.required + progress.quest3.bonus) +
        (progress.quest4.required + progress.quest4.bonus) +
        (progress.quest5.required + progress.quest5.bonus) +
        (progress.quest6.required + progress.quest6.bonus) +
        (progress.quest7.required + progress.quest7.bonus) +
        (progress.quest8.required + progress.quest8.bonus)) / 63 * 100)} %`
      res.push(progress);
      resolve(res);
    }
    let XLSXData = convertJSONDatatoXLSXData(res);
    if (!fs.existsSync(`./results`)) {
      shell.exec(`mkdir results`);
    }
    fs.writeFileSync(`./results/${fileName}_YTrackProgressGoLang.xlsx`, XLSXData);
    fs.rmSync(`./repo/${fileName}_${repoName}`, {recursive: true, force: true});
    console.clear();
    console.log("Correction terminé");
  });
};
module.exports = {checkYtrackProgressGoLang};
