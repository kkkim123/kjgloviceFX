import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login } from "../../actions/auth";

class LoginForm extends Component {
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
          required
          placeholder={placeholder}
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className="form-label-group">
        <input type={type} />
        {error && <div className="">{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.login(formValues);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/main" />;
    }
    return (
      <section className="container" style={{paddingTop:"100px"}}>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title">Log in now</h5>
                <p className="mb-4">
                  Do not have an account?
                  <Link to="/register/user" className="link">
                    {" "}
                    Register
                  </Link>
                </p>
                <form
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="email"
                    type="email"
                    component={this.renderField}
                    placeholder="Email *"
                  />
                  <Field
                    name="password"
                    type="password"
                    component={this.renderField}
                    placeholder="Password*"
                  />
                  <Field
                    name="non_field_errors"
                    type="hidden"
                    component={this.hiddenField}
                  />
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
      </section>
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
