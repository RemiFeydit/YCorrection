const {
  readJsonFile, convertJSONDatatoXLSXData,
} = require("../utils");
const axios = require("axios");
const fs = require("fs");
const {questChecker} = require("../questChecker");
const {
  GoLangQuest1, GoLangQuest2, GoLangQuest3, GoLangQuest4, GoLangQuest5, GoLangQuest6, GoLangQuest7, GoLangQuest8,
} = require("../dataYTrack/GOLangQuests");
const {cloneRepos} = require("../cloneRepos");

const checkYtrackProgressGoLang = (fileName, repoName) => {
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
      progress.total = `${Math.round(Object.keys(progress).slice(1).reduce((accumulator, key) => accumulator + progress[key]["required"] + progress[key]["bonus"], 0) / 63 * 100)} %`

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
    fs.writeFileSync(`./results/YtrackProgress/${fileName}_YTrackProgressGoLang.xlsx`, XLSXData);
    fs.rmSync(`./repo/${fileName}_${repoName}`, {recursive: true, force: true});
    console.clear();
    console.log("Vérification du parcours GoLang terminé");
  });
};
module.exports = {checkYtrackProgressGoLang};
