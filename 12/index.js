const fs = require("fs");
const mappings = ["N", "E", "S", "W"];

function solve() {
  var x = 0;
  var y = 0;
  var currentDirection = "E";
  const directions = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  directions.forEach((direction) => {
    const val = parseInt(direction.substring(1));
    if (direction.charAt(0) == "L") {
      const numShiftsL = val / 90;
      var shift = mappings.indexOf(currentDirection) - numShiftsL;
      if (shift < 0) {
        shift += 4;
      }
      currentDirection = mappings[shift % 4];
      return;
    } else if (direction.charAt(0) == "R") {
      const numShiftsR = val / 90;
      const shift = mappings.indexOf(currentDirection) + numShiftsR;
      currentDirection = mappings[shift % 4];
      return;
    } else if (direction.charAt(0) == "F") {
      direction = `${currentDirection}`;
    }

    switch (direction.charAt(0)) {
      case "N":
        y += val;
        break;
      case "E":
        x += val;
        break;
      case "S":
        y -= val;
        break;
      case "W":
        x -= val;
        break;
      default:
        break;
    }
  });

  return Math.abs(x) + Math.abs(y);
}

console.log(solve());
