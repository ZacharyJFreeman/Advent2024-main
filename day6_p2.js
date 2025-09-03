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
guardRow = 0
guardColumn = 0
currentRow = 0
currentColumn = 0
finalArray = []
escaped = "false"
let testingNextPosition = ""
total = 0
direction = 0

try {
  const data = fs.readFileSync('day6_p2_data.txt', 'utf8');
  
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
                    guardRow = row
                    currentRow = row
                    guardColumn = column
                    currentColumn = column
                    break
                    }
                }
            }
        }
    
}
function guardTravel(array) {
    let state = `${tempRow},${tempColumn},${currentDirection}`;
    if (visited.has(state)) {
        total++
        return escaped = "loop"
    }
    visited.add(state);

    if (tempRow + movementDirection[currentDirection][0] > dataArray.length-1 || tempRow + movementDirection[currentDirection][0] < 0) {
        return escaped = "true"
    }
    
    if (tempColumn + movementDirection[currentDirection][1] > dataArray[0].length-1 || tempColumn + movementDirection[currentDirection][1] < 0) {
        return escaped = "true"
    }

    testingNextPosition = array[tempRow + movementDirection[currentDirection][0]][tempColumn + movementDirection[currentDirection][1]]

    if (testingNextPosition === "#") {
        if (currentDirection === 3) {
            currentDirection = 0
        } else {
            currentDirection = currentDirection + 1
        }
    } else {
        tempRow = tempRow + movementDirection[currentDirection][0]
        tempColumn = tempColumn + movementDirection[currentDirection][1]
    }
}

findGuard()

for (let row = 0; row < dataArray.length; row++) {
    for (let column = 0; column < dataArray.length; column++) {
        let tempArray = dataArray.map(inner => [...inner]);
        if (tempArray[row][column] === "#") {
            continue
        } else if (tempArray[row][column] === ".") {
            tempArray[row][column] = "#"
            currentDirection = direction
            testingNextPosition = ""
            escaped = "false"
            tempRow = guardRow
            tempColumn = guardColumn
          
            visited = new Set();

            while (escaped === "false") {
                guardTravel(tempArray)
                continue
            }
        }
    }
}

console.log(total)
