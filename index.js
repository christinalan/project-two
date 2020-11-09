//initializing the express 'sketch' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));
//for neDB
let bodyParser = require('body-parser');
app.use(bodyParser.json());

//DB code for good storage
let Datastore = require('nedb');
let db = new Datastore('userNames.db');
db.loadDatabase();

let today = new Date();
let newDate = today.toDateString();

//adding a route to server that listens to POST request
app.post('/userNames', (req, res) => {
    console.log(req.body);
    let obj = {
        name: name,
        date: newDate
    }

    //insert memory into the userNames database
    db.insert(obj, (err, newDocs) => {
        if(err) {
            res.json({task: "task failed"})
        } else {
            res.json({task:"success"});
        }
    })
})

//initialize the HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("server is listening at port: " + port);
});

//initialize socket.io
let io = require('socket.io').listen(server);

//listening for users to connect
io.sockets.on('connection', (socket) => {
    console.log('we have a new client: ' + socket.id);




    
        console.log(data);

        freq2.emit('data', data);
    })
})

freq2.on('connection', (socket) => {
    console.log('freq2 socket connected : ' + socket.id);

    //getting username
    socket.on('clientObject', (data)=> {
        console.log(data) 
    });
})


    
