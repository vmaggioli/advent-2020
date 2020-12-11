var fs = require("fs");

function firstInvalidNum() {
  const values = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  const preamble = [];
  for (var i = 0; i < 25; i++) preamble.push(parseInt(values[i]));
  for (i; i < values.length; i++) {
    const val = parseInt(values[i]);
    var hasPair = false;
    preamble.forEach((pre) => {
      if (Math.abs(preamble.includes(val - pre))) hasPair = true;
    });
    if (!hasPair)   return val;
    preamble.shift(); preamble.push(val);
  }
}

function contiguousSet() {
    const values = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
    const toFind = firstInvalidNum();
    for (var i = 0; i < values.length; i++) {
        const val = parseInt(values[i]);
        if (val >= toFind)     continue;
        var sum = val;
        var j = i+1;
        var biggest = val; var smallest = val;
        while (sum < toFind) {
            const newVal = parseInt(values[j]);
            if (values[j] > biggest)    biggest = newVal;
            if (values[j] < smallest)   smallest = newVal;
            sum += newVal;
            j++;
        }
        if (sum == toFind) {
            return biggest + smallest;
        }
    }
}

console.log(contiguousSet());
