var fs = require('fs');
const { diff } = require('util');
let dataArray = []
let intArray= []
let differenceArray = []
let resultArrary = []
let safeCount = 0
let unsafeCount = 0

try {
  const data = fs.readFileSync('day2_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    text = text.split("\r\n")
    dataArray = text
} catch (err) {
  console.error(err);
}

// dataArray.forEach(element => {
//   intArray.push(parseInt(element))
// });
    // console.log(dataArray)

    dataArray.forEach(element => {
      let tempArray = element.split(" ")
      tempArray = tempArray.map(Number)
      let tempString = ""
      for (let i = 0; i < tempArray.length-1; i++) {
            if (tempArray[i] - tempArray[i+1] === 0  ) {
                tempString = `Unsafe because ${tempArray[i]} and ${tempArray[i+1]} is neither an increase or decrease`
                break

            } else if (tempArray[i] - tempArray[i+1] > 3  ) {
                tempString = `Unsafe because ${tempArray[i]} and ${tempArray[i+1]} is a decrease of ${Math.abs(tempArray[i] - tempArray[i+1])}`
                break

            } else if (tempArray[i] - tempArray[i+1] < -3  ) {
                tempString = `Unsafe because ${tempArray[i]} and ${tempArray[i+1]} is an increase of ${Math.abs(tempArray[i] - tempArray[i+1])}`
                break

            } else {
                tempString += `${tempArray[i] - tempArray[i+1]}`
            }
            //  console.log(tempArray)
      }

      if ((tempString.split("-").length - 1) === 0 && tempArray.length-1 === tempString.split("").length)  {
        resultArrary.push("Safe because the levels are all increasing by 1, 2, or 3")
          safeCount++
      } else if ((tempString.split("-").length - 1) === tempArray.length-1) {
        resultArrary.push("Safe because the levels are all decreassing by 1, 2, or 3")
          safeCount++
      } else if (tempString.split("").length > 30) {        
        resultArrary.push(tempString)
          unsafeCount++
      } else {
        resultArrary.push("UnSafe because the levels aren't consistantly decreasing or increasing")
          unsafeCount++
      }
          });
    ;

    // console.log(differenceArray)
     console.log(resultArrary)
     console.log("Safe count is = " + safeCount)
     console.log("Unsafe count is = " + unsafeCount)