import React, { Component } from "react";
import "../../styles/mypage/mpHeaders.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store";
import { getUserOption, getAccOption, getIb, getWallet } from "../../actions/mypage";
import getOut from "../../images/myPage/getOut.png";
import MY_LOGO from "../../images/myLogo.svg";

class MpHeader extends Component {

  componentDidMount() {
    store.dispatch(getUserOption());
    store.dispatch(getAccOption());
    store.dispatch(getIb());
    store.dispatch(getWallet());
  }

  lowStatusClick = status => {
    switch (status) {
      case 1:
      case 2:
      case 3:
        alert('Please finish writing the profile first.')
        break;
      case 4:
      case 5:
        alert('Please proceed with KYC step first.')
        break;
      default:
        break;
    }
  }

  render() {
    const { user } = this.props.auth;
    let status = user && Number(user.user_status)

    if (!this.props.auth.token && !this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      // <div className="mp-header">
      //   <div
      //     className="d-flex justify-content-around align-content-center flex-wrap h-100"
      //   >
      //     <div className="mplogo-box">
      //       <Link to="/mypage">
      //         <div className="mplogo-area"></div>
      //       </Link>
      //     </div>
      //     <div className="pt-4">{link}</div>
      //     <div className="pt-4">
      //       <Link to="#">Promotions</Link>
      //     </div>
      //     <div className="pt-4">
      //       <Link to="#">Education</Link>
      //     </div>
      //     <div className="pt-4">
      //       <Link to="#">Client Support</Link>
      //     </div>
      //     <div className="pt-4">
      //       <Link
      //         to="/main"
      //         className="get-out rounded-pill py-3 px-4 text-middle"
      //       >
      //         <img className="mr-2" src={getOut} alt=""></img>
      //         <span>
      //           <strong>Get out</strong>
      //         </span>
      //       </Link>
      //     </div>
      //   </div>
      // </div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark header" style={{backgroundColor: "#0e112c"}}>
        <div className="container">
          <div className="w-50">
            <Link to="/mypage" className="navbar-brand">
              <img src={MY_LOGO} style={{width:"100%", height:"100%"}}/>
            </Link>
            </div>
          <div className="w-auto">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          {/* <div className="collapse navbar-collapse" id="navbarResponsive"> */}
          <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
              <li className="nav-item item" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <Link className="nav-link" to="/mypage/details/employment">
                  My Details
                </Link>
              </li>
              <li className="nav-item dropdown item">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Files
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    {status > 3 ? 
                      ( 
                        <>
                          <Link className="dropdown-item" to="/mypage/details/document">File Upload</Link>
                          <Link className="dropdown-item" to="/mypage/details/document/detail">File List</Link>
                        </> 
                      ) 
                      :
                      (
                        <>
                          <Link className="dropdown-item" to="#" onClick={() => this.lowStatusClick(status)}>File Upload</Link>
                          <Link className="dropdown-item" to="#" onClick={() => this.lowStatusClick(status)}>File List</Link>
                        </>                      
                      )
                    }
                  </div>
              </li>              
              <li className="nav-item dropdown item" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Accounts
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  {status > 3 ? 
                      ( 
                        <>
                          <Link className="dropdown-item" to="/mypage/details/account">Account Addition</Link>
                          <Link className="dropdown-item" to="/mypage/details/account/detail">Account List</Link>
                        </> 
                      ) 
                      :
                      (
                        <>
                          <Link className="dropdown-item" to="#" onClick={() => this.lowStatusClick(status)}>Account Addition</Link>
                          <Link className="dropdown-item" to="#" onClick={() => this.lowStatusClick(status)}>Account List</Link>
                        </>                      
                      )
                    }                    
                  </div>
              </li>
              <li className="nav-item item mt-2">
                <Link className="nav-link get-out rounded-pill" to="/main">
                  <img className="mr-2 image" src={getOut} title="Main"/>
                  Main
                </Link>
              </li>              
            </ul>
          </div>
        </div>
      </nav>       
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  wallet: state.mypage.wallet
});

export default connect(mapStateToProps)(
  MpHeader
);
