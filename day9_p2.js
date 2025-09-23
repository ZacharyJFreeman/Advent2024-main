const fs = require('fs');

const data = fs.readFileSync('day9_data.txt', 'utf8').trim();

// Parse into alternating file blocks and spaces
let disk = [];
let fileId = 0;
for (let i = 0; i < data.length; i++) {
  const length = Number(data[i]);
  if (i % 2 === 0) {
    // File blocks
    for (let j = 0; j < length; j++) {
      disk.push(fileId);
    }
    fileId++;
  } else {
    // Free space
    for (let j = 0; j < length; j++) {
      disk.push('.');
    }
  }
}

// Compact: move from rightmost file blocks into leftmost free space
let left = 0;
let right = disk.length - 1;

while (left < right) {
  // Find the next free space from the left
  while (left < right && disk[left] !== '.') {
    left++;
  }
  // Find the next file block from the right
  while (left < right && disk[right] === '.') {
    right--;
  }

  if (left < right) {
    // Move the block
    disk[left] = disk[right];
    disk[right] = '.';
  }
}

// Compute checksum
let total = 0;
for (let i = 0; i < disk.length; i++) {
  if (disk[i] !== '.') {
    total += i * Number(disk[i]);
  }
}

console.log(total);
