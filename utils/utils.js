const fs = require("fs");
const readline = require("readline-sync");

const readJsonFile = (file) => {
  let bufferData = fs.readFileSync(file);
  let stData = bufferData.toString();
  let data = JSON.parse(stData);
  return data;
};

const arraysEqual = (a, b) => {
  a = Array.isArray(a) ? a : [];
  b = Array.isArray(b) ? b : [];
  return a.length === b.length && a.every((el, ix) => el === b[ix]);
};

const compareArrays = (array1, array2) => {
  if (array1.length != array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
      if (!arraysEqual(array1[i], array2[i])) return false;
    }
    if (typeof array1[i] == "object" && typeof array2[i] == "object") {
      if (!compareObjects(array1[i], array2[i])) return false;
    }
  }
  return true;
};

const compareObjects = (obj1, obj2) => {
  return JSON.stringify(obj1) == JSON.stringify(obj2);
};

const getUserInput = (message) => {
  let userInput = readline.question(message);
  return userInput;
};

const displayBadYtrackName = (badYtrackNames) => {
  // Affiche les pseudos YTrack incorrect manquants
  let res =
    badYtrackNames.length == 0
      ? "Tous les noms YTrack sont corrects"
      : "Les noms Ytrack suivants ne sont pas correct : \n";
  for (const badYtrackName of badYtrackNames) {
    res += `- ${badYtrackName} \n`;
  }
  console.log(res);
};

const displayMissingRepo = (badYtrackNames) => {
  // Affiche les repos manquants
  let res =
    badYtrackNames.length == 0
      ? "Tous les noms YTrack sont corrects"
      : "Les repos suivants n'ont pas pu être cloné : \n";
  for (const badYtrackName of badYtrackNames) {
    res += `- ${badYtrackName} \n`;
  }
  console.log(res);
};

const convertDate = (strDate) => {
  const date = new Date(strDate);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("fr-FR", options);
  return formatter.format(date);
};

const convertJSONDatatoCSVData = (jsonData) => {
  const keys = Object.keys(jsonData[0]);

  // convertir les données JSON en format CSV
  let csvData = keys.toString() + "\n";
  for (let i = 0; i < jsonData.length; i++) {
    csvData += Object.values(jsonData[i]).toString() + "\n";
  }
  return csvData;
};

module.exports = {
  readJsonFile,
  compareArrays,
  arraysEqual,
  compareObjects,
  displayBadYtrackName,
  displayMissingRepo,
  getUserInput,
  convertDate,
  convertJSONDatatoCSVData,
};
