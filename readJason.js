var readFile = function () {


    const fs = require('fs');
    var data = fs.readFileSync('messages.json');
    //var data = fs.readFileSync(filename);
    var messages = JSON.parse(data);
    return messages


}
exports.readFile();