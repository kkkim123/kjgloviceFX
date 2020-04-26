import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { registDetail } from "../../../../actions/auth";
import { addAccount } from "../../../../actions/mypage";
import "../../../../styles/auth/form.css";
import store from "../../../../store";

class AccountForm extends Component {

  renderField = ({ input, placeholder, type, disabled,value, meta: { touched, error } }) => {
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
          readOnly={disabled}
          value={value}
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
        <select {...input} className="form-control">
          <option>{placeholder}</option>
          {optList}
        </select>
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  onSubmit = formValues => {
    formValues.user_status = 7;
    this.props.addAccount(formValues);
    this.props.registDetail(formValues);
    this.props.history.push("/mypage/details/account/detail");
  };

  render() {
    return (
      <section className="container">
        <div className="card card-signin my-5">
          <div className="card-body text-center p-gray">
            <h5 className="card-title mb-5">Open New Account</h5>
            <form
              className="form-signin text-left"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="account_type"
                component={this.selectField}
                placeholder="Account Type*"
                index="0"
                options={this.props.options}
                validate={required}
              />
              <Field
                name="base_currency"
                component={this.selectField}
                placeholder="Base Currency*"
                index="1"
                options={this.props.options}
                validate={required}
              />
              <Field
                name="trading_platform"
                component={this.selectField}
                placeholder="Trading Platform*"
                index="2"
                options={this.props.options}
                validate={required}
              />              
              <Field
                name="leverage"
                component={this.selectField}
                placeholder="Leverage*"
                index="3"
                options={this.props.options}
                validate={required}
              />
              <Field
                name="account_name"
                type="text"
                component={this.renderField}
                placeholder="Account Name(Option)"
              />
              <Field
                name="referral_code"
                type="text"
                component={this.renderField}
                placeholder={this.props.auth && this.props.auth.user && this.props.auth.user.referral_code ? this.props.auth.user.referral_code : 'Referral Code'}
                disabled={true}
              />
              <button
                className="btn btn-lg btn-primary btn-block mt-10"
                type="submit"
              >
                Create New Account
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const required = value => (value ? undefined : "Required");

const mapStateToProps = state => ({
  options: state.mypage.accOption,
  auth: state.auth
});

AccountForm = connect(mapStateToProps, { registDetail, addAccount })(AccountForm);

export default reduxForm({
  form: "accountForm"
})(AccountForm);
