var fs = require('fs');
let dataArray = []
let totalFound = 0
let hikeStartValues = new Set();

try {
  const data = fs.readFileSync('day10_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    dataArray = text.split("\r\n")
} catch (err) {
  console.error(err);
}


const width = dataArray[0].length
const height = dataArray.length
const word = "0123456789"
const directionToCheck = [
                  [0, -1],
        [-1,  0],          [1,  0],
                  [0,  1]
    ]
    //create array of all positions of 0
    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            if (dataArray[row][column] === word.substring(0,1)) { 
                //zero found, add to state
                hikeStartValues.add(`${row},${column}`)
            }
        }
        
    }

hikeStartValues.forEach(element => {
    // split state into column, row
    let [column, row] = element.split(",")
    let currentString = "0"

    console.log(`column = ${column} || row = ${row}`)
    for (let index = 1; index < word.length; index++) {
        for (let i = 0; i < directionToCheck.length; i++) {
                    // sets current row and column to check
                    let checkingRow = Number(row) + directionToCheck[i][1]
                    let checkingColumn = Number(column) + directionToCheck[i][0]
                    if (checkingRow < 0) {
                        continue} // not out of bounds
                    if (checkingRow === height) {
                        continue} // not out of bounds
                    if (checkingColumn < 0) {
                        continue} // not out of bounds
                    if (checkingColumn === width) {
                        continue} // not out of bounds
                        if (dataArray[checkingRow][checkingColumn] === "1") {
                            console.log(`dataArray[${checkingRow}][${checkingColumn}] = ${dataArray[checkingRow][checkingColumn]}`)
                        }

    } 
    }
});

console.log(totalFound)

