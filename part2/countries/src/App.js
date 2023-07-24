import { useState, useEffect } from 'react';
import axios from 'axios'
import './index.css'
import Countries from './components/Countries'

function App() {

  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [show, setShow] = useState({})
  
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountries(response.data.map(({name, capital, area, languages, flags}) => ({
      name: name.common,
      capital,
      area,
      languages,
      flags
    }))))
  },[])

  const filterSearch = countries.filter(name => name.name.toLowerCase().includes(query))

  const Handlefind = (event) => {
    setQuery(event.target.value)
    setShow({})
  }

  const handleShow = show => () =>
    setShow(filterSearch.filter(name => name.name.includes(show))[0])
  

  return (
    <div>
        Find countries: <input value={query} onChange={Handlefind}></input>
      {filterSearch.length > 10 && <div> Too many matches, specify another filter </div>}
      {filterSearch.length <= 10 && filterSearch.length > 1 && filterSearch.map(name => 
        <div className='lists'>{name.name} <button onClick={handleShow(name.name)}> &nbsp;Show</button></div>)}
      {filterSearch.length === 1 && <Countries country={filterSearch[0]}/>}
      {show.name && <Countries country={show}/>}
      </div>
  );
}

export default App;
