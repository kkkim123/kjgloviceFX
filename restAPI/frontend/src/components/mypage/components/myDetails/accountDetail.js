import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAccount, delAccount } from "../../../../actions/mypage";
import Moment from "moment";
import store from "../../../../store";

const buttonStyle = {
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(0, 101, 54)",
  fontWeight: "bold",
  textDecoration: "none"
}

class accountDetail extends Component {
  state = {
    isLoad: true
  }

  componentDidUpdate() {
    if (this.state.isLoad && !this.props.account) {
      store.dispatch(getAccount(this.props.auth.id));
      this.setState({
        isLoad: false,
      });
    }
  }

  delAccount = id => {
    window.confirm("Are you sure you want to cancel?") ? 
    store.dispatch(delAccount(id)).then(()=>{
      alert("Canceled.");
      this.setState({isLoad: true})
    })
    : 
    true;
  }

  render() {
    return (
      <section className="container">
        <div
          className="shadow my-5 py-5 px-4 text-center mx-auto"
          style={{
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            color: "#000000"
          }}
        >
          <div className="text-left mb-5">
            <h3>Account</h3>
            <div className="text-right my-5">
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
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Status</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Type</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Number</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Name</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Currency</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Leverage</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Platform</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Created</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Cancel</span>
            </div>
          </div>
          {this.props.account ? (
            this.props.account.map((rowData, i) => {
              let account_type = "";
              let status = "";
              let base_currency = "";
              let leverage = "";
              let trading_platform = "";

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

              switch (rowData.status) {
                case "P":
                  status = "Pending";
                  break;
                case "A":
                  status = "Approved";
                  break;
                case "D":
                  status = "Declined";
                  break;
                case "S":
                  status = "Processed";
                  break;
                default:
                  break;
              }

              switch (Number(rowData.leverage)) {
                case 0:
                  leverage = "1:100";
                  break;
                case 1:
                  leverage = "1:50";
                  break;
                case 2:
                  leverage = "1:25";
                  break;
                case 3:
                  leverage = "1:10";
                  break;
                default:
                  break;
              }

              switch (Number(rowData.trading_platform)) {
                case 0:
                  trading_platform = "MT4";
                  break;
                case 1:
                  trading_platform = "PAMM-Master";
                  break;
                case 2:
                  trading_platform = "CopyTrader-Master";
                  break;
                case 3:
                  trading_platform = "PAMM-Slave";
                  break;
                case 4:
                  trading_platform = "CopyTrader-Slave";
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
                    fontSize: "1rem",
                    padding: "0.8rem"
                  }}
                  key={i}
                >
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>{status}</span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>{account_type}</span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>
                      {rowData.mt4_account ? rowData.mt4_account : "None"}
                    </span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>{rowData.account_name}</span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>{base_currency}</span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>{leverage}</span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>{trading_platform}</span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>
                      {Moment(rowData.created_at).format("YYYY-MM-DD HH:mm")}
                    </span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>
                      {rowData.status === "P" || rowData.status === "R" ? (
                        <button
                          className="btn rounded-pill"
                          type="button"
                          style={buttonStyle}
                          onClick={() => this.delAccount(rowData.id)}
                        >
                          Cancel
                        </button>
                      ) : null}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Account</div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  account: state.mypage.account
});

export default accountDetail = connect(mapStateToProps, {
  getAccount,
  delAccount
})(accountDetail);
