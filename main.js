const {correctionExamSQL} = require("./utils/correctionExamSQL");
const {checkYtrackName} = require("./utils/checkYtrackName");
const {cloneRepos} = require("./utils/clone");
const {correctionExamJS} = require("./utils/correctionExamJS");
const csvToJSON = require("./utils/csvToJson");
const {checkYtrackProgressJS} = require("./utils/checkYtrackProgress/checkYtrackProgressJS");
const fs = require("fs");
const menu = require("console-menu");
const {
  isFileExists,
  getFilesFromFolder,
  displayBadYtrackName,
  displayMissingRepo,
  getUserInput
} = require("./utils/utils");

const main = async () => {
  if (!isFileExists("./data")) {
    fs.mkdirSync("./data");
    fs.mkdirSync("./data/json");
  }
  let menu = require("console-menu");
  menu(
    [
      {hotkey: "1", title: "Converti le fichier CSV de l'HP en JSON"},
      {
        hotkey: "2",
        title: "Vérifie que tous les pseudos YTrack de la classe sont corrects",
      },
      {hotkey: "3", title: "Clone tous les repos"},
      {hotkey: "4", title: "Lance la correction de l'Exam de Javascript"},
      {hotkey: "5", title: "Lance la correction de l'Exam de SQL"},
      {hotkey: "6", title: "Lance le check d'un parcours YTrack"},
      {hotkey: "7", title: "Quitter"},
    ],
    {
      header: "YCorrection",
      border: true,
    }
  ).then(async (item) => {
    switch (item.hotkey) {
      case "1":
        const filesData = getFilesFromFolder("data", "csv")
        if (filesData.length == 0) {
          console.log("Il n'y a pas de fichiers dans le dossier data")
          break
          await main()
        }
        menu(
          filesData,
          {
            header: "Quel est le fichier à convertir ?",
            border: true,
          }
        ).then(async item => {
          if (item.title == "Retour") {
            await main()
          } else {
            await csvToJSON(item.title);
            await main()
          }
        })
        break;
      case "2":
        let JSONFiles = getFilesFromFolder("data/json", "json")
        menu(
          JSONFiles,
          {
            header: "Quel est le fichier à utiliser ?",
            border: true,
          }
        ).then(async item => {
          if (item.title == "Retour") {
            await main()
          } else {
            const badYtrackName = await checkYtrackName(item.title);
            displayBadYtrackName(badYtrackName);
            await main()
          }
        })
        break;
      case "3":
        let JSONFiles2 = getFilesFromFolder("data/json", "json")
        menu(
          JSONFiles2,
          {
            header: "Quel est le fichier JSON à utiliser ?",
            border: true,
          }
        ).then(async item => {
          if (item.title == "Retour") {
            await main()
          } else {
            let repoName = getUserInput(
              "Quel est le nom du repo que vous voulez cloner?\n"
            );
            let missingRepos = await cloneRepos(item.title, repoName);
            displayMissingRepo(missingRepos);
            await main();
          }
        })
        break;
      case "4":
        let JSONFiles3 = getFilesFromFolder("data/json", "json")
        menu(
          JSONFiles3,
          {
            header: "Quel est le fichier JSON à utiliser pour la correction JS ?",
            border: true,
          }
        ).then(async item => {
          if (item.title == "Retour") {
            await main()
          } else {
            await correctionExamJS(item.title);
            await main();
          }
        })
        break;
      case "5":
        let fileNameSQL = getUserInput(
          "Comment s'appelle le fichier JSON que vous voulez utiliser pour la correction ?\n"
        );
        await correctionExamSQL(fileNameSQL);
        break;
      case "6":
        let fileNameCheckJS = getUserInput(
          "Comment s'appelle le fichier JSON que vous voulez utiliser pour la correction ?\n"
        );
        let repoNameCheckJS = utils.getUserInput(
          "Comment s'appelle le fichier JSON que vous voulez utiliser pour la correction ?\n"
        );
        await checkYtrackProgressJS(fileNameCheckJS, repoNameCheckJS);
      case "7":
        console.log("Bye ! o/");
        return;
    }
  });
};

main();
