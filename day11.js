var fs = require('fs'); 
let dataArray = []
let workingArray = []

try {
  const data = fs.readFileSync('day11_data.txt', 'utf8');
  dataArray = data.split(" ");
} catch (err) {
  console.error(err);
}

let blinks = dataArray.shift()
workingArray = dataArray

for (let index = 0; index < blinks; index++) {
  let tempArray = []
  for (let i = 0; i < workingArray.length; i++) {
    // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1
    if (Number(workingArray[i]) === 0) {
      tempArray.push("1")
      continue
    }
    // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.
    // The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone.
    if (workingArray[i].length % 2 === 0) {
      tempArray.push(Number(workingArray[i].substring(0,workingArray[i].length/2)).toString())
      tempArray.push(Number(workingArray[i].substring(workingArray[i].length/2,workingArray[i].length/2 + workingArray[i].length/2)).toString())
      continue
    }
    // If none of the other rules apply, the stone is replaced by a new stone;
    //  the old stone's number multiplied by 2024 is engraved on the new stone.
    tempArray.push((Number(workingArray[i])*2024).toString())
  }
  workingArray.length = 0
  workingArray = tempArray
}
console.log(blinks)
console.log(workingArray.length);
