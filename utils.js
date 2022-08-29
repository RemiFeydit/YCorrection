const fs = require("fs");
const manipArray = require("./repo/ROGARD_Thomas/manip-array");

const readJsonFile = (file) => {
    let bufferData = fs.readFileSync(file);
    let stData = bufferData.toString();
    let data = JSON.parse(stData);
    return data;
};

function arraysEqual(a, b) {
    a = Array.isArray(a) ? a : [];
    b = Array.isArray(b) ? b : [];
    return a.length === b.length && a.every((el, ix) => el === b[ix]);
}

function compareArrays(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
            if (!arraysEqual(array1[i], array2[i])) {
                return false;
            }
        }
    }
    return true;
}
module.exports = { readJsonFile, compareArrays, arraysEqual };
