import { useState } from 'react'

const Filter = ({value, onChange}) => {
  return (
    <div>
    Filter shown with: <input value={value} 
                              onChange={onChange}/>
  </div>
  )
}

const Form = ({AddPhonebook,newName,HandleNameChange,newNumber,HandleNumberChange}) => {
  return (
    <form onSubmit={AddPhonebook}>
    <div>
      Name: <input value={newName}
                   onChange={HandleNameChange}/>
      <br/>
      Number: <input value={newNumber}
                   onChange={HandleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Contact = ({persons,search}) => 
{persons.filter(name => name.name.toLowerCase().match(search)).map(name => <div key={name.name}>{name.name} {name.number}</div>)}


const App = () => {
  const AddPhonebook = (event) => {
      event.preventDefault()
      if (persons.find(name => name.name === newName)) {
        alert(`${newName} is already added to the phonebook.`)
      } else {
        const info = {name: newName, number: newNumber}
        setPersons(persons.concat(info))
      }
      
    }


  const HandleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const HandleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const [search, setSearch] = useState('')

  const [newNumber, setNewNumber] = useState('')


  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={search} onChange={HandleSearch}/>
      <h2>Add a new</h2>
        <Form 
          AddPhonebook={AddPhonebook} 
          newName={newName} 
          newNumber={newNumber} 
          HandleNameChange={HandleNameChange} 
          HandleNumberChange={HandleNumberChange}
        />
      <h2>Numbers</h2>
      <Contact persons={persons} search={search}/>
        {persons.filter(name => name.name.toLowerCase().match(search)).map(name => <div key={name.name}>{name.name} {name.number}</div>)}
        <br/>
    </div>
  )
}

export default App