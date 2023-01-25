const fs = require("fs");
const axios = require("axios");
const utils = require("./utils");
require("dotenv").config();

const checkYtrackName = async (fileName) => {
  let missingRepo = [];
  return new Promise(async (resolve, reject) => {
    const repo = utils.readJsonFile(`./data/${fileName}.json`);
    for (const student of repo) {
      await axios
        .get(
          `https://ytrack.learn.ynov.com/git/api/v1/users/${student.ytrackName}?token=${process.env.API_KEY}`
        )
        .catch((error) => {
          missingRepo.push(student.lastName);
        });
    }
    resolve(missingRepo);
  });
};
module.exports = { checkYtrackName };
