const fs = require("fs");

function numberGame() {
  const startingNumbers = fs.readFileSync("input.txt", "utf8").split(",");
  const end = 30000000;
  var lastNumberSpoken;
  var turn = 0;
  const numberMap = {};

  // Starting numbers
  for (turn; turn < startingNumbers.length; turn++) {
    numberMap[startingNumbers[turn]] = [turn + 1];
  }
  turn++;
  lastNumberSpoken = parseInt(startingNumbers[startingNumbers.length - 1]);

  while (turn != end + 1) {
    if (
      numberMap[lastNumberSpoken].length == 1 &&
      numberMap[lastNumberSpoken][0] == turn - 1
    ) {
      if (numberMap[0] == undefined) numberMap[0] = [];
      numberMap[0].push(turn);
      lastNumberSpoken = 0;
      turn++;
      continue;
    }

    const turns = numberMap[lastNumberSpoken];
    const currentNumber = turns[turns.length - 1] - turns[turns.length - 2];
    if (numberMap[currentNumber] == undefined) numberMap[currentNumber] = [];
    numberMap[currentNumber].push(turn);
    lastNumberSpoken = currentNumber;
    turn++;
  }

  return lastNumberSpoken;
}

console.log(numberGame());
