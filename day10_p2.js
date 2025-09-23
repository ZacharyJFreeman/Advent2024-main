var fs = require('fs'); 
let dataArray = []
let totalFound = 0
let hikeStartValues = new Set();

try {
  const data = fs.readFileSync('day10_data.txt', 'utf8');
  dataArray = data.split(/\r?\n/).map(line => line.trim());
} catch (err) {
  console.error(err);
}

const width = dataArray[0].length;
const height = dataArray.length;

const directions = [
        [0, -1],  // up
  [-1, 0],    [1, 0],   // left // right
        [0, 1]    // down
];

// collect all zeros
for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    if (dataArray[row][col] === '0') {
      hikeStartValues.add(`${row},${col}`);
    }
  }
}

function checkDistance(row, col) {
  const val = Number(dataArray[row][col]);

  if (val === 9) {
    return 1; // one complete path found
  }

  let paths = 0;

  for (let [dx, dy] of directions) {
    const newRow = row + dy;
    const newCol = col + dx;

    // check in bounds
    if (newRow < 0 || newRow >= height || newCol < 0 || newCol >= width) continue;

    const nextVal = Number(dataArray[newRow][newCol]);
    if (nextVal === val + 1) {
      paths += checkDistance(newRow, newCol);
    }
  }

  return paths;
}

hikeStartValues.forEach(start => {
  let [row, col] = start.split(',').map(Number);
  let score = checkDistance(row, col);
  totalFound += score;
});

console.log(totalFound);
