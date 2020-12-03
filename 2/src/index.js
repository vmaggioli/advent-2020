var fs = require('fs');

function getMinMax(minMaxStr) {
    const mySplit = minMaxStr.split('-');
    const minMax = [parseInt(mySplit[0]), parseInt(mySplit[1].substring(0, mySplit[1].indexOf(' ')))];
    return minMax;
}


function validPassRange() {
    const passList = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, "").split("\n");
    var numValid = 0;
    for (var i = 0; i < passList.length; i++) {
        const row = passList[i].split(': ');
        const minMax = getMinMax(row[0])
        const match = row[0].charAt(row[0].length - 1);
        var count = 0;

        for (var j = 0; j < row[1].length; j++) {
            if (row[1][j] === match)    count++;
        }

        if (count <= minMax[1] && count >= minMax[0])   numValid++;
    }

    return numValid;
}

function validPassExact() {
    const passList = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, "").split("\n");
    var numValid = 0;
    for (var i = 0; i < passList.length; i++) {
        const row = passList[i].split(': ');
        const minMax = getMinMax(row[0]);
        const match = row[0].charAt(row[0].length - 1);
        console.log(match);

        if (row[1].charAt(minMax[0] - 1) == match && row[1].charAt(minMax[1] - 1) !== match ||
                row[1].charAt(minMax[0] - 1) !== match && row[1].charAt(minMax[1] - 1) == match)
            numValid++;
    }

    return numValid;
}

console.log(validPassExact());