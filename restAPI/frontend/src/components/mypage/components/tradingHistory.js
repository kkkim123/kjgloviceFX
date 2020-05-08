import React, { Component } from "react";
import { connect } from "react-redux";
import { getTrading } from "../../../actions/mypage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";
import Pagination from "react-js-pagination";
import { Field, reduxForm } from "redux-form";
import "../../../styles/auth/form.css";
import store from "../../../store";

class tradingHistory extends Component {
  state = {
    //시작일
    from_date: Moment(new Date())
      .subtract(7, "days")
      .toDate(),
    //종료일
    to_date: new Date(),
    //현재페이지
    activePage: 1,
    //전체 Trading History 수
    totalCnt: 1,
    //초기 전체페이지 수 설정 후 렌더링 방지
    isCnt: true,
    //초기 거래내역 렌더링
    isLoad: false,
    //Trading History 대상 계좌
    acc: "",
    //Symbol Search
    symbol: "",
    //Type(CMD) Search
    type: ""
  };

  // 계좌가 변경될때
  componentDidUpdate(prevProps, prevState) {
    // 처음 시작 시 계좌리스트의 제일 첫번째 계좌로 거래 내역 조회 -> this.props.history 생성시킴
    if (this.props.account && !this.state.isLoad) {
      this.setState(
        {
          acc: this.props.account[0].mt4_account,
          isLoad: true
        },
        () => {
          store.dispatch(
            getTrading({
              to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
              from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
              page: this.state.activePage,
              acc: this.state.acc,
              symbol: this.state.symbol,
              type: this.state.type
            })
          );
        }
      );
    }

    // 생성된 history로 전체 페이지 카운팅
    if (this.props.history && this.state.isCnt) {
      this.setState({
        totalCnt: this.props.history[this.props.history.length - 1],
        isCnt: false
      });
    }

    // 계좌를 클릭하였을 때
    if (prevProps.accNum !== this.props.accNum) {
      this.setState(
        {
          acc: this.props.accNum
        },
        () => {
          store.dispatch(
            getTrading({
              to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
              from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
              page: this.state.activePage,
              acc: this.state.acc,
              symbol: this.state.symbol,
              type: this.state.type
            })
          );
        }
      );
    }
  }

  renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
    return (
      <span className="form-span">
        <input {...input} type={type} placeholder={placeholder} />
        {touched && error && <span className="">{error}</span>}
      </span>
    );
  };

  // 날짜가 변경될때
  handleFromChange = date => {
    this.setState(
      {
        from_date: date,
        isCnt: true,
        totalCnt: 1
      },
      () => {
        store.dispatch(
          getTrading({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            page: this.state.activePage,
            acc: this.state.acc,
            symbol: this.state.symbol,
            type: this.state.type
          })
        );
      }
    );
  };

  // 날짜가 변경될때
  handleToChange = date => {
    this.setState(
      {
        to_date: date,
        isCnt: true,
        totalCnt: 1
      },
      () => {
        store.dispatch(
          getTrading({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            page: this.state.activePage,
            acc: this.state.acc,
            symbol: this.state.symbol,
            type: this.state.type
          })
        );
      }
    );
  };

  // 페이지가 변경될때
  handlePageChange = pageNumber => {
    this.setState(
      {
        activePage: pageNumber,
        isCnt: true
      },
      () => {
        store.dispatch(
          getTrading({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            page: this.state.activePage,
            acc: this.state.acc,
            symbol: this.state.symbol,
            type: this.state.type
          })
        );
      }
    );
  };

  // 필터가 변경될때
  onSubmit = formValues => {
    this.setState(
      {
        symbol: formValues.symbol,
        type: formValues.type
      },
      () => {
        store.dispatch(
          getTrading({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            page: this.state.activePage,
            acc: this.state.acc,
            symbol: this.state.symbol,
            type: this.state.type
          })
        );
      }
    );
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
          <h3>Trading History</h3>
          <div className="d-flex justify-content-between my-5">
            <div className="form-span date-input">
              <DatePicker
                selected={this.state.from_date}
                onChange={this.handleFromChange}
                dateFormat="yyyy-MM-dd"
              />
              <label>-</label>
              <DatePicker
                selected={this.state.to_date}
                onChange={this.handleToChange}
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                  name="symbol"
                  type="text"
                  component={this.renderField}
                  placeholder="Symbol"
                />
                <Field
                  name="type"
                  type="text"
                  component={this.renderField}
                  placeholder="Type"
                />
                <button
                  type="submit"
                  className="px-3 rounded-pill"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#006536",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                >
                  Search
                </button>
              </form>
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
            <span>Account</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>Symbol</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>Type</span>
          </div>
          <div className="ml-2" style={{ width: "5%" }}>
            <span>Volume</span>
          </div>
          <div className="ml-2" style={{ width: "12%" }}>
            <span>Open Time</span>
          </div>
          <div className="ml-2" style={{ width: "12%" }}>
            <span>Open Price</span>
          </div>
          <div className="ml-2" style={{ width: "12%" }}>
            <span>Close Time</span>
          </div>
          <div className="ml-2" style={{ width: "12%" }}>
            <span>Close Price</span>
          </div>
          <div className="ml-2" style={{ width: "12%" }}>
            <span>Profit</span>
          </div>
        </div>

        {!this.state.isCnt &&
        this.props.history &&
        this.props.history[0] !== 0 ? (
          this.props.history.slice(0, -1).map((historyRow, j) => {
            let data = [];
            let CMD = "";
            data.account = historyRow[0][1];
            data.symbol = historyRow[1][1];
            data.cmd = historyRow[2][1];
            data.volume = historyRow[3][1];
            data.open_time = Moment(historyRow[4][1]).format(
              "YYYY-MM-DD HH:mm"
            );
            data.open_price = historyRow[5][1];
            data.close_time = Moment(historyRow[8][1]).format(
              "YYYY-MM-DD HH:mm"
            );
            data.close_price = historyRow[9][1];
            data.profit = historyRow[10][1];

            switch (data.cmd) {
              case 0:
                CMD = "BUY";
                break;
              case 1:
                CMD = "SELL";
                break;
              case 2:
                CMD = "BUY LIMIT";
                break;
              case 3:
                CMD = "SELL LIMIT";
                break;
              case 4:
                CMD = "BUY STOP";
                break;
              case 5:
                CMD = "SELL STOP";
                break;
              case 6:
                CMD = "BALANCE";
                break;
              case 7:
                CMD = "CREDIT";
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
                key={j}
              >
                <div className="ml-2" style={{ width: "15%" }}>
                  <span>{data.account}</span>
                </div>
                <div className="ml-2" style={{ width: "10%" }}>
                  <span>{data.symbol}</span>
                </div>
                <div className="ml-2" style={{ width: "10%" }}>
                  <span>{CMD}</span>
                </div>
                <div className="ml-2" style={{ width: "5%" }}>
                  <span>{data.volume}</span>
                </div>
                <div className="ml-2" style={{ width: "12%" }}>
                  <span>{data.open_time}</span>
                </div>
                <div className="ml-2" style={{ width: "12%" }}>
                  <span>{data.open_price}</span>
                </div>
                <div className="ml-2" style={{ width: "12%" }}>
                  <span>{data.close_time}</span>
                </div>
                <div className="ml-2" style={{ width: "12%" }}>
                  <span>{data.close_price}</span>
                </div>
                <div className="ml-2" style={{ width: "12%" }}>
                  <span>{data.profit}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Trading History</div>
        )}
        {this.props.history ? (
          <div className="row justify-content-center">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={this.state.totalCnt}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.mypage.history,
  account: state.mypage.account,
  accNum: state.mypage.accNum
});

tradingHistory = connect(mapStateToProps, { getTrading })(tradingHistory);

export default reduxForm({
  form: "tradingHistory"
})(tradingHistory);
