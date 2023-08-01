import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route>
            <Route path='/login' element= { <Login/> }/>
          </Route>
        </Routes>
      </Router>
  )
}

export default App;