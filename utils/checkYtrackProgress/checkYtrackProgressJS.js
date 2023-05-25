const {
  readJsonFile, convertJSONDatatoXLSXData,
} = require("../utils");
const axios = require("axios");
const fs = require("fs");
const shell = require("shelljs");
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
    let quests = ["data", "loop", "find", "time", "call-me-maybe", "dom", "object"]
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
      for (const quest of quests) {
        progress[quest] = 0;
      }
      console.log("\x1b[31m%s\x1b[0m", `${progress.lastName}`);
      progress.data = questChecker(
        JSData,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        16
      );
      progress.loop = questChecker(
        JSLoop,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        13
      );

      progress.find = questChecker(
        JSFind,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        5
      );

      progress.time = questChecker(
        JSTime,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        7
      );

      progress["call-me-maybe"] = questChecker(
        JSCallMeMaybe,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        11
      );

      progress.dom = questChecker(
        JSDom,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );

      progress.object = questChecker(
        JSObject,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        12
      );
      progress.total = `${Math.round(((progress.data.required + progress.data.bonus) +
        (progress.loop.required + progress.loop.bonus) +
        (progress.find.required + progress.find.bonus) +
        (progress.time.required + progress.time.bonus) +
        (progress["call-me-maybe"].required + progress["call-me-maybe"].bonus) +
        (progress.dom.required + progress.dom.bonus) +
        (progress.object.required + progress.object.bonus)) / 74 * 100)} %`
      res.push(progress);
      resolve(res);
    }
    let XLSXData = convertJSONDatatoXLSXData(res);
    if (!fs.existsSync(`./results`)) {
      fs.mkdirSync(`./results`);
    }
    if (!fs.existsSync("./results/YtrackProgress")) {
      fs.mkdirSync("./results/YtrackProgress");
    }
    fs.writeFileSync(`./results/YtrackProgress/${fileName}_YTrackProgressJS.xlsx`, XLSXData);
    fs.rmSync(`./repo/${fileName}_${repoName}`, {recursive: true, force: true});
    console.clear();
    console.log("Correction terminé");
  });
};

module.exports = {checkYtrackProgressJS};
