const fs = require("fs");
const readline = require("readline-sync");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const XLSX = require('xlsx');

const readJsonFile = (file) => {
  let bufferData = fs.readFileSync(file);
  let stData = bufferData.toString();
  let data = JSON.parse(stData);
  return data;
};

const isObject = (obj) => {
  return obj !== undefined && obj !== null && obj.constructor == Object;
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
      ? "Tous les repos ont pu être clonés"
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

const convertJSONDatatoXLSXData = (jsonData) => {
  const flattenObject = (obj, prefix = "") => {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + "." : "";
      if (typeof obj[k] === "object") {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  };

  const flattenData = jsonData.map((obj) => flattenObject(obj));
  const keys = Object.keys(flattenData[0]);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(flattenData, {header: keys});
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const xlsxData = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"});
  return xlsxData;
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

const removeExtraSpaces = (str) => {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .replace(/(\S+)\s+(\S+)/g, "$1$2");
};

const isFileExists = (filePath) => {
  return fs.existsSync(filePath) ? true : false;
};

function findFile(filename, dir) {
  let arr = filename.split("/")
  filename = arr.slice(-1)[0]
  dir = `${dir}${arr.length > 1 ? `/${arr[0]}` : ""}`
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const result = findFile(filename, filePath);
      if (result) {
        return result;
      }
    } else if (file === filename) {
      return filePath;
    }
  }
  return null;
}

const getFilesFromFolder = (dir, fileExtension) => {
  let filesData = fs.readdirSync(dir).filter((val) => val.includes(`.${fileExtension}`)).map((val, index) => {
    return {hotkey: index + 1, title: val}
  })
  if (filesData.length == 0) {
    return filesData
  } else {
    filesData.push({hotkey: "X", title: "Retour"})
  }
  return filesData
}

module.exports = {
  isObject,
  readJsonFile,
  compareArrays,
  arraysEqual,
  compareObjects,
  displayBadYtrackName,
  displayMissingRepo,
  getUserInput,
  convertDate,
  convertJSONDatatoXLSXData,
  executeQuery,
  removeExtraSpaces,
  isFileExists,
  findFile,
  getFilesFromFolder
};
