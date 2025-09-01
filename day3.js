var fs = require('fs');
let dataArray = []
let total = 0

try {
  const data = fs.readFileSync('day3_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    dataArray = text
    .match(/mul\([0-9]+,[0-9]+\)/g).join('').replaceAll(")","").replaceAll("mul","").replaceAll("(",",").split(",").map(Number).slice(1)
} catch (err) {
  console.error(err);
}

function multiplySum(element) {
  let multipliedValue = 0
  for (let i = 0; i < element.length-3; i++) {
    if (i % 2 === 0) {
      multipliedValue = element[i]*element[i+1]
      total += multipliedValue
    } 
  }
}

multiplySum(dataArray)
console.log(total)
//  console.log("Unsafe count is = " + unsafeCount)