import React, { Component } from "react";
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

  onChange = e => {
    if (e.target.value === "0") {
      $("select[name='trading_period']").attr("disabled", false);
    }
    if (e.target.value === "1") {
      $("select[name='trading_period']").attr("disabled", true);
    }
  };

  onSubmit = formValues => {
    if (formValues.trading_experience === "1") {
      formValues.trading_period = null;
    }
    formValues.user_status = 4;
    this.props.registDetail(formValues);
    this.props.history.push("/mypage");
  };

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body text-center p-gray">
                <h5 className="card-title mb-5">Financial Information</h5>
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
          </div>
        </div>
      </section>
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
