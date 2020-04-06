import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registDetail } from "../../actions/auth";
import "../../styles/auth/form.css";
import { CountryDropdown } from "react-country-region-selector";
import $ from "jquery";

class PersonalForm extends Component {
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
                <form className="form-signin text-left">
                  <div className="form-label-group">
                    <CountryDropdown
                      value={country}
                      onChange={val => this.selectCountry(val)}
                      defaultOptionLabel="Nationality*"
                      classes="form-control"
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Date of Birth*"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Mobile Phone*"
                      required
                    />
                  </div>
                  <div className="form-label-group text-center p-2 p-gray">
                    <p className="">
                      By registering you agree to our 
                      <Link to="#" className="link">
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
