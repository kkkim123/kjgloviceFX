import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import store from "../../../../store";
import "../../../../styles/auth/form.css";

class EmployForm extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user !== this.props.user) {
    }
    return true;
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

  selectField = ({ input, placeholder, index, meta: { touched, error } }) => {
    const optList =
      this.props.options &&
      JSON.parse(this.props.options[index]).map((opt, i) => {
        return (
          <option value={i + 1} key={i}>
            {opt}
          </option>
        );
      });
    return (
      <div
        className={`form-label-group
        ${touched && error ? "error" : ""}`}
      >
        <select {...input} className="form-control">
          <option>{placeholder}</option>
          {optList}
        </select>
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  onSubmit = formValues => {
    // 토큰, 인덱스
    console.log(formValues);
    // this.props.registDetail(formValues);
    // this.props.history.push("/register/personal");
  };

  render() {
    return (
      <div className="container">
        <div className="card card-signin my-5">
          <div className="card-body text-center p-gray">
            <h5 className="card-title">Employment Information</h5>
            <form
              className="form-signin text-left"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="employment_status"
                component={this.selectField}
                placeholder="Employment Status*"
                index="0"
                options={this.props.options}
                validate={required}
              ></Field>
              <Field
                name="industry"
                type="text"
                component={this.renderField}
                placeholder="Industry*"
                validate={required}
              />
              <Field
                name="employment_position"
                component={this.selectField}
                placeholder="Employment Positions*"
                index="1"
                options={this.props.options}
                validate={required}
              />
              <Field
                name="education_level"
                component={this.selectField}
                placeholder="What is your level of education?*"
                index="2"
                options={this.props.options}
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
      </div>
    );
  }
}

const required = value => (value ? undefined : "Required");

const mapStateToProps = state => ({
  options: state.mypage.option,
  auth: state.auth
});

EmployForm = connect(mapStateToProps)(EmployForm);

export default reduxForm({
  form: "employForm"
})(EmployForm);
