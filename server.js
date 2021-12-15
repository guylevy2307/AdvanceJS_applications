/*var express = require("express");
var app = express(); // express.createServer();
var path = require('path');
var public = path.join(__dirname, 'public');
const jason = require('./public/messages.json');
app.use('/', express.static(public));*/

var express = require("express");
var path = require('path');
var app = express();
var socket = require('socket.io');

var public = path.join(__dirname, 'public');
const jason = require('./public/messages.json');
var messages1 = [];
var messages2 = [];
var messages3 = [];
var screenNumber;
const port = 4040;
app.use('/', express.static(public));

var server = app.listen(port, () => console.log('the server is runnng'));
var io = socket(server);

app.get('/:screen', function (request, response) {

    var screenNumber = (request.params.screen).split('=')[1];

    if (screenNumber != 0) {
        if (screenNumber % 3 == 0) {
            screenNumber = 3;
        }
        else {
            screenNumber = screenNumber % 3
        };
    }
    jason.forEach(element => {
        var id = element.id;
        var index1 = id.indexOf(1);
        var index2 = id.indexOf(2);
        var index3 = id.indexOf(3);
        if (index1 != -1) {
            messages1.push(element);
        }
        if (index2 != -1) {
            messages2.push(element);
        }
        if (index3 != -1) {
            messages3.push(element);
        }
    });

    if (screenNumber == 1)
        response.sendFile(__dirname + "/main1.html");
    else if (screenNumber == 2)
        response.sendFile(__dirname + "/main2.html");
    else if (screenNumber == 3)
        response.sendFile(__dirname + "/main3.html");
});

io.on('connection', function (socket) {
    console.log('client connect');
    socket.emit('mes1', messages1);
    socket.emit('mes2', messages2);
    socket.emit('mes3', messages3);
});



//http://localhost:4040/screen=2