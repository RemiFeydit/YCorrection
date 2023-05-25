const {findFile} = require("./utils");
const questChecker = (
  listExercise,
  lastName,
  firstName,
  repoNameDir,
  requiredExerciseCount
) => {
  let count = 0;
  for (let file of listExercise) {
    try {
      let foundFile = findFile(file, `./repo/${repoNameDir}/${lastName}_${firstName}`);
      if (foundFile != null) {
        count++;
      } else {
        break;
      }
    } catch (e) {
    }
  }
  return {
    required: Math.min(count, requiredExerciseCount),
    bonus: Math.max(0, count - requiredExerciseCount),
    total: `${Math.round((count / requiredExerciseCount) * 100)} %`
  };
};

module.exports = {questChecker};
