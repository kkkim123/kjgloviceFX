import React, { Component } from "react";
import "../../styles/mypage/mpHeaders.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store";
import { getUserOption, getAccOption, getIb, getWallet } from "../../actions/mypage";
import getOut from "../../images/myPage/getOut.png";

class MpHeader extends Component {
  state = {
    link: <Link to="#">My Details</Link>,
    isLoad: false
  };

  componentDidMount() {
    store.dispatch(getUserOption());
    store.dispatch(getAccOption());
    store.dispatch(getIb());
    store.dispatch(getWallet());
    if (this.props.auth.user) {
      this.linkChange(this.props.auth.user.user_status);
    }
  }

  componentDidUpdate() {
    if(this.props.auth.user && !this.state.isLoad) {
      this.linkChange(this.props.auth.user.user_status);
      this.setState({isLoad: true})
    }
  }

  //mpHeader user_status에 따른 Link 변경
  linkChange(status) {
    switch (Number(status)) {
      case 1:
      case 2:
      case 3:
        this.setState({
          link: <Link to="/mypage/details/employment">My Details</Link>
        });
        break;
      case 4:
        this.setState({
          link: <Link to="/mypage/details/document">My Details</Link>
        });
        break;
      case 5:
        this.setState({
          link: <Link to="/mypage/details/document/detail">My Details</Link>
        });
        break;
      case 6:
        this.setState({
          link: <Link to="/mypage/details/account">My Details</Link>
        });
        break;
      case 7:
      case 8:
        this.setState({
          link: <Link to="/mypage/details/account/detail">My Details</Link>
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { link } = this.state;
    if (!this.props.auth.token && !this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="mp-header">
        <div
          className="d-flex justify-content-around align-content-center flex-wrap h-100"
        >
          <div className="mplogo-box">
            <Link to="/mypage">
              <div className="mplogo-area"></div>
            </Link>
          </div>
          <div className="pt-4">{link}</div>
          <div className="pt-4">
            <Link to="#">Trading</Link>
          </div>
          <div className="pt-4">
            <Link to="#">gloviceFX Invest</Link>
          </div>
          <div className="pt-4">
            <Link to="#">Promotions</Link>
          </div>
          <div className="pt-4">
            <Link to="#">Education</Link>
          </div>
          <div className="pt-4">
            <Link to="#">Client Support</Link>
          </div>
          <div className="pt-4">
            <Link
              to="/main"
              className="get-out rounded-pill py-3 px-4 text-middle"
            >
              <img className="mr-2" src={getOut} alt=""></img>
              <span>
                <strong>Get out</strong>
              </span>
            </Link>
          </div>
        </div>
      </div>
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
