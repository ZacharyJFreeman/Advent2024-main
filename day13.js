const fs = require('fs');

let dataArray = [];
let clawSettings = [];

try {
  const data = fs.readFileSync('day13_data.txt', 'utf8');
  dataArray = data.split(/\r?\n/).map(line => line.trim().split(' '));
} catch (err) {
  console.error(err);
}

// Parse input into [aX, aY, bX, bY, prizeX, prizeY]
for (let index = 0; index < dataArray.length; index += 4) {
  const aX = parseInt(dataArray[index][2].replace(/\D/g,''), 10);
  const aY = parseInt(dataArray[index][3].replace(/\D/g,''), 10);
  const bX = parseInt(dataArray[index+1][2].replace(/\D/g,''), 10);
  const bY = parseInt(dataArray[index+1][3].replace(/\D/g,''), 10);
  const prizeX = parseInt(dataArray[index+2][1].replace(/\D/g,''), 10);
  const prizeY = parseInt(dataArray[index+2][2].replace(/\D/g,''), 10);

  clawSettings.push([aX, aY, bX, bY, prizeX, prizeY]);
}

let totalTokens = 0;
let prizesWon = 0;

for (const [aX, aY, bX, bY, prizeX, prizeY] of clawSettings) {
  let minTokens = Infinity;
  let found = false;

  // Try all combinations of A and B presses (0..100)
  for (let pressA = 0; pressA <= 100; pressA++) {
    for (let pressB = 0; pressB <= 100; pressB++) {
      if (pressA * aX + pressB * bX === prizeX &&
          pressA * aY + pressB * bY === prizeY) {
        const cost = pressA * 3 + pressB;
        if (cost < minTokens) minTokens = cost;
        found = true;
      }
    }
  }

  if (found) {
    totalTokens += minTokens;
    prizesWon++;
  }
}

console.log(`Prizes won: ${prizesWon}`);
console.log(`Minimum tokens: ${totalTokens}`);
