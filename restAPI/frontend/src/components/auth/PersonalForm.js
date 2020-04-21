import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { register } from "../../actions/auth";
import "../../styles/auth/form.css";
import { CountryDropdown } from "react-country-region-selector";

class PersonalForm extends Component {
  state = {
    country: ""
  }

  selectCountry = val => {
    this.setState({
      country: val
    });
  };

  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
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
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  onSubmit = formValues => {
    if (this.state.country) {
      formValues.Nationality = this.state.country;
      const oriData = JSON.parse(localStorage.getItem('register'));
      formValues = Object.assign(formValues,oriData)
      this.props.register(formValues)
      localStorage.removeItem('register');
      this.props.history.push("/main");
    } else {
      alert("Select your Nationality");
    }
  };

  render() {
    const { country } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <div>
                  <h5 className="card-title">Personal Detail</h5>
                  <div className="progress card-bar float-right">
                    <div
                      className="progress-bar bg-green"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <div className="form-label-group">
                    <CountryDropdown
                      value={country}
                      onChange={val => this.selectCountry(val)}
                      defaultOptionLabel="Nationality*"
                      classes="form-control"
                    />
                  </div>
                  <Field
                    name="birthday"
                    type="text"
                    component={this.renderField}
                    placeholder="Date of Birth*"
                    validate={[required, date]}
                  />
                  <Field
                    name="mobile"
                    type="text"
                    component={this.renderField}
                    placeholder="Your Mobile Phone*"
                    validate={required}
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

const date = value =>
  value && !/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(value)
    ? "Invalid date format (YYYY-MM-DD)"
    : undefined;

const minLength3 = minLength(3);

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15);

const passwordsMatch = (value, allValues) =>
  value !== allValues.password ? "Passwords do not match" : undefined;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token
});

PersonalForm = connect(mapStateToProps, { register })(PersonalForm);

export default reduxForm({
  form: "detailForm"
})(PersonalForm);
