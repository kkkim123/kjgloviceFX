import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../../../store";
import { WithdrawList, deleteWithdraw } from "../../../../actions/mypage";
import Pagination from "react-js-pagination";

const buttonStyle = {
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(0, 101, 54)",
  fontWeight: "bold",
  textDecoration: "none"
};

class WithdrawDetail extends Component {
  state = {
    isCnt: false,
    page: 1
  };

  componentDidMount() {
    store.dispatch(WithdrawList(this.state.page));
  }
  

  componentDidUpdate() {
    if (!this.state.isCnt) {
      this.setState(
        {
          isCnt: true
        },
        () => {
          store.dispatch(WithdrawList(this.state.page));
        }
      );
    }
  }

  handlePageChange = pageNumber => {
    this.setState(
      {
        page: pageNumber,
        isCnt: false
      },
      () => {
        store.dispatch(WithdrawList(this.state.page));
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
            <h3>Withdraw History</h3>
            <div className="text-right my-5">
              {//mt4 에서 받아논 허용된 balance
                this.props.account && this.props.account.available > 0 ? (
                  <Link
                    to="/mypage/withdraw"
                    className="px-3 py-2 rounded-pill"
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#006536",
                      fontWeight: "bold",
                      textDecoration: "none"
                    }}
                  >
                    Withdraw
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
              <span>Account</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Currency</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Amount</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Withdraw Crypto</span>
            </div>
            <div className="ml-2" style={{ width: "35%" }}>
              <span>Crypto Address</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Status</span>
            </div>            
            <div className="ml-2" style={{ width: "15%" }}>
              <span>Cancel</span>
            </div>
          </div>
          {this.props.withdraw && this.props.withdraw.results ? (
            this.props.withdraw.results.map((data, i) => {
              let withdraw_status = "";
              let withdraw_crypto = "";
              let currency = "";

              switch (data.status) {
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

              switch (data.withdraw_crypto) {
                case "0":
                  withdraw_crypto = "KJ";
                  break;                
                case "1":
                  withdraw_crypto = "Bitcoin";
                  break;
                case "2":
                  withdraw_crypto = "Ethereum";
                  break;
                case "3":
                  withdraw_crypto = "JKL";
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
                    {data.mt4_account}
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "10%" }}>
                    <span>{currency}</span>
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "10%" }}>
                    <span>{data.crypto_amount}</span>
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "10%" }}>
                    <span>{withdraw_crypto}</span>
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "35%" }}>
                    <span>{data.crypto_address}</span>
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "10%" }}>
                    <span>{withdraw_status}</span>
                  </div>
                  <div className="ml-2  my-auto" style={{ width: "15%" }}>
                    <span>
                      {data.status === "P" ? (
                        <button
                          type="button"
                          className="btn rounded-pill"
                          style={buttonStyle}
                          onClick={() => {
                            window.confirm("정말 취소하시겠습니까?")
                              ? store
                                  .dispatch(deleteWithdraw(data.id))
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
            <div>No Withdraw History</div>
          )}
          <div className="row justify-content-center">
            {this.props.withdraw &&
              this.props.withdraw.results &&
              this.props.withdraw.links && (
                <div className="pagination">
                  <Pagination
                    activePage={this.props.withdraw.links.cur_page}
                    itemsCountPerPage={10}
                    totalItemsCount={this.props.withdraw.links.count}
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
  account: state.mypage.account,
  auth: state.auth,
  withdraw: state.mypage.withdraw
});

export default WithdrawDetail = connect(mapStateToProps, { deleteWithdraw })(
  WithdrawDetail
);
