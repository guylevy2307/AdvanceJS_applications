const mongoDB = require('mongodb')
const MongoClient = mongoDB.MongoClient
const connectUrl = 'mongodb://localhost:27017'
const dataBaseName = 'dynamicLoading'
var db;
exports.connectToDB = conn => MongoClient.connect(connectUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Can't connect to DB!")
    }
    db = client.db(dataBaseName)
    var messages = JSON.parse(data);
    db.collection('messages').insertMany(messages, (error) => {
        if (error) {
            return console.log(error)
        }
    })
    console.log("Done!")
});
export function insertData(data) {
    this.data = data;

} 
