const fs = require("fs");

function findBadTickets(values, fieldMapping) {
  var result = -1;
  values.forEach((value) => {
    const parsedValue = parseInt(value);
    var match = false;
    for (field in fieldMapping) {
      if (
        ((parsedValue >= fieldMapping[field][0][0] &&
          parsedValue <= fieldMapping[field][0][1]) ||
          parsedValue >= fieldMapping[field][1][0]) &&
        parsedValue <= fieldMapping[field][1][1]
      ) {
        match = true;
        break;
      }
    }
    if (!match) {
      result = parsedValue;
      return false;
    }
  });
  return result;
}

function validTickets() {
  var invalidTotal = 0;
  const input = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  var i = 0;
  const fieldMapping = {};
  while (input[i].trim() !== "") {
    const ranges = input[i].substring(input[i].indexOf(":") + 2);
    const fieldName = input[i].substring(0, input[i].indexOf(":"));
    fieldMapping[fieldName] = [];
    const dualRanges = ranges.split(" or ");
    fieldMapping[fieldName].push([
      dualRanges[0].substring(0, dualRanges[0].indexOf("-")),
      dualRanges[0].substring(dualRanges[0].indexOf("-") + 1),
    ]);
    fieldMapping[fieldName].push([
      dualRanges[1].substring(0, dualRanges[1].indexOf("-")),
      dualRanges[1].substring(dualRanges[1].indexOf("-") + 1),
    ]);
    i++;
  }
  i += 5;

  for (i; i < input.length; i++) {
    const values = input[i].split(",");
    const result = findBadTickets(values, fieldMapping);
    if (result !== -1) invalidTotal += result;
  }

  return invalidTotal;
}

console.log(validTickets());
