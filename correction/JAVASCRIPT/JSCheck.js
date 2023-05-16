const {findFile} = require("../../utils/utils");
const {log} = require("shelljs/src/common");
const JSCheckQuest = (
  listExercise,
  lastName,
  firstName,
  repoNameDir,
  requiredExerciseCount
) => {
  let count = 0;
  let isWin = process.platform === "win32";
  let filePath = isWin
    ? `${__dirname.replace(
      "correction\\JAVASCRIPT",
      ""
    )}repo\\${repoNameDir}\\${lastName}_${firstName}\\`
    : `${__dirname.replace(
      "correction/JAVASCRIPT",
      ""
    )}repo/${repoNameDir}/${lastName}_${firstName}/`;
  for (let file of listExercise) {
    try {
      let foundFile = findFile(`${file}.js`, filePath);
      if (foundFile != null) {
        count++;
      } else {
        break;
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    required: Math.min(count, requiredExerciseCount),
    bonus: Math.max(0, count - requiredExerciseCount),
    total: `${Math.round((count / requiredExerciseCount) * 100)} %`
  };
};

module.exports = {JSCheckQuest};
