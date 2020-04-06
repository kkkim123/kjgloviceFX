import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login } from "../../../actions/auth";

import "../../styles/auth/form.css";
import submit_filled from "../../images/submit_filled.png";

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
      <div className="container form mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-xs-12 mb-3 p-4 text-center">
            <div className="card p-4">
              <p className="title">Log in now</p>
              <p className="description">
                Do not have an account?
                <Link to="/register/user"> Register</Link>
              </p>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                  name="email"
                  type="text"
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
                <div className="text-right">
                  <Link to="/reset">Forgot your password?</Link>
                </div>
                <Link className="submit mt-4" to="#">
                  <div className="position-relative ">
                    <img className="submit-img" src={submit_filled} />
                    <div className="submit-text position-absolute p-2">
                      <p className="">Sign in</p>
                    </div>
                  </div>
                </Link>
                {/* <button className="btn">Sign in</button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      

      // <div className="commonWrap">
      //   <div className="commonFormWrap">
      //     <div className="clearfix">
      //       <h2 className="mb1">Log in now</h2>
      //       <span>
      //         Do not have an account?{" "}
      //         <b>
      //           <Link to="/register/user">Register</Link>
      //         </b>
      //       </span>
      //     </div>
      //     <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
      //       <Field
      //         name="email"
      //         type="email"
      //         component={this.renderField}
      //         placeholder="Email *"
      //       />
      //       <Field
      //         name="password"
      //         type="password"
      //         component={this.renderField}
      //         placeholder="Password*"
      //       />
      //       <Field
      //         name="non_field_errors"
      //         type="hidden"
      //         component={this.hiddenField}
      //       />
      //       <div className="floatR">
      //         <Link to="/reset">
      //           <span className="bold">Forgot your password?</span>
      //         </Link>
      //       </div>
      //       <button className="btn">Sign in</button>
      //     </form>
      //   </div>
      // </div>
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
