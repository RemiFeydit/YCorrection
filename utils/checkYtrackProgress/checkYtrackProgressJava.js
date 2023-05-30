const {
  readJsonFile, convertJSONDatatoXLSXData,
} = require("../utils");
const axios = require("axios");
const fs = require("fs");
const {questChecker} = require("../questChecker");
const {cloneRepos} = require("../cloneRepos");
const {JavaQuest1, JavaQuest4, JavaQuest3, JavaQuest2} = require("../dataYTrack/JavaQuests");

const checkYtrackProgressJava = (fileName, repoName) => {
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
      for (let i = 1; i <= 4; i++) {
        progress[`quest${i}`] = 0;
      }
      console.log("\x1b[31m%s\x1b[0m", `${progress.lastName}`);
      progress.quest1 = questChecker(
        JavaQuest1,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );
      progress.quest2 = questChecker(
        JavaQuest2,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );

      progress.quest3 = questChecker(
        JavaQuest3,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );

      progress.quest4 = questChecker(
        JavaQuest4,
        progress.lastName,
        repo.firstName,
        `${fileName}_${repoName}`,
        10
      );

      progress.total = `${Math.round(Object.keys(progress).slice(1).reduce((accumulator, key) => accumulator + progress[key]["required"] + progress[key]["bonus"], 0) / 40 * 100)} %`
      res.push(progress);
      resolve(res);
    }
    let XLSXData = convertJSONDatatoXLSXData(res);
    fs.writeFileSync(`./results/YtrackProgress/${fileName}_YTrackProgressJava.xlsx`, XLSXData);
    fs.rmSync(`./repo/${fileName}_${repoName}`, {recursive: true, force: true});
    console.clear();
    console.log("Vérification du parcours Java terminé");
  });
};
module.exports = {checkYtrackProgressJava};
