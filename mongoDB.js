//Import the mongoose module

class mongoDB {
    mongoDB() {
        var mongoose = require('mongoose');
        const Schema = mongoose.Schema;
        //Set up default mongoose connection
        var URL = 'mongodb://127.0.0.1/my_database';
        mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

        //Get the default connection
        const db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once()
    };

}
module.exports = mongoDB