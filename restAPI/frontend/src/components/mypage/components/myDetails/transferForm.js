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


  componentDidUpdate() {
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
    let from = "";
    let to = "";
    
    if(e.target.name === "from_account") {
      from = this.props.account.filter((c) => {
        return c.mt4_account.indexOf(e.target.value) > -1;
      });
      from.length > 0 ? from.map((c)=>{ this.setState({from_balance: c.balance}) }) : this.setState({from_balance: ""})
    }

    if(e.target.name === "to_account") {
      to = this.props.account.filter((c) => {
        return c.mt4_account.indexOf(e.target.value) > -1;
      });
      to.length > 0 ? to.map((c)=>{ this.setState({to_balance: c.balance}) }) : this.setState({to_balance: ""})
    }    
  }

  onSubmit = formValues => {
    if(formValues.amount > this.state.from_balance) {
      alert("It cannot be larger than the amount of the sending account.")
      return false;
    }

    if(this.state.from_balance === this.state.to_balance) {
      alert("The exchange of the same account is impossible.")
      return false;
    }
    store.dispatch(addTransfer(formValues)).then(() => {
      if (this.props.status === 201) {
        alert("Tranfer Application completed");
        this.setState({
          isLoad: false
        });
        this.props.history.go('/mypage/transfer/detail')
      } else {
        alert("Please apply again.");
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
                   <div className="form-label-group">
                    <label>To Account Balance</label>
                    <input type="text" className="form-control" placeholder="Plesase Select 'To Account'" readOnly value={this.state.to_balance}/>
                  </div>                   
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
