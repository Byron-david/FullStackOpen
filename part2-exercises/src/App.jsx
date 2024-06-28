import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Person from './components/Person.jsx'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filterPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons

  // const checkName = (personObject) => {
  //   const check = persons.find((person) => person.name === newName)
  //   if (check) {
  //     alert(`${newName} is already added to phonebook`)
  //   } else {
  //     setPersons(persons.concat(personObject))
  //     setNewNumber('')
  //     setNewName('')  }
  // }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const duplicateName = persons.find((person) => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }

    duplicateName ? 
    alert(`${duplicateName.name} is already added to phonebook`) :
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewNumber('')
      })
  }
    // personService
    //   .create(personObject)
    //   .then(returnedPerson => {
    //     setPersons(notes.map(person => person.name !== personName ? returnedPerson)) : alert(`${newName} is already added to phonebook`)))
    //     setNewNumber('')
    //     setNewNumber('')
    //   })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={e => setFilter(e.target.value.toLowerCase())} />

      <h3>Add New</h3>
      <PersonForm 
        handleAdd={addName}
        nameValue={newName} 
        numberValue={newNumber} 
        handleName={handleNameChange} 
        handleNumber={handleNumberChange}
      />

      <h3>Numbers</h3>
      <div>debug: {newName}</div>
      <ul>
        {filterPersons.map(person =>
          <Person key={uuid()} person={person} />
          )}
      </ul>
    </div>
  )
}

export default App