var fs = require("fs");

// Top left corner, left to right then down
function seat(seats) {
  const newSeats = [];
  for (var i = 0; i < seats.length; i++) {
    newSeats.push([]);
    for (var j = 0; j < seats[0].length; j++) {
      newSeats[i].push(seats[i][j]);
      if (seats[i][j] == "." || seats[i][j] == "#") continue;
      if (i - 1 >= 0 && j - 1 >= 0 && seats[i - 1][j - 1] == "#") continue;
      if (i - 1 >= 0 && seats[i - 1][j] == "#") continue;
      if (i - 1 >= 0 && j + 1 < seats[0].length && seats[i - 1][j + 1] == "#")
        continue;
      if (j - 1 >= 0 && seats[i][j - 1] == "#") continue;
      if (j + 1 < seats[0].length && seats[i][j + 1] == "#") continue;
      if (i + 1 < seats.length && j - 1 >= 0 && seats[i + 1][j - 1] == "#")
        continue;
      if (i + 1 < seats.length && seats[i + 1][j] == "#") continue;
      if (
        i + 1 < seats.length &&
        j + 1 < seats[0].length &&
        seats[i + 1][j + 1] == "#"
      )
        continue;
      newSeats[i][j] = "#";
    }
  }

  return newSeats;
}

function evict(seats) {
  const newSeats = [];
  for (var i = 0; i < seats.length; i++) {
    newSeats.push([]);
    for (var j = 0; j < seats[0].length; j++) {
      var numAdj = 0;
      if (seats[i][j] == "." || seats[i][j] == "L") {
        newSeats[i].push(seats[i][j]);
        continue;
      }
      if (i - 1 >= 0 && j - 1 >= 0 && seats[i - 1][j - 1] == "#") numAdj++;
      if (i - 1 >= 0 && seats[i - 1][j] == "#") numAdj++;
      if (i - 1 >= 0 && j + 1 < seats[0].length && seats[i - 1][j + 1] == "#")
        numAdj++;
      if (j - 1 >= 0 && seats[i][j - 1] == "#") numAdj++;
      if (j + 1 < seats[0].length && seats[i][j + 1] == "#") numAdj++;
      if (i + 1 < seats.length && j - 1 >= 0 && seats[i + 1][j - 1] == "#")
        numAdj++;
      if (i + 1 < seats.length && seats[i + 1][j] == "#") numAdj++;
      if (
        i + 1 < seats.length &&
        j + 1 < seats[0].length &&
        seats[i + 1][j + 1] == "#"
      )
        numAdj++;

      newSeats[i].push(numAdj >= 5 ? "L" : seats[i][j]);
    }
  }

  return newSeats;
}

function hasChange(seats, newSeats) {
  for (var i = 0; i < seats.length; i++) {
    for (var j = 0; j < seats[0].length; j++) {
      if (seats[i][j] !== newSeats[i][j]) return true;
    }
  }
  return false;
}

function seating() {
  var seats = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  for (var i = 0; i < seats.length; i++) seats[i] = seats[i].split("");

  while (true) {
    var newSeats = seat(seats);
    if (!hasChange(seats, newSeats)) break;
    seats = newSeats;
    newSeats = evict(seats);
    if (!hasChange(seats, newSeats)) break;
    seats = newSeats;
  }

  var numOccupied = 0;
  seats.forEach((row) => {
    row.forEach((seat) => {
      if (seat == "#") numOccupied++;
    });
  });
  return numOccupied;
}

console.log(seating());
