const utils = require("./utils");
const shelljs = require("shelljs");
const fs = require("fs");

const correctionExamJS = (fileName) => {
    return new Promise(async (resolve, reject) => {
        let res = [];
        let data = "caca";
        const repos = utils.readJsonFile(`../data/${fileName}.json`);
        for (let repo of repos) {
            let grades = { lastName: repo.lastName };
            for (let i = 1; i <= 5; i++) {
                grades[`exercice${i}`] = 0;
            }
            if (
                fs.existsSync(
                    `./${repo.lastName}_${repo.firstName}/manip-array.js`
                )
            ) {
                try {
                    const inverseString = require(`./repo/${repo.lastName}_${repo.firstName}/inverse-string`);
                    if (inverseString("") == "") {
                        grades.exercice1 += 0.5;
                    }
                    if (inverseString("Hello World")) {
                        grades.exercice1 += 0.75;
                    }
                    if (
                        inverseString("Ynov Ytrack Informatique ") ==
                        "Informatique Ytrack Ynov"
                    ) {
                        grades.exercice1 += 0.75;
                    }
                    if (inverseString("Hello") == "Hello") {
                        grades.exercice1 += 0.75;
                    }
                    if (inverseString(" Hey") == "Hey") {
                        grades.exercice1 += 0.75;
                    }
                    if (inverseString(undefined) == "") {
                        grades.exercice1 += 0.5;
                    }
                } catch (error) {
                    reject(error);
                }
            }
            if (
                fs.existsSync(
                    `./${repo.lastName}_${repo.firstName}/manip-array.js`
                )
            ) {
                try {
                    const manipArray = require(`./repo/${repo.lastName}_${repo.firstName}/manip-array`);
                    if ((utils.arraysEqual(manipArray([])), [])) {
                        grades.exercice2 += 0.5;
                    }
                    if (
                        utils.compareArrays(manipArray([1, 2, 3, 4, 5]), [
                            [2, 2, 6, 4, 10],
                            [-4, -3, -2, -1, 0],
                            [3],
                            [5, 4, 3, 2, 1],
                        ])
                    ) {
                        grades.exercice2 += 0.75;
                    }
                    if (
                        utils.compareArrays(manipArray([50, 5, 42, 86, 2, 1]), [
                            [50, 10, 42, 86, 2, 2],
                            [45, 0, 37, 81, -3, -4],
                            [42],
                            [86, 50, 42, 5, 2, 1],
                        ])
                    ) {
                        grades.exercice2 += 0.75;
                    }
                    if (
                        utils.compareArrays(manipArray([10, 5, 2, 13]), [
                            [10, 10, 2, 26],
                            [5, 0, -3, 8],
                            [],
                            [13, 10, 5, 2],
                        ])
                    ) {
                        grades.exercice2 += 0.75;
                    }
                    if (
                        utils.compareArrays(
                            manipArray([
                                45,
                                "z",
                                66,
                                "a",
                                33,
                                null,
                                30,
                                undefined,
                            ]),
                            [
                                [90, 66, 66, 30],
                                [40, 61, 28, 25],
                                [66, 33],
                                [66, 45, 33, 30],
                            ]
                        )
                    ) {
                        grades.exercice2 += 0.75;
                    }
                    if (utils.arraysEqual(manipArray(undefined) == [])) {
                        grades.exercice2 += 0.5;
                    }
                } catch (error) {
                    reject(error);
                }
            }
            if (
                fs.existsSync(
                    `./${repo.lastName}_${repo.firstName}/letters-occurence.js`
                )
            ) {
            }
            if (
                fs.existsSync(
                    `./${repo.lastName}_${repo.firstName}/tcg-battle.js`
                )
            ) {
            }
            if (
                fs.existsSync(
                    `./${repo.lastName}_${repo.firstName}/extract-object.js`
                )
            ) {
            }
            res.push(grades);
        }
        console.log(res);
        data = JSON.stringify(res);
        fs.writeFileSync(`./jsResults.json`, data);
    });
};

module.exports = { correctionExamJS };
