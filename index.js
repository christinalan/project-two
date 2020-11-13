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
// let io = require('socket.io').listen(server);
let io = require('socket.io')();
io.listen(server);

//different nameSpaces
let mod = io.of('/mod');
let freq2 = io.of('/freq2');

let frequencies = [];

//listening for users to connect
mod.on('connection', (socket) => {
    console.log('mod socket connected : ' + socket.id);

    socket.on('freqData', data => {
        // console.log(data.freq);

        freq2.emit('freqData', data);
    });

    socket.on('modFreq', data => {
        // console.log(data.osc1.f);
        frequencies.push(data);
        // console.log(frequencies);
        mod.emit('modFreq', frequencies)
    })

});

let scoreBoard = []; 

freq2.on('connection', (socket) => {

    // scoreBoard[socket.id]={};

    socket.on('msg', (data) => {
        // console.log(data);
    })

    //getting username and score
    socket.on('clientObject', (data)=> {

        //sending name and score back to nameSpace '/freq2'
        scoreBoard.push(data);
        console.log(scoreBoard);

        socket.emit('scoreBoard', scoreBoard);
        mod.emit('scoreBoard', scoreBoard);
 
        // freq2.emit('scoreBoard', data);
    });
});


