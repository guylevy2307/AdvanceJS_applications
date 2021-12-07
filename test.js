var express = require("express");
var app = express(); // express.createServer();

app.get("/", function (request, response) {
    response.sendfile(__dirname + "/main.html");
});

app.listen(8080);