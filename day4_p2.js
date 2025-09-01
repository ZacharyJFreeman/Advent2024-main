var fs = require('fs');
let dataArray = []
let totalFound = 0
let currentString = ""
let countA = 0


try {
  const data = fs.readFileSync('day4_p2_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    dataArray = text.split("\r\n")
} catch (err) {
  console.error(err);
}

    const width = dataArray[0].length
    const height = dataArray.length
    const word = "MAS"
    const orientationACheck = [
        [-1, -1],       
               
                         [1,  1]
                    ]
    const orientationBCheck = [
                        [1, -1],
               
        [-1,  1],         
                    ]

    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            if (dataArray[row][column] === word.substring(1,2)) { 
                
                    // A FOUND
                    console.log(`FOUND A at location Row = ${row} || Column = ${column}`)
                    countA++
                    
                    // A TEST
                    if (checkOrientation(row,column,orientationACheck) === "SAM" || checkOrientation(row,column,orientationACheck) === "MAS") {
                        
                    // if A TEST SUCCESS TEST B
                        if (checkOrientation(row,column,orientationBCheck) === "SAM" || checkOrientation(row,column,orientationBCheck) === "MAS") {
                        console.log(currentString)
                        totalFound++
                    }
                    }
                
            }
        }
        
    }
//  console.log(dataArray.length)
 console.log(totalFound)




function checkOrientation(rowi,columni,oreintation){
                    let columnFirstOrientation = columni + oreintation[0][0]
                    let rowFirstOrientation = rowi + oreintation[0][1]
                    
                    let columnSecondOrientation = columni + oreintation[1][0]
                    let rowSecondOrientation = rowi + oreintation[1][1]




                    if (rowFirstOrientation < 0 || rowSecondOrientation < 0) {
                        return false}
                    if (rowFirstOrientation === height || rowSecondOrientation === height) {
                         return false}
                    if (columnFirstOrientation < 0 || columnSecondOrientation < 0) {
                         return false}
                    if (columnFirstOrientation === width || columnSecondOrientation === width) {
                         return false}
                    return currentString = dataArray[rowFirstOrientation][columnFirstOrientation] + word.substring(1,2) + dataArray[rowSecondOrientation][columnSecondOrientation]
                    }