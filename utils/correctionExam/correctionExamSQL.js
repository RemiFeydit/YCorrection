const fs = require("fs");
const axios = require("axios");
const {
  q1Correction,
  q2Correction,
  q3Correction,
  q4Correction,
  q5Correction,
  q6Correction,
  q7Correction,
  q8Correction,
  q9Correction,
  q10Correction,
  q11Correction,
  q12Correction,
  q13Correction,
  q14Correction,
  q15Correction,
  q16Correction,
  q17Correction,
} = require("../../correction/SQL/SQLCorrection");
const {
  readJsonFile,
  convertDate,
  isFileExists, convertJSONDatatoXLSXData,
} = require("../utils");

const correctionExamSQL = (fileName) => {
  let isWin = process.platform === "win32";
  let filePath = isWin
    ? `${__dirname.replace("\\utils\\correctionExam", "")}\\data\\json\\${fileName}.json`
    : `${__dirname.replace("/utils/correctionExam", "")}/data/json/${fileName}.json`;
  return new Promise(async (resolve, reject) => {
    let res = [];
    let repoName = "projet-sql-B2";
    const repos = readJsonFile(filePath);
    for (let repo of repos) {
      let grades = {lastName: repo.lastName, firstName: repo.firstName};
      await axios
        .get(
          `https://ytrack.learn.ynov.com/git/api/v1/repos/${repo.ytrackName}/${repoName}?token=${process.env.API_KEY}`
        )
        .then((response) => {
          grades.lastPush = convertDate(response.data.updated_at);
        })
        .catch((error) => {
          grades.lastPush = "N/A";
        });
      for (let i = 1; i <= 17; i++) {
        grades[`exercice_${i}`] = 0;
      }
      console.log(
        `Correction en cours de : ${repo.lastName} ${repo.firstName}`
      );
      grades.total = 0;
      grades.exercice_1 = await q1Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_2 = await q2Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_3 = await q3Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_4 = await q4Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_5 = await q5Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_6 = await q6Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_7 = await q7Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_8 = await q8Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_9 = await q9Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_10 = await q10Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_11 = await q11Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_12 = await q12Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_13 = await q13Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_14 = await q14Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_15 = await q15Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_16 = await q16Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.exercice_17 = await q17Correction(
        repo.lastName,
        repo.firstName,
        `${fileName}_${repoName}`
      );
      grades.total = Object.keys(grades).filter((val) => val.includes("exercice")).reduce((accumulator, key) => accumulator + grades[key], 0)
      console.log(grades.total);
      res.push(grades);
      resolve(res);
    }
    let XLSXData = convertJSONDatatoXLSXData(res);
    fs.writeFileSync(`./results/${fileName}_SQLResults.xlsx`, XLSXData);
    console.clear();
    console.log("Correction terminé");
  });
};

module.exports = {correctionExamSQL};
