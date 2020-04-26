import React, { Component } from "react";
import "../../styles/company/introducerBroker.css";
import icon_introducer from "../../images/icon_introducer.png";
import check from "../../images/check.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class IntroducerBroker extends Component {

  render() {
      const { user, isAuthenticated } = this.props.auth;

      const userLinks = (
        user && user.user_type === "I" ?
          <Link className="partner-submit rounded-pill" to="/company/ib" onClick={()=>alert('이미 신청하였습니다.')}>
            <span className="px-2">Become Introducer</span>
          </Link>
        :
          <Link className="partner-submit rounded-pill" to="/company/ib/create">
              <span className="px-2">Become Introducer</span>
          </Link>
      );

      const guestLinks = (
        <Link className="partner-submit rounded-pill" onClick={()=>alert('Login이 필요합니다.')} to="/login">
            <span className="px-2">Become Introducer</span>
        </Link>
      );

    return (
      <section className="container text-center">
        <div className="row my-5">
          <div className="col">
            <img
              className="partner-title-img mr-3"
              src={icon_introducer}
              alt="introducer"
            ></img>
            <span className="partner-title align-bottom">
              Introducing Broker
            </span>
          </div>
        </div>
        <div>
          <p className="text-gray">
            Partner with a market leader that you and your clients can trust!
            GloviceFX’s Introducing Broker program is designed to remunerate
            introducers of all sizes with ongoing commissions for the trading
            volume of referred clients.
          </p>
          <br></br>
          <p>
            <strong>
              A low barrier to entry combined with a highly competitive volume
              based rebate structure makes GloviceFX ideal for introducers of
              all size.
            </strong>
          </p>
          <br></br>
          <p>Key features of our Introducing Broker program</p>
        </div>
        <div className="row feature justify-content-center p-3 my-5 text-left align-bottom">
          <div className="col-12 col-sm-5">
            <ul>
              <li>
                <img
                  className="partner-check-img mr-4"
                  src={check}
                  alt=""
                ></img>
                <span>An attractive rebate program</span>
              </li>
              <li>
                <img
                  className="partner-check-img mr-4"
                  src={check}
                  alt=""
                ></img>
                <span>Personal IB account managers</span>
              </li>
              <li>
                <img
                  className="partner-check-img mr-4"
                  src={check}
                  alt=""
                ></img>
                <span>Simple client onboarding</span>
              </li>
              <li>
                <img
                  className="partner-check-img mr-4"
                  src={check}
                  alt=""
                ></img>
                <span>MetaTrader 4, Mobile Trading Platforms</span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6">
            <ul>
              <li>
                <img
                  className="partner-check-img mr-4"
                  src={check}
                  alt=""
                ></img>
                <span>
                  Commissions paid into a commission account in real time
                </span>
              </li>
              <li>
                <img
                  className="partner-check-img mr-4"
                  src={check}
                  alt=""
                ></img>
                <span>
                  Marketing material in a variety of different languages
                </span>
              </li>
              <li>
                <img
                  className="partner-check-img mr-4"
                  src={check}
                  alt=""
                ></img>
                <span>Advanced cookie tracking and web reporting</span>
              </li>
              <li>
                <img
                  className="partner-check-img mr-4"
                  src={check}
                  alt=""
                ></img>
                <span>Track every click, impression, and registration</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row justify-content-center pb-5 mb-5">
          <div className="col-xs-6 col-sm-3">
            {isAuthenticated && user ? userLinks : guestLinks}
          </div>
          <div className="col-xs-6 col-sm-3">
            <a className="partner-submit color-gray rounded-pill" href="#">
              <span className="px-5">Email Us</span>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(IntroducerBroker);