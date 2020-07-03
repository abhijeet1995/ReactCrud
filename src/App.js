import React, {useState} from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Home from "./components/home/Home";
import AddEmployee from "./components/add-employee/AddEmployee";
import UpdateEmployee from "./components/update-employee/UpdateEmployee";

function App() {

  return (
    <div className="App">
      <Router>
          <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                
                <Route exact path="/add-employee" component={AddEmployee}/>
                <Route exact path="/employees/:id" component={UpdateEmployee}/>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
