const {
  readJsonFile,
  convertJSONDatatoCSVData,
} = require("../utils");
const axios = require("axios");
const fs = require("fs");
const shell = require("shelljs");
const {JSCheckQuest} = require("../../correction/JAVASCRIPT/JSCheck");
const {JSData, JSLoop, JSFind, JSTime, JSCallMeMaybe, JSDom, JSObject} = require("../dataYTrack/JSQuests");

const checkYtrackProgressJS = (fileName, repoName) => {
  let isWin = process.platform === "win32";
  let filePath = isWin
    ? `${__dirname.replace("\\utils\\checkYtrackProgress", "")}\\data\\${fileName}.json`
    : `${__dirname.replace("/utils/checkYtrackProgress", "")}/data/${fileName}.json`;
  return new Promise(async (resolve, reject) => {
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
      progress.data = JSCheckQuest(
        JSData,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        16
      );
      progress.loop = JSCheckQuest(
        JSLoop,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        13
      );

      progress.find = JSCheckQuest(
        JSFind,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        5
      );

      progress.time = JSCheckQuest(
        JSTime,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        7
      );

      progress["call-me-maybe"] = JSCheckQuest(
        JSCallMeMaybe,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        11
      );

      progress.dom = JSCheckQuest(
        JSDom,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );

      progress.object = JSCheckQuest(
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
    let csvData = convertJSONDatatoCSVData(res);
    if (!fs.existsSync(`./results`)) {
      shell.exec(`mkdir results`);
    }
    fs.writeFileSync(`./results/${fileName}_YTrackProgressJS.csv`, csvData);
    console.clear();
    console.log("Correction terminé");
  });
};

module.exports = {checkYtrackProgressJS};
