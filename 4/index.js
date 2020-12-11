var fs = require('fs');
const requirements = {
    byr: { min: 1920, max: 2002 },
    iyr: { min: 2010, max: 2020 },
    eyr: { min: 2020, max: 2030 },
    hgt: { cm: { min: 150, max: 193 }, in: { min: 59, max: 76 } },
    hcl: {},
    ecl: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
    pid: {}
};

function isValid(passport) {
    for (var key in requirements) {
        if (passport[key] === undefined)    return false;;
    }
    
    if (passport.byr < 1920 || passport.byr > 2002)     return false;
    if (passport.iyr < 2010 || passport.iyr > 2020)     return false;
    if (passport.eyr < 2020 || passport.eyr > 2030)     return false;
    // height
    const unit = passport.hgt.substring(passport.hgt.length - 2);
    if (unit !== 'cm' && unit !== 'in')     return false;
    if (unit == 'cm') {
        const height = parseInt(passport.hgt.substring(0, passport.hgt.indexOf('c')));
        if (height < 150 || height > 193)   return false;
    }
    else {
        const height = parseInt(passport.hgt.substring(0, passport.hgt.indexOf('i')));
        if (height < 59 || height > 76)     return false;
    }
    // hair color
    if (passport.hcl.match(/^[#][a-f0-9]{6}$/i) == null)   return false;
    // eye color
    if (!requirements.ecl.includes(passport.ecl))   return false;
    // pid
    if (passport.pid.match(/^\d{9}$/) == null) return false;
    return true;
}

function validPassports() {
    const grid = fs.readFileSync('input.txt', 'utf8').split(/\r\n/g);
    var numValid = 0;

    let passport = {};
    // Too lazy to code for ending without newline, just add newline to input.txt at end
    grid.forEach(row => {
        const fields = row.split(" ").filter(Boolean);
        if (fields.length === 0) {
            if (isValid(passport))  numValid++;
            passport = {};
            return;
        }
        fields.forEach(field => { passport[field.substring(0, 3)] = field.substring(field.indexOf(":") + 1); });
    });

    return numValid;
}

console.log(validPassports());
