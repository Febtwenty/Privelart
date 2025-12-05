require('dotenv').config()
const express = require('express')
const Artist = require('./models/artist')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/favicon.ico', (request, response) => response.status(204).end())

// Say Hello, Root
app.get('/', (request, response) => {
    response.send('<h1>Hello Artworld!</h1>')
})

// Display all artists of the DB
app.get('/api/artists', (request, response) => {
    Artist.find({}).then(artists => {
      response.json(artists)
    })
})

// Save a new artist to the DB
app.post('/api/artists', (request, response, next) => {
  const body = request.body

  const artist = new Artist({
    name: body.name,
    inCollection: body.inCollection || false,
  })
  
  artist.save()
    .then(savedArtist => {
      response.json(savedArtist)
    })
    .catch(error => next(error))
})

// Error Handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// Start
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})