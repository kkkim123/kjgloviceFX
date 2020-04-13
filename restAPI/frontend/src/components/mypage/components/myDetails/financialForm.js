import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import "../../../../styles/auth/form.css";

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

  selectField = ({ input, placeholder, index, meta: { touched, error } }) => {
    const optList = (this.props.options && (JSON.parse(this.props.options[index])).map((opt, i) => {
      return (
      <option value={i} key={i}>{opt}</option>
      )
    }));
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

  onChange = isChecked => {
    console.log(isChecked)
  }

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
              component={this.selectField}
              placeholder="Annual Income*"
              index='3'
              options={this.props.options}
              validate={required}
            />
            <Field
              name="income_source"
              component={this.selectField}
              placeholder="Source of Wealth*"
              index='4'
              options={this.props.options}
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
              name="expected_deposit"
              component={this.selectField}
              placeholder="Yes or No*"
              validate={required}
              onChange={this.onChange}
            />
            <Field
              name="trading_period"
              type="text"
              component={this.selectField}
              placeholder="Trading period*"
              index='5'
              options={this.props.options}
              validate={required}
              disabled
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
  options: state.mypage.option
});

FinancialForm = connect(mapStateToProps)(FinancialForm);

export default reduxForm({
  form: "financialForm"
})(FinancialForm);
