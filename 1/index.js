var fs = require('fs');

function getTwentyTwentyTwoNum() {
    const nums = fs.readFileSync('input.txt', 'utf8').split(/\r\n/g);
    const seen = []
    for (var i = 0; i < nums.length; i++) {
        if (seen.includes(2020 - parseInt(nums[i])))
            return (2020 - nums[i]) * parseInt(nums[i]);
        seen.push(parseInt(nums[i]));
    }
    return 0;
}

function getTwentyTwentyThreeNum() {
    const nums = fs.readFileSync('input.txt', 'utf8').split(/\r\n/g).map(num => parseInt(num));
    const myMap = {};

    for (var i = 0; i < nums.length; i++) {
        for (var j = i+1; j < nums.length; j++) {
            myMap[nums[i] + nums[j]] = [nums[i], nums[j]];
        }
    }

    for (var i = 0; i < nums.length; i++) {
        if (myMap.hasOwnProperty(2020 - nums[i])) {
            return nums[i] * myMap[2020 - nums[i]][0] * myMap[2020 - nums[i]][1]
        }
    }

    return 0
}

console.log(getTwentyTwentyThreeNum())
