var express = require("express");
var app = express(); // express.createServer();

app.get('/:screen', function (request, response) {
    var screenNumber = (request.params.screen).split('=')[1];
    console.log(screenNumber);
    response.sendFile(__dirname + "/main.html");

});

app.listen(8080);