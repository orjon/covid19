import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Main from './Components/Main';
import './styles/App.scss';
import Alert from './Components/Alert';
import { loadUser } from './actions/currentUser';
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/main' component={Main} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
        <Alert />
      </div>
    </Provider>
  );
};

export default App;
