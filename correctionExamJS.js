const utils = require("./utils");
const shelljs = require("shelljs");
const fs = require("fs");

const correctionExamJS = (fileName) => {
    return new Promise(async (resolve, reject) => {
        let res = [];
        let data = "";
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
                try {
                    const lettersOccurence = require(`./repo/${repo.lastName}_${repo.firstName}/letters-occurence`);
                    if (utils.compareObjects(lettersOccurence(""), {})) {
                        grades.exercice3 += 0.25;
                    }
                    if (utils.compareObjects(lettersOccurence(null), {})) {
                        grades.exercice3 += 0.25;
                    }
                    if (utils.compareObjects(lettersOccurence(NaN), {})) {
                        grades.exercice3 += 0.25;
                    }
                    if (utils.compareObjects(lettersOccurence(undefined), {})) {
                        grades.exercice3 += 0.25;
                    }
                    if (
                        utils.compareObjects(lettersOccurence("Hello World"), {
                            h: 1,
                            e: 1,
                            l: 3,
                            o: 2,
                            " ": 1,
                            w: 1,
                            r: 1,
                            d: 1,
                        })
                    ) {
                        grades.exercice3 += 0.5;
                    }
                    if (
                        utils.compareObjects(
                            lettersOccurence(
                                "hruio rehiorg hre hgr orehg h oirhegrhhoigrh"
                            ),
                            {
                                h: 10,
                                r: 9,
                                u: 1,
                                i: 4,
                                o: 5,
                                " ": 6,
                                e: 4,
                                g: 5,
                            }
                        )
                    ) {
                        grades.exercice3 += 1;
                    }
                    if (
                        utils.compareObjects(
                            lettersOccurence(
                                "occtyazZaXqWxRdBts6fCx6c3Jj8HgeK9x4qRy3SYiVvCKkqBT"
                            ),
                            {
                                3: 2,
                                4: 1,
                                6: 2,
                                8: 1,
                                9: 1,
                                o: 1,
                                c: 5,
                                t: 3,
                                y: 3,
                                a: 2,
                                z: 2,
                                x: 4,
                                q: 3,
                                w: 1,
                                r: 2,
                                d: 1,
                                b: 2,
                                s: 2,
                                f: 1,
                                j: 2,
                                h: 1,
                                g: 1,
                                e: 1,
                                k: 3,
                                i: 1,
                                v: 2,
                            }
                        )
                    ) {
                        grades.exercice3 += 1;
                    }
                    if (
                        utils.compareObjects(lettersOccurence(65466632), {
                            2: 1,
                            3: 1,
                            4: 1,
                            5: 1,
                            6: 4,
                        })
                    ) {
                        grades.exercice3 += 0.5;
                    }
                } catch (error) {
                    reject(error);
                }
            }
            if (
                fs.existsSync(
                    `./${repo.lastName}_${repo.firstName}/tcg-battle.js`
                )
            ) {
                try {
                    const TCGBattle = require(`./repo/${repo.lastName}_${repo.firstName}/tcg-battle`);
                    if (TCGBattle("2 30 27", "9 38 1") == "Gagnant") {
                        grades.exercice4 += 0.25;
                    }
                    if (TCGBattle("1 2 3", "3 2 1") == "Nul") {
                        grades.exercice4 += 0.75;
                    }
                    if (
                        TCGBattle(
                            "35 27 10 4 33 14 38 7 20 39 35 31 13 25 23 7 6 25 41 11 19 32 26 30 15 29 28 24 40 16 18 39 42 16 38 31 3 19 32 26 3 9 33 29 35 12 2 6 6 32",
                            "35 26 30 31 10 39 2 2 2 30 32 22 23 40 18 32 33 38 16 4 11 42 16 18 22 14 23 40 8 38 7 15 4 13 24 4 19 13 26 38 22 9 6 31 38 40 2 29 24 30"
                        ) == "Perdant"
                    ) {
                        grades.exercice4 += 0.75;
                    }
                    if (
                        TCGBattle(
                            "35 7 1 18 22 8 11 32 37 25 31 15 9 42 15 37 37 18 8 20 20 36 16 39 5",
                            "42 20 27 11 11 13 23 24 3 13 33 21 14 4 40 14 35 26 6 27 23 4 30 17 2"
                        ) == "Nul"
                    ) {
                        grades.exercice4 += 0.75;
                    }
                    if (TCGBattle("42 25 12 3", "25 42 13 4") == "Gagnant") {
                        grades.exercice4 += 0.75;
                    }
                    if (TCGBattle("12 24 42 6", "10 6 42 20") == "Perdant") {
                        grades.exercice4 += 0.75;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            if (
                fs.existsSync(
                    `./${repo.lastName}_${repo.firstName}/extract-object.js`
                )
            ) {
                try {
                    const extractObject = require(`./repo/${repo.lastName}_${repo.firstName}/extract-object`);
                    if (
                        utils.compareArrays(
                            extractObject(
                                `Je ne vais pas taffer comme la Chine {"Valentin":"prenom","Sullyvan":"nom"} parce que taffer comme la Chine ça fait monter le taux de Co2`
                            ),
                            [{ prenom: "Valentin", nom: "Sullyvan" }]
                        )
                    ) {
                        grades.exercice5 += 1;
                    }
                    if (
                        utils.compareArrays(
                            extractObject(
                                `Hello there {"hello":2,"a":3} comment ça va ? {"a":1,"z":2} {"hello":"World","abc":"def"}`
                            ),
                            [
                                { 2: "hello", 3: "a" },
                                { 1: "a", 2: "z" },
                                { World: "hello", def: "abc" },
                            ]
                        )
                    ) {
                        grades.exercice5 += 1;
                    }
                    if (
                        utils.compareObjects(
                            extractObject(
                                `Hello there {"hello":2,"a":3} comment ça va ? {"a":1,"z":2} {"hello":"World","abc":"def"}`
                            ),
                            [
                                { 2: "hello", 3: "a" },
                                { 1: "a", 2: "z" },
                                { World: "hello", def: "abc" },
                            ]
                        )
                    ) {
                        grades.exercice5 += 1;
                    }
                    if (
                        utils.compareArrays(
                            extractObject(`Hello there comment ça va ?`),
                            []
                        )
                    ) {
                        grades.exercice5 += 0.5;
                    }

                    if (utils.compareArrays(extractObject(``), [])) {
                        grades.exercice5 += 0.5;
                    }
                } catch (error) {
                    reject(error);
                }
            }
            res.push(grades);
            resolve(res);
        }
        data = JSON.stringify(res);
        fs.writeFileSync(`./jsResults.json`, data);
    });
};

module.exports = { correctionExamJS };
