import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

import RegisterForm from "./auth/RegisterForm";
import LoginForm from "./auth/LoginForm";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

import "../styles/App.css";

import ResetForm from "./auth/ResetForm";
import ResetConfirm from "./auth/ResetConfirm";
import AddressForm from "./auth/AddressForm";
import PersonalForm from "./auth/PersonalForm";
import Trading from "./trade/Trading";
import Company from "./company/company";


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      // redux로 생성된 store에 하위 컴포넌트들 접근 가능
      <Provider store={store}>
        <Router history={history}>
          <Header/>
          {/* 로그인 관련 작업 진행 예정 */}
          {/* url 구분 / Header 구분 예정 */}
          <Switch>
            <PrivateRoute exact path="/" />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register/user" component={RegisterForm} />
            <Route exact path="/reset" component={ResetForm} />
            <Route exact path="/reset/confirm" component={ResetConfirm} />
            <Route exact path="/register/address" component={AddressForm} />
            <Route exact path="/register/personal" component={PersonalForm} />
            <Route exact path="/trading" component={Trading} />
            <Route exact path="/company" component={Company} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
