var fs = require("fs");

function generateBinary(number) {
  const binary = [];
  for (var i = 35; i >= 0; i--) {
    if (Math.floor(number / Math.pow(2, i)) == 0) binary.push(0);
    else {
      number = number % Math.pow(2, i);
      binary.push(1);
    }
  }
  return binary;
}

function generateNumber(binary) {
  var total = 0;
  for (var i = 0; i < 36; i++) {
    if (binary[i] == 1) total += Math.pow(2, 35 - i);
  }
  return total;
}

function memorySum() {
  const input = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  const nums = [];
  var mask;
  input.forEach((row) => {
    if (row.substring(0, 4) == "mask") {
      mask = row.substring(row.indexOf("=") + 2).split("");
      return;
    }

    const index = parseInt(
      row.substring(row.indexOf("[") + 1, row.indexOf("]"))
    );
    const binary = generateBinary(
      parseInt(row.substring(row.indexOf("=") + 2))
    );

    for (var i = 0; i < binary.length; i++) {
      if (mask[i] !== "X" && binary[i] !== parseInt(mask[i])) {
        binary[i] = parseInt(mask[i]);
      }
    }
    nums[index] = generateNumber(binary);
  });

  var total = 0;
  nums.forEach((num) => (total += num));
  return total;
}

console.log(memorySum());
