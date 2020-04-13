import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import store from "../../../../store";
import { loadOption, addFile, getFile } from "../../../../actions/mypage";
import "../../../../styles/auth/form.css";

class EmployForm extends Component {
  componentDidMount() {
    this.props.loadOption();
  }
  
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
    // 토큰, 인덱스
    // this.props.registDetail(formValues);
    // this.props.history.push("/register/personal");
  };

  render() {
    console.log(this.props.option)
    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div className="card card-signin my-5">
        <div className="card-body text-center p-gray">
          <h5 className="card-title">Employment Information</h5>
          <form
            className="form-signin text-left"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Field
              name="employment_status"
              type="text"
              component={this.renderField}
              placeholder="Employment Status*"
              validate={required}
            />
            <Field
              name="industry"
              type="text"
              component={this.renderField}
              placeholder="Industry*"
              validate={required}
            />
            <Field
              name="employment_position"
              type="text"
              component={this.renderField}
              placeholder="Employment Status*"
              validate={required}
            />
            <Field
              name="education_level"
              type="text"
              component={this.renderField}
              placeholder="What is your level of education?*"
              validate={required}
            />
            <button
              className="btn btn-lg btn-primary btn-block mt-10"
              type="submit"
            >
              Save And Continue
            </button>
          </form>
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
  option: state.mypage
});

EmployForm = connect(mapStateToProps, { loadOption })(EmployForm);

export default reduxForm({
  form: "employForm"
})(EmployForm);
