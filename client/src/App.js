import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './app/pages/Home'
import HandleContent from './app/Component/HandleContent'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit/:_id' element={<HandleContent />} />
      </Routes>
    </>
  )
}

export default App