import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { DepoistList, DepositRegist, deleteDeposit } from "../../../../actions/mypage";
import "../../../../styles/auth/form.css";

class DepositForm extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            isEdit: true,
            account: this.props.accNum? this.props.accNum: localStorage.getItem("account")
        }
    }

    componentDidMount() {
        localStorage.setItem("mt4_account", this.state.account);
        this.props.DepoistList(this.props.auth.id);        
    }

    componentDidUpdate() {
        if((this.props.accNum || localStorage.getItem("mt4_account")) && this.state.isEdit ) {
          this.props.initialize({ 
            mt4_account: this.props.accNum? this.props.accNum: localStorage.getItem("account")
          });
          this.setState({
            isEdit: false
          });
        }
        
    }

    renderField = ({ input, writeOnce , placeholder, type, meta: { touched, error } }) => {
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
        console.log(formValues);
        this.props.DepositRegist(formValues);
        this.props.history.push("/mypage");
    }

    render() {
        console.log(this.props.deposit);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="card card-signin my-5">
                            <div className="card-body text-center">
                                <h5 className="card-title">Deposit Register</h5>
                                <form name="deposit_form"
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
                                    placeholder="Source of Wealth*"
                                    index="1"
                                    />
                                    <Field
                                    name="deposit_crypto"
                                    component={this.selectField}
                                    placeholder="Deposit Crypto*"
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
                                    name="crypto_amount"
                                    type="text"
                                    component={this.renderField}
                                    placeholder="Crypto Amount*"
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
                                    className="btn btn-lg btn-primary btn-block  mt-10"
                                    type="submit"
                                >
                                    Save And Complete
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div
                        className="shadow my-5 py-5 px-4 text-center mx-auto"
                        style={{
                        width: "90%",
                        borderRadius: "20px",
                        backgroundColor: "#ffffff",
                        color: "#000000"
                        }}>
                        <div className="text-left">
                            <h3>Account</h3>
                        </div>
                        <div
                        className="d-flex justify-content-between"
                        style={{
                            borderTop: "1px solid #000000",
                            color: "#929292",
                            padding: "0.8rem"
                        }}
                        >
                            <div className="ml-2">
                                <span>Account</span>
                            </div>
                            <div className="ml-2">
                                <span>Status</span>
                            </div>
                            <div className="ml-2">
                                <span>Deposit Crypto</span>
                            </div>
                            <div className="ml-2">
                                <span>Crypto Address</span>
                            </div>
                            <div className="ml-2">
                                <span>Crypto Amount</span>
                            </div>
                            <div className="ml-2">
                                <span>Currency</span>
                            </div>
                            <div className="ml-2">
                                <span>Exchange Rate</span>
                            </div>
                            <div className="ml-2">
                                <span>Amount</span>
                            </div>
                        </div>
                        {this.props.deposit && this.props.deposit.map((data, i) => {
                            let deposit_status = "";
                            let deposit_crypto = "";

                            switch(data.status) {
                                case "P":
                                    deposit_status = "Pending";
                                    break;
                                case "A":
                                    deposit_status = "Approved";
                                    break;
                                case "D":
                                    deposit_status = "Declined";
                                    break;
                                case "S":
                                    deposit_status = "Processed";
                                    break;
                                default:
                                    break;
                            }

                            switch(data.deposit_crypto) {
                                case "0":
                                    deposit_crypto = "Bitcoin";
                                    break;
                                case "1":
                                    deposit_crypto = "Ethereum";
                                    break;
                                case "2":
                                    deposit_crypto = "JKL";
                                    break;
                                default:
                                    break;
                            }

                            return (
                                <div
                                    className="d-flex justify-content-between"
                                    style={{
                                        borderTop: "1px solid #000000",
                                        color: "#929292",
                                        padding: "0.8rem",
                                    }}
                                    key={i}
                                >
                                    <div className="ml-2">
                                        {data.mt4_account}
                                    </div>
                                    <div className="ml-2">
                                        <span>{deposit_status}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{deposit_crypto}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{data.crypto_address}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{data.crypto_amount}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{data.currency}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{data.exchange_rate}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{data.amount}</span>
                                    </div>
                                    <div className="ml-2">
                                      {data.status === "P" ? (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                this.props.deleteDeposit(data.id), history.go(0);
                                            }}
                                        >
                                            Delete
                                        </button>
                                        
                                    ) : null}
                                    </div>
                                </div>
                             );
                        })}
                    </div>
                </div>
            </div>
            </div>
        );
    }
    
}

const required = value => (value ? undefined : "Required");

const mapStateToProps = (state) => (
    {
    options: state.mypage.accOption,
    auth: state.auth,
    accNum: state.mypage.accNum,
    deposit: state.mypage.deposit,
});

DepositForm = connect(mapStateToProps, { 
    DepoistList, 
    DepositRegist,
    deleteDeposit 
})(DepositForm);

export default reduxForm({
    form: "DepositForm",
})(DepositForm);