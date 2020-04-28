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
    from_balance: "",
    to_balance: "",
  };


  componentDidUpdate(prevProps, prevState) {
    if (!this.props.account) {
      store.dispatch(getAccount(this.props.auth.id));
    }
  }

  selectField = ({ input, placeholder, label, meta: { touched, error } }) => {
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
        <label>{label}</label>
        <select {...input} className="form-control" >
          <option>{placeholder}</option>
          {optList}
        </select>
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };

  renderField = ({ input, placeholder, type,label,readOnly, meta: { touched, error } }) => {
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
          readOnly={readOnly}
        />
        {touched && error && <span className="">{error}</span>}
      </div>
    );
  };
    
  getBalance = e => {
    this.props.account.filter((c) => {
      switch (e.target.name) {
        case "from_account":
          console.log(c.mt4_account.indexOf(e.target.value))
          // (c.mt4_account.indexOf(e.target.value) > -1) ?
          // this.setState({
          //   from_balance: c.balance
          // })
          // :
          // this.setState({
          //   from_balance: ""
          // })
          break;
        case "to_account":
            (c.mt4_account.indexOf(e.target.value) > -1) ?
            this.setState({
              to_balance: c.balance
            })
            :
            this.setState({
              to_balance: ""
            })          
          break;        
      }
    });
  }

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
                    label="From Account"
                    onChange={this.getBalance}
                  />
                   <div className="form-label-group">
                    <label>From Account Balance</label>
                    <input type="text" className="form-control" placeholder="Plesase Select 'From Account'" readOnly value={this.state.from_balance}/>
                  </div> 
                  <Field
                    name="to_account"
                    component={this.selectField}
                    placeholder="To Account*"
                    label="To Account"
                    onChange={this.getBalance}
                  />
                  <Field
                    name="to_balance"
                    component={this.renderField}
                    placeholder="Plesase Select Account"
                    label="To Account Balance"
                    type="text"
                    readOnly={true}                    
                  />
                 <Field
                    name="amount"
                    component={this.renderField}
                    placeholder="Transfer Amount"
                    label="Transfer Amount"
                    type="text"
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
