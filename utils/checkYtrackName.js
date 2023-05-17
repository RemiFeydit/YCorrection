const axios = require("axios");
const {readJsonFile, removeExtraSpaces} = require("./utils");
require("dotenv").config();

const checkYtrackName = async (fileName) => {
  let missingRepo = [];
  return new Promise(async (resolve, reject) => {
    const repo = readJsonFile(`./data/json/${fileName}`);
    for (const student of repo) {
      await axios
        .get(
          `https://ytrack.learn.ynov.com/git/api/v1/users/${student.ytrackName}?token=${process.env.API_KEY}`
        )
        .then((data) => {
          let jsonFullName = removeExtraSpaces(
            `${student.lastName} ${student.firstName}`
          );
          let ytrackFullName = removeExtraSpaces(data.data.full_name);
          if (jsonFullName !== ytrackFullName) {
            missingRepo.push(student.lastName);
          }
        })
        .catch(() => {
          missingRepo.push(student.lastName);
        });
    }
    resolve(missingRepo);
  });
};
module.exports = {checkYtrackName};
