const fs = require("fs");

function findBus() {
  const input = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  const startTime = parseInt(input[0]);
  var time = startTime;
  const buses = input[1]
    .split(",")
    .map((bus) => (bus == "x" ? -1 : parseInt(bus)));

  while (true) {
    for (var i = 0; i < buses.length; i++) {
      if (time % buses[i] == 0) {
        return (time - startTime) * buses[i];
      }
    }
    time++;
  }
}

console.log(findBus());
