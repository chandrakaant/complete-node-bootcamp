const fs = require('fs');
const http = require('http');
const url = require('url');



////////
//Files
//Blocking sync way
// const textin = fs.readFileSync('./txt/input.txt',  'utf-8');
// console.log(textin);

// const textout = `This is what we know about the avaocado: ${textin}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textout);
// console.log("File written");

// //non- blocking async way - this is a call back function
// //the file is getting read in background, as soon as its done, it calls the callback function with error and data
// //error is always the first parameter in node js
// fs.readFile('./txt/start.txt','utf-8', (err, data1)=> {
//     if(err) return console.log('Error')
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2)=> {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`,'utf-8', (err, data3)=> {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('Your file has been written');
//             })
//         })
//     })
// })
// console.log('Will read file');

///////////
//Server
const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview') {
        res.end('This is overview');
    } else if (pathName === '/product'){
        res.end('This is product');
    } else {
        res.writeHead(404, {
            'content-type':'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to port 8000')
})