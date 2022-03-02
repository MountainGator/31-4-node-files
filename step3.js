const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
    if (out) {
      fs.writeFile(out, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${out}: ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }

const cat = (path, out) => {
    fs.readFile(path, 'utf8', (err, data) => (
        err ? console.error(err) : handleOutput(data, out)
        )
    )
}

async function webCat (url, out) {
    try {
        let response = await axios.get(url);
        handleOutput(response.data, out); 
    } catch (err) {
        console.error(`Error: ${err}`)
        process.exit(1);
    }
}

let path;
let out; 

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
  path = process.argv[2];
}



if(path.slice(0, 4) === 'http') {
    webCat(path, out);
  } else {
    cat(path, out);
  }

module.exports = {
    cat: cat,
    webCat: webCat, 
    handleOutput: handleOutput
}