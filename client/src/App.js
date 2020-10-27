import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home';
import './styles/App.scss';

function App() {
  return (
    <div className='App'>
      <Nav />
      <section className='fullHeight flexColumn w100'>
        <Switch>
          <Route exact path='/'
            component = { Home }/>
        </Switch>
      </section>
    </div>
  );
}

export default App;
