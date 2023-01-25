const { compareArrays, executeQuery } = require("../../utils/utils");
const {
  q1Results,
  q2Results,
  q3Results,
  q4Results,
  q5Results,
  q6Results,
  q7Results,
  q8Results,
  q9Results,
  q10Results,
  q11Results,
  q12Results,
  q13Results,
  q14Results,
  q15Results,
  q16Results,
  q17Results,
} = require("./expectedResults");
const fs = require("fs");

const q1Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q1.js`
    )
  ) {
    try {
      const q1 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q1.js`);
      if (q1 != "") {
        if (
          compareArrays(
            q1Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q1
            )
          )
        ) {
          res += 0.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q2Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q2.js`
    )
  ) {
    try {
      const q2 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q2.js`);
      if (q2 != "") {
        if (
          compareArrays(
            q2Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q2
            )
          )
        ) {
          res += 0.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q3Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q3.js`
    )
  ) {
    try {
      const q3 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q3.js`);
      if (q3 != "") {
        if (
          compareArrays(
            q3Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q3
            )
          )
        ) {
          res += 0.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q4Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q4.js`
    )
  ) {
    try {
      const q4 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q4.js`);
      if (q4 != "") {
        if (
          compareArrays(
            q4Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q4
            )
          )
        ) {
          res += 1;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q5Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q5.js`
    )
  ) {
    try {
      const q5 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q5.js`);
      if (q5 != "") {
        if (
          compareArrays(
            q5Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q5
            )
          )
        ) {
          res += 1;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q6Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q6.js`
    )
  ) {
    try {
      const q6 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q6.js`);
      if (q6 != "") {
        if (
          compareArrays(
            q6Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q6
            )
          )
        ) {
          res += 1;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q7Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q7.js`
    )
  ) {
    try {
      const q7 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q7.js`);
      if (q7 != "") {
        if (
          compareArrays(
            q7Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q7
            )
          )
        ) {
          res += 1.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q8Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q8.js`
    )
  ) {
    try {
      const q8 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q8.js`);
      if (q8 != "") {
        if (
          compareArrays(
            q8Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q8
            )
          )
        ) {
          res += 1.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q9Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q9.js`
    )
  ) {
    try {
      const q9 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q9.js`);
      if (q9 != "") {
        if (
          compareArrays(
            q9Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q9
            )
          )
        ) {
          res += 1;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q10Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q10.js`
    )
  ) {
    try {
      const q10 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q10.js`);
      if (q10 != "") {
        if (
          compareArrays(
            q10Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q10
            )
          )
        ) {
          res += 1;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q11Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q11.js`
    )
  ) {
    try {
      const q11 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q11.js`);
      if (q11 != "") {
        if (
          compareArrays(
            q11Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q11
            )
          )
        ) {
          res += 1;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q12Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q12.js`
    )
  ) {
    try {
      const q12 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q12.js`);
      if (q12 != "") {
        if (
          compareArrays(
            q12Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q12
            )
          )
        ) {
          res += 1;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q13Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q13.js`
    )
  ) {
    try {
      const q13 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q13.js`);
      if (q13 != "") {
        if (
          compareArrays(
            q13Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q13
            )
          )
        ) {
          res += 1.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q14Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q14.js`
    )
  ) {
    try {
      const q14 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q14.js`);
      if (q14 != "") {
        if (
          compareArrays(
            q14Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q14
            )
          )
        ) {
          res += 1.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q15Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q15.js`
    )
  ) {
    try {
      const q15 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q15.js`);
      if (q15 != "") {
        if (
          compareArrays(
            q15Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q15
            )
          )
        ) {
          res += 1.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q16Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q16.js`
    )
  ) {
    try {
      const q16 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q16.js`);
      if (q16 != "") {
        if (
          compareArrays(
            q16Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q16
            )
          )
        ) {
          res += 2.5;
        }
      }
    } catch (error) {}
  }
  return res;
};

const q17Correction = async (lastName, firstName, repoNameDir) => {
  let res = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q17.js`
    )
  ) {
    try {
      const q17 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/student_answer/part_1/q17.js`);
      if (q17 != "") {
        if (
          compareArrays(
            q17Results,
            await executeQuery(
              `${__dirname.replace(
                "correction/SQL",
                ""
              )}correction/SQL/data/pokemonDB.db`,
              q17
            )
          )
        ) {
          res += 2;
        }
      }
    } catch (error) {}
  }
  return res;
};

module.exports = {
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
};

module.exports = { correctionExamJS };
