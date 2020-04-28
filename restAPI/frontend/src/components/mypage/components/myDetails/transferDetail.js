import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../../../store";
import { getTransfer, delTransfer } from "../../../../actions/mypage";
import Moment from "moment";
import Pagination from "react-js-pagination";

const buttonStyle = {
  color: "rgb(255, 255, 255)",
  backgroundColor: "rgb(0, 101, 54)",
  fontWeight: "bold",
  textDecoration: "none"
};

class TransferDetail extends Component {
  state = {
    isLoad: false,
    page: 1
  };

  componentDidMount() {
    store.dispatch(getTransfer(this.state.page));
  }
  
  componentDidUpdate() {
    if (!this.state.isLoad) {
      this.setState(
        {
          isLoad: true
        },
        () => {
          store.dispatch(getTransfer(this.state.page));
        }
      );
    }
  }

  handlePageChange = pageNumber => {
    this.setState(
      {
        page: pageNumber,
        isLoad: false
      },
      () => {
        store.dispatch(getTransfer(this.state.page));
      }
    );
  };

  render() {
    return (
      <section className="container">
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
            <h3>Transfer History</h3>
            <div className="text-right my-5">
              <Link
                to="/mypage/transfer"
                className="px-3 py-2 rounded-pill"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#006536",
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
              >
                Transfer
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
            <div className="ml-2" style={{ width: "20%" }}>
              <span>From Account</span>
            </div>
            <div className="ml-2" style={{ width: "20%" }}>
              <span>To Account</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Amount</span>
            </div>            
            <div className="ml-2" style={{ width: "15%" }}>
              <span>Status</span>
            </div>
            <div className="ml-2" style={{ width: "25%" }}>
              <span>Transfer At</span>
            </div>
            <div className="ml-2" style={{ width: "10%" }}>
              <span>Cancel</span>
            </div>
          </div>
          {this.props.transfer && this.props.transfer.results ? (
            this.props.transfer.results.map((data, i) => {
              let status = "";

              switch (data.status) {
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
                  <div className="ml-2 my-auto" style={{ width: "20%" }}>
                    {data.from_account}
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "20%" }}>
                    <span>{data.to_account}</span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>{data.amount}</span>
                  </div>                  
                  <div className="ml-2 my-auto" style={{ width: "15%" }}>
                    <span>{status}</span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "25%" }}>
                    <span>
                      {Moment(data.created_at).format("YYYY-MM-DD HH:mm")}
                    </span>
                  </div>
                  <div className="ml-2 my-auto" style={{ width: "10%" }}>
                    <span>
                      {data.status === "P" || data.status === "D" ? (
                        <button
                          type="button"
                          className="btn rounded-pill"
                          style={buttonStyle}
                          onClick={() => {window.confirm('정말 취소하시겠습니까?') ?
                            store.dispatch(delTransfer(data.id)).then(()=>{
                              this.setState({
                                isLoad: false
                              })
                              alert('취소되었습니다.')
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
            <div>No Transfer History</div>
          )}
          <div className="row justify-content-center">
            {this.props.transfer &&
              this.props.transfer.results &&
              this.props.transfer.links && (
                <div className="pagination">
                  <Pagination
                    activePage={this.props.transfer.links.cur_page}
                    itemsCountPerPage={10}
                    totalItemsCount={this.props.transfer.links.count}
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
  transfer: state.mypage.transfer,
  status: state.mypage.msg
});

export default TransferDetail = connect(mapStateToProps, { delTransfer })(
  TransferDetail
);
