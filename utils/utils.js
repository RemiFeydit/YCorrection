const fs = require("fs");
const readline = require("readline-sync");
const sqlite3 = require("sqlite3").verbose();

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

const executeQuery = (databaseFile, sqlQuery) => {
  return new Promise((resolve, reject) => {
    if (sqlQuery == "") {
      reject({});
    }
    let results = [];
    let db = new sqlite3.Database(databaseFile, (err) => {
      if (err) {
        reject(err);
      }
    });

    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        rows.forEach((row) => {
          results.push(row);
        });
      }
      resolve(results);
    });

    db.close((err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
  });
};

function removeExtraSpaces(str) {
  // Retirer les espaces inutiles au début et à la fin de la chaîne
  str = str.trim();

  // Remplacer tous les espaces multiples par un seul espace
  str = str.replace(/\s+/g, ' ');

  // Retirer les espaces entre les mots en les remplaçant par rien
  str = str.replace(/(\S+)\s+(\S+)/g, '$1$2');

  return str;
}


function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);
  });
}

async function timeOutFunction(func, arg) {
  try {
    await Promise.race([func(arg), timeout(5000)]);
  } catch (error) {
    console.error('Erreur:', error);
  }
}

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
  executeQuery,
  removeExtraSpaces,
  timeout
};
