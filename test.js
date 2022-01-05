const express = require('express')
const app = express()
const path = require('path')
var socket = require('socket.io')
const public = path.join(__dirname, 'public')
const json = require('./public/messages.json')
const mongoDB = require('mongodb')
const MongoClient = mongoDB.MongoClient
const connectUrl = 'mongodb://localhost:27017'
const dataBaseName = 'dynamicLoading'

var message1 = []
var message2 = []
var message3 = []
json.forEach((element) => {
  var id = element.id
  var index1 = id.indexOf(1)
  var index2 = id.indexOf(2)
  var index3 = id.indexOf(3)
  if (index1 != -1) {
    message1.push(element)
  }
  if (index2 != -1) {
    message2.push(element)
  }
  if (index3 != -1) {
    message3.push(element)
  }
})
//upload messges to mongoDB
MongoClient.connect(
  connectUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Can't connect to DB!")
    }
    const db = client.db(dataBaseName)
    db.collection('messages').insertMany(json, (error) => {
      if (error) {
        return console.log(error)
      }
    })
    console.log('Done!')
  },
)

function findOneListingByTemplate(nameOfListing) {

  MongoClient.connect(
    connectUrl,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        return console.log("Can't connect to DB!")
      }
      const db = client.db(dataBaseName)
      const result = db.collection("messages").find({ template: nameOfListing });
      if (result) {
        console.log(result);
      } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
      }

    },
  )

}

var screenNumber
const port = 8080

app.use('/', express.static(public))

var server = app.listen(port, () => 'The server is running on port 8080...')
var io = socket(server)

app.get('/favicon.ico', function (req, res) {
  res.status(204)
  res.end()
})

app.get('/:screen', function (request, response) {
  screenNumber = request.params.screen.split('=')[1]
  if (screenNumber != 0) {
    if (screenNumber % 3 == 0) {
      screenNumber = 3
    } else {
      screenNumber = screenNumber % 3
    }
  }
  findOneListingByTemplate("./templateA.html");
  response.sendFile(__dirname + '/main.html')
})

io.on('connection', function (socket) {
  socket.emit('src', screenNumber)
  socket.emit('mes1', message1)
  socket.emit('mes2', message2)
  socket.emit('mes3', message3)

  MongoClient.connect(
    connectUrl,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        return console.log("Can't connect to DB!")
      }
      const db = client.db(dataBaseName)
      const fs = require('fs')
      var data = fs.readFileSync('./public/messages.json')
      var messages = JSON.parse(data)
      db.collection('messages').insertMany(messages, (error) => {
        if (error) {
          return console.log(error)
        }
      })

      db.collection('stam').insertOne({
        name: 'stam',
        date: new Date().toLocaleString(),
        screen: screenNumber,
      });

      console.log(messages.length)
      console.log('Done!')
    },
  )
})
