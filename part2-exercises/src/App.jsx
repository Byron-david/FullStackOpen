import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import personService from './services/persons'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'
import PersonForm from './components/PersonForm.jsx'
import Person from './components/Person.jsx'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
    console.log(newName);
    const person = persons.find((person) => person.name === newName)
    const changePerson = { ...person, number: newNumber }

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (person) {
      const id = person.id
      if (window.confirm(`${newName} is already in the phonebook. Would you like to update the phone number?`)) {
        personService
          .update(id, changePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          setErrorMessage(
            `${newName} has been added!`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          .catch(error => {
            setErrorMessage(
              `${newName} was already deleted!`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== id))
        })
      }

    }
    else {
      // duplicateName ? 
      // alert(`${duplicateName.name} is already added to phonebook`) :
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

        })

      setErrorMessage(
        `'${newName}' has been added!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    setNewNumber('')
    setNewNumber('')
  }

  const handleDelete = id => {
    console.log(id);
    if (window.confirm("Delete Entry?")) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id))
        )
    }
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
      <Notification message={errorMessage} />
      <ul>
        {filterPersons.map(person =>
          <Person key={uuid()} person={person} handleDelete={() => handleDelete(person.id)}/>
          )}
      </ul>
    </div>
  )
}

export default App