const fs = require("fs");
const utils = require("../../utils/utils");

const inverseStringCorrection = (lastName, firstName, repoNameDir) => {
  console.log('\x1b[36m%s\x1b[0m', 'inverse-string');
  let exercice1 = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/inverse-string.js`
    )
  ) {
    try {
      const inverseString = require(`${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/inverse-string`);
      if (inverseString("") == "") {
        exercice1 += 0.5;
      }
      if (inverseString("Hello World") == "World Hello") {
        exercice1 += 0.75;
      }
      if (
        inverseString("Ynov Ytrack Informatique ") == "Informatique Ytrack Ynov"
      ) {
        exercice1 += 0.75;
      }
      if (inverseString("Hello") == "Hello") {
        exercice1 += 0.75;
      }
      if (inverseString(" Hey") == "Hey") {
        exercice1 += 0.75;
      }
      if (inverseString(undefined) == "") {
        exercice1 += 0.5;
      }
    } catch (error) {
    }
  }
  return exercice1;
};

const manipArrayCorrection = (lastName, firstName, repoNameDir) => {
  console.log('\x1b[36m%s\x1b[0m', 'manip-array');
  let exercice2 = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/manip-array.js`
    )
  ) {
    try {
      const manipArray = require(`${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/manip-array`);
      if ((utils.arraysEqual(manipArray([])), [])) {
        exercice2 += 0.5;
      }
      if (
        utils.compareArrays(manipArray([1, 2, 3, 4, 5]), [
          [2, 2, 6, 4, 10],
          [-4, -3, -2, -1, 0],
          [3],
          [5, 4, 3, 2, 1],
        ])
      ) {
        exercice2 += 0.75;
      }
      if (
        utils.compareArrays(manipArray([50, 5, 42, 86, 2, 1]), [
          [50, 10, 42, 86, 2, 2],
          [45, 0, 37, 81, -3, -4],
          [42],
          [86, 50, 42, 5, 2, 1],
        ])
      ) {
        exercice2 += 0.75;
      }
      if (
        utils.compareArrays(manipArray([10, 5, 2, 13]), [
          [10, 10, 2, 26],
          [5, 0, -3, 8],
          [],
          [13, 10, 5, 2],
        ])
      ) {
        exercice2 += 0.75;
      }
      if (
        utils.compareArrays(
          manipArray([45, "z", 66, "a", 33, null, 30, undefined]),
          [
            [90, 66, 66, 30],
            [40, 61, 28, 25],
            [66, 33],
            [66, 45, 33, 30],
          ]
        )
      ) {
        exercice2 += 0.75;
      }
      if (utils.arraysEqual(manipArray(undefined) == [])) {
        exercice2 += 0.5;
      }
    } catch (error) {
    }
  }
  return exercice2;
};

const lettersOccurenceCorrection = (lastName, firstName, repoNameDir) => {
  console.log('\x1b[36m%s\x1b[0m', 'letters-occurence');
  let exercice3 = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/letters-occurence.js`
    )
  ) {
    try {
      const lettersOccurence = require(`${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/letters-occurence`);
      if (utils.compareObjects(lettersOccurence(""), {})) {
        exercice3 += 0.25;
      }
      if (utils.compareObjects(lettersOccurence(null), {})) {
        exercice3 += 0.25;
      }
      if (utils.compareObjects(lettersOccurence(NaN), {})) {
        exercice3 += 0.25;
      }
      if (utils.compareObjects(lettersOccurence(undefined), {})) {
        exercice3 += 0.25;
      }
      if (
        utils.compareObjects(lettersOccurence("Hello World"), {H: 1, e: 1, l: 3, o: 2, ' ': 1, W: 1, r: 1, d: 1})
      ) {
        exercice3 += 0.5;
      }
      if (
        utils.compareObjects(
          lettersOccurence("hruio rehiorg hre hgr orehg h oirhegrhhoigrh"),
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
        exercice3 += 1;
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
            c: 3,
            t: 2,
            y: 2,
            a: 2,
            z: 1,
            Z: 1,
            X: 1,
            q: 3,
            W: 1,
            x: 3,
            R: 2,
            d: 1,
            B: 2,
            s: 1,
            f: 1,
            C: 2,
            J: 1,
            j: 1,
            H: 1,
            g: 1,
            e: 1,
            K: 2,
            S: 1,
            Y: 1,
            i: 1,
            V: 1,
            v: 1,
            k: 1,
            T: 1,
          }
        )
      ) {
        exercice3 += 1;
      }
      if (
        utils.compareObjects(lettersOccurence(65466632), {'2': 1, '3': 1, '4': 1, '5': 1, '6': 4})
      ) {
        exercice3 += 0.5;
      }
    } catch (error) {
    }
  }
  return exercice3;
};

const TCGBattleCorrection = (lastName, firstName, repoNameDir) => {
  console.log('\x1b[36m%s\x1b[0m', 'tcg-battle');
  let exercice4 = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/tcg-battle.js`
    )
  ) {
    try {
      const TCGBattle = require(`${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/tcg-battle`);
      if (TCGBattle("2 30 27", "9 38 1") == "Gagnant") {
        exercice4 += 0.25;
      }
      if (TCGBattle("1 2 3", "3 2 1") == "Nul") {
        exercice4 += 0.75;
      }
      if (
        TCGBattle(
          "35 27 10 4 33 14 38 7 20 39 35 31 13 25 23 7 6 25 41 11 19 32 26 30 15 29 28 24 40 16 18 39 42 16 38 31 3 19 32 26 3 9 33 29 35 12 2 6 6 32",
          "35 26 30 31 10 39 2 2 2 30 32 22 23 40 18 32 33 38 16 4 11 42 16 18 22 14 23 40 8 38 7 15 4 13 24 4 19 13 26 38 22 9 6 31 38 40 2 29 24 30"
        ) == "Perdant"
      ) {
        exercice4 += 0.75;
      }
      if (
        TCGBattle(
          "35 7 1 18 22 8 11 32 37 25 31 15 9 42 15 37 37 18 8 20 20 36 16 39 5",
          "42 20 27 11 11 13 23 24 3 13 33 21 14 4 40 14 35 26 6 27 23 4 30 17 2"
        ) == "Nul"
      ) {
        exercice4 += 0.75;
      }
      if (TCGBattle("42 25 12 3", "25 42 13 4") == "Gagnant") {
        exercice4 += 0.75;
      }
      if (TCGBattle("12 24 42 6", "10 6 42 20") == "Perdant") {
        exercice4 += 0.75;
      }
    } catch (error) {
    }
  }
  return exercice4;
};

const extractObjectCorrection = (lastName, firstName, repoNameDir) => {
  console.log('\x1b[36m%s\x1b[0m', 'extract-object');
  let exercice5 = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/extract-object.js`
    )
  ) {
    try {
      const extractObject = require(`${__dirname.replace(
        "correction/JAVASCRIPT",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/extract-object`);
      if (
        utils.compareArrays(
          extractObject(
            `Je ne vais pas taffer comme la Chine {"Valentin":"prenom","Sullyvan":"nom"} parce que taffer comme la Chine ça fait monter le taux de Co2`
          ),
          [{prenom: "Valentin", nom: "Sullyvan"}]
        )
      ) {
        exercice5 += 1;
      }
      if (
        utils.compareArrays(
          extractObject(
            `Hello there {"hello":2,"a":3} comment ça va ? {"a":1,"z":2} {"hello":"World","abc":"def"}`
          ),
          [
            {2: "hello", 3: "a"},
            {1: "a", 2: "z"},
            {World: "hello", def: "abc"},
          ]
        )
      ) {
        exercice5 += 1;
      }
      if (
        utils.compareObjects(
          extractObject(
            `Hello there {"hello":2,"a":3} comment ça va ? {"a":1,"z":2} {"hello":"World","abc":"def"}`
          ),
          [
            {2: "hello", 3: "a"},
            {1: "a", 2: "z"},
            {World: "hello", def: "abc"},
          ]
        )
      ) {
        exercice5 += 1;
      }
      if (
        utils.compareArrays(extractObject(`Hello there comment ça va ?`), [])
      ) {
        exercice5 += 0.5;
      }

      if (utils.compareArrays(extractObject(``), [])) {
        exercice5 += 0.5;
      }
    } catch (error) {
    }
  }
  return exercice5;
};
module.exports = {
  inverseStringCorrection,
  manipArrayCorrection,
  lettersOccurenceCorrection,
  TCGBattleCorrection,
  extractObjectCorrection,
};
