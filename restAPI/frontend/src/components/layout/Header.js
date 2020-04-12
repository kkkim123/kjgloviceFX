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
            {user && user.user_status !== null && user.user_status < 4 ? (
              <Link to="/register/address">My Page</Link>
            ) : (
              <Link to="/mypage">My Page</Link>
            )}
          </div>
        </div>
        <div className="item">
          <div className="mypage">
            <Link onClick={this.props.logout} to="/login">Logout</Link>
            {/* <a onClick={this.props.logout}>Logout</a> */}
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
      <div className="container-fluid header">
        <div className="d-flex justify-content-center align-content-center flex-wrap">
          <div className="item">
            <div className="logo-box mx-auto">
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
                {/* <a href="#">Forex</a>
                <a href="#">Commodity</a>
                <a href="#">Indices</a>
                <a href="#">Metals</a>
                <a href="#">Energy</a>
                <a href="#">Crypto</a> */}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="dropdown">
              <Link to="/trading">
                <button className="dropbtn">Trading</button>
              </Link>
              <div className="dropdown-content">
                <Link to="/trading/info">
                  MT4
                </Link>
                <Link to="/trading/calendar">
                  Calendars
                </Link>
                {/* <a href="#">MT4</a> */}
                {/* <a href="#">Commodity</a> */}
                {/* <a href="#">PAMM/COPY</a> */}
                {/* <a href="#">Calendars</a> */}
                {/* <a href="#">Indicators</a> */}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="dropdown">
              <Link to="/company">
                <button className="dropbtn">Company</button>
              </Link>
              <div className="dropdown-content">
                <Link to="/company/about">
                  About
                </Link>
                <Link to="/company/partnership">
                  Partnership
                </Link>
                <Link to="/company/helpCenter">
                  Help Center
                </Link> 
                {/* <a href="#">About</a> */}
                {/* <a href="#">Partnership</a> */}
                {/* <a href="#">Help Center</a> */}
              </div>
            </div>
          </div>
          <div className="item"></div>
          <div className="item">
            {/* <div className="dropdown">
              <button className="dropbtn">EN</button>
              <div className="dropdown-content">
                <a href="#">KR</a>
                <a href="#">JP</a>
                <a href="#">CN</a>
              </div>
            </div> */}
          </div>
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
