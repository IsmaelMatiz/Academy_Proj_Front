import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/login'
import { RegisterView } from './components/register'
import { DashStudent } from './components/dashboardStudent'
import { SelectorWeek } from './components/studentInternal/SelectorWeek'
import { LessonView } from './components/studentInternal/LessonView'
import { DashboardDirector } from './components/DashDirector'
import { SelectorCareer } from './components/directorInternal/SelectorCareer'
import { EditorLessons } from './components/directorInternal/EditorLecciones'
import { CreateLesson } from './components/directorInternal/CreateLesson'

function App() {

  return (
    <>
      <Routes>
      <Route exact path='/' element={<Login/>} />
      <Route path='/RegisterStudent' element= {<RegisterView />} />
      <Route path='/DashboardStudent' element= {<DashStudent />} />
      <Route path='/DashboardDirector' element= {<DashboardDirector />} />
      <Route path='/SelectorCareer' element= {<SelectorCareer />} />
      <Route path='/SelectorCareer/EditorLesson' element= {<EditorLessons />} />
      <Route path='/SelectorCareer/CreateLesson' element= {<CreateLesson />} />
      <Route path='/SelectorWeek' element= {<SelectorWeek />} />
      <Route path='/LessonView' element= {<LessonView />} />
      </Routes>
    </>
  )
}

export default App
