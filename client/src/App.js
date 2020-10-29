import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import './styles/App.scss';
import Alert from './Components/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='App'>
        <Nav />
        <div className='pageWrapper'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
        <Alert />
      </div>
    </Provider>
  );
};

export default App;
