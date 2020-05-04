import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../../../store";
import { DepoistList, deleteDeposit } from "../../../../actions/mypage";
import Pagination from "react-js-pagination";

const buttonStyle = {
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(0, 101, 54)",
  fontWeight: "bold",
  textDecoration: "none"
};

class DepositDetail extends Component {
  state = {
    isCnt: false,
    page: 1
  };

  componentDidMount() {
    store.dispatch(DepoistList(this.state.page));
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isCnt) {
      this.setState(
        {
          isCnt: true
        },
        () => {
          store.dispatch(DepoistList(this.state.page));
        }
      );
    }
  }

  handlePageChange = pageNumber => {
    this.setState(
      {
        page: pageNumber,
        isCnt: true
      },
      () => {
        store.dispatch(DepoistList(this.state.page));
      }
    );
  };

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
            <h3>Deposit History</h3>
            <div>
             <span className="text-left" style={{fontSize: '1.2rem', fontWeight: '250'}}>
              {this.props.wallet ? "Your KJ Balance : " + (this.props.wallet.kj_balance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KJ": null }
             </span>
            </div>            
            <div className="text-right my-5">
              {this.props.wallet && this.props.wallet.kj_balance > 0 ? (
                <Link
                  to="/mypage/deposit"
                  className="px-3 py-2 rounded-pill"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#006536",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                >
                  Deposit
                </Link>
              ) : null}
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
              <span>Deposit Crypto</span>
            </div>
            <div className="ml-2" style={{ width: "20%" }}>
              <span>Crypto Amount</span>
            </div>            
            <div className="ml-2" style={{ width: "15%" }}>
              <span>Account</span>
            </div>
            <div className="ml-2" style={{ width: "20%" }}>
              <span>Currency</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Amount</span>
            </div>
            <div className="ml-2" style={{ width: "15%" }}>
              <span>Status</span>
            </div>            
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Cancel</span>
            </div>
          </div>
          {this.props.deposit && this.props.deposit.results ? (
            this.props.deposit.results.map((data, i) => {
              let deposit_status = "";
              let deposit_crypto = "";
              let currency = "";

              switch (data.status) {
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

              switch (data.deposit_crypto) {
                case "0":
                  deposit_crypto = "KJ";
                  break;
                case "1":
                  deposit_crypto = "Bitcoin";
                  break;
                case "2":
                  deposit_crypto = "Ethereum";
                  break;
                case "3":
                  deposit_crypto = "JKL";
                  break;
                default:
                  break;
              }

              switch (data.currency) {
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
                    fontSize: "1rem",
                    padding: "0.8rem"
                  }}
                  key={i}
                >
                  <div className="ml-2  my-auto" style={{ width: "10%" }}>
                    <span>{deposit_crypto}</span>
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "20%" }}>
                    <span>{data.crypto_amount}</span>
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "15%" }}>
                    {data.mt4_account}
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "20%" }}>
                    <span>{currency}</span>
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "10%" }}>
                    <span>{data.amount}</span>
                  </div>                  
                  <div className="ml-2  my-auto" style={{ width: "15%" }}>
                    <span>{deposit_status}</span>
                  </div>                  
                  <div className="ml-2  my-auto" style={{ width: "10%" }}>
                    <span>
                      {data.status === "P" ? (
                        <button
                          type="button"
                          className="btn rounded-pill"
                          style={buttonStyle}
                          onClick={() => {
                            window.confirm("정말 취소하시겠습니까?")
                              ? store
                                  .dispatch(deleteDeposit(data.id))
                                  .then(() => {
                                    this.setState({
                                      isCnt: true
                                    });
                                    alert("취소되었습니다.");
                                  })
                              : true;
                          }}
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
            <div>No Deposit History</div>
          )}
          <div className="row justify-content-center">
            {this.props.deposit &&
              this.props.deposit.results &&
              this.props.deposit.links && (
                <div className="pagination">
                  <Pagination
                    activePage={this.props.deposit.links.cur_page}
                    itemsCountPerPage={10}
                    totalItemsCount={this.props.deposit.links.count}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  deposit: state.mypage.deposit,
  wallet: state.mypage.wallet
});

export default DepositDetail = connect(mapStateToProps, { deleteDeposit,DepoistList })(
  DepositDetail
);
