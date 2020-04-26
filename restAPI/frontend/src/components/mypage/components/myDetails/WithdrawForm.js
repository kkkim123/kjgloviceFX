import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { WithdrawRegist } from "../../../../actions/mypage";
import "../../../../styles/auth/form.css";
import store from "../../../../store";

class WithdrawForm extends Component {
  state = {
    isEdit: true,
    account: this.props.accNum
      ? this.props.accNum
      : localStorage.getItem("mt4_account"),
    page: 1
  };

  componentDidMount() {
    // refresh 시 사라지는거 방지
    localStorage.setItem("mt4_account", this.state.account);
  }

  componentDidUpdate() {
    if (
      (this.props.accNum || localStorage.getItem("mt4_account")) &&
      this.state.isEdit
    ) {
      this.props.initialize({
        mt4_account: this.props.accNum
          ? this.props.accNum
          : localStorage.getItem("mt4_account"),
        crypto_address: this.props.auth.kj_address
      });
      this.setState({
        isEdit: false
      });
    }
  }

  renderField = ({
    input,
    writeOnce,
    placeholder,
    type,
    meta: { touched, error }
  }) => {
    return (
      <div
        className={`form-label-group
            ${touched && error ? "error" : ""}`}
      >
        <input
          {...input}
          type={type}
          disabled={writeOnce}
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

  onSubmit = formValues => {
    store.dispatch(WithdrawRegist(formValues));
    this.props.history.push("/mypage/deposit/detail");
  };

  render() {
    return (
      <section className="container">
        <div className="card card-signin my-5">
          <div className="card-body text-center">
            <h5 className="card-title mb-5">Withdraw Register</h5>
            <form
              name="deposit_form"
              className="form-signin text-left"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="mt4_account"
                type="text"
                component={this.renderField}
                placeholder="Account*"
                is_required={true}
                writeOnce={true}
              />
              <Field
                name="currency"
                component={this.selectField}
                placeholder="Currency*"
                index="1"
              />
              <Field
                name="withdraw_crypto"
                component={this.selectField}
                placeholder="Withdraw Crypto*"
                index="4"
              />
              <Field
                name="crypto_address"
                type="text"
                component={this.renderField}
                placeholder="Crypto Address*"
                is_required={true}
              />
              <Field
                name="amount"
                type="text"
                component={this.renderField}
                placeholder="Amount*"
                is_required={true}
              />
              <Field
                name="cellphone_number"
                type="text"
                component={this.renderField}
                placeholder="CellPhone Number*"
                is_required={true}
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
      </section>
    );
  }
}

const required = value => (value ? undefined : "Required");

const mapStateToProps = state => ({
  options: state.mypage.accOption,
  auth: state.auth
});

WithdrawForm = connect(mapStateToProps, { WithdrawRegist })(WithdrawForm);

export default reduxForm({
  form: "WithdrawForm"
})(WithdrawForm);
