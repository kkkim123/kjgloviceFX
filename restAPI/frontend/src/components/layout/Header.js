import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import "../../styles/header.css";

class Header extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    const userLinks = (
      <div className='right menu'>
        <div className='ui simple dropdown item'>
          {user ? user.email : ''}
          {/* 로그인 성공 */}
          <i className='dropdown icon' />
          <div className='menu'>
            <a onClick={this.props.logout} className='item'>
              Logout
            </a>
          </div>
        </div>
      </div>
    );

    const guestLinks = (
      <div className='right menu'>
        <Link to='/register' className='item'>
          Sign Up
        </Link>
        <Link to='/login' className='item'>
          Login
        </Link>
      </div>
    );

    return (
      // 로그인 페이지 구현시 주석 해제 예정
      // <div className='ui inverted menu' style={{ borderRadius: '0' }}>
      //   <Link to='/' className='header item'>
      //     kjgloviceFX
      //   </Link>
      //   <Link to='/' className='item'>
      //     Home
      //   </Link>
      //   {isAuthenticated ? userLinks : guestLinks}
      // </div>
      <div className="container-fluid header">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="logo-box mx-auto">
                  <div className="logo-area">
                  </div>
                </div>
              </div>
              <div className="col dropdown">
                <button className="dropbtn">Market</button>
                <div className="dropdown-content">
                  <a href="#">Forex</a>
                  <a href="#">Commodity</a>
                  <a href="#">Indices</a>
                  <a href="#">Metals</a>
                  <a href="#">Energy</a>
                  <a href="#">Crypto</a>
                </div>
              </div>
              <div className="col dropdown">
                <button className="dropbtn">Trading</button>
                <div className="dropdown-content">
                  <a href="#">MT4</a>
                  <a href="#">Commodity</a>
                  <a href="#">PAMM/COPY</a>
                  <a href="#">Calendars</a>
                  <a href="#">Indicators</a>
                </div>
              </div>
              <div className="col dropdown">
                <button className="dropbtn">Company</button>
                <div className="dropdown-content">
                  <a href="#">About</a>
                  <a href="#">Partnership</a>
                  <a href="#">Help Center</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col"></div>
              <div className="col dropdown">
                <button className="dropbtn">EN</button>
                <div className="dropdown-content">
                  <a href="#">KR</a>
                  <a href="#">JP</a>
                  <a href="#">CN</a>
                </div>
              </div>
              <div className="col mypage">
                My Page
              </div>
              <div className="col resister">
                <div className="resister-content">
                  Register
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
