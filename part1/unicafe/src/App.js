import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
  <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({text,score}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{score}</td>
    </tr>
  )
  }
const Statistics = ({good,neutral,bad}) => {
  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = `${(good/all) * 100}%`
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
    <h1> Statistics</h1>
    <table>
     <tbody>
      <StatisticsLine text="Good" score={good}/>
      <StatisticsLine text="Neutral" score={neutral}/>
      <StatisticsLine text="Bad" score={bad}/>
      <StatisticsLine text="All" score={all}/>
      <StatisticsLine text="Average" score={average}/>
      <StatisticsLine text="Positive" score={positive}/>
      </tbody>
    </table>
  </>
  )
}

const App = () => {

  const HandleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const HandleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const HandleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1> Give Feedback </h1>
      <Button handleClick={HandleGoodClick} text={"Good"}/>
      <Button handleClick={HandleNeutralClick} text={"Neutral"}/>
      <Button handleClick={HandleBadClick} text={"Bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}

export default App