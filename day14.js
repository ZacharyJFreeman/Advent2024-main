const fs = require('fs');

let dataArray = [];
let newArray = [];
let width = 101
let height = 103
let duration = 100
let locationArray = []
let q1 = 0
let q2 = 0
let q3 = 0
let q4 = 0
let midX = Math.floor(width/2)
let midY = Math.floor(height/2)

try {
  const data = fs.readFileSync('day14_data.txt', 'utf8');
  dataArray = data.split("\r\n");
} catch (err) {
  console.error(err);
}

dataArray.forEach(element => {
  element = element.replaceAll(/[pv=]/g, "")
  newArray.push(element.split(/[ ,]+/))
});

for (let index = 0; index < newArray.length; index++) {
  
    let xPos = Number(newArray[index][0])
    let yPos = Number(newArray[index][1])

    // calculate where they end up at end of duration
    xPos = ((xPos + (Number(newArray[index][2]) * duration)) % width + width) % width
    yPos = ((yPos + (Number(newArray[index][3]) * duration)) % height + height) % height

    // ignore if it falls in the middle of width
    if (xPos === midX || yPos ===midY) {
     continue
    }

    if (xPos > midX && yPos > midY) {
      q1++
    }
    if (xPos > midX && yPos < midY) {
      q2++
    }
    if (xPos < midX && yPos > midY) {
      q3++
    }
    if (xPos < midX && yPos < midY) {
      q4++
    }
    locationArray.push(`${xPos},${yPos}`)
}

console.log(q1)
console.log(q2)
console.log(q3)
console.log(q4)
console.log(`total = ${q1*q2*q3*q4}`)
// console.log(locationArray)
