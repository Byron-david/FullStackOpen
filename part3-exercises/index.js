const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(requestLogger)

let people = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/info', (request, response) => {
  const message = `Phonebook has info for ${people.length} people`
  const date = new Date(8.64e15).toString()

  response.send(`<p>${message}</p><p>${date}</p>`)
})

const generateId = () => {
  const max = 999999
  const randNum = Math.floor(Math.random() * max)
  const maxId = people.length > 0
    ? randNum
    : 0
  return String(maxId)
}

const isDuplicateName = (name) => {
  let findName = people.find(c => c.name === name);
  if (findName) return true;
  else return false;
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const duplicate = isDuplicateName(body.name)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if(duplicate) {
    return response.status(400).json({
      error: 'name must be unique' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  people = people.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})