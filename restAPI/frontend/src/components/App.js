import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Header from './layout/Header';
import Footer from './layout/Footer';

import RegisterForm from './auth/RegisterForm';
import LoginForm from './auth/LoginForm';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

import '../styles/App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
         <Header />
         <div className="temp">

         </div>
         {/* 로그인 관련 작업 진행 예정 */}
          {/* <Switch>
            <PrivateRoute exact path='/' />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />
         </Switch> */}
         <Footer />
       </Router>
    </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));