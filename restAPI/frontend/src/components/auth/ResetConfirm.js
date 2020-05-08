import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResetConfirm extends Component {
  render() {
    return (
      <section className="container">
        <div className="row">
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
                  <span className="link"> support@fbpasia.com</span> if you
                  do not receive it within a few minutes.
                </p>
                <div className="form-signin">
                  <Link to="/main">
                    <button
                      className="btn btn-lg btn-block btn-primary content-center  mt-10"
                      type="button"
                    >
                      Main
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ResetConfirm;
