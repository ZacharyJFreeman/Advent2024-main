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
  const aX = BigInt(dataArray[index][2].replace(/\D/g,''));
  const aY = BigInt(dataArray[index][3].replace(/\D/g,''));
  const bX = BigInt(dataArray[index+1][2].replace(/\D/g,''));
  const bY = BigInt(dataArray[index+1][3].replace(/\D/g,''));
  const prizeX = BigInt(10000000000000) + BigInt(dataArray[index+2][1].replace(/\D/g,''));
  const prizeY = BigInt(10000000000000) + BigInt(dataArray[index+2][2].replace(/\D/g,''));

  clawSettings.push([aX, aY, bX, bY, prizeX, prizeY]);
}

let totalTokens = 0n;
let prizesWon = 0;

for (const [aX, aY, bX, bY, prizeX, prizeY] of clawSettings) {
  const det = aX * bY - aY * bX;

  if (det === 0n) continue; // No unique solution

  const xNum = prizeX * bY - prizeY * bX;
  const yNum = prizeY * aX - prizeX * aY;

  if (xNum % det !== 0n || yNum % det !== 0n) continue; // No integer solution

  const x = xNum / det;
  const y = yNum / det;

  if (x >= 0n && y >= 0n) {
    const cost = 3n * x + y;
    totalTokens += cost;
    prizesWon++;
  }
}

console.log(`Prizes won: ${prizesWon}`);
console.log(`Minimum tokens: ${totalTokens}`);
