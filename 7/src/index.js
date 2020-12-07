var fs = require("fs");

function hasShinyGoldBag(bag, bagMap) {
  const queue = [bag];
  while (!queue.length == 0) {
    const currentBag = queue.shift();
    if (bagMap[currentBag]["shiny gold"] !== undefined) return true;
    for (singleBag in bagMap[currentBag]) {
      queue.push(singleBag);
    }
  }

  return false;
}

function findNumBagsHoldShinyGold() {
  const rules = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  const bagMap = {};
  rules.forEach((rule) => {
    const ruleSplit = rule.replace(/[,.]/g, "").split(" ");
    const bag = ruleSplit[0] + " " + ruleSplit[1];
    bagMap[bag] = {};
    if (ruleSplit.length == 7) return;
    var i = 4;
    while (i < ruleSplit.length) {
      bagMap[bag][ruleSplit[i + 1] + " " + ruleSplit[i + 2]] = ruleSplit[i];
      i += 4;
    }
  });

  var numBags = 0;
  for (var bag in bagMap) {
    if (hasShinyGoldBag(bag, bagMap)) numBags++;
  }

  return numBags;
}

function numBagsForBag(bag, bagMap) {
  var numBags = 0;
  const bagKeys = Object.keys(bagMap[bag])
  bagKeys.forEach(key => {
    const num = numBagsForBag(key, bagMap);
    if (num == 0)   numBags += bagMap[bag][key];
    else            numBags += bagMap[bag][key] * num + bagMap[bag][key];
  });

  return numBags;
}

function findNumBagsShinyGoldCanHold() {
  const rules = fs.readFileSync("input.txt", "utf8").split(/\r\n/g);
  const bagMap = {};
  rules.forEach((rule) => {
    const ruleSplit = rule.replace(/[,.]/g, "").split(" ");
    const bag = ruleSplit[0] + " " + ruleSplit[1];
    bagMap[bag] = {};
    if (ruleSplit.length == 7) return;
    var i = 4;
    while (i < ruleSplit.length) {
      bagMap[bag][ruleSplit[i + 1] + " " + ruleSplit[i + 2]] = parseInt(
        ruleSplit[i]
      );
      i += 4;
    }
  });

  return numBagsForBag("shiny gold", bagMap);
}

console.log(findNumBagsShinyGoldCanHold());
