const fs = require("fs");
const { isFileExists } = require("./utils");
require("dotenv").config();

const csvToJSON = async (fileName) => {
  return new Promise((resolve, reject) => {
    let data = "";
    if (!isFileExists("./data")) {
      fs.mkdirSync("./data");
    }
    try {
      const csv = fs.readFileSync(`./data/${fileName}.csv`).toString();
      const lines = csv.split("\n");
      const result = [];

      lines.slice(2).map((l) => {
        const obj = {};
        const line = l.split(";");
        const nameArr = line[0].replaceAll('"', "").split(" ");
        obj.firstName = nameArr.at(-1);
        obj.lastName = nameArr.slice(0, -1).join(" ");
        obj.ytrackName =
          obj.lastName[0].toLowerCase() +
          obj.firstName
            .slice(0, 7)
            .replace(/[\u0300-\u036f]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        result.push(obj);
      });
      data = JSON.stringify(result);
    } catch (error) {
      console.log(error);
      return;
    }
    fs.writeFile(`./data/${fileName}.json`, data, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data written");
      resolve();
    });
  });
};

module.exports = csvToJSON;
