import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/login'
import { RegisterView } from './components/register'
import { DashStudent } from './components/dashboardStudent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route exact path='/' element={<Login/>} />
      <Route path='/RegisterStudent' element= {<RegisterView />} />
      <Route path='/DashboardStudent' element= {<DashStudent />} />
      </Routes>
    </>
  )
}

export default App
