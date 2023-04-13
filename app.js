const express = require('express')
const cors = require('cors')
const dog_breeds = require('./dog_breeds.json')
const { capitalise } = require('./helpers')

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

  app.post('/dog_breeds', (req, res) => {
    const ids = dog_breeds.map(dog => dog.id)
    let maxId = Math.max(...ids)
  
    const dog = dog_breeds.find(dog => dog.name === req.body.name)
  
    console.log("line 48", dog)
  
    if (dog !== undefined) {
      res.status(409).send({error: "fruit already exists"})
    } else {
      maxId += 1
      const newDog = req.body
      newDog.id = maxId
  
      dog_breeds.push(newDog)
  
      res.status(201).send(newDog)
    }
  
    res.status(201).send(newDog)
  
  })

  app.patch("/dog_breeds/:name", (req, res) => {
    const dog = dog_breeds.find(dog => dog.name.toLowerCase() === req.params.name.toLowerCase());
  
    if (dog === undefined) {
      return res.status(404).send({error: "dog breed does not exist"})
    }
  
    try {
      const updatedDog = { ...req.body, name: capitalise(req.body.name).split(' ').join('_'), id: dog.id}
  
      console.log("line 75", updatedDog)
  
      const idx = dog_breeds.findIndex(d => d.id === dog.id);
      console.log(idx) 
      dog_breeds[idx] = updatedDog;
      console.log(dog_breeds[idx])
      res.send(updatedDog)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }) 




  module.exports = app;
