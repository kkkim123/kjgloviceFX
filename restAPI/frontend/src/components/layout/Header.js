import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import "../../styles/layout/header.css";

class Header extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    const userLinks = (
      <>
        <div className="item">
          <div className="mypage">
            <Link to="/mypage">My Page</Link>
          </div>
        </div>
        <div className="item">
          <div className="mypage">
            <Link onClick={this.props.logout} to="/login">
              Logout
            </Link>
          </div>
        </div>
      </>
    );

    const guestLinks = (
      <>
        <div className="item">
          <div className="mypage">
            <Link to="/login">My Page</Link>
          </div>
        </div>
        <div className="item">
          <div className="resister">
            <Link to="/register/user" className="resister-content rounded-pill">
              Register
            </Link>
          </div>
        </div>
        <div className="item"></div>
      </>
    );

    return (
      <div className="header">
        <div className="d-flex justify-content-center align-content-center flex-wrap">
          <div className="item">
            <div className="logo-box">
              <Link to="/main">
                <div className="logo-area"></div>
              </Link>
            </div>
          </div>
          <div className="item">
            <div className="dropdown">
              <Link to="/market/forex">
                <button className="dropbtn">Market</button>
              </Link>
              <div className="dropdown-content">
                <Link to="/market/forex">Forex</Link>
                <Link to="/market/commodity">Commodity</Link>
                <Link to="/market/indices">Indices</Link>
                <Link to="/market/metals">Metals</Link>
                <Link to="/market/energies">Energy</Link>
                <Link to="/market/crypto">Crypto</Link>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="dropdown">
              <Link to="/trading">
                <button className="dropbtn">Trading</button>
              </Link>
              <div className="dropdown-content">
                <Link to="/trading/info">MT4</Link>
                <Link to="/trading/calendar">Calendars</Link>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="dropdown">
              <Link to="/company">
                <button className="dropbtn">Company</button>
              </Link>
              <div className="dropdown-content">
                <Link to="/company/about">About</Link>
                <Link to="/company/partnership">Partnership</Link>
                <Link to="/company/helpCenter">Help Center</Link>
              </div>
            </div>
          </div>
          <div className="item"></div>
          <div className="item"></div>
          {isAuthenticated ? userLinks : guestLinks}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
