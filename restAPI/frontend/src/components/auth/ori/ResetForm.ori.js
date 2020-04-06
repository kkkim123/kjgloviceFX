import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { reset } from "../../../actions/auth";

import "../../styles/auth/form.css";
import submit_button from "../../images/submit_button.png";
import cancel_button from "../../images/cancel_button.png";

class ResetForm extends Component {
  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div className={`underline text-left item-box ${touched && error ? "error" : ""}`}>
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
    window.location.href = "/resetConfirm";
    // this.props.reset(formValues);
    // }
  };

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="container form mt-5 form-group">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-xs-12 mb-3 p-4 text-center">
            <div className="card p-4">
              <p className="title">Reset Password</p>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field
                  name="email"
                  type="email"
                  component={this.renderField}
                  placeholder="Email Address*"
                />
                <div className="col-md-8">
                  <Link className="submit mt-4" to="#">
                    <div className="position-relative ">
                      <img className="cancel-btn" src={cancel_button} />
                      <div className="submit-text position-absolute p-2">
                        <p className="">Close</p>
                      </div>
                    </div>
                  </Link>
                  <Link className="submit mt-4" to="#">
                    <div className="position-relative ">
                      <img className="submit-btn" src={submit_button} />
                      <div className="submit-text position-absolute p-2">
                        <p className="">Apply</p>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* <button className="btn">Sign in</button> */}
              </form>
            </div>
          </div>
        </div>
      </div>      
      /*
      <div className="container form">
        <div className="commonWrap">
          <div className="commonFormWrap">
              <div className="clearfix">
                <h2 className="mb1">Reset Password</h2>
              </div>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                  name="email"
                  type="email"
                  component={this.renderField}
                  placeholder="Email Address*"
                />
                <div className="clearfix">
                  <button
                    className="btn mr10"
                    style={{ width: 0, backgroundColor: "gray" }}
                  >
                    <Link to="/login">Close</Link>
                  </button>
                  <button className="btn" style={{ width: 0 }}>
                    Apply
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
      */
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
