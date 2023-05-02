const { correctionExamSQL } = require("./utils/correctionExamSQL");
const { checkYtrackName } = require("./utils/checkYtrackName");
const { cloneRepos } = require("./utils/clone");
const { correctionExamJS } = require("./utils/correctionExamJS");
const csvToJSON = require("./utils/csvToJson");
const utils = require("./utils/utils");
const { checkYtrackProgressJS } = require("./utils/checkYtrackProgressJS");

const main = async () => {
  let menu = require("console-menu");
  menu(
    [
      { hotkey: "1", title: "Converti le fichier CSV de l'HP en JSON" },
      {
        hotkey: "2",
        title: "Vérifie que tous les pseudos YTrack de la classe sont corrects",
      },
      { hotkey: "3", title: "Clone tous les repos" },
      { hotkey: "4", title: "Lance la correction de l'Exam de Javascript" },
      { hotkey: "5", title: "Lance la correction de l'Exam de SQL" },
      { hotkey: "6", title: "Lance le check d'un parcours YTrack" },
      { hotkey: "7", title: "Quitter" },
    ],
    {
      header: "YCorrection",
      border: true,
    }
  ).then(async (item) => {
    switch (item.hotkey) {
      case "1":
        let CSVName = utils.getUserInput(
          "Comment s'appelle le fichier CSV que vous voulez convertir ?\n"
        );
        await csvToJSON(CSVName);
        main();
        break;
      case "2":
        let JSONName = utils.getUserInput(
          "Comment s'appelle le fichier JSON que vous voulez vérifier ?\n"
        );
        const badYtrackName = await checkYtrackName(JSONName);
        utils.displayBadYtrackName(badYtrackName);
        main();
        break;
      case "3":
        let promoName = utils.getUserInput(
          "Comment s'appelle le fichier JSON que vous voulez utiliser ?\n"
        );
        let repoName = utils.getUserInput(
          "Quel est le nom du repo que vous voulez cloner?\n"
        );
        let missingRepos = await cloneRepos(promoName, repoName);
        utils.displayMissingRepo(missingRepos);
        main();
        break;
      case "4":
        let fileName = utils.getUserInput(
          "Comment s'appelle le fichier JSON que vous voulez utiliser pour la correction ?\n"
        );
        await correctionExamJS(fileName);
        break;
      case "5":
        let fileNameSQL = utils.getUserInput(
          "Comment s'appelle le fichier JSON que vous voulez utiliser pour la correction ?\n"
        );
        await correctionExamSQL(fileNameSQL);
        break;
      case "6":
        let fileNameCheckJS = utils.getUserInput(
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
