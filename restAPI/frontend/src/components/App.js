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
import ServiceInfo from "./trade/ServiceInfo";
import CalendarsDetail from "./trade/CalendarsDetail";
import Company from "./company/companyMain";
import AboutGlovice from './company/aboutGlovice'
import PrivacyStatement from './company/privacyStatement'
import AmlPolicy from './company/amlPolicy'
import Terms from './company/terms'
import IntroducerBroker from './company/introducerBroker'
import WhiteLabel from './company/whiteLabel'
import Affiliate from './company/affiliate'


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
          <Switch>
            <PrivateRoute exact path="/" />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register/user" component={RegisterForm} />
            <Route exact path="/reset" component={ResetForm} />
            <Route exact path="/reset/confirm" component={ResetConfirm} />
            <Route exact path="/register/address" component={AddressForm} />
            <Route exact path="/register/personal" component={PersonalForm} />
            <Route exact path="/trading" component={Trading} />
            <Route exact path="/trading/info" component={ServiceInfo} />
            <Route exact path="/trading/calendar" component={CalendarsDetail} />
            <Route exact path="/company" component={Company} />
            <Route exact path="/company/about" component={AboutGlovice} />
            <Route exact path="/company/privacy" component={PrivacyStatement} />
            <Route exact path="/company/aml" component={AmlPolicy} />
            <Route exact path="/company/terms" component={Terms} />
            <Route exact path="/company/ib" component={IntroducerBroker} />
            <Route exact path="/company/white" component={WhiteLabel} />
            <Route exact path="/company/affiliate" component={Affiliate} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
