import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAccount, changeAcc } from "../../../actions/mypage";

class account extends Component {
  componentDidMount() {
    this.props.getAccount(this.props.auth.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.auth.user !== this.props.auth.user) {
      this.props.getAccount(this.props.auth.id);
    }
    return true;
  }

  handleClick = (data) => {
    this.props.changeAcc(data)
  }

  render() {
    return (
      <div
        className="shadow my-5 py-5 px-4 text-center mx-auto"
        style={{
          width: "90%",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          color: "#000000"
        }}
      >
        <div className="text-left mb-5">
          <h3>Account</h3>
        </div>
        <div className="text-right mb-2">
            <Link
                to="/mypage/details/account"
                className="px-3 py-2 rounded-pill"
                style={{
                    color: "#ffffff",
                    backgroundColor: "#006536",
                    fontWeight: "bold",
                    textDecoration: "none"
                }}
            >
                Add Account
            </Link>
        </div>        
        <div
          className="d-flex justify-content-between"
          style={{
            borderTop: "1px solid #000000",
            color: "#929292",
            fontSize: "1.2rem",
            padding: "0.8rem"
          }}
        >
          <div className="ml-2" style={{ width: "15%" }}>
            <span>Type</span>
          </div>
          <div className="ml-2" style={{ width: "15%" }}>
            <span>Number</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>Currency</span>
          </div>
          <div className="ml-2" style={{ width: "25%" }}>
            <span>Balance</span>
          </div>
          <div className="ml-2" style={{ width: "20%" }}>
            <span>Deposit</span>
          </div>
          <div className="ml-2" style={{ width: "15%" }}>
            <span>Withdraw</span>
          </div>
        </div>
        {this.props.account &&
          this.props.account.map((rowData,i) => {
            let account_type = "";
            let base_currency = "";
            switch (Number(rowData.account_type)) {
              case 0:
                account_type = "Live MT4 Account";
                break;
              default:
                break;
            }

            switch (Number(rowData.base_currency)) {
              case 0:
                base_currency = "USD";
                break;
              case 1:
                base_currency = "CNY";
                break;
              case 2:
                base_currency = "BTC";
                break;
              case 3:
                base_currency = "ETH";
                break;
              case 4:
                base_currency = "GLC";
                break;
              case 5:
                base_currency = "WTX";
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
                  fontSize: "1.2rem",
                  padding: "0.8rem"
                }}
                key={i}
              >
                <div className="ml-2" style={{ width: "15%" }}>
                  {account_type}
                </div>
                <div className="ml-2" style={{ width: "15%" }} onClick={()=>this.handleClick(rowData.mt4_account)}>
                  <span>{rowData.mt4_account}</span>
                </div>
                <div className="ml-2" style={{ width: "10%" }}>
                  <span>{base_currency}</span>
                </div>
                <div className="ml-2" style={{ width: "25%" }}>
                  <span>{rowData.balance}</span>
                </div>
                <div className="ml-2" style={{ width: "20%" }}>
                  <Link
                    to="/mypage/deposit"
                    className="px-3 py-2 rounded-pill"
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#006536",
                      fontWeight: "bold",
                      textDecoration: "none"
                    }}
                    onClick={()=>this.handleClick(rowData.mt4_account)}
                  >
                    Deposit
                  </Link>
                </div>
                <div className="ml-2" style={{ width: "15%" }}>
                  {rowData.balance > 0 ? (
                    <Link
                      to="/mypage/withdraw"
                      className="px-3 py-2 rounded-pill"
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#006536",
                        fontWeight: "bold",
                        textDecoration: "none"
                      }}
                      onClick={()=>this.handleClick(rowData.mt4_account)}
                    >
                      Withdraw
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  account: state.mypage.account
});

export default connect(mapStateToProps, { getAccount, changeAcc })(account);
