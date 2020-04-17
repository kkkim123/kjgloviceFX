import React, { Component } from "react";
import { connect } from "react-redux";
import { getTrading } from "../../../actions/mypage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";
import Pagination from "react-js-pagination";
// import "bootstrap/less/bootstrap.less";

class tradingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from_date: Moment(new Date()).subtract(7, "days").toDate(),
            to_date: new Date(),
            activePage: 1,
            totalCnt: 1,
            isCnt: true
          };
    }

  componentDidMount() {
    this.props.getTrading({
      to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
      from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
      page: this.state.activePage
      // from_date: Moment(this.state.to_date).subtract(7,"days").format('YYYY-MM-DD')
    });
    // this.setState({ totalCnt: this.props.history.pop() });
  }

  handlePageChange(pageNumber) {
    // this.setState({ activePage: pageNumber });
    alert('준비 중 입니다.')
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.totalCnt === 1 && this.state.isCnt && this.props.history) {
      this.setState({ totalCnt: this.props.history.pop(), isCnt: false });
      console.log(1)
    }
    if(prevState.activePage !== this.state.activePage) {
        this.props.getTrading({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            page: this.state.activePage
        })
        // this.setState({totalCnt: this.props.history.pop(), isCnt: true})
        console.log(2)
      }
  }

  render() {
      console.log(this.props.history)
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
          <DatePicker selected={this.state.from_date} />
          ~
          <DatePicker selected={this.state.to_date} />
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
          <div className="ml-2" style={{ width: "*" }}>
            <span>Account</span>
          </div>
          <div className="ml-2" style={{ width: "*" }}>
            <span>Symbol</span>
          </div>
          <div className="ml-2" style={{ width: "*" }}>
            <span>CMD</span>
          </div>
          <div className="ml-2" style={{ width: "*" }}>
            <span>Volume</span>
          </div>
          <div className="ml-2" style={{ width: "*" }}>
            <span>Open Time</span>
          </div>
          <div className="ml-2" style={{ width: "*" }}>
            <span>Open Price</span>
          </div>
          <div className="ml-2" style={{ width: "*" }}>
            <span>Close Time</span>
          </div>
          <div className="ml-2" style={{ width: "*" }}>
            <span>Close Price</span>
          </div>
          <div className="ml-2" style={{ width: "*" }}>
            <span>Profit</span>
          </div>
        </div>
        {!this.state.isCnt && this.props.history &&
          this.props.history.map((rowData, i) => {
            let CMD = "";
            switch (Number(rowData[2][1])) {
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
                key={i}
              >
                <div className="ml-2" style={{ width: "*" }}>
                  <span>{rowData[0][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "*" }}>
                  <span>{rowData[1][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "*" }}>
                  <span>{CMD}</span>
                </div>
                <div className="ml-2" style={{ width: "*" }}>
                  <span>{rowData[3][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "*" }}>
                  <span>
                    {Moment(rowData[4][1]).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
                <div className="ml-2" style={{ width: "*" }}>
                  <span>{rowData[5][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "*" }}>
                  <span>
                    {Moment(rowData[8][1]).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
                <div className="ml-2" style={{ width: "*" }}>
                  <span>{rowData[9][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "*" }}>
                  <span>{rowData[10][1]}</span>
                </div>
              </div>
            );
          })}
        <div className="text-center">
            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={5}
                totalItemsCount={this.state.totalCnt}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  history: state.mypage.history
});

export default connect(mapStateToProps, { getTrading })(tradingHistory);
