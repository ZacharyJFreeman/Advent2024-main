var fs = require('fs');
let dataArray = []
let width = 0
let height = 0
let groupedByValue = {};
const antiNodes = new Set()

try {
  const data = fs.readFileSync('day8_data.txt', 'utf8');
  
  dataArray = data.trim().split("\r\n");
  height = dataArray.length
  width = dataArray[0].length
 
} catch (err) {
  console.error(err);
}


// loop through data array
for (let row = 0; row < height; row++) {
  for (let column = 0; column < width; column++) {
    const currentValue = dataArray[row][column];
    if (currentValue !== ".") {
// if character not "." found add to object grouped by value
      (groupedByValue[currentValue] || (groupedByValue[currentValue] = [])).push([column, row]);
    }
  }
}

// check if in bounds
const inBounds = (row, column) => row >= 0 && row < height && column >= 0 && column < width
        //console.log(inBounds(-1,0))

        // calculate vector from character A to character B
        // console.log(groupedByValue[0])
        // console.log(`vector = [${2 * groupedByValue[0][0][0] - groupedByValue[0][1][0]},${2 * groupedByValue[0][0][1] - groupedByValue[0][1][1]}]`)
        // console.log(`vector = [${2 * groupedByValue[0][1][0] - groupedByValue[0][0][0]},${2 * groupedByValue[0][1][1] - groupedByValue[0][0][1]}]`)

for (values in groupedByValue) {
    const currentValue = groupedByValue[values]
    for (let index1 = 0; index1 < currentValue.length; index1++) {
        for (let index2 = index1 + 1; index2 < currentValue.length; index2++) {
            const [currentX, currentY] = currentValue[index1]
            const [nextX, nextY] = currentValue[index2]
            // positive vector
            const positiveX = 2* currentX - nextX
            const positiveY = 2* currentY - nextY
            if (inBounds(positiveX, positiveY)) {
                antiNodes.add(positiveX + "," + positiveY)
            }
            // negative vector
            const negativeX = 2* nextX - currentX
            const negativeY = 2* nextY - currentY
            if (inBounds(negativeX, negativeY)) {
                antiNodes.add(negativeX + "," + negativeY)
            }
        }
    }
}
// steps



// if value exists in row/colum increment total
// continue to check along vector to see if it is within array
// check reverese of the array
let total = antiNodes.size
console.log(total)