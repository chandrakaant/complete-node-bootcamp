const fs = require('fs');

 const textin = fs.readFileSync('./txt/input.txt',  'utf-8');
console.log(textin);

const textout = `This is what we know about the avaocado: ${textin}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textout);
console.log("File written");