import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login } from "../../actions/auth";

class LoginForm extends Component {
  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <div
        className={`underline text-left item-box 
        ${touched && error ? "error" : ""}`}
      >
        <input {...input} type={type} placeholder={placeholder} />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className="field">
        <input type={type} />
        {error && <div className="ui red message">{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.login(formValues);
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
                <h5 className="card-title">Log in now</h5>
                <p className="mb-4">
                  Do not have an account? 
                  <Link to="/register/user" className="link">
                    {" "}Register
                  </Link>
                </p>
                <form className="form-signin text-left">
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email*"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password*"
                      required
                    />
                  </div>
                  <div className="form-label-group text-right p-2">
                    <p className="">
                      <Link to="/reset" className="link">
                        Forgot your password?
                      </Link>
                    </p>
                  </div>
                  <button
                    className="btn btn-lg btn-block btn-primary content-center  mt-10"
                    type="submit"
                  >
                    Sign in
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

LoginForm = connect(mapStateToProps, { login })(LoginForm);

export default reduxForm({
  form: "loginForm"
})(LoginForm);
