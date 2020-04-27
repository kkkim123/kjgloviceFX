import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

// const UserInfo = (Props) => {
class UserInfo extends Component {
  state = {
    copied: false
  };

  onCopy = () => {
    this.setState({ copied: true });
  };

  handleClick = () => {
    alert("수정 페이지로 이동합니다.");
  };

  render() {
    return (
      <div
        className="shadow text-left py-3 px-5 my-4"
        style={{
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#006536",
          color: "#ffffff"
        }}
      >
        <p>
          <span style={{ fontSize: "2.0rem" }}>
            <strong>User Info</strong>
          </span>
          <span style={{ fontSize: "1.2rem", fontWeight: "300" }}>
            {" "}
            <Link
              to="/mypage/user/edit/1"
              onClick={this.handleClick}
              style={{ color: "#ffffff" }}
            >
              [Info Edit]
            </Link>
          </span>
          <span style={{ fontSize: "1.0rem", fontWeight: "300" }}>
            {" "}
            - KJ Address :{" "}
            {this.props.data && this.props.data.kj_address
              ? this.props.data.kj_address
              : "none"}
          </span>
          {this.state.copied ? (
            <span
              style={{
                fontSize: "1.0rem",
                fontWeight: "600",
                color: "rgb(14, 17, 44)"
              }}
            >
              {" "}
              Copied!
            </span>
          ) : (
            <CopyToClipboard
              onCopy={this.onCopy}
              text={this.props.data && this.props.data.kj_address}
            >
              <span style={{ fontSize: "1.0rem", fontWeight: "300", cursor: "pointer" }}>
                {this.props.data && this.props.data.kj_address ? " Copy" : null}
              </span>
            </CopyToClipboard>
          )}
          </p>
        <div
          className="justify-content-between row"
          style={{ color: "#ffffff", margin: "0px" }}
        >
          <div className="col text-left">
            <p>
              <strong>
                First Name : {this.props.data && this.props.data.first_name}
              </strong>
            </p>
            <p>
              <strong>
                Last Name : {this.props.data && this.props.data.last_name}
              </strong>
            </p>
            <p>
              <strong>
                Email : {this.props.data && this.props.data.email}
              </strong>
            </p>
          </div>
          <div className="col text-left">
            <p>
              <strong>
                User Type :{" "}
                {this.props.data && this.props.data.user_type === "R"
                  ? "Retail"
                  : "IB"}
              </strong>
            </p>
            <p>
              <strong>
                Referral Code :{" "}
                {this.props.data && this.props.data.referral_code
                  ? this.props.data.referral_code
                  : "none"}
              </strong>
            </p>
            <p>
              <strong>
                Referral WebSite :
                {this.props.data && this.props.data.referral_website ? (
                  <a
                    href={this.props.data.referral_website}
                    target="_blank"
                    style={{ color: "#ffffff" }}
                  >
                    {" "}
                    {this.props.data.referral_website}
                  </a>
                ) : (
                  " none"
                )}
              </strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
