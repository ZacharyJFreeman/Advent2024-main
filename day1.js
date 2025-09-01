var fs = require('fs');
let leftArray = []
let rightArray = []
let dataArray = []
let differenceArray = []
let sumDifferenceArray = 0

try {
  const data = fs.readFileSync('day1_data.txt', 'utf8');
  
    let text = data.replace(/(\r\n|\n|\r)/gm," ")
    // text = text.replace(/   /g,"")
    text = text.split(" ")
    dataArray = text.filter(Number) 
} catch (err) {
  console.error(err);
}
    
var arrayLength = dataArray.length;

for (var i = 0; i < arrayLength; i++) {
    if (i % 2 === 0) {
        rightArray.push(dataArray[i])
    } else {
        leftArray.push(dataArray[i])
    } 
}
arrayLength = leftArray.length;
leftArray = leftArray.sort()
rightArray = rightArray.sort()
differenceArray = leftArray.map((element, index) => element - rightArray[index]);
//  console.log(leftArray)
//  console.log(rightArray)
console.log(differenceArray)
// console.log(arrayLength)
 sumDifferenceArray = differenceArray.reduce((a, b) => Math.abs(a) + Math.abs(b), 0)

console.log(sumDifferenceArray)