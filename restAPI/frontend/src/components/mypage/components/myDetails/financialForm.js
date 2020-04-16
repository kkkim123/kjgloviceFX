import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registDetail } from "../../../../actions/auth";
import "../../../../styles/auth/form.css";
import $ from "jquery";

class FinancialForm extends Component {
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

  selectField = ({
    input,
    placeholder,
    index,
    disabled,
    meta: { touched, error }
  }) => {
    const optList =
      this.props.options &&
      JSON.parse(this.props.options[index]).map((opt, i) => {
        return (
          <option value={i} key={i}>
            {opt}
          </option>
        );
      });
    return (
      <div
        className={`form-label-group
        ${touched && error ? "error" : ""}`}
      >
        <select {...input} className="form-control" disabled={disabled}>
          <option>{placeholder}</option>
          {optList}
        </select>
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  onChange = isChecked => {
    if (isChecked.target.value === "0") {
      $("select[name='trading_period']").attr("disabled", false);
    }
    if (isChecked.target.value === "1") {
      $("select[name='trading_period']").attr("disabled", true);
    }
  };

  onSubmit = formValues => {
    formValues.user_status = 4;
    formValues.user_id = this.props.auth.user.id;
    formValues.user_id = this.props.auth.user.id;
    this.props.registDetail(formValues);
    this.props.history.push("/mypage");
  };

  render() {
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
              component={this.selectField}
              placeholder="Annual Income*"
              index="3"
              options={this.props.options}
              validate={required}
            />
            <Field
              name="income_source"
              component={this.selectField}
              placeholder="Source of Wealth*"
              index="4"
              options={this.props.options}
              validate={required}
            />
            <Field
              name="trading_experience"
              component={this.selectField}
              placeholder="Trading experience Yes or no"
              index="5"
              validate={required}
              onChange={this.onChange}
            />
            <Field
              name="trading_period"
              type="text"
              component={this.selectField}
              placeholder="Trading period*"
              index="6"
              options={this.props.options}
              validate={required}
              disabled={true}
            />
            <button
              className="btn btn-lg btn-primary btn-block mt-10"
              type="submit"
            >
              Save And Complete
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const required = value => (value ? undefined : "Required");

const mapStateToProps = state => ({
  options: state.mypage.userOption,
  auth: state.auth
});

FinancialForm = connect(mapStateToProps, { registDetail })(FinancialForm);

export default reduxForm({
  form: "financialForm"
})(FinancialForm);
