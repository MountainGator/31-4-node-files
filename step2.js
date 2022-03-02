const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat (path) {
    fs.readFile(path, 'utf8', (err, data) => (
        err ? console.error(`Big Time ${err}`) : console.log(data)
        )
    )
}

async function webCat (url) {
    try {
        let response = await axios.get(url);
        console.log(response.data); 
    } catch (err) {
        console.error(`Big Time ${err}`)
        process.exit(1);
    }
}

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
  } else {
    cat(path);
  }

module.exports = {
    cat: cat,
    webCat: webCat
}