import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import "../../styles/layout/header.css";
import PC_Logo from "../../images/pcLogo.svg"

class Header extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;

    const userLinks = (
      <>
        <li className="nav-item item" data-toggle="" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <Link className="nav-link" to="/mypage">My Page</Link>
        </li>
        <li className="nav-item item" data-toggle="" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <Link className="nav-link" to="#" onClick={this.props.logout}>Logout</Link>
        </li>
      </>
      // <>
      //   <div className="item">
      //     <div className="mypage">
      //       <Link to="/mypage">My Page</Link>
      //     </div>
      //   </div>
      //   <div className="item">
      //     <div className="mypage">
      //       <Link onClick={this.props.logout} to="/login">
      //         Logout
      //       </Link>
      //     </div>
      //   </div>
      // </>
    );

    const guestLinks = (
      <>
        <li className="nav-item item" data-toggle="" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <Link className="nav-link" to="/login">My Page</Link>
        </li>
        <li className="nav-item item" data-toggle="" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <Link className="nav-link register-content rounded-pill" to="/login" >Sign in</Link>
        </li>
      </>      
      // <>
      //   <div className="item">
      //     <div className="mypage">
      //       <Link to="/login">My Page</Link>
      //     </div>
      //   </div>
      //   <div className="item">
      //     <div className="register">
      //       <Link to="/register/user" className="register-content rounded-pill">
      //         Register
      //       </Link>
      //     </div>
      //   </div>
      //   <div className="item"></div>
      // </>
    );

    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light header">
        <div className="container">
          <div className="w-50">
            <Link to="/main" className="navbar-brand">
              <img src={PC_Logo} style={{width: "100%",  height:"100%"}}/>
            </Link>
            </div>
          <div className="w-auto">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown item">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Market
                </Link>
                <div onClick={()=>{document.getElementById("app").scrollTo(0, 0)}} className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" data-toggle="" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <Link target="_self" className="dropdown-item" to="/market/forex">Forex</Link>
                  <Link target="_self" className="dropdown-item" to="/market/commodity">Commodity</Link>
                  <Link target="_self" className="dropdown-item" to="/market/indices">Indices</Link>
                  <Link target="_self" className="dropdown-item" to="/market/metals">Metals</Link>
                  <Link target="_self" className="dropdown-item" to="/market/energies">Energy</Link>
                  <Link target="_self" className="dropdown-item" to="/market/crypto">Crypto</Link>                  
                </div>
              </li>
              <li className="nav-item item" data-toggle="" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <Link onClick={()=>{document.getElementById("app").scrollTo(0, 0)}} className="nav-link" to="/trading">
                Trading
                </Link>
              </li>              
              <li className="nav-item dropdown item">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Company
                  </Link>
                  <div onClick={()=>{document.getElementById("app").scrollTo(0, 0)}} className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" data-toggle="" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <Link className="dropdown-item" to="/company">Company</Link>
                    <Link className="dropdown-item" to="/company/about">About</Link>
                    <Link className="dropdown-item" to="/company/partnership">Partnership</Link>
                    <Link className="dropdown-item" to="/company/helpCenter">Help Center</Link>               
                  </div>
              </li>
              {isAuthenticated ? userLinks : guestLinks}            
            </ul>
          </div>
        </div>
      </nav>      
      // <div className="header">
      //   <div className="d-flex justify-content-center align-content-center flex-wrap">
          // <div className="item">
          //   <div className="logo-box">
          //     <Link to="/main">
          //       <div className="logo-area"></div>
          //     </Link>
          //   </div>
          // </div>
      //     <div className="item">
      //       <div className="dropdown">
      //         <Link to="/market/forex">
      //           <button className="dropbtn">Market</button>
      //         </Link>
      //         <div className="dropdown-content">
                // <Link to="/market/forex">Forex</Link>
                // <Link to="/market/commodity">Commodity</Link>
                // <Link to="/market/indices">Indices</Link>
                // <Link to="/market/metals">Metals</Link>
                // <Link to="/market/energies">Energy</Link>
                // <Link to="/market/crypto">Crypto</Link>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="item">
      //       <div className="dropdown">
      //         <Link to="/trading">
      //           <button className="dropbtn">Trading</button>
      //         </Link>
      //         <div className="dropdown-content">
                // <Link to="/trading/info">MT4</Link>
                // <Link to="/trading/calendar">Calendars</Link>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="item">
      //       <div className="dropdown">
      //         <Link to="/company">
      //           <button className="dropbtn">Company</button>
      //         </Link>
      //         <div className="dropdown-content">
                // <Link to="/company/about">About</Link>
                // <Link to="/company/partnership">Partnership</Link>
                // <Link to="/company/helpCenter">Help Center</Link>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="item"></div>
      //     <div className="item"></div>
      //     {isAuthenticated ? userLinks : guestLinks}
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
