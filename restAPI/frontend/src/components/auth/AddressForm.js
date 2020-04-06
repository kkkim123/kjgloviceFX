import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registDetail } from "../../actions/auth";
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
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
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
                <h5 className="card-title">Residential Address</h5>
                <div class="progress card-bar float-right">
                  <div
                    class="progress-bar bg-green"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <form className="form-signin text-left">
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street & Number*"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Postal/Zip Code*"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City/Town*"
                      required
                    />
                  </div>
                  <div className="form-label-group text-center p-2 p-gray">
                    <p className="">
                      By registering you agree to our{" "}
                      <Link to="#" className="link">
                        privacy policy
                      </Link>
                    </p>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block mt-10"
                    type="submit"
                  >
                    Next
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

AddressForm = connect(mapStateToProps, { registDetail })(AddressForm);

export default reduxForm({
  form: "detailForm"
})(AddressForm);
