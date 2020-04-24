import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Pagination from "react-js-pagination";
import { WithdrawList, WithdrawRegist, deleteWithdraw } from "../../../../actions/mypage";
import "../../../../styles/auth/form.css";

class WithdrawForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: true,
            account: this.props.accNum? this.props.accNum: localStorage.getItem("mt4_account"),
            page: 1
        }
    }

    componentDidMount() {
        // refresh 시 사라지는거 방지
        localStorage.setItem("mt4_account", this.state.account);
        // Withdraw list 조회
        this.props.WithdrawList(this.state.page);
    }

    componentDidUpdate() {
        if ((this.props.accNum || localStorage.getItem("mt4_account")) && this.state.isEdit ) {
            this.props.initialize({
                mt4_account: this.props.accNum? this.props.accNum: localStorage.getItem("mt4_account"),
                crypto_address:  this.props.auth.kj_address
            });
            this.setState({
                isEdit: false
            })
        }
    }

    handlePageChange = pageNumber => {
        this.setState(
          {
            page: pageNumber,
            isCnt: true
          },
          () => {
            this.props.WithdrawList(this.state.page);
          }
        );
      };

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
        this.props.WithdrawRegist(formValues);
        this.props.history.push("/mypage");
    }

    render() {
        console.log(this.props.withdraw);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="card card-signin my-5">
                            <div className="card-body text-center">
                                <h5 className="card-title">Withdraw Register</h5>
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
                            <h3>Withdraw History</h3>
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
                                <span>Withdraw Crypto</span>
                            </div>
                            <div className="ml-2">
                                <span>Crypto Address</span>
                            </div>
                            <div className="ml-2">
                                <span>Amount</span>
                            </div>
                            <div className="ml-2">
                                <span>Currency</span>
                            </div>
                        </div>
                        {this.props.withdraw && this.props.withdraw.results ? this.props.withdraw.results.map((data, i) => {
                            let withdraw_status = "";
                            let withdraw_crypto = "";
                            let currency = "";

                            switch(data.status) {
                                case "P":
                                    withdraw_status = "Pending";
                                    break;
                                case "A":
                                    withdraw_status = "Approved";
                                    break;
                                case "D":
                                    withdraw_status = "Declined";
                                    break;
                                case "S":
                                    withdraw_status = "Processed";
                                    break;
                                default:
                                    break;
                            }

                            switch(data.withdraw_crypto) {
                                case "0":
                                    withdraw_crypto = "Bitcoin";
                                    break;
                                case "1":
                                    withdraw_crypto = "Ethereum";
                                    break;
                                case "2":
                                    withdraw_crypto = "JKL";
                                    break;
                                default:
                                    break;
                            }

                            switch(data.currency) {
                                case "0":
                                    currency = "USD";
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
                                        <span>{withdraw_status}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{withdraw_crypto}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{data.crypto_address}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{data.crypto_amount}</span>
                                    </div>
                                    <div className="ml-2">
                                        <span>{currency}</span>
                                    </div>
                                    <div className="ml-2">
                                      {data.status === "P" ? (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                this.props.deleteWithdraw(data.id), history.go(0);
                                            }}
                                        >
                                            Delete
                                        </button>
                                        
                                    ) : null}
                                    
                                    </div>
                                </div>
                             );
                        }): <div>No Data</div>}
                        {this.props.withdraw && this.props.withdraw.results && this.props.withdraw.links && 
                        <div className="text-center">
                        <Pagination
                            activePage={this.props.withdraw.links.cur_page}
                            itemsCountPerPage={10}
                            totalItemsCount={this.props.withdraw.links.count}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const required = value => (value ? undefined : "Required");

const mapStateToProps = (state) => (
    {
    options: state.mypage.accOption,
    auth: state.auth,
    accNum: state.mypage.accNum,
    withdraw: state.mypage.withdraw,
});

WithdrawForm = connect(mapStateToProps, { 
    WithdrawList, WithdrawRegist, deleteWithdraw
})(WithdrawForm);

export default reduxForm({
    form: "WithdrawForm",
})(WithdrawForm);