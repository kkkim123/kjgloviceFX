import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import "../../../../styles/auth/form.css";
import store from "../../../../store";
import { addTransfer, getAccount} from "../../../../actions/mypage";

class TransferForm extends Component {
  state = {
    isLoad: false,
  };


  componentDidUpdate() {
    if (!this.props.account) {
      store.dispatch(getAccount(this.props.auth.id));
    }
    if (!this.state.isLoad) {
      this.setState(
        {
          isLoad: true
        },
        () => {
          store.dispatch(getTransfer());
        }
      );
    }
  }

  selectField = ({ input, placeholder, meta: { touched, error } }) => {
    const optList =
      this.props.account &&
      this.props.account.map((opt, i) => {
        return (
          <option value={opt.mt4_account} key={i}>
            {opt.mt4_account}
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
    store.dispatch(addTransfer(formValues)).then(() => {
      if (this.props.status === 201) {
        alert("Tranfer 신청 완료");
        this.setState({
          isLoad: false
        });
        this.props.history.go('/mypage/transfer/detail')
      } else {
        alert("다시 신청해주세요");
      }
    });
  };

  render() {
    return (
      <section className="container">
            <div className="card card-signin my-5">
              <div className="card-body text-center">
                <h5 className="card-title mb-5">Transfer Register</h5>
                <form
                  name="deposit_form"
                  className="form-signin text-left"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="from_account"
                    component={this.selectField}
                    placeholder="From Account*"
                  />
                  <Field
                    name="to_account"
                    component={this.selectField}
                    placeholder="To Account*"
                  />
                  <button
                    className="btn btn-lg btn-primary btn-block  mt-10"
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

const mapStateToProps = state => ({
  account: state.mypage.account,
  auth: state.auth,
  status: state.mypage.msg
});

TransferForm = connect(mapStateToProps, {
  addTransfer
})(TransferForm);

export default reduxForm({
  form: "TransferForm"
})(TransferForm);
