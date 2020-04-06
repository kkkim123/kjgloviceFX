import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { reset } from "../../actions/auth";

import "../../styles/auth/form.css";

class ResetForm extends Component {
  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div
        className={`underline text-left item-box ${
          touched && error ? "error" : ""
        }`}
      >
        <input {...input} type={type} placeholder={placeholder} />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className="field">
        <input type={type} />
        {error && <div className="ui red message">{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    // if(!formValues.email) {
    //     alert('빈 칸')
    // } else {
    window.location.href = "/reset/confirm";
    // this.props.reset(formValues);
    // }
  };

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
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
              <div className="card-body text-center p-gray">
                <h5 className="card-title">Reset Password</h5>
                <form className="form-signin text-left">
                  <div className="form-label-group pt-4 pb-5">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address*"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-secondary mr-4 bg-gray btn-lg"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary btn-lg">
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

ResetForm = connect(mapStateToProps, { reset })(ResetForm);

export default reduxForm({
  form: "resetForm"
})(ResetForm);
