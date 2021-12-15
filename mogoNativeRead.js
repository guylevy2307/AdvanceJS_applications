const mongoDB = require('mongodb')
const MongoClient = mongoDB.MongoClient
const connectUrl = 'mongodb://localhost:27017'

MongoClient.connect(connectUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Can't connect to DB!")
    }
    const db = client.db(dataBaseName)
    data = db.collection('messages').find().toArray();
    var messages = JSON.parse(data);
    console.log("Done!")
})