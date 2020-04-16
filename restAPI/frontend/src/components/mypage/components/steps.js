import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const emptyCircle = {
  backgroundColor: "#ffffff",
  color: "#006536",
  border: "2px solid #006536",
  width: "170px",
  height: "170px"
};

// const fullCircle =
// "background-color: #006536;color: #ffffff;border: 2px solid #006536;width: 170px;height: 170px;"
// ;

const fullCircle = {
  backgroundColor: "#006536",
  color: "#ffffff",
  border: "2px solid #006536",
  width: "170px",
  height: "170px"
};

class steps extends Component {
  state = {
    step1Link: "#",
    step2Link: "#",
    step3Link: "#",
    step4Link: "#",
    step1Color: emptyCircle,
    step2Color: emptyCircle,
    step3Color: emptyCircle,
    step4Color: emptyCircle
  };

  componentDidMount() {
    if (this.props.auth.user) {
      this.linkChange(this.props.auth.user.user_status);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.auth.user !== this.props.auth.user) {
      this.linkChange(nextProps.auth.user.user_status);
    }
    return true;
  }

  //mpHeader user_status에 따른 Link 변경
  linkChange(status) {
    switch (Number(status)) {
      case 1:
      case 2:
      case 3:
        this.setState({
          step1Link: "/mypage/details/employment"
        });
        break;
      case 4:
        this.setState({
          step1Link: "/mypage/details/employment",
          step2Link: "/mypage/details/document",
          step1Color: fullCircle
        });
        break;
      case 5:
        this.setState({
          step1Link: "/mypage/details/employment",
          step2Link: "/mypage/details/document/detail",
          step1Color: fullCircle
        });
        break;
      case 6:
        this.setState({
          step1Link: "/mypage/details/employment",
          step2Link: "/mypage/details/document/detail",
          step3Link: "/mypage/details/account",
          step1Color: fullCircle,
          step2Color: fullCircle
        });
        break;
      case 7:
        this.setState({
          step1Link: "/mypage/details/employment",
          step2Link: "/mypage/details/document/detail",
          step3Link: "/mypage/details/account/detail",
          step1Color: fullCircle,
          step2Color: fullCircle
        });
        break;
      case 8:
        this.setState({
          step1Link: "/mypage/details/employment",
          step2Link: "/mypage/details/document/detail",
          step3Link: "/mypage/details/account/detail",
          step1Color: fullCircle,
          step2Color: fullCircle,
          step3Color: fullCircle
        });
        break;
      default:
        break;
    }
  }

  render() {
    const linkHover = {
      cursor: "default"
    };
    const {
      step1Link,
      step2Link,
      step3Link,
      step4Link,
      step1Color,
      step2Color,
      step3Color,
      step4Color
    } = this.state;

    return (
      <div className="container my-5 py-5">
        <div className="shadow px-5 py-5" style={{ borderRadius: "20px" }}>
          <h2 className="mb-4">
            <strong>Start Trading in 4 Steps</strong>
          </h2>
          <div className="d-flex justify-content-center align-items-center py-5">
            <Link style={linkHover} to={step1Link}>
              <div
                className="d-flex justify-content-center align-items-center rounded-circle profile"
                style={step1Color}
              >
                <span className="" style={{ fontSize: "1.2rem" }}>
                  <strong>
                    Complete<br></br>Profile
                  </strong>
                </span>
              </div>
            </Link>
            <div
              className="h-50"
              style={{ borderBottom: "2px solid #006536", width: "80px" }}
            ></div>
            <Link style={linkHover} to={step2Link}>
              <div
                className="d-flex justify-content-center align-items-center rounded-circle kyc"
                style={step2Color}
              >
                <span className="" style={{ fontSize: "1.2rem" }}>
                  <strong>
                    Complete<br></br>KYC
                  </strong>
                </span>
              </div>
            </Link>
            <div
              className="h-50"
              style={{ borderBottom: "2px solid #006536", width: "80px" }}
            ></div>
            <Link style={linkHover} to={step3Link}>
              <div
                className="d-flex justify-content-center align-items-center rounded-circle account"
                style={step3Color}
              >
                <span className="" style={{ fontSize: "1.2rem" }}>
                  <strong>Open Account</strong>
                </span>
              </div>
            </Link>
            <div
              className="h-50"
              style={{ borderBottom: "2px solid #006536", width: "80px" }}
            ></div>
            <Link style={linkHover} to={step4Link}>
              <div
                className="d-flex justify-content-center align-items-center rounded-circle trading"
                style={step4Color}
              >
                <span className="" style={{ fontSize: "1.2rem" }}>
                  <strong>Start Trading</strong>
                </span>
              </div>
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

export default connect(mapStateToProps)(steps);
