//initializing the express 'sketch' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

let scoreBoard = {}; 
console.log(scoreBoard);
//     "id": {
//     "name": "^4.17.1",
//     "score": "^2.3.0"
//   },

//   "id": {
//     "name": "^4.17.1",
//     "score": "^2.3.0"
//   },

// };
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

    scoreBoard[socket.id]={};
    console.log(scoreBoard);

    //getting username
    socket.on('clientObject', (data)=> {
        scoreBoard[socket.id].name = data.name;
        console.log(scoreBoard);
    });


    //getting score
    socket.on('score', (data1)=> {
        scoreBoard[socket.id].score = data1.score;
        console.log(scoreBoard);
    });

});