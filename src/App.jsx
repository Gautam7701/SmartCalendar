import { useState } from 'react'
import Calender2 from './Components/Calender2/Calender2'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        {/* <h1>React Calendar</h1> */}
        <Calender2 />
      </div>
    </>
  )
}

export default App
