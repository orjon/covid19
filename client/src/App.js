import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import './styles/App.scss';

function App() {
  return (
    <div className='App'>
      <Nav />
      <div className='pageWrapper'>
        <Switch>
          <Route exact path='/'
            component = { Home }/>
          <Route exact path='/login'
            component = { Login }/>
         <Route exact path='/register'
            component = { Register }/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
