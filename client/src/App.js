import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './comps/Dashboard';
import Store from './Store/Store'
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {
  
  return (
    <Store>
      <Router>
        <Dashboard />
      </Router>
    </Store>
  );
}

export default App;
