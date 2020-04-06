import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registDetail } from "../../../actions/auth";
import "../../styles/auth/form.css";
import { CountryDropdown } from "react-country-region-selector";

class PersonalForm extends Component {
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
      <div className={`underline ${touched && error ? "error" : ""}`}>
        <input {...input} type={type} placeholder={placeholder} />
        {touched && error && <span className="">{error}</span>}
        {/* {touched && error && <i className="fas fa-check-circle"></i>} */}
      </div>
    );
  };

  onSubmit = formValues => {
    // if (this.state.country) {
    // formValues.Nationality = this.state.country;
    // this.props.registDetail(formValues);
    window.location.href = "/";
    // } else {
    // alert("Select your Nationality");
    // }
  };

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
    const { country } = this.state;
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
                  Personal Detail{" "}
                  <span className="stepBar">
                    <i className="stepBarFull" />
                  </span>
                </h2>
              </div>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="underline">
                  <CountryDropdown
                    value={country}
                    onChange={val => this.selectCountry(val)}
                    defaultOptionLabel="Nationality*"
                  />
                </div>
                <Field
                  name="birthday"
                  type="text"
                  component={this.renderField}
                  placeholder="Date of Birth*"
                  // validate={required}
                />
                <Field
                  name="mobile"
                  type="text"
                  component={this.renderField}
                  placeholder="Your Mobile Phone*"
                  // validate={required}
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

PersonalForm = connect(mapStateToProps, { registDetail })(PersonalForm);

export default reduxForm({
  form: "detailForm"
})(PersonalForm);
