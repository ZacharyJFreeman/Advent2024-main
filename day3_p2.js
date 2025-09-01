var fs = require('fs');
let dataArray = []
let total = 0


try {
  const data = fs.readFileSync('day3_p2_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    dataArray = text
} catch (err) {
  console.error(err);
}

function multiplySum(element) {
  let multipliedValue = 0
  for (let i = 0; i < element.length-1; i++) {
    if (i % 2 === 0) {
      multipliedValue = element[i]*element[i+1]
      total += multipliedValue
    } 
  }
}

 function removeText(element) {
  while (element.indexOf("don't()") !== -1) {
  const dontLocation = element.indexOf("don't()")
  const nextDoLocation = element.indexOf("do()",dontLocation+1)
  const ignoreSection = element.substring(dontLocation,nextDoLocation+4)
  const updatedString = element.replace(ignoreSection,"")
  element = updatedString
  }
  return element
 }

let processedString =  removeText(dataArray)
let processedArray = processedString.match(/mul\([0-9]+,[0-9]+\)/g).join('').replaceAll(")","").replaceAll("mul","").replaceAll("(",",").split(",").map(Number).slice(1)

multiplySum(processedArray)

console.log(total)

// console.log(dataArray)
// multiplySum(dataArray)
// console.log(dataArray)
//  console.log("Unsafe count is = " + unsafeCount)