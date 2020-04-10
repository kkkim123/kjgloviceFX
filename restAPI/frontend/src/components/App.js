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
import Forex from "./market/forex"
import Commodity from "./market/commodity"
import Indices from "./market/indices"
import Metals from "./market/metals"
import Energies from "./market/energies"
import Crypto from "./market/crypto"
import Trading from "./trade/Trading";
import ServiceInfo from "./trade/ServiceInfo";
import CalendarsDetail from "./trade/CalendarsDetail";
import Company from "./company/companyMain";
import Partnership from "./company/partnership"
import AboutGlovice from './company/aboutGlovice'
import PrivacyStatement from './company/privacyStatement'
import AmlPolicy from './company/amlPolicy'
import Terms from './company/terms'
import IntroducerBroker from './company/introducerBroker'
import WhiteLabel from './company/whiteLabel'
import Affiliate from './company/affiliate'
import MyPage from "./mypage/MyPage";
import HelpMain from "./helpcenter/helpMain";


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
            <Route exact path="/market/forex" component={Forex} />
            <Route exact path="/market/commodity" component={Commodity} />
            <Route exact path="/market/indices" component={Indices} />
            <Route exact path="/market/metals" component={Metals} />
            <Route exact path="/market/energies" component={Energies} />
            <Route exact path="/market/crypto" component={Crypto} />
            <Route exact path="/trading" component={Trading} />
            <Route exact path="/trading/info" component={ServiceInfo} />
            <Route exact path="/trading/calendar" component={CalendarsDetail} />
            <Route exact path="/company" component={Company} />
            <Route exact path="/company/about" component={AboutGlovice} />
            <Route exact path="/company/partnership" component={Partnership} />
            <Route exact path="/company/privacy" component={PrivacyStatement} />
            <Route exact path="/company/aml" component={AmlPolicy} />
            <Route exact path="/company/terms" component={Terms} />
            <Route exact path="/company/ib" component={IntroducerBroker} />
            <Route exact path="/company/white" component={WhiteLabel} />
            <Route exact path="/company/affiliate" component={Affiliate} />
            <Route exact path="/company/helpCenter" component={HelpMain} />
            <Route exact path="/mypage" component={MyPage} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
