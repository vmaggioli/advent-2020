var fs = require("fs");

function boot() {
  const instructions = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  const visited = [];
  for (var i = 0; i < instructions.length; i++) visited.push(false);
  var accumulator = 0;
  var index = 0;
  while (index < instructions.length) {
    if (visited[index] == true) {
      return accumulator;
    }
    const instruct = instructions[index].substring(0, 3);
    const val = parseInt(instructions[index].substring(4));
    visited[index] = true;
    switch (instruct) {
      case "acc":
        accumulator += val;
        index++;
        break;
      case "jmp":
        index += val;
        break;
      case "nop":
        index++;
        break;
      default:
        console.log("Invalid");
        index++;
        break;
    }
  }
}

function fullRun(instructions) {
  const visited = [];
  for (var i = 0; i < instructions.length; i++) visited.push(false);
  var accumulator = 0;
  var index = 0;
  while (index < instructions.length) {
    if (visited[index] == true) {
      return Number.MAX_SAFE_INTEGER;
    }
    const instruct = instructions[index].substring(0, 3);
    const val = parseInt(instructions[index].substring(4));
    visited[index] = true;
    switch (instruct) {
      case "acc":
        accumulator += val;
        index++;
        break;
      case "jmp":
        index += val;
        break;
      case "nop":
        index++;
        break;
      default:
        console.log("Invalid");
        index++;
        break;
    }
  }

  return accumulator;
}

function swap() {
  const instructions = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  var accumulator = 0;
  var index = 0;
  while (index < instructions.length) {
    const instruct = instructions[index].substring(0, 3);
    const val = parseInt(instructions[index].substring(4));
    switch (instruct) {
      case "acc":
        accumulator += val;
        index++;
        break;
      case "jmp":
        const newInstructions = instructions.slice();
        newInstructions[index] = val >= 0 ? `nop +${val}` : `nop ${val}`;
        const test = fullRun(newInstructions);
        if (test !== Number.MAX_SAFE_INTEGER) return test;
        index += val;
        break;
      case "nop":
        const newInstructions2 = instructions.slice();
        newInstructions2[index] = val >= 0 ? `jmp +${val}` : `jmp ${val}`;
        const test2 = fullRun(newInstructions2);
        if (test2 !== Number.MAX_SAFE_INTEGER) return test2;
        index++;
        break;
      default:
        console.log("Invalid");
        index++;
        break;
    }
  }
}

console.log(swap());
