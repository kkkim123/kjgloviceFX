import React, { Component } from "react";
import "../../styles/mypage/mpHeaders.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store";
import { loadOption, addFile, getFile } from "../../actions/mypage";
import getOut from "../../images/myPage/getOut.png";

class MpHeader extends Component {
  render() {
    return (
      <div className="mp-header">
        <div
          className="d-flex justify-content-around align-content-center flex-wrap h-100"
          style={{ color: "#ffffff" }}
        >
          <Link to="/mypage">
            <div className="profile-box"></div>
          </Link>
          <div className="pt-4">
            <Link to="/mypage/details">My Details</Link>
            {/* <a href="#">My Details</a> */}
          </div>
          <div className="pt-4">
            <a href="#">Trading</a>
          </div>
          <div className="pt-4">
            <a href="#">FXTM Invest</a>
          </div>
          <div className="pt-4">
            <a href="#">Promotions</a>
          </div>
          <div className="pt-4">
            <a href="#">Education</a>
          </div>
          <div className="pt-4">
            <a href="#">Client Support</a>
          </div>
          <div className="pt-4">
            <Link
              to="/main"
              className="get-out rounded-pill py-3 px-4 text-middle"
            >
              <a
                href="#"
                className="get-out rounded-pill py-3 px-4 text-middle"
              >
                <img className="mr-2" src={getOut} alt=""></img>
                <span>
                  <strong>Get out</strong>
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadOption })(MpHeader);
