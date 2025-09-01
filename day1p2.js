var fs = require('fs');
let leftArray = []
let rightArray = []
let dataArray = []
let differenceArray = []
let sumDifferenceArray = 0;

try {
  const data = fs.readFileSync('day1p2_data.txt', 'utf8');
  
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
        leftArray.push(dataArray[i])
    } else {
        rightArray.push(dataArray[i])
    } 
}

// console.log(leftArray)
// console.log(rightArray)

leftArray.forEach(element => {
    let counts = 0;

    rightArray.forEach(value => {
            if (element === value) {
      counts = counts + 1;
    }
    });
    differenceArray.push(counts*element)
});

sumDifferenceArray = differenceArray.reduce((a, b) => Math.abs(a) + Math.abs(b), 0)

console.log(sumDifferenceArray)
