const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //reading large file solution 1 // issue with this approach is that system will overload trying to read the whole file in one go
    // fs.readFile('test-file.txt', (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    //solution 2 // issue with this is back pressure, reading is fast compared to writing
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // })
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found");

    // }) 

    //solution 3
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    //readable data being piped to writable destination


});


server.listen(8000, "127.0.0.1", () => {
    console.log("Listning .....")
})