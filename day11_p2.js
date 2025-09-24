// Advent of Code 2024 - Day 11: Plutonian Pebbles
// Using Map and BigInt to handle huge stone counts

const input = "4022724 951333 0 21633 5857 97 702 6";
let stones = input.trim().split(" ").map(n => BigInt(n));

// Initialize working map: stone value → count
let workingMap = new Map();
for (const n of stones) {
  workingMap.set(n, (workingMap.get(n) || 0n) + 1n);
}

// Blink function
function blink(map) {
  const temp = new Map();
  for (const [stone, count] of map.entries()) {
    if (stone === 0n) {
      temp.set(1n, (temp.get(1n) || 0n) + count);
    } else {
      const s = stone.toString();
      if (s.length % 2 === 0) {
        // Even number of digits → split
        const left = BigInt(parseInt(s.slice(0, s.length / 2)));
        const right = BigInt(parseInt(s.slice(s.length / 2)));
        temp.set(left, (temp.get(left) || 0n) + count);
        temp.set(right, (temp.get(right) || 0n) + count);
      } else {
        // Odd number of digits → multiply by 2024
        const newStone = stone * 2024n;
        temp.set(newStone, (temp.get(newStone) || 0n) + count);
      }
    }
  }
  return temp;
}

// Part 1: 25 blinks
let map25 = new Map(workingMap);
for (let i = 0; i < 25; i++) {
  map25 = blink(map25);
}
let total25 = [...map25.values()].reduce((a, b) => a + b, 0n);
console.log("Part 1 (25 blinks):", total25.toString());

// Part 2: 75 blinks
let map75 = new Map(workingMap);
for (let i = 0; i < 75; i++) {
  map75 = blink(map75);
}
let total75 = [...map75.values()].reduce((a, b) => a + b, 0n);
console.log("Part 2 (75 blinks):", total75.toString());

// used AI t fgure out the problem with just increasing number of blinks
// highlighting the use of a map to track counts of values, which can be manipulated
// this works as order isn't important and you can apply the logic to each value within the map