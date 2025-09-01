var fs = require('fs');
let dataArray = []
let totalFound = 0
let currentString = ""


try {
  const data = fs.readFileSync('day4_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    dataArray = text.split("\r\n")
} catch (err) {
  console.error(err);
}

    const width = dataArray[0].length
    const height = dataArray.length
    const word = "XMAS"
    const directionToCheck = [
        [-1, -1], [0, -1], [1, -1],
        [-1,  0],          [1,  0],
        [-1,  1], [0,  1], [1,  1]
    ]
    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            if (dataArray[row][column] === word.substring(0,1)) { 
                //console.log("FOUND X at row = " + row + " column = " + column)
                for (let i = 0; i < directionToCheck.length; i++) {
                    // sets current row and column to check
                    let checkicheckingColumn = column + directionToCheck[i][0]
                    let checkingRow = row + directionToCheck[i][1]
                    // console.log("checkicheckingColumn === " + checkicheckingColumn)
                    // console.log("checkingRow === " + checkingRow)
                    if (checkingRow < 0) {
                        continue} // not out of bounds
                    if (checkingRow === height) {
                        continue} // not out of bounds
                    if (checkicheckingColumn < 0) {
                        continue} // not out of bounds
                    if (checkicheckingColumn === width) {
                        continue} // not out of bounds
                    currentString = "X" + dataArray[checkingRow][checkicheckingColumn]
                        // console.log("currentString = " + currentString + " | checkingRow = " + checkingRow + " | checkicheckingColumn = " + checkicheckingColumn + " | directionToCheck = " + directionToCheck[i])
                        // if current row and column are valid proceed with known direction
                        for (let index = 0; index < 2; index++) {
                            checkicheckingColumn = checkicheckingColumn + directionToCheck[i][0]
                            checkingRow = checkingRow + directionToCheck[i][1]
                            if (checkingRow < 0) {break}
                            if (checkingRow === height) {break}
                            if (checkicheckingColumn < 0) {break}
                            if (checkicheckingColumn === width) {break}
                            currentString += dataArray[checkingRow][checkicheckingColumn]
                            // console.log("currentString = " + currentString + " | checkingRow = " + checkingRow + " | checkicheckingColumn = " + checkicheckingColumn + " | directionToCheck = " + directionToCheck[i])
                        }
                    if (currentString === "XMAS") {totalFound++}
                    //console.log(currentString)
                }
            }
        }
        
    }
console.log(totalFound)
// multiplySum(dataArray)
// console.log(dataArray)
//  console.log("Unsafe count is = " + unsafeCount)