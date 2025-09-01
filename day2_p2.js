var fs = require('fs');
let dataArray = []
let safeCount = 0
let unsafeCount = 0

try {
  const data = fs.readFileSync('day2_p2_data.txt', 'utf8');
  
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
          // console.log(value + "||" + difference + " || " + polarity + " || return true")
          return true
        } else {
          continue
        }
  } else {
        return false
      }
}
}


function isSafeProblemDampener(value) {
if (isSafe(value)) return true

for (let i = 0; i < value.length; i++) {
    const singleBad = value.slice(0, i).concat(value.slice(i + 1));
    if (isSafe(singleBad)) return true;
  }
  return false;

}

// console.log(dataArray)
// dataArray.map(value => isSafe(value) === true ? safeCount++ : unsafeCount++)
dataArray.map(value => isSafeProblemDampener(value) === true ? safeCount++ : unsafeCount++)
console.log("Safe count is = " + safeCount)
    //  console.log("Unsafe count is = " + unsafeCount)