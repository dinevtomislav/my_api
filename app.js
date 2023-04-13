const express = require('express')
const cors = require('cors')
const dog_breeds = require('./dog_breeds.json')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome to the dog breeds API")
  })
  
  app.get('/dog_breeds', (req, res) => {
    res.send(dog_breeds)
  })



  module.exports = app;
