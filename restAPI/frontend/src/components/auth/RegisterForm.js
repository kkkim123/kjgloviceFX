import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { register } from "../../actions/auth";
import { CountryDropdown } from "react-country-region-selector";
import "../../styles/auth/form.css";
import $ from "jquery";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "" };
  }

  componentDidMount() {
    $("select").prop("required", true);
    $("select").prop("autofocus", true);
  }

  selectCountry = val => {
    this.setState({
      country: val
    });
  };

  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div
        className={`underline text-left item-box ${
          touched && error ? "error" : ""
        }`}
      >
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
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="logo-box mx-auto">
              <div className="logo-area"></div>
            </div>
          </div>
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center">
                <h5 className="card-title">Register</h5>
                <form className="form-signin text-left">
                  <div className="form-label-group">
                    <CountryDropdown
                      value={country}
                      onChange={val => this.selectCountry(val)}
                      defaultOptionLabel="Country of residence*"
                      classes="form-control"
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name*"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name*"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter e-mail*"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password*"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm your password*"
                      required
                    />
                  </div>
                  <div className="form-label-group text-center p-2 p-gray">
                    <p className="">
                      By registering you agree to our 
                      <Link to="#" className="link">
                        {" "}privacy policy
                      </Link>
                    </p>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block  mt-10"
                    type="submit"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
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

RegisterForm = connect(mapStateToProps, { register })(RegisterForm);

export default reduxForm({
  form: "registerForm"
})(RegisterForm);
