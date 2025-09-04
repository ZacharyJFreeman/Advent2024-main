var fs = require('fs');
let dataArray = []
let width = 0
let height = 0
let groupedByValue = {};
const antiNodes = new Set()

try {
  const data = fs.readFileSync('day8_data.txt', 'utf8');
  
  dataArray = data.trim().split("\r\n");
  height = dataArray.length
  width = dataArray[0].length
 
} catch (err) {
  console.error(err);
}

// group antennas by frequency
for (let row = 0; row < height; row++) {
  for (let column = 0; column < width; column++) {
    const currentValue = dataArray[row][column];
    if (currentValue !== ".") {
      (groupedByValue[currentValue] || (groupedByValue[currentValue] = [])).push([column, row]);
    }
  }
}

// bounds check (x,y)
const inBounds = (x, y) => x >= 0 && x < width && y >= 0 && y < height;

// find gradient smallest gradient step 
function findFactor(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b];
  return a;
}

// takes current values and adds the info to antiNodes set until values are out of bounds
function findAntinodes(x, y, distanceX, distanceY) { // x, y = antennas location || distanceX and distanceY is smallest gradient steps
  let currentX = x, currentY = y;
  while (inBounds(currentX, currentY)) {
    antiNodes.add(`${currentX},${currentY}`); // use a set to hold only different values
    currentX += distanceX;
    currentY += distanceY;
  }
}

for (let values in groupedByValue) {
  const currentValue = groupedByValue[values];
  for (let index1 = 0; index1 < currentValue.length; index1++) {
    for (let index2 = index1 + 1; index2 < currentValue.length; index2++) {
      const [x1, y1] = currentValue[index1];
      const [x2, y2] = currentValue[index2];

      const dx = x2 - x1;
      const dy = y2 - y1;
      const g = findFactor(dx, dy);
      const stepX = dx / g;
      const stepY = dy / g;

      // walk both directions along the line
      findAntinodes(x1, y1, stepX, stepY);
      findAntinodes(x2, y2, -stepX, -stepY);
    }
  }
}

console.log(antiNodes.size)