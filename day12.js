const fs = require('fs');

// Read input from file and convert to a 2D grid of characters
const data = fs.readFileSync('day12_data.txt', 'utf8').trim();
const grid = data.split(/\r?\n/).map(line => line.split('')); // Each row becomes an array of characters

const height = grid.length;
const width = grid[0].length;

// Directions for moving up, down, left, right
const directions = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1],  // right
];

// Matrix to track whether a cell has been visited
const visited = Array.from({ length: height }, () => Array(width).fill(false));

function dfs(r, c, plantType) {
  let area = 0;       // Number of cells in this region
  let perimeter = 0;  // Number of sides exposed to edge or different plant
  const stack = [[r, c]]; // Stack for DFS

  while (stack.length > 0) {
    const [x, y] = stack.pop();

    // Skip if already visited
    if (visited[x][y]) continue;

    // Mark current cell as visited
    visited[x][y] = true;

    // Increment area for this cell
    area++;

    // Check all four directions for perimeter
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // If neighbor is out of bounds or different plant, add to perimeter
      if (nx < 0 || ny < 0 || nx >= height || ny >= width || grid[nx][ny] !== plantType) {
        perimeter++;
      } 
      // If neighbor is the same plant and not visited, add to stack for DFS
      else if (!visited[nx][ny]) {
        stack.push([nx, ny]);
      }
    }
  }

  // Return price of this region
  return area * perimeter;
}

let totalPrice = 0; // Total cost of fencing all regions

// Loop over every cell in the grid
for (let r = 0; r < height; r++) {
  for (let c = 0; c < width; c++) {
    // If cell is not visited, it's a new region
    if (!visited[r][c]) {
      // Add the price of this region to total
      totalPrice += dfs(r, c, grid[r][c]);
    }
  }
}

// Print the total price of all fences
console.log(totalPrice);
