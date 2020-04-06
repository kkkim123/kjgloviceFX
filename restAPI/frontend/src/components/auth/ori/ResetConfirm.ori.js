import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResetConfirm extends Component {
  render() {
    return (
      <div className="container form">
        <div className="commonWrap">
          <div className="commonFormWrap">
            <div className="clearfix">
              <div className="leftT">
                <h2 className="mb1" style={{ color: "#006536" }}>
                  New Password has been sent!
                </h2>
                <p>We have sent the new password to your e-mail address.</p>
                <p>
                  New password will be immediately applied to your account once
                  you click the "Confirmation" button in the e-mail.
                </p>
                <p>
                  Please contact us at <b>support@pearlblackfs.com</b> if you do
                  not receive it within a few minutes.
                </p>
              </div>
              <button className="btn" style={{ width: 0 }}>
                <Link to ='/'>Confirm</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetConfirm;
