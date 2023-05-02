const { isFileExists, findFile } = require("../../utils/utils");
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
      let foundFile = findFile(file, filePath);
      console.log(foundFile);
      if (foundFile != null) {
        count++;
      } else {
        break;
      }
    } catch (e) {}
  }
  return {
    required: Math.min(count, 16),
    bonus: Math.max(0, count - requiredExerciseCount),
    total: `${(count / requiredExerciseCount) * 100}%`,
  };
};

module.exports = { JSCheckQuest };
