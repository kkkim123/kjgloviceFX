import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { register } from "../../actions/auth";
import { CountryDropdown } from "react-country-region-selector";
import "../../styles/auth/form.css";
import queryString from 'query-string';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "", refcode: "" };
  }

  selectCountry = val => {
    this.setState({
      country: val
    });
  };


  renderField = ({ input, placeholder, type, is_required, meta: { touched, error } }) => {
    return (
      <div
        className={`form-label-group
        ${touched && error ? "error" : ""}`}
      >
        <input
          {...input}
          type={type}
          className="form-control"
          placeholder={placeholder}
          required={is_required}
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  onSubmit = formValues => {
    if (this.state.country) {
      formValues.resident_country = this.state.country;
      formValues.is_admin = false;
      this.props.register(formValues);
      this.props.history.push("/register/address");
    } else {
      alert("Select your Counrty");
    }
  };

  render() {
    const { country } = this.state;
    if (this.props.isAuthenticated) {
      return <Redirect to="/main" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center">
                <h5 className="card-title">Register</h5>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <div className="form-label-group">
                    <CountryDropdown
                      value={this.state.country}
                      onChange={val => this.selectCountry(val)}
                      defaultOptionLabel="Country of residence*"
                      classes="form-control"
                    />
                  </div>
                  <Field
                    name="first_name"
                    type="text"
                    component={this.renderField}
                    placeholder="First Name*"
                    is_required={true}
                    // validate={required}
                  />
                  <Field
                    name="last_name"
                    type="text"
                    component={this.renderField}
                    placeholder="Last Name*"
                    is_required={true}
                    // validate={required}
                  />
                  <Field
                    name="email"
                    type="email"
                    component={this.renderField}
                    placeholder="Enter e-mail*"
                    is_required={true}
                    // validate={required}
                  />
                  <Field
                    name="password"
                    type="password"
                    component={this.renderField}
                    placeholder="Enter your password*"
                    is_required={true}
                    // validate={required}
                  />
                  <Field
                    name="password2"
                    type="password"
                    component={this.renderField}
                    placeholder="Confirm your password*"
                    is_required={true}
                    validate={[passwordsMatch]}
                  />
                  <Field
                    name="referral_code"
                    type="text"
                    component={this.renderField}
                    placeholder="Referral code"
                  />                  
                  <div className="form-label-group text-center p-2 p-gray">
                    <p className="">
                      By registering you agree to our
                      <Link to="#" className="link">
                        {" "}
                        privacy policy
                      </Link>
                    </p>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block  mt-10"
                    type="submit"
                  >
                    Save and Next
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
  form: "registerForm",
  initialValues: {
    referral_code: queryString.parse(window.location.search)['refcode']
  },
  enableReinitialize : true
})(RegisterForm);
