var fs = require('fs');
let dataArray = []
let pageRules = []
let pageNumbers = []
let emptyIndex = 0
let badIndex = []
let unsuccessfulPages  = []
let successfulPagesArray = []
let total = 0
let finalArray = []
try {
  const data = fs.readFileSync('day5_p2_data.txt', 'utf8');
  
    let text = data
    // text = text.replace(/ /g,"")
    dataArray = text.replaceAll("|","\r\n").split(/\r\n/g)
} catch (err) {
  console.error(err);
}

function getBlank(element) {
    for (let i = 0; i < dataArray.length; i++) {
        if (element[i] === "" && emptyIndex === 0) {
            emptyIndex = i
            return emptyIndex
        }
}
}
// Find empty string in arrya
getBlank(dataArray)
// Create new arrays from data
dataArray.forEach((element,index) => {
    if (emptyIndex === index) {

    }
    else if (emptyIndex < index) {
        pageNumbers.push(element)
    } else {
        pageRules.push(element)
    }
    
});
// console.log(pageNumbers)
// console.log(pageRules)

for (let row = 0; row < pageNumbers.length; row++) {
    for (let i = 0; i < pageRules.length; i+=2) {
        if (pageNumbers[row].indexOf(pageRules[i]) === -1 || pageNumbers[row].indexOf(pageRules[i+1]) === -1) {
            continue
        } else if (pageNumbers[row].indexOf(pageRules[i]) > pageNumbers[row].indexOf(pageRules[i+1])) {
            // console.log(row + " || " + pageNumbers[row].indexOf(pageRules[i]) + " || " + pageNumbers[row].indexOf(pageRules[i+1]))
            badIndex.push(row)
            break 
        }

    }
    
}
// Remove bad pages
pageNumbers.forEach((element,index) => {
    let isBad = 0
    for (let i = 0; i < badIndex.length; i++) {
        if (index === badIndex[i]) {
            isBad = 1
            // console.log(`index ${index} is bad`)
        }
    }
    if (isBad === 1) {
        unsuccessfulPages.push(element)
        
    }
});

// Loop to reorder the unsuccessfulPages

for (let row = 0; row < unsuccessfulPages.length; row++) {
    for (let i = 0; i < pageRules.length; i+=2) {  
        if (unsuccessfulPages[row].indexOf(pageRules[i]) === -1 || unsuccessfulPages[row].indexOf(pageRules[i+1]) === -1) {
            continue
        } else if (unsuccessfulPages[row].indexOf(pageRules[i]) > unsuccessfulPages[row].indexOf(pageRules[i+1])) {
            // console.log(`pageRules[i+1] === ${pageRules[i+1]},`)
            // console.log(`pageRules[i] === ${pageRules[i]},`)
            // console.log(`unsuccessfulPages[row] === ${unsuccessfulPages[row]}`)
            // console.log(`[row] === ${row}`)
            // console.log(`[i] === ${i}`)
            unsuccessfulPages[row] = unsuccessfulPages[row].replace(`${pageRules[i+1]}`,"")
            unsuccessfulPages[row] = unsuccessfulPages[row].replace(`${pageRules[i]}`,`${pageRules[i]},${pageRules[i+1]}`)
            // console.log(`unsuccessfulPages[row] === ${unsuccessfulPages[row]}`)
            i=0
            continue
        }

    }
}
// Convert to numbers
  unsuccessfulPages.forEach(element => {
       successfulPagesArray.push(element.split(",").map(Number))
   })
for (let i = 0; i < successfulPagesArray.length; i++) {
    finalArray[i] = successfulPagesArray[i].filter(value => value !== 0)
}
// console.log(finalArray)
//Calculate total

for (let i = 0; i < finalArray.length; i++) {
       total += finalArray[i][(finalArray[i].length-1)/2]
}

// console.log(successfulPagesArray)
//console.log(finalArray)
console.log(total)

// ANSWER IS 4151