import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAccount, changeAcc } from "../../../actions/mypage";
import store from "../../../store";

class account extends Component {
  componentDidMount() {
    store.dispatch(getAccount(this.props.auth.id));
    // console.log(this.props.account);

    if (this.props.account !== undefined){
      console.log(this.props.account[0])
    }
  }

  handleClick = (data) => {
    this.props.changeAcc(data)
  }

  render() {
    return (
      <div
        className="shadow my-5 py-5 px-4 text-center mx-auto"
        style={{
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          color: "#000000"
        }}
      >
        <div className="text-left mb-5">
          <h3>
            Account
           <span style={{fontSize: '1.2rem', fontWeight: '300'}}> Clcik Your Account Number!</span>
          </h3>
          <div className="d-flex justify-content-between text-center my-5">
            <div>
             <span className="text-left" style={{fontSize: '1.2rem', fontWeight: '250'}}>
              {this.props.wallet ? "Your KJ Balance : " + (this.props.wallet.kj_balance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KJ": null }
             </span>
            </div>
            <div>
              <Link
                  to="/mypage/details/account/detail"
                  className="px-3 py-2 rounded-pill"
                  style={{
                      color: "#ffffff",
                      backgroundColor: "#006536",
                      fontWeight: "bold",
                      textDecoration: "none"
                  }}
              >
                  Account List
              </Link>
              <Link
                  to="/mypage/deposit/detail"
                  className="px-3 py-2 rounded-pill ml-3"
                  style={{
                      color: "#ffffff",
                      backgroundColor: "#006536",
                      fontWeight: "bold",
                      textDecoration: "none"
                  }}
              >
                  Deposit List
              </Link>
              <Link
                  to="/mypage/withdraw/detail"
                  className="px-3 py-2 rounded-pill ml-3"
                  style={{
                      color: "#ffffff",
                      backgroundColor: "#006536",
                      fontWeight: "bold",
                      textDecoration: "none"
                  }}
              >
                  Withdraw List
              </Link>                            
              <Link
                  to="/mypage/transfer/detail"
                  className="px-3 py-2 rounded-pill mx-3"
                  style={{
                      color: "#ffffff",
                      backgroundColor: "#006536",
                      fontWeight: "bold",
                      textDecoration: "none"
                  }}
              >
                  Transfer List
              </Link>
              </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{
            borderTop: "1px solid #000000",
            color: "#929292",
            fontSize: "1.0rem",
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
          <div className="ml-2" style={{ width: "10%" }}>
            <span>Balance</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>Available</span>
          </div>          
          <div className="ml-2" style={{ width: "20%" }}>
            <span>Deposit</span>
          </div>
          <div className="ml-2" style={{ width: "20%" }}>
            <span>Withdraw</span>
          </div>
        </div>
        {this.props.account ?
          this.props.account.map((rowData,i) => {
            if(rowData.status === "A" || rowData.status === "S") {
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
                    fontSize: "1.0rem",
                    padding: "0.8rem"
                  }}
                  key={i}
                >
                  <div className="ml-2" style={{ width: "15%" }}>
                    {account_type}
                  </div>
                  <div className="ml-2" style={{ width: "15%", cursor: "pointer" }} onClick={()=>this.handleClick(rowData.mt4_account)}>
                    <span>{rowData.mt4_account}</span>
                  </div>
                  <div className="ml-2" style={{ width: "10%" }}>
                    <span>{base_currency}</span>
                  </div>
                  <div className="ml-2" style={{ width: "10%" }}>
                    <span>{(rowData.balance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </div>
                  <div className="ml-2" style={{ width: "10%" }}>
                    <span>{rowData.available ? (rowData.available).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</span>
                  </div>                  
                  <div className="ml-2" style={{ width: "20%" }}>
                    {//wallet에 담긴 kj balance
                      this.props.wallet && this.props.wallet.kj_balance > 0 ? (<Link
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
                    </Link>) : null}
                  </div>
                  <div className="ml-2" style={{ width: "20%" }}>
                    {//mt4 에서 받아논 허용된 balance
                      rowData.available > 0 ? (
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
            } 
            if(rowData.status === "P" || rowData.status === "D" ) {
              return (
                <div key={i}>
                  <Link to="/mypage/details/account/detail">Pending or Decline Account</Link>
                </div>
              )
            }
          }) : (
            <div>No Account</div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  account: state.mypage.account,
  wallet: state.mypage.wallet
});

export default connect(mapStateToProps, { changeAcc })(account);
