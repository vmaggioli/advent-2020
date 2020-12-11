var fs = require("fs");

const connectionCounter = [];

function joltDiff() {
  const adapters = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  for (var i = 0; i < adapters.length; i++) adapters[i] = parseInt(adapters[i]);
  adapters.push(0);
  adapters.sort((a, b) => {
    return a - b;
  });
  adapters.push(adapters[adapters.length - 1] + 3);
  var oneJoltDiff = 0;
  var threeJoltDiff = 0;
  for (i = 1; i < adapters.length; i++) {
    if (adapters[i] - adapters[i - 1] == 1) oneJoltDiff++;
    else if (adapters[i] - adapters[i - 1] == 3) threeJoltDiff++;
  }

  return oneJoltDiff * threeJoltDiff;
}

function uniqueConnections() {
  const adapters = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  for (var i = 0; i < adapters.length; i++) adapters[i] = parseInt(adapters[i]);
  adapters.push(0);
  adapters.sort((a, b) => {
    return a - b;
  });
  adapters.push(adapters[adapters.length - 1] + 3);
  for (i = 0; i < adapters.length; i++) connectionCounter.push(0)
  connectionCounter[connectionCounter.length - 1] = 1;
  path(0, adapters);
  return connectionCounter[0];
}

function path(index, adapters) {
    if (index >= adapters.length - 1)    return;
    var numPaths = 0;
    for (var i = index + 1; i < adapters.length; i++) {
        if (adapters[i] - adapters[index] <= 3) {
            if (connectionCounter[i] != 0)  numPaths += connectionCounter[i];
            else {
                path(i, adapters);
                numPaths += connectionCounter[i];
            }
        }
        else    break;
    }
    connectionCounter[index] = numPaths;
    return;
}

console.log(uniqueConnections());
