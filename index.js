require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

// middlewares
app.use(express.json()) // for parsing application/json
app.use(cors())
morgan.token('content', function getContent(request) {
  //   console.log("🚀 ~ file: index.js ~ line 62 ~ getId ~ request", request.body);

  return JSON.stringify(request.body)
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :content'
  )
)
app.use(express.static('build'))

// routes
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

// const generateId = () => {
//   //   const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
//   //   return maxId + 1;

//   return Math.floor(Math.random() * 100000000);
// };

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  // const personExist = persons.find((person) => person.name === name);
  // if (personExist) {
  //   return response.status(400).json({
  //     error: "person name existed",
  //   });
  // }
  // if (!name || !number) {
  //   return response.status(400).json({
  //     error: "name or number missing",
  //   });
  // }

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  // const person = { name, number }
  // https://stackoverflow.com/a/60458500/6236633
  // update name would lead to error
  // Cannot read property 'ownerDocument' of null
  Person.findByIdAndUpdate(request.params.id, { number }, { runValidators: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id);
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    let content = null
    content = `<div>Phonebook has info for ${
      persons.length
    } people</div><br /><div>${new Date()}</div>`
    response.send(content)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // console.error(JSON.stringify(error));
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Exercises 3.1.-3.6.
// Exercises 3.7.-3.8.
// Exercises 3.9.-3.11.
// Exercises 3.15.-3.18.
// Exercises 3.19.-3.21.
// 3.20*: Phonebook database, step8
// https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253#gistcomment-3347630
// Exercise 3.22.
