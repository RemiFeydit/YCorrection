const {
  readJsonFile, convertJSONDatatoXLSXData,
} = require("../utils");
const axios = require("axios");
const fs = require("fs");
const {questChecker} = require("../questChecker");
const {PHPQuest1, PHPQuest2, PHPQuest4, PHPQuest3, PHPQuest5} = require("../dataYTrack/PHPQuests");
const {cloneRepos} = require("../cloneRepos");

const checkYtrackProgressPHP = (fileName, repoName) => {
  let isWin = process.platform === "win32";
  let filePath = isWin
    ? `${__dirname.replace("\\utils\\checkYtrackProgress", "")}\\data\\json\\${fileName}.json`
    : `${__dirname.replace("/utils/checkYtrackProgress", "")}/data/json/${fileName}.json`;
  return new Promise(async (resolve, reject) => {
    await cloneRepos(`${fileName}.json`, `${repoName}`)
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
      for (let i = 1; i <= 5; i++) {
        progress[`quest${i}`] = 0;
      }
      console.log("\x1b[31m%s\x1b[0m", `${progress.lastName}`);
      progress.quest1 = questChecker(
        PHPQuest1,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        3
      );
      progress.quest2 = questChecker(
        PHPQuest2,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        6
      );

      progress.quest3 = questChecker(
        PHPQuest3,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );

      progress.quest4 = questChecker(
        PHPQuest4,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        11
      );

      progress.quest5 = questChecker(
        PHPQuest5,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        8
      );
      progress.total = `${Math.round(Object.keys(progress).slice(1).reduce((accumulator, key) => accumulator + progress[key]["required"] + progress[key]["bonus"], 0) / 38 * 100)} %`
      res.push(progress);
      resolve(res);
    }
    let XLSXData = convertJSONDatatoXLSXData(res);
    if (!fs.existsSync(`./results`)) {
      fs.mkdirSync("./results");
    }
    if (!fs.existsSync("./results/YtrackProgress")) {
      fs.mkdirSync("./results/YtrackProgress");
    }
    fs.writeFileSync(`./results/YtrackProgress/${fileName}_YTrackProgressPHP.xlsx`, XLSXData);
    fs.rmSync(`./repo/${fileName}_${repoName}`, {recursive: true, force: true});
    console.clear();
    console.log("Correction terminé");
  });
};
module.exports = {checkYtrackProgressPHP};
