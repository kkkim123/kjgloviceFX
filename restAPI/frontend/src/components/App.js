import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Header from './layout/Header';

import RegisterForm from './auth/RegisterForm';
import LoginForm from './auth/LoginForm';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';
// import { loadUser } from '../actions/auth';

class App extends Component {
  componentDidMount() {
    // store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
         <Header />
          <Switch>
            <PrivateRoute exact path='/' />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />
         </Switch>
       </Router>
    </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
// const container = document.getElementById('app')
// render(<App />, container)
