import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

class IBInfo extends Component {
  state = {
    copied: false
  };
  onCopy = () => {
    this.setState({ copied: true });
  };
  handleClick = () => {
    alert("Go to the edit page.");
  };

  render() {
    let status = "";
    if (this.props.data) {
      switch (this.props.data.status) {
        case "P":
          status = "Pending";
          break;
        case "A":
          status = "Approved";
          break;
        case "R":
          status = "Reject";
          break;
        default:
          break;
      }
    }

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
            <strong>IB Info</strong>
          </span>
          <span style={{ fontSize: "1.2rem", fontWeight: "300" }}>
            {" "}
            <Link
              to="/mypage/ib/edit"
              onClick={this.handleClick}
              style={{ color: "#ffffff" }}
            >
              [Info Edit]
            </Link>
          </span>
        </p>
        <div
          className="justify-content-between row"
          style={{ color: "#ffffff", margin: "0px" }}
        >
          <div className="col text-left">
            <p>
              <strong>
                IB Name : {this.props.data && this.props.data.ib_name}
              </strong>
            </p>
            <p>
              <strong>
                IB Code : {this.props.data && this.props.data.ib_code}
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
              <strong>Status : {status}</strong>
            </p>
            <p>
              <strong>
                Send Report :{" "}
                {this.props.data && this.props.data.send_report === "Y"
                  ? "Yes"
                  : "No"}
              </strong>
            </p>
            <p>
              <strong>
                Referral URL :{" "}
                {this.props.data && this.props.data.referralurl
                  ? this.props.data.referralurl.replace(/(\s*)/g, "")
                  : " none"}
              </strong>
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
                  text={
                    this.props.data && this.props.data.referralurl &&
                    this.props.data.referralurl.replace(/(\s*)/g, "")
                  }
                >
                  <span style={{ fontSize: "1.0rem", fontWeight: "300", cursor: "pointer" }}>
                    {this.props.data && this.props.data.referralurl && this.props.data.referralurl ? " Copy" : null}
                  </span>
                </CopyToClipboard>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default IBInfo;
