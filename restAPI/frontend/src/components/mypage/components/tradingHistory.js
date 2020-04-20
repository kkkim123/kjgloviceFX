import React, { Component } from "react";
import { connect } from "react-redux";
import { getTrading, getAccount } from "../../../actions/mypage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";
import Pagination from "react-js-pagination";
// import "bootstrap/less/bootstrap.less";

class tradingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //시작일
      from_date: Moment(new Date()).subtract(7, "days").toDate(),
      //종료일
      to_date: new Date(),
      //현재페이지
      activePage: 1,
      //전체 Trading History 수
      totalCnt: 1,
      //초기 전체페이지 수 설정 후 렌더링 방지
      isCnt: true,
      //Trading History 대상 계좌
      acc: "",
    };
  }

  componentDidMount() {
    this.props.getTrading({
      to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
      from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
      page: this.state.activePage,
      acc: this.state.acc
    });
  }

  handleFromChange = date => {
    this.setState(
      {
        from_date: date,
        isCnt: true,
        totalCnt: 1
      },
      () => {
        this.props.getTrading({
          to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
          from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
          page: this.state.activePage,
          acc: this.state.acc
        });
      }
    );
  };

  handleToChange = date => {
    this.setState(
      {
        to_date: date,
        isCnt: true,
        totalCnt: 1
      },
      () => {
        this.props.getTrading({
          to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
          from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
          page: this.state.activePage,
          acc: this.state.acc
        });
      }
    );
  };

  handlePageChange = pageNumber => {
    this.setState(
      {
        activePage: pageNumber,
        isCnt: true
      },
      () => {
        this.props.getTrading({
          to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
          from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
          page: this.state.activePage,
          acc: this.state.acc
        });
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.isCnt && this.props.history && this.props.account) ||
      (prevProps.history &&
        this.props.history &&
        prevProps.history[prevProps.history.length - 1] !==
          this.props.history[this.props.history.length - 1])
    ) {
      this.setState(
        {
          totalCnt: this.props.history[this.props.history.length - 1],
          isCnt: false,
          acc: this.props.account[0].mt4_account
        },
        () => {
          this.props.getTrading({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            page: this.state.activePage,
            acc: this.state.acc
          });
        }
      );
    }
    if(this.props.accNum && (prevProps.accNum !== this.props.accNum)) {
      this.setState({
        acc: this.props.accNum
      },
      () => {
        this.props.getTrading({
          to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
          from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
          page: this.state.activePage,
          acc: this.state.acc
        });
      })
    }
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
          <h3>Trading History</h3>
          <DatePicker
            selected={this.state.from_date}
            onChange={this.handleFromChange}
          />
          ~
          <DatePicker
            selected={this.state.to_date}
            onChange={this.handleToChange}
          />
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
            <span>CMD</span>
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
          this.props.history.slice(0, -1).map((historyRow, j) => {
            let data = [];
            let CMD = "";
            data.account = historyRow[0][1];
            data.symbol = historyRow[1][1];
            data.cmd = historyRow[2][1];
            data.volume = historyRow[3][1];
            data.open_time = Moment(historyRow[4][1]).format("MM/DD/YY HH:mm");
            data.open_price = historyRow[5][1];
            data.close_time = Moment(historyRow[8][1]).format("MM/DD/YY HH:mm");
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
          })}
        <div className="text-center">
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
  auth: state.auth,
  history: state.mypage.history,
  account: state.mypage.account,
  accNum: state.mypage.accNum
});

export default connect(mapStateToProps, { getTrading, getAccount })(
  tradingHistory
);
