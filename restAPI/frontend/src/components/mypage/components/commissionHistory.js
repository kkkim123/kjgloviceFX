import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-js-pagination";
import store from "../../../store";
import { partCommision } from "../../../actions/mypage";
import "../../../styles/auth/form.css";

class partners extends Component {
  state = {
    //시작일
    from_date: Moment(new Date())
      .subtract(7, "days")
      .toDate(),
    //종료일
    to_date: new Date(),
    //현재페이지
    activePage: 1,
    //전체 Commision History 수
    totalCnt: 1,
    //초기 전체페이지 수 설정 후 렌더링 방지
    isCnt: true,
    //초기 거래내역 렌더링
    isLoad: false,
    //Commision History 대상 계좌
    acc: 1
  };

  componentDidUpdate(prevProps, prevState) {
    // 처음 시작 시 계좌리스트의 제일 첫번째 파트너계좌로 거래 내역 조회 -> this.props.comHistory 생성시킴
    if (this.props.partAcc && !this.state.isLoad) {
      this.setState(
        {
          acc: this.props.partAcc[0][2][1],
          isLoad: true
        },
        () => {
          store.dispatch(
            partCommision({
              to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
              from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
              // page: this.state.activePage,
              acc: this.state.acc
            })
          );
        }
      );
    }

    // 계좌를 클릭하였을 때
    if (prevProps.partAccNum !== this.props.partAccNum) {
      this.setState(
        {
          acc: this.props.partAccNum
        },
        () => {
          store.dispatch(
            partCommision({
              to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
              from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
              page: this.state.activePage,
              acc: this.state.acc
            })
          );
        }
      );
    }
  }

  handleFromChange = date => {
    this.setState(
      {
        from_date: date,
        isCnt: true
        // totalCnt: 1
      },
      () => {
        store.dispatch(
          partCommision({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            // page: this.state.activePage,
            acc: this.state.acc
          })
        );
      }
    );
  };

  handleToChange = date => {
    this.setState(
      {
        from_date: date,
        isCnt: true
        // totalCnt: 1
      },
      () => {
        store.dispatch(
          partCommision({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            // page: this.state.activePage,
            acc: this.state.acc
          })
        );
      }
    );
  };

  // 페이지가 변경될때
  handlePageChange = pageNumber => {
    alert("준비 중입니다.");
    // this.setState(
    //   {
    //     activePage: pageNumber,
    //     isCnt: true
    //   },
    //   () => {
    //     store.dispatch(
    //       partCommision({
    //         to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
    //         from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
    //         page: this.state.activePage,
    //         acc: this.state.acc,
    //       })
    //     );
    //   }
    // );
  };

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
          <h3>{this.state.acc}'s Commission History</h3>
          <div className="d-flex justify-content-end my-5">
            <div className="form-span date-input">
              <DatePicker
                selected={this.state.from_date}
                onChange={this.handleFromChange}
              />
              <label>-</label>
              <DatePicker
                selected={this.state.to_date}
                onChange={this.handleToChange}
              />
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
          <div className="ml-2" style={{ width: "20%" }}>
            <span>MT4 Account</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>IB Code</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>IB Point</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>Commission</span>
          </div>
          <div className="ml-2" style={{ width: "15%" }}>
            <span>Order Symbol</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>Order Lots</span>
          </div>
          <div className="ml-2" style={{ width: "25%" }}>
            <span>Order At</span>
          </div>
        </div>
        {this.props.comHistory && this.props.comHistory.length > 0 ? (
          this.props.comHistory.map((history, i) => {
            return (
              <div
                className="d-flex justify-content-between"
                key={i}
                style={{
                  borderTop: "1px solid #000000",
                  color: "#929292",
                  fontSize: "1.0rem",
                  padding: "0.8rem"
                }}
              >
                <div className="ml-2" style={{ width: "20%" }}>
                  <span>{history[3][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "10%" }}>
                  <span>{history[1][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "10%" }}>
                  <span>{history[8][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "10%" }}>
                  <span>{history[7][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "15%" }}>
                  <span>{history[5][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "10%" }}>
                  <span>{history[6][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "25%" }}>
                  <span>
                    {Moment(history[4][1]).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Commission History</div>
        )}
        <div className="row justify-content-center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.totalCnt}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comHistory: state.mypage.commision,
  partAcc: state.mypage.partAcc,
  partAccNum: state.mypage.partAccNum
});

export default connect(mapStateToProps)(partners);
