const {
  readJsonFile, convertJSONDatatoXLSXData,
} = require("../utils");
const axios = require("axios");
const fs = require("fs");
const {questChecker} = require("../questChecker");
const {JSData, JSLoop, JSFind, JSTime, JSCallMeMaybe, JSDom, JSObject} = require("../dataYTrack/JSQuests");
const {cloneRepos} = require("../cloneRepos");

const checkYtrackProgressJS = (fileName, repoName) => {
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
      for (let i = 1; i <= 7; i++) {
        progress[`quest${i}`] = 0;
      }
      console.log("\x1b[31m%s\x1b[0m", `${progress.lastName}`);
      progress.quest1 = questChecker(
        JSData,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        16
      );
      progress.quest2 = questChecker(
        JSLoop,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        13
      );

      progress.quest3 = questChecker(
        JSFind,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        5
      );

      progress.quest4 = questChecker(
        JSTime,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        7
      );

      progress.quest5 = questChecker(
        JSCallMeMaybe,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        11
      );

      progress.quest6 = questChecker(
        JSDom,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );

      progress.quest7 = questChecker(
        JSObject,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        12
      );
      progress.total = `${Math.round(Object.keys(progress).filter((val) => val.includes("quest")).reduce((accumulator, key) => accumulator + progress[key]["required"] + progress[key]["bonus"], 0) / 74 * 100)} %`

      res.push(progress);
      resolve(res);
    }
    let XLSXData = convertJSONDatatoXLSXData(res);
    fs.writeFileSync(`./results/YtrackProgress/${fileName}_YTrackProgressJS.xlsx`, XLSXData);
    fs.rmSync(`./repo/${fileName}_${repoName}`, {recursive: true, force: true});
    console.clear();
    console.log("Vérification du parcours JS terminé");
  });
};

module.exports = {checkYtrackProgressJS};
