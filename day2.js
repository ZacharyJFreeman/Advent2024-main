var fs = require('fs');
let dataArray = []
let safeCount = 0
let unsafeCount = 0

try {
  const data = fs.readFileSync('day2_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    dataArray = text
    .trim()
    .split("\r\n")
    .map(line => line.split(" ").map(Number));
} catch (err) {
  console.error(err);
}

function isSafe(value) {
let polarity = 0
for (let i = 0; i < value.length; i++) {
  let difference = value[i] - value[i+1]
  if (difference === 0) {
    return false
  }

  if (difference > 3) {
    return false
  }

  if (difference < -3) {
    return false
  }
  if (polarity === 0 && difference < 0) {
        polarity = -1
  } else if (polarity === 0 && difference > 0) {
        polarity = 1
  } else if ((difference < 0 && polarity === -1) || (difference > 0 && polarity === 1)) {
        if (i === value.length-2) {
          return true
        } else {
          continue
        }
  } else {
        return false
      }
}
}

// console.log(dataArray)
dataArray.map(value => isSafe(value) === true ? safeCount++ : unsafeCount++)
console.log("Safe count is = " + safeCount)
    //  console.log("Unsafe count is = " + unsafeCount)