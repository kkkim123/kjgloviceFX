import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import store from "../../../../store";
import { loadOption, addFile, getFile } from "../../../../actions/mypage";
import "../../../../styles/auth/form.css";

class FinancialForm extends Component {
  componentDidMount() {
    // this.props.loadOption();
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
    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div className="card card-signin my-5">
        <div className="card-body text-center p-gray">
          <h5 className="card-title">Financial Information</h5>
          <form
            className="form-signin text-left"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Field
              name="annual_income"
              type="text"
              component={this.renderField}
              placeholder="Annual Income*"
              validate={required}
            />
            <Field
              name="income_source"
              type="text"
              component={this.renderField}
              placeholder="Source of Wealth*"
              validate={required}
            />
            <Field
              name="expected_deposit"
              type="text"
              component={this.renderField}
              placeholder="Expected counrty of Origin (and destination of funds)*"
              validate={required}
            />
            <Field
              name="trading_experience"
              type="text"
              component={this.renderField}
              placeholder="How much do you except to deposit in the next 12 months?*"
              validate={required}
            />
            <Field
              name="trading_period"
              type="text"
              component={this.renderField}
              placeholder="Trading period*"
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

FinancialForm = connect(mapStateToProps, { loadOption })(FinancialForm);

export default reduxForm({
  form: "financialForm"
})(FinancialForm);
