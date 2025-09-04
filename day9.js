var fs = require('fs');
let dataArray = []
let blocksArray = []
let spaceArray = []
let total = 0
let finalString = ""
try { const data = fs.readFileSync('day9_data.txt', 'utf8');
  dataArray = data.split(""); 
}
  catch (err) { 
    console.error(err); } 
    
    
    // data in format of # of blocks and then # of space
for (let index = 0; index < dataArray.length; index++) { 
  if (index % 2 === 0) {
     blocksArray.push(Number(dataArray[index])) 
  } else { 
  spaceArray.push(Number(dataArray[index])) 
  } 
} 

function parseIDBlock(value, id) { 
  let parseString = "" 
  for (let index = 0; index < value; index++) {
     parseString += id 
  }
  return parseString 
} 
  
function parseFreeSpace(value) {
  let parseString = ""
  for (let index = 0; index < value; index++) {
    parseString += "." 
  } 
  return parseString 
}

for (let index = 0; index < blocksArray.length; index++) {
  finalString += parseIDBlock(blocksArray[index], index)
  finalString += parseFreeSpace(spaceArray[index]) 
}

console.log(finalString)

  // data in format of # of blocks and then # of space
  
  for (let index = 0; index < finalString.length; index++) {
    if (finalString[index] != ".") {
      total += index*Number(finalString[index]) } } 
      
  console.log(total)