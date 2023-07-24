import axios from "axios"
import { useState } from "react"

const Countries = ({country}) => {
  const [Temperature, setTemperature] = useState(0)
  const [icon, setIcon] = useState('')
  const [wind, setWind] = useState(0)

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`)
  .then(response => {
    setTemperature((response.data.main.temp - 273.15).toFixed(2))
    setIcon(response.data.weather[0].icon)
    setWind(response.data.wind.speed)
  })
    return (
      <>
      <h1>{country.name}</h1>
      <div>Capital city: {country.capital.join(", ")}</div>
      <div>Area: {country.area}</div>
      <h2>Languages:</h2>
        <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
      <img src={country.flags.png}
           alt={country.flags.alt}/>
      <h1>Weather in {country.capital}</h1>
      <p>Temperature: {Temperature} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon"/>
      <p>Wind: {wind} m/s</p>
    </>
    )
        
  }

export default Countries