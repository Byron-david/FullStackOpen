import { useState } from 'react'
import { v4 as uuid } from 'uuid';

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter: <input 
                  value={filter}
                  onChange={e => setFilter(e.target.value.toLowerCase())}
            />
        </div>
      <h3>Add New</h3>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
            />
        </div>
        <div>
          number: <input 
                    value={newNumber}
                    onChange={handleNumberChange}
              />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <div>debug: {newName}</div>
      <ul>
        {filterPersons.map(person =>
          <Person key={uuid()} person={person} />
          )}
        {/* {persons.map(person => 
          <Person key={uuid()} person={person} />
        )} */}
      </ul>
    </div>
  )
}

export default App