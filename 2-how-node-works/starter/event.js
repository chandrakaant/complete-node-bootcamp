const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();

class Sales extends EventEmitter{
    constructor() {
        super();
    }
}

//observer
myEmitter.on('newsale', () => {
    console.log('There was a new sale');
});

myEmitter.on('newsale', ()=> {
    console.log('Customer Name: Johm');
});


myEmitter.on('newsale', stock => {
    console.log(`There are now ${stock} items remaining in stock.`);
});


myEmitter.emit('newsale', 9);

/////

const server = http.createServer();
server.on('request', (req, res) => {
    console.log("Request Received");
    res.end("Request Received")
});

server.on("request", (req, res) => {
    res.end("Another request");

});

server.on('close', () => {
    console.log('Server  closes');
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for requests....");
})