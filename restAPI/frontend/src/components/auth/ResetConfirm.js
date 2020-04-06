import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResetConfirm extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="logo-box mx-auto">
              <div className="logo-area"></div>
            </div>
          </div>
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-left p-gray">
                <h1 className="h4 mb-4 ft-green text-center">
                  New Password has been sent!
                </h1>
                <p className="mb-4">
                  We have sent the new password to your e-mail address.
                </p>
                <p className="mb-4">
                  New password will be immediately applied to your account once
                  you click the "Confirmation" button in the e-mail.
                </p>
                <p className="mb-4">
                  Please contact us at 
                  <span className="link"> support@pearlblackfs.com</span> if you
                  do not receive it within a few minutes.
                </p>
                <div className="form-signin">
                  <button
                      className="btn btn-lg btn-block btn-primary content-center  mt-10"
                      type="button"
                    >
                      Main
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetConfirm;
