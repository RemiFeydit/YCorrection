const fs = require("fs");
const { cd } = require("shelljs");

const csvToJSON = async (fileName, repoName) => {
    return new Promise((resolve, reject) => {
        let data = "";
        if (!fs.existsSync("./data")) {
            fs.mkdirSync("./data");
        }
        try {
            const csv = fs.readFileSync(`./data/${fileName}.csv`).toString();
            const lines = csv.split("\n");
            const result = [];

            lines.slice(1).map((l) => {
                const obj = {};
                const line = l.split(";");
                const nameArr = line[0].replaceAll('"', "").split(" ");
                obj.firstName = nameArr
                    .at(-1)
                    .replaceAll("'", "")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                obj.lastName = nameArr
                    .slice(0, -1)
                    .join(" ")
                    .replaceAll("'", "")
                    .replaceAll(" ", "-")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                obj.repoLink = `https://git.ytrack.learn.ynov.com/${
                    obj.firstName[0].toUpperCase() +
                    obj.lastName.replaceAll(" ", "-")
                }/${repoName}`;
                obj.repoApiLink = `https://git.ytrack.learn.ynov.com/git/api/v1/repos/${
                    obj.firstName[0].toUpperCase() +
                    obj.lastName.replaceAll(" ", "-")
                }/${repoName}?token=63d081c88287e7fa570687cda923012bbca07b27`;
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
