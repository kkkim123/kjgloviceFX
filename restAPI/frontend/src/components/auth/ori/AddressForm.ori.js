import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registDetail } from "../../../actions/auth";
import "../../styles/auth/form.css";

class AddressForm extends Component {
  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div className={`underline ${touched && error ? "error" : ""}`}>
        <input {...input} type={type} placeholder={placeholder} />
        {touched && error && <span className="">{error}</span>}
        {/* {touched && error && <i className="fas fa-check-circle"></i>} */}
      </div>
    );
  };

  onSubmit = formValues => {
    // this.props.registDetail(formValues);
    window.location.href = "/register/personal";
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container form">
        <div className="form-logo-box">
          <div className="form-logo-area">
            <Link to="/">main</Link>
          </div>
        </div>
        <div className="commonWrap">
          <div className="commonFormWrap">
              <div className="clearfix">
                <h2 className="mb1">
                  Residential Address{" "}
                  <span className="stepBar">
                    <i className="stepBarHalf" />
                  </span>
                </h2>
              </div>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                  name="address"
                  type="text"
                  component={this.renderField}
                  placeholder="Street & Number*"
                  // validate={required}
                />
                <Field
                  name="postal_code"
                  type="text"
                  component={this.renderField}
                  placeholder="Postal/Zip Code*"
                  // validate={required}
                />
                <Field
                  name="city"
                  type="text"
                  component={this.renderField}
                  placeholder="City/Town*"
                  // validate={required}
                />
                <p className="mb1">
                  By registering you agree to our{" "}
                  <Link to="#">privacy policy</Link>
                </p>
                <button className="ui primary button">Next</button>
              </form>
          </div>
        </div>
      </div>
    );
  }
}

const required = value => (value ? undefined : "Required");

const minLength = min => value =>
  value && value.length < min
    ? `Must be at least ${min} characters`
    : undefined;

const minLength3 = minLength(3);

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15);

const passwordsMatch = (value, allValues) =>
  value !== allValues.password ? "Passwords do not match" : undefined;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

AddressForm = connect(mapStateToProps, { registDetail })(AddressForm);

export default reduxForm({
  form: "detailForm"
})(AddressForm);
