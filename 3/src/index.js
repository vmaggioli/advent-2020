var fs = require('fs');

function treeEncounter() {
    const grid = fs.readFileSync('input.txt', 'utf8').replace(/\s/g, "\n").split("\n");
    var row = 0;
    var col = 0;
    var numTrees = 0;

    while (row < grid.length) {
        if (grid[row].length == 0) {
            row++;
            continue;
        }
        grid[row] = grid[row]
        if (grid[row].charAt(col) == '#')  numTrees++;
        row++; col += 3;
        if (col >= grid[0].length)   col = col % grid[0].length;
    }

    return numTrees;
}

const numTrees = treeEncounter();
console.log(numTrees);