const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');



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



const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); 
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8'); 
const tempCards = fs.readFileSync(`${__dirname}/templates/template-cards.html`, 'utf-8'); 
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8'); 
const dataObject = JSON.parse(data);

const slugs = dataObject.map(el => slugify(el.productName, {lower: true}));

console.log(slugs);

const server = http.createServer((req, res) => {

    const { query, pathname} = url.parse(req.url, true);
    //overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'content-type':'text/html'});
        
        const cardsHtml = dataObject.map(el => replaceTemplate(tempCards, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);
    }
    //api
     else if(pathname === '/api') {
        res.writeHead(200, {"content-type":'application/json'});
        res.end(data);
    } 
    //product page
    else if (pathname === '/product'){
        console.log(query);
        res.writeHead(200, {'content-type':'text/html'});
        const product = dataObject[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
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