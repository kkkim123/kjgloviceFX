import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { register } from "../../../actions/auth";
import { CountryDropdown } from "react-country-region-selector";
import "../../styles/auth/form.css";
import submit_filled from "../../images/submit_filled.png";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "" };
  }

  selectCountry = val => {
    this.setState({
      country: val
    });
  };

  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div className={`underline text-left item-box ${touched && error ? "error" : ""}`}>
        <input {...input} type={type} placeholder={placeholder} />
        {touched && error && <span className="">{error}</span>}
        {/* {touched && error && <i className="fas fa-check-circle"></i>} */}
      </div>
    );
  };

  onSubmit = formValues => {
    if (this.state.country) {
      formValues.resident_country = this.state.country;
      formValues.is_admin = false;
      this.props.register(formValues);
      // alert(`${formValues.email}로 인증메일이 전송되었습니다.`);
      // window.location.href = "/";
    } else {
      alert("Select your Counrty");
    }
  };

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
    const { country } = this.state;
    return (
      <div className="container form mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-xs-12 mb-3 p-4 text-center">
            <div className="card p-4">
              <p className="title">Register</p>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="underline">
                  <CountryDropdown
                    value={country}
                    onChange={val => this.selectCountry(val)}
                    defaultOptionLabel="Country of residence*"
                  />
                </div>
                <Field
                  name="first_name"
                  type="text"
                  component={this.renderField}
                  placeholder="First Name*"
                  // validate={required}
                />
                <Field
                  name="last_name"
                  type="text"
                  component={this.renderField}
                  placeholder="Last Name*"
                  // validate={required}
                />
                <Field
                  name="email"
                  type="email"
                  component={this.renderField}
                  placeholder="Enter e-mail*"
                  // validate={required}
                />
                <Field
                  name="password"
                  type="password"
                  component={this.renderField}
                  placeholder="Enter your password*"
                  // validate={required}
                />
                <Field
                  name="password2"
                  type="password"
                  component={this.renderField}
                  placeholder="Confirm your password*"
                  // validate={[required, passwordsMatch]}
                />
                <div className="item-box">
                  <p>
                    By registering you agree to our
                    <Link to="#"> privacy policy</Link>
                  </p>
                </div>
                <Link className="submit mt-4" to="#">
                  <div className="position-relative ">
                    <img className="submit-img" src={submit_filled} />
                    <div className="submit-text position-absolute p-2">
                      <p className="">Register</p>
                    </div>
                  </div>
                </Link>
                {/* <button className="btn">Sign in</button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      /*
      <div className="container form">
        <div className="form-logo-box">
          <div className="form-logo-area">
            <Link to="/">main</Link>
          </div>
        </div>
        <div className="commonWrap">
          <div className="commonFormWrap">
              <div className="clearfix">
                <h2 className="mb1">Register</h2>
              </div>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="underline">
                  <CountryDropdown
                    value={country}
                    onChange={val => this.selectCountry(val)}
                    defaultOptionLabel="Country of residence*"
                  />
                </div>
                <Field
                  name="first_name"
                  type="text"
                  component={this.renderField}
                  placeholder="First Name*"
                  // validate={required}
                />
                <Field
                  name="last_name"
                  type="text"
                  component={this.renderField}
                  placeholder="Last Name*"
                  // validate={required}
                />
                <Field
                  name="email"
                  type="email"
                  component={this.renderField}
                  placeholder="Enter e-mail*"
                  // validate={required}
                />
                <Field
                  name="password"
                  type="password"
                  component={this.renderField}
                  placeholder="Enter your password*"
                  // validate={required}
                />
                <Field
                  name="password2"
                  type="password"
                  component={this.renderField}
                  placeholder="Confirm your password*"
                  // validate={[required, passwordsMatch]}
                />
                <p className="mb1">
                  By registering you agree to our{" "}
                  <Link to="#">privacy policy</Link>
                </p>
                <button className="ui primary button">Register</button>
              </form>
          </div>
        </div>
      </div>
      */
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

RegisterForm = connect(mapStateToProps, { register })(RegisterForm);

export default reduxForm({
  form: "registerForm"
})(RegisterForm);
