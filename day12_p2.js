const fs = require('fs'); 

// -------------------------
// Load input file into a 2D grid
// -------------------------
let dataArray = [];
let totalPrice = 0;

try {
  const data = fs.readFileSync('day12_data.txt', 'utf8');
  // Split into lines, then split each line into individual characters
  dataArray = data.split(/\r?\n/).map(line => line.trim().split(''));
} catch (err) {
  console.error(err);
}

const height = dataArray.length;       // Number of rows
const width = dataArray[0].length;     // Number of columns

// -------------------------
// Directions for exploring neighbors: up, down, left, right
// -------------------------
const directions = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1]   // right
];

// -------------------------
// Matrix to track visited cells
// -------------------------
const visited = Array.from({ length: height }, () => Array(width).fill(false));

// -------------------------
// Depth-First Search (DFS) to collect all cells of a region
// -------------------------
function dfs(row, col, plant) {
  const stack = [[row, col]];   // Initialize stack with starting cell
  const cells = [];             // Array to store all cells in this region

  while (stack.length > 0) {
    const [r, c] = stack.pop();

    // Skip if already visited
    if (visited[r][c]) continue;

    visited[r][c] = true;       // Mark cell as visited
    cells.push([r, c]);         // Add cell to region

    // Explore all 4 neighbors
    for (const [dx, dy] of directions) {
      const nr = r + dx;
      const nc = c + dy;

      // Check bounds and if neighbor is part of the same plant type
      if (nr >= 0 && nr < height && nc >= 0 && nc < width &&
          !visited[nr][nc] && dataArray[nr][nc] === plant) {
        stack.push([nr, nc]);
      }
    }
  }

  return cells;  // Return all cells belonging to this region
}

// -------------------------
// Count sides of a region based on continuous boundary runs
// -------------------------
function countSides(cells) {
  // Create a boolean grid marking cells of this region
  const region = Array.from({ length: height }, () => Array(width).fill(false));
  cells.forEach(([r, c]) => region[r][c] = true);

  let sides = 0;  // Initialize side count

  // Helper function to count continuous "runs" in a line
  function countLine(line) {
    let inRun = false, cnt = 0;
    for (const val of line) {
      if (val) {
        if (!inRun) { cnt++; inRun = true; } // Start of a new run counts as 1 side
      } else inRun = false;
    }
    return cnt;
  }

  // -------------------------
  // Horizontal boundaries (top and bottom)
  // -------------------------
  for (let r = 0; r < height; r++) {
    // Top boundary of row r
    const top = region[r].map((v, c) => v && (r === 0 || !region[r-1][c]));
    // Bottom boundary of row r
    const bottom = region[r].map((v, c) => v && (r === height-1 || !region[r+1][c]));
    sides += countLine(top) + countLine(bottom);
  }

  // -------------------------
  // Vertical boundaries (left and right)
  // -------------------------
  for (let c = 0; c < width; c++) {
    // Left boundary of column c
    const left = Array.from({length: height}, (_, r) => region[r][c] && (c === 0 || !region[r][c-1]));
    // Right boundary of column c
    const right = Array.from({length: height}, (_, r) => region[r][c] && (c === width-1 || !region[r][c+1]));
    sides += countLine(left) + countLine(right);
  }

  return sides;  // Return total number of sides for this region
}

// -------------------------
// Main loop over all cells in the grid
// -------------------------
for (let r = 0; r < height; r++) {
  for (let c = 0; c < width; c++) {
    // Start a DFS only if this cell has not been visited yet
    if (!visited[r][c]) {
      const cells = dfs(r, c, dataArray[r][c]);  // Get all cells in this region
      const area = cells.length;                 // Area = number of cells
      const sides = countSides(cells);          // Count sides using boundary runs
      totalPrice += area * sides;               // Multiply area by sides and add to total
    }
  }
}

// -------------------------
// Output total price of all regions
// -------------------------
console.log(totalPrice);
