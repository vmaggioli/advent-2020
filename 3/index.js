var fs = require('fs');

function treeEncounter(rowShift, colShift) {
    const grid = fs.readFileSync('input.txt', 'utf8').split(/\r\n/g);
    var row = 0;
    var col = 0;
    var numTrees = 0;

    while (row < grid.length) {
        if (grid[row].charAt(col) == '#')   numTrees++;
        row += rowShift; col += colShift;
        if (col >= grid[0].length)          col = col % grid[0].length;
    }

    return numTrees;
}

console.log(treeEncounter(1, 1) * treeEncounter(1, 3) * treeEncounter(1, 5) * treeEncounter(1, 7) * treeEncounter(2, 1));