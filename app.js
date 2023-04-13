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

  app.get('/dog_breeds/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
  
    const dog = dog_breeds.find(dog => dog.name.toLowerCase() === name)
    console.log(dog)
    if (dog === undefined) {
      res.status(404).send({ error: `dog_breed: ${name} not found :(`})
    }
    res.send(dog)
  })

  
  module.exports = app;
