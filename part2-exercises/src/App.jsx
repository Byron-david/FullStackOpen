import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import axios from 'axios'
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

  const checkName = (nameObject) => {
    const check = persons.find((person) => person.name === newName);
    if (check) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewNumber('')
      setNewName('')  }
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    checkName(nameObject)
  }

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