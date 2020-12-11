var fs = require('fs'); 
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function getYesSumCount() {
    const people = fs.readFileSync('input.txt', 'utf8').split(/\r\n/g);
    let numAnswered = 0;
    let yeses = 0;
    let totalYeses = 0;
    let counts = [];
    for (var i = 0; i < alphabet.length; i++)   counts.push(0);
    people.forEach(person => {
        if (person.length == 0) {
            counts.forEach(count => {
                if (count > 0)  numAnswered++;
            });

            totalYeses += numAnswered;
            yeses = 0;
            counts = [];
            for (var j = 0; j < alphabet.length; j++)   counts.push(0);
            numAnswered = 0;
            return;
        }

        for (var i = 0; i < person.length; i++) {
            counts[alphabet.indexOf(person.charAt(i))]++;
        }
    });

    return totalYeses;
}

function getYesAllCount() {
    const people = fs.readFileSync('input.txt', 'utf8').split(/\r\n/g);
    let numPeople = 0;
    let yeses = 0;
    let totalYeses = 0;
    let counts = [];
    for (var i = 0; i < alphabet.length; i++)   counts.push(0);
    people.forEach(person => {
        if (person.length == 0) {
            counts.forEach(count => {
                if (count == numPeople) yeses++;
            });

            totalYeses += yeses;
            yeses = 0;
            counts = [];
            for (var j = 0; j < alphabet.length; j++)   counts.push(0);
            numPeople = 0;
            return;
        }

        for (var i = 0; i < person.length; i++) {
            counts[alphabet.indexOf(person.charAt(i))]++;
        }
        numPeople++;
    });

    return totalYeses;
}

console.log(getYesAllCount());
