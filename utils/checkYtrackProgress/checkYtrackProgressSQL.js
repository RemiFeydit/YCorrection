const {
  readJsonFile, convertJSONDatatoXLSXData,
} = require("../utils");
const axios = require("axios");
const fs = require("fs");
const {questChecker} = require("../questChecker");
const {cloneRepos} = require("../cloneRepos");
const {SQLQuest1, SQLQuest2, SQLQuest3, SQLQuest4, SQLQuest5} = require("../dataYTrack/SQLQuests");

const checkYtrackProgressSQL = (fileName, repoName) => {
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
        SQLQuest1,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        13
      );
      progress.quest2 = questChecker(
        SQLQuest2,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        15
      );

      progress.quest3 = questChecker(
        SQLQuest3,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        14
      );

      progress.quest4 = questChecker(
        SQLQuest4,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        8
      );

      progress.quest5 = questChecker(
        SQLQuest5,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        8
      );
      progress.total = `${Math.round(Object.keys(progress).slice(1).reduce((accumulator, key) => accumulator + progress[key]["required"] + progress[key]["bonus"], 0) / 58 * 100)} %`
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
    fs.writeFileSync(`./results/YtrackProgress/${fileName}_YTrackProgressSQL.xlsx`, XLSXData);
    fs.rmSync(`./repo/${fileName}_${repoName}`, {recursive: true, force: true});
    console.clear();
    console.log("Correction terminé");
  });
};
module.exports = {checkYtrackProgressSQL};
