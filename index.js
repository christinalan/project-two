//initializing the express 'sketch' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//initialize the HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("server is listening at port: " + port);
});

//initialize socket.io
let io = require('socket.io').listen(server);

let freq1 = io.of('/freq1');
let freq2 = io.of('/freq2');


freq1.on('connection', (socket) => {
    console.log('freq1 socket connected : ' + socket.id);

    socket.on('data', data => {

    
        console.log(data);

        freq2.emit('data', data);
    })
})

freq2.on('connection', (socket) => {
    console.log('freq2 socket connected : ' + socket.id);

    //getting username
    socket.on('clientObject', (data)=> {console.log(data) 
    });


    //getting score
    socket.on('score', (data)=> {console.log(data)
    });
});