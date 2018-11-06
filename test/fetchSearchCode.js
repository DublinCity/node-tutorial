const fs = require('fs')
const path = require('path')

let document = ''
let count = 1
const searchCodeLibrary = {
  area1: {},
  area2: {},
  area3: {}
}
const getSearchCodeSplitedBody = () => {
   document = fs.readFileSync(path.join(__dirname+'/searchCode.csv'), 'utf8')
  // console.log(count++,document)
  return document.split('\r')
}

const lines = getSearchCodeSplitedBody()
try {
  lines.forEach(line => {
    const cells = line.split(',')
    const [platform, key1, key2, key3, tlcode, val1, val2, val3] = cells
    for(let i = 1; i < 4; i++) {
      console.log()
      if(!searchCodeLibrary[`area${i}`][cells[i]]) { // set key-value
        searchCodeLibrary[`area${i}`][cells[i]] = cells[4+i]
      } else {
        if(searchCodeLibrary[`area${i}`][cells[i]] !== cells[4+i]) { // aleady set
          throw Error(`key , ${cells[i]}  aleady has ${searchCodeLibrary[`area${i}`][cells[i]]} but is about to set  ${cells[4+i]}`)
        }
      }
    }
  })
} catch(err) {
  console.error(err)
}

console.log(searchCodeLibrary)