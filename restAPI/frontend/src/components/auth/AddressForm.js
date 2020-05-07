import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import "../../styles/auth/form.css";

class AddressForm extends Component {
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
    const oriData = JSON.parse(localStorage.getItem('register'));
    formValues = Object.assign(formValues,oriData)
    localStorage.setItem('register', JSON.stringify(formValues))
    this.props.history.push("/register/personal");
  };

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title mb-5">Residential Address</h5>
                <div className="progress card-bar float-right">
                  <div
                    className="progress-bar bg-green"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="address"
                    type="text"
                    component={this.renderField}
                    placeholder="Street & Number*"
                    validate={required}
                  />
                  <Field
                    name="postal_code"
                    type="text"
                    component={this.renderField}
                    placeholder="Postal/Zip Code*"
                    validate={required}
                  />
                  <Field
                    name="city"
                    type="text"
                    component={this.renderField}
                    placeholder="City/Town*"
                    validate={required}
                  />
                  <div className="form-label-group text-center p-2 p-gray">
                    <p className="">
                      By registering you agree to our{" "}
                      <Link to="/company" className="link">
                        privacy policy
                      </Link>
                    </p>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block mt-10"
                    type="submit"
                  >
                    Save and Next
                  </button>
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
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token
});

AddressForm = connect(mapStateToProps)(AddressForm);

export default reduxForm({
  form: "detailForm"
})(AddressForm);
