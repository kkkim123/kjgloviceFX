import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { DepositRegist, getAccount } from "../../../../actions/mypage";
import "../../../../styles/auth/form.css";
import store from "../../../../store";

class DepositForm extends Component {
  state = {
    isEdit: true,
    isAccount: true,
    account: this.props.accNum
      ? this.props.accNum
      : localStorage.getItem("mt4_account"),
  };

  componentDidMount() {
    localStorage.setItem("mt4_account", this.state.account);
    store.dispatch(getAccount(this.props.auth.id));
  }

  componentDidUpdate() {
    //My page - main에서 deposit 버튼 클릭하여 진입 시
    if (this.props.accNum && this.state.isAccount) {
      this.setState({
        account: this.props.accNum,
        isAccount: false
      });
    }

    //없을 때
    if (!this.props.accNum && this.state.isAccount) {
      this.setState({
        account: localStorage.getItem("mt4_account"),
        isAccount: false
      });
    }

    //계좌, 지갑주소
    if (this.props.auth && this.state.account && this.state.isEdit) {
      this.props.initialize({
        mt4_account: this.state.account,
        crypto_address: this.props.auth.kj_address
      });
      this.setState({
        isEdit: false
      });
    }
  }

  renderField = ({
    input,
    placeholder,
    type,
    label,
    writeOnce,
    meta: { touched, error }
  }) => {
    return (
      <div
        className={`form-label-group
            ${touched && error ? "error" : ""}`}
      >
        <label>{label}</label>
        <input
          {...input}
          type={type}
          className="form-control"
          placeholder={placeholder}
          disabled={writeOnce}
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  selectField = ({
    input,
    placeholder,
    index,
    label,
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
        <label>{label}</label>
        <select {...input} className="form-control">
          <option>{placeholder}</option>
          {optList}
        </select>
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  selectField2 = ({ input, placeholder, label, meta: { touched, error } }) => {
    const accList =
      this.props.account &&
      this.props.account.map((acc, i) => {
          return (
            <option value={acc.mt4_account} key={i}>
              {acc.mt4_account}
            </option>
          );
      });
    return (
      <div
        className={`form-label-group
            ${touched && error ? "error" : ""}`}
      >
        <label>{label}</label>
        <select {...input} className="form-control">
          <option>{placeholder}</option>
          {accList}
        </select>
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  onSubmit = formValues => {
    store.dispatch(DepositRegist(formValues));
    this.props.history.push("/mypage/deposit/detail");
  };

  render() {
    console.log(this.props.accNum)
    console.log(this.props.account)
    return (
      <section className="container">
        <div className="card card-signin my-5">
          <div className="card-body text-center">
            <h5 className="card-title mb-5">Deposit Register</h5>
            <form
              name="deposit_form"
              className="form-signin text-left"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="mt4_account"
                type="text"
                component={this.selectField2}
                placeholder="Account*"
                label="Account"
                is_required={true}
              />
              <Field
                name="crypto_address"
                type="text"
                label="Crypto Address"
                component={this.renderField}
                placeholder="Crypto Address*"
                writeOnce={true}
                is_required={true}
              />
              <Field
                name="currency"
                component={this.selectField}
                placeholder="Currency*"
                label="Currency"
                index="1"
              />
              <Field
                name="deposit_crypto"
                component={this.selectField}
                placeholder="Deposit Crypto*"
                label="Deposit Crypto"
                index="4"
              />
              <Field
                name="crypto_amount"
                type="text"
                component={this.renderField}
                placeholder="Crypto Amount*"
                label="Crypto Amount"
                is_required={true}
              />
              <Field
                name="cellphone_number"
                type="text"
                component={this.renderField}
                placeholder="CellPhone Number*"
                label="CellPhone Number"
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
  auth: state.auth,
  accNum: state.mypage.accNum,
  account: state.mypage.account
});

DepositForm = connect(mapStateToProps, { DepositRegist })(DepositForm);

export default reduxForm({
  form: "DepositForm"
})(DepositForm);
