const inverseStringCorrection = (lastName, firstName, repoNameDir) => {
  let exercice1 = 0;
  if (
    fs.existsSync(
      `${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/q1.js`
    )
  ) {
    try {
      const q1 = require(`${__dirname.replace(
        "correction/SQL",
        ""
      )}repo/${repoNameDir}/${lastName}_${firstName}/q1`);
    } catch (error) {}
  }
  return exercice1;
};
