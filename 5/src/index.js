var fs = require('fs'); 

function getSeatId(seat) {
    var low = 0;
    var high = 127;
    for (var i = 0; i < 7; i++) {
        if (seat.charAt(i) === 'F')  high = Math.floor((low + high) / 2);
        else                         low = Math.ceil((low + high) / 2);
    }
    const row = (high + low) / 2;
    
    var low = 0;
    var high = 7;
    for (var i = 7; i < seat.length; i++) {
        if (seat.charAt(i) == 'L')  high = Math.floor((low + high) / 2);
        else                        low = Math.ceil((low + high) / 2);
    }

    const place = (high + low) / 2;
    return row * 8 + place;
}

function getHighestSeat() {
    const seats = fs.readFileSync('input.txt', 'utf8').split(/\r\n/g);
    var highestSeatId = 0;
    seats.forEach(seat => {
        const seatId = getSeatId(seat);
        if (seatId > highestSeatId)     highestSeatId = seatId;
    });

    return highestSeatId;
}

function findMySeat() {
    const seats = fs.readFileSync('input.txt', 'utf8').split(/\r\n/g);
    const filledSeats = [];
    for (var i = 0; i < 127 * 8 + 7; i++)   filledSeats.push(false);
    seats.forEach(seat => {
        const seatId = getSeatId(seat);
        filledSeats[seatId] = true;
    });

    console.log(filledSeats);
    var i = 0;
    while (!filledSeats[i++]) {}
    for (i; i < filledSeats.length; i++) {
        if (!filledSeats[i])    return i;
    }

    return -1;

}

console.log(findMySeat());