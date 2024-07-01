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

  const handleDelete = id => {
    console.log(id);
    if (window.confirm("Delete Entry?")) {
      personService
        .remove(id)
        .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== id))
        })
    }
    //   .catch(error => {
    //     alert(
    //       `the note '${person.content}' was already deleted from server`
    //     )
    //     setPersons(persons.filter(p => p.id !== id))
    // })
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


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
          <Person key={uuid()} person={person} handleDelete={() => handleDelete(person.id)}/>
          )}
      </ul>
    </div>
  )
}

export default App