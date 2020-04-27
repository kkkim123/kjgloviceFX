import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { resetPassword } from "../../actions/auth";

import "../../styles/auth/form.css";

class ResetPassForm extends Component {
  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div
        className={`form-label-group py-5
        ${touched && error ? "error" : ""}`}
      >
        <input
          {...input}
          type={type}
          className="form-control"
          placeholder={placeholder}
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className="form-label-group">
        <input type={type} />
        {error && <div className="">{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    formValues.uid = this.props.history.location.pathname.split("/")[6];
    formValues.token = this.props.history.location.pathname.split("/")[7];
    this.props.resetPassword(formValues);
    this.props.history.push("/main");
  };

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title">New Password</h5>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="new_password"
                    type="password"
                    component={this.renderField}
                    placeholder="Enter your password*"
                    validate={required}
                  />
                  <Field
                    name="re_new_password"
                    type="password"
                    component={this.renderField}
                    placeholder="Confirm your password*"
                    validate={[passwordsMatch]}
                  />
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const required = value => (value ? undefined : "Required");

const passwordsMatch = (value, allValues) =>
  value !== allValues.new_password ? "Passwords do not match" : undefined;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

ResetPassForm = connect(mapStateToProps, { resetPassword })(ResetPassForm);

export default reduxForm({
  form: "resetPassForm"
})(ResetPassForm);
