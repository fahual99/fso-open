import { useState, useEffect  } from 'react'
import phonebookService from './services/phonebookService'
import './index.css'
import Notification from './components/Notification'

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
  
  const [message, setMessage] = useState(null)

  const [status, setStatus] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialLoad => {
        setPersons(initialLoad)
      })
  }, [])

  const AddPhonebook = (event) => {
      event.preventDefault()
      if (persons.find(name => name.name === newName && name.number === newNumber)) {
        alert(`${newName} is already added to the phonebook.`)
      } else if (persons.find(name => name.name === newName && name.number !== newNumber)) {

        if (window.confirm(`${newName} is already added to phonebook, replace the old one with a new one`)) {
          const List = persons.find(n => n.name === newName)
          const UpdatedList = {...List, number: newNumber}
          phonebookService.update(List.id, UpdatedList)
          .then(updated => {
            setPersons(persons.map(names => names.id !== List.id ? names : updated))
            setStatus('modified')
            setMessage(`Modified ${newName}`)
            
          }).catch(error => {
            setStatus('error')
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        }

      }
      else {
        const info = {name: newName, number: newNumber}
        phonebookService
        .create(info)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setStatus('success')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

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


  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const deleteFunction = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      phonebookService.remove(person.id)
      setPersons(persons.filter(name => name.id !==person.id))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} status={status}/>
        <Filter value={search} onChange={HandleSearch}/>
      <h1>Add a new</h1>
        <Form 
          AddPhonebook={AddPhonebook} 
          newName={newName} 
          newNumber={newNumber} 
          HandleNameChange={HandleNameChange} 
          HandleNumberChange={HandleNumberChange}
        />
      <h1>Numbers</h1>
      <Contact persons={persons} search={search}/>
        {persons.filter(name => name.name.toLowerCase().match(search)).map(name => <div key={name.name}>{name.name} {name.number} 
          &nbsp; <button onClick={e=> deleteFunction(name)} type='submit'>Delete</button>
        </div>)}
        <br/>
    </div>
  )
}

export default App