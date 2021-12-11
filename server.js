var express = require("express");
var app = express(); // express.createServer();
var path = require('path');
var public = path.join(__dirname, 'public');
const jason = require('./public/messages.json');
var fs = require('fs');
app.use('/', express.static(public));


app.get('/:screen', function (request, response) {

    var messages = [];
    var screenNumber = (request.params.screen).split('=')[1];
    screenNumber = screenNumber % 3;
    jason.forEach(element => {
        var id = element.id;
        console.log(id);
        var index = id.indexOf(screenNumber);
        if (index !== -1)
            messages.push(element);
    });
    var fileName = './public/' + 'message' + Number(screenNumber) + ".json";
    savemessagesToPublicFolder(messages, function (err) {
        if (err) {
            res.status(404).send('messages not saved');
            return;
        }
    });

    function savemessagesToPublicFolder(messages, callback) {
        fs.writeFile(fileName, JSON.stringify(messages), callback);
    }

    response.sendFile(__dirname + "/main.html");

});
app.listen(8080, () => console.log('the server is runnng'));


//http://localhost:8080/screen=2