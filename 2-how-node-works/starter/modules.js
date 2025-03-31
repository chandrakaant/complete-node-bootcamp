//console.log(arguments);
//console.log(require('module').wrapper);


//module.export
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(1,2));

//export
const {add, multipky} = require("./test-module-2");
console.log(multipky(3,4));