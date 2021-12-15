const mongoDB = require('mongodb')
const MongoClient = mongoDB.MongoClient
const connectUrl = 'mongodb://localhost:27017'
const dataBaseName = 'dynamicLoading'

MongoClient.connect(connectUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Can't connect to DB!")
    }
    const db = client.db(dataBaseName)
    const fs = require('fs');
    var data = fs.readFileSync('messages.json');//change the file name
    var messages = JSON.parse(data);
    db.collection('messages').insertMany(messages, (error) => {
        if (error) {
            return console.log(error)
        }
    })
    console.log("Done!")
})