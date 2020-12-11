var fs = require("fs");

function getAdjSeat(row, col, direction, seats) {
  switch (direction) {
    case "up-left":
      do {
        row--;
        col--;
        if (row >= 0 && col >= 0 && seats[row][col] !== ".")
          return seats[row][col];
      } while (row >= 0 && col >= 0);
      return ".";
    case "up":
      do {
        row--;
        if (row >= 0 && seats[row][col] !== ".") return seats[row][col];
      } while (row >= 0);
      return ".";
    case "up-right":
      do {
        row--;
        col++;
        if (row >= 0 && col < seats[0].length && seats[row][col] !== ".")
          return seats[row][col];
      } while (row >= 0 && col < seats[0].length);
      return ".";
    case "left":
      do {
        col--;
        if (col >= 0 && seats[row][col] !== ".") return seats[row][col];
      } while (col >= 0);
      return ".";
    case "right":
      do {
        col++;
        if (col < seats[0].length && seats[row][col] !== ".")
          return seats[row][col];
      } while (col < seats[0].length);
      return ".";
    case "down-left":
      do {
        row++;
        col--;
        if (row < seats.length && col >= 0 && seats[row][col] !== ".")
          return seats[row][col];
      } while (row < seats.length && col >= 0);
      return ".";
    case "down":
      do {
        row++;
        if (row < seats.length && seats[row][col] !== ".")
          return seats[row][col];
      } while (row < seats.length);
      return ".";
    case "down-right":
      do {
        row++;
        col++;
        if (
          row < seats.length &&
          col < seats[0].length &&
          seats[row][col] !== "."
        )
          return seats[row][col];
      } while (row < seats.length && col < seats[0].length);
      return ".";
  }

  return ".";
}

// Top left corner, left to right then down
function seat(seats) {
  const newSeats = [];
  for (var i = 0; i < seats.length; i++) {
    newSeats.push([]);
    for (var j = 0; j < seats[0].length; j++) {
      newSeats[i].push(seats[i][j]);
      if (seats[i][j] == "." || seats[i][j] == "#") continue;
      if (getAdjSeat(i, j, "up-left", seats) == "#") continue;
      if (getAdjSeat(i, j, "up", seats) == "#") continue;
      if (getAdjSeat(i, j, "up-right", seats) == "#") continue;
      if (getAdjSeat(i, j, "left", seats) == "#") continue;
      if (getAdjSeat(i, j, "right", seats) == "#") continue;
      if (getAdjSeat(i, j, "down-left", seats) == "#") continue;
      if (getAdjSeat(i, j, "down", seats) == "#") continue;
      if (getAdjSeat(i, j, "down-right", seats) == "#") continue;
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
      if (getAdjSeat(i, j, "up-left", seats) == "#") numAdj++;
      if (getAdjSeat(i, j, "up", seats) == "#") numAdj++;
      if (getAdjSeat(i, j, "up-right", seats) == "#") numAdj++;
      if (getAdjSeat(i, j, "left", seats) == "#") numAdj++;
      if (getAdjSeat(i, j, "right", seats) == "#") numAdj++;
      if (getAdjSeat(i, j, "down-left", seats) == "#") numAdj++;
      if (getAdjSeat(i, j, "down", seats) == "#") numAdj++;
      if (getAdjSeat(i, j, "down-right", seats) == "#") numAdj++;

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
