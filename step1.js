const fs = require('fs');
const process = require('process');

// import fs from 'fs';
// import process from 'process';

function cat (path) {
    fs.readFile(path, 'utf8', (err, data) => (
        err ? console.error(`Big time ${err}`) : console.log(data)
        )
    )
}

cat(process.argv[2]);

module.exports = {
    cat: cat
}