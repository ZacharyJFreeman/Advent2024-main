var fs = require('fs');
const { uptime } = require('process');
const { escape } = require('querystring');
let dataArray = []
total = 0
upString = "^"
rightString = ">"
downString = "v"
leftString = "<"
up = [-1 , 0]
right = [0 , 1]
down = [1 , 0]
left = [0 , -1]
findDirection = [upString, rightString, downString, leftString]
movementDirection = [up , right, down, left]
currentDirection = 0
currentRow = 0
currentColumn = 0
finalArray = []
escaped = "false"
let testingNextPosition = ""
total = 0

try {
  const data = fs.readFileSync('day6_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    text = text.split(/\r\n/g)
    text.forEach(element => {dataArray.push(element.split(""))
        
    });
} catch (err) {
  console.error(err);
}

function findGuard() {
    // find current position of guard and direction faced
    for (let row = 0; row < dataArray.length; row++) {
        for (let column = 0; column < dataArray.length; column++) {
            for (let direction = 0; direction < findDirection.length; direction++) {
                if (dataArray[row][column] === findDirection[direction]) {
                    console.log(`Guard found at row = ${row} and column = ${column} and the direction is ${direction}`)
                    currentDirection = direction
                    currentRow = row
                    currentColumn = column
                    dataArray[row][column] = "X"
                    break
                    }
                }
            }
        }
    
}

function guardTravel(directionToTest) {

    if (currentRow + movementDirection[currentDirection][0] > dataArray.length-1 || currentRow + movementDirection[currentDirection][0] < 0) {
        return escaped = "true"
    }
    
    if (currentColumn + movementDirection[currentDirection][1] > dataArray[0].length-1 || currentColumn + movementDirection[currentDirection][1] < 0) {
        return escaped = "true"
    }
    // console.log(`dataArray[currentRow + movementDirection[currentDirection][0]][currentColumn + movementDirection[currentDirection][1] = ${dataArray[currentRow + movementDirection[currentDirection][0]][currentColumn + movementDirection[currentDirection][1]]}`)
    testingNextPosition = dataArray[currentRow + movementDirection[currentDirection][0]][currentColumn + movementDirection[currentDirection][1]]

    if (testingNextPosition === "#") {
        // console.log(`current value of testingNextPosition = ${testingNextPosition}`)
        if (currentDirection === 3) {
            currentDirection = 0
        } else {
            currentDirection = currentDirection + 1
        }
        dataArray[currentRow + movementDirection[currentDirection][0]][currentColumn + movementDirection[currentDirection][1]] = "X"      
    } else {
        // console.log(`testing next position = ${testingNextPosition} currentRow = ${currentRow} + ${movementDirection[currentDirection][0]} currentColumn = ${currentColumn} + ${movementDirection[currentDirection][1]}`)
        dataArray[currentRow + movementDirection[currentDirection][0]][currentColumn + movementDirection[currentDirection][1]] = "X"
        currentRow = currentRow + movementDirection[currentDirection][0]
        currentColumn = currentColumn + movementDirection[currentDirection][1]
    }
    
}

    findGuard()

    while (escaped === "false") {
        guardTravel()
        
    }


    for (let row = 0; row < dataArray.length; row++) {
        for (let column = 0; column < dataArray.length; column++) {
                if (dataArray[row][column] === "X") {
                    total++
                    }
                }
        }

console.log(dataArray)