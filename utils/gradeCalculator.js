const { compareArrays, isObject, compareObjects } = require("./utils");
const gradeCalculator = (func, params, answer, grade) => {
  try {
    if (Array.isArray(params)) {
      if (Array.isArray(answer)) {
        if (compareArrays(func(...params), answer)) {
          return grade;
        }
      } else if (isObject(answer)) {
        if (compareObjects(func(...params), answer)) {
          return grade;
        }
      } else {
        if (func(...params) == answer) {
          return grade;
        }
      }
    } else {
      if (Array.isArray(answer)) {
        if (compareArrays(func(params), answer)) {
          return grade;
        }
      } else if (isObject(answer)) {
        if (compareObjects(func(params), answer)) {
          return grade;
        }
      } else {
        if (func(params) == answer) {
          return grade;
        }
      }
    }
  } catch (err) {}
  return 0;
};

module.exports = gradeCalculator;
