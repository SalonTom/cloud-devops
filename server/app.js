const express = require('express')
const cors = require('cors')
const axios = require('axios');
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

const port = 8080

const message1 = {
  idUser : 123,
  text : "Hello Tom !",
  sentAt : new Date()
}

const message2 = {
  idUser : 1,
  text : "Hello Florine !",
  sentAt : new Date()
}

const message3 = {
  idUser : 1,
  text : "Tu vas bien ?",
  sentAt : new Date()
}

const message4 = {
  idUser : 123,
  text : "Ca va bien et toi ? :)",
  sentAt : new Date()
}

const message5 = {
  idUser : 1,
  text : "Et bien écoute ça va pas trop mal !",
  sentAt : new Date()
}

var messages = [message1, message2, message3, message4, message5]

app.get('/', (req, res) => {
  axios.get(
    "https://cemantix.certitudes.org/pedantix/",
  ).then(response => {
    res.send(response.data);
  });
})

app.post('/', (req, res) => {
  axios.post(
    "https://cemantix.certitudes.org/pedantix/score",
    req.body.body
  ).then(response => {
    res.send(response.data);
  });
})

app.get('/messages', (req, res) => {
  res.send(messages)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})