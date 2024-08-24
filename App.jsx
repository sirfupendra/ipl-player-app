import React from 'react'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Tasks from './components/Tasks'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
    
             </Routes>
      </Router>


    </div>
  )
}

export default App