var fs = require('fs');
let dataArray = []
let resultsArray = []
let valuesArray = []
let total = 0;

const inputLines = fs.readFileSync("day7_data.txt", "utf8")
                     .trim()
                     .split("\n");

                     
try {
  const data = fs.readFileSync('day7_data.txt', 'utf8');
  
  dataArray = data.trim().split("\r\n");
  for (const data of dataArray) {
    const [results, values] = data.split(":");

    resultsArray.push(Number(results))
    valuesArray.push(values.trim().split(/\s+/).map(Number))
  }
 
} catch (err) {
  console.error(err);
}


// create recursive function
// base condition when index === values.length
// get next value to check
// start recursive function with updated currentvalue by addition
// start recursive function with updated currentvalue by multiplication
// if results of function is true return
function canReachResult(values, result, index = 1, currentValue = values[0]) {
    if (index === values.length) {
        // Check if currentValue equals result
        return currentValue === result;
    }

    // Get the next number
    const nextNumber = values[index];

    // Try adding the next number
    const addition = canReachResult(values, result, index + 1, currentValue + nextNumber);

    // Try multiplying the next number
    const multiplication = canReachResult(values, result, index + 1, currentValue * nextNumber);

    // Try concaternating the next number
    const concaternating = canReachResult(values, result, index + 1, Number(`${currentValue}${nextNumber}`));

    // Return true if either option works
    return addition || multiplication || concaternating;
}

// Sum of all targets that can be reached

for (let i = 0; i < dataArray.length; i++) {
  if (canReachResult(valuesArray[i], resultsArray[i])) {
        total += resultsArray[i];
    }
}


// Output the final result
console.log(total);

