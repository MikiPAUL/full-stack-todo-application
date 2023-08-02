import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import TodoList from './Components/TodoList'

const App = () => {
  return (
      <Router>
        <Routes>
          <Route>
            <Route path='/login' element= { <Login/> }/>
            <Route path='/signup' element= { <Login/> }/>
            <Route path='/todos' element= { <TodoList/> }/>
          </Route>
        </Routes>
      </Router>
  )
}

export default App;