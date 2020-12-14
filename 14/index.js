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

function generateAddresses(index, binary) {
  const nums = [];
  if (index >= binary.length) {
    return [generateNumber(binary)];
  }
  for (var i = index; i < binary.length; i++) {
    if (binary[i] == "X") {
      binary[i] = 0;
      generateAddresses(index + 1, binary).forEach((num) => nums.push(num));
      binary[i] = 1;
      generateAddresses(index + 1, binary).forEach((num) => nums.push(num));
      binary[i] = "X";
      break;
    }
  }

  if (i == binary.length && binary[binary.length - 1] !== 'X') {
    return [generateNumber(binary)];
  }

  return nums;
}

function memorySumFloating() {
  const input = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  const nums = [];
  var total = 0;
  var mask;
  input.forEach((row) => {
    if (row.substring(0, 4) == "mask") {
      mask = row.substring(row.indexOf("=") + 2).split("");
      return;
    }

    const binaryIndex = generateBinary(
      parseInt(row.substring(row.indexOf("[") + 1, row.indexOf("]")))
    );
    for (var i = 0; i < binaryIndex.length; i++) {
      if (mask[i] == "X" || mask[i] == "1") {
        binaryIndex[i] = mask[i] == "X" ? "X" : 1;
      }
    }

    const indexes = generateAddresses(0, binaryIndex);
    const value = parseInt(row.substring(row.indexOf("=") + 2));
    indexes.forEach((index) => {
        total += value;
        if (nums[index] !== undefined && nums[index] !== 0) {
            total -= nums[index];
        }
        nums[index] = value;
    });
  });

  return total;
}

console.log(memorySumFloating());
