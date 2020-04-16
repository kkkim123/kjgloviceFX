import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAccount, delAccount } from "../../../../actions/mypage";
import Moment from "moment";

class accountDetail extends Component {
  componentDidMount() {
    this.props.getAccount(this.props.auth.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.auth.user !== this.props.auth.user) {
      this.props.getAccount(this.props.auth.id);
    }
    return true;
  }

  render() {
    return (
      <div className="container">
        {this.props.account ? (
          this.props.account &&
          this.props.account.map((acc, i) => {
            let account_type = "";
            let status = "";
            let base_currency = "";
            let leverage = "";
            let trading_platform = "";

            switch (Number(acc.account_type)) {
              case 0:
                account_type = "Live MT4 Account";
                break;
              default:
                break;
            }

            switch (acc.status) {
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

            switch (Number(acc.base_currency)) {
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

            switch (Number(acc.leverage)) {
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

            switch (Number(acc.trading_platform)) {
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
              <div key={i}>
                <div>No. {i + 1} Account</div>
                <div>Account Type : {account_type}</div>
                <div>
                  MT4 Account : {acc.mt4_account ? acc.mt4_account : "None"}
                </div>
                <div>Account Name : {acc.account_name}</div>
                <div>Status : {status}</div>
                <div>Referral Code : {acc.referral_code}</div>
                <div>Base Currency : {base_currency}</div>
                <div>Leverage : {leverage}</div>
                <div>Trading Platform : {trading_platform}</div>
                <div>
                  Updated :{" "}
                  {Moment(acc.updated_at).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                <div>
                  Created :{" "}
                  {Moment(acc.created_at).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary bg-gray btn-lg"
                  onClick={() => {
                    this.props.delAccount(acc.id), history.go(0);
                  }}
                >
                  Delete Account
                </button>
                <br />
              </div>
            );
          })
        ) : (
          <>
            <div>등록된 계좌가 없습니다.</div>
            <Link to="/mypage/details/account">Create New Account</Link>
          </>
        )}
      </div>
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
