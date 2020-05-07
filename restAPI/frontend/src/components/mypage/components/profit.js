import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../../store";
import { getProfit } from "../../../actions/mypage";
import { Bar } from "react-chartjs-2";

class Profit extends Component {
  state = {
    acc: "",
    isLoad: false,
    chartData: { datasets: [], labels: [] }
  };
  chartX = [];
  chartY_1 = [];
  chartY_2 = [];
  options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ]
    },
    maintainAspectRatio: false
  };

  componentDidUpdate(prevProps, prevState) {
    // 처음 시작 시 계좌리스트의 제일 첫번째 계좌로 차트 데이터 생성
    if (this.props.account && !this.state.isLoad) {
      this.setState(
        {
          acc: this.props.account[0].mt4_account,
          isLoad: true
        },
        () => {
          store.dispatch(getProfit(this.state.acc));
        }
      );
    }

    // 계좌를 클릭하였을 때
    if (prevProps.accNum !== this.props.accNum) {
      this.setState(
        {
          acc: this.props.accNum
        },
        () => {
          store.dispatch(getProfit(this.state.acc));
        }
      );
    }

    //차트 데이터 생성(변경) 시 X,Y 축 데이터 삽입
    if (prevProps.data !== this.props.data && this.state.isLoad) {
      this.chartX = [];
      this.chartY = [];
      this.props.data.map((data, i) => {
        // 일자
        this.chartX.push(data.date);
        // 일자 별 데이터
        this.chartY_1.push(data.profit);
        // 일자 별 합산 데이터
        this.chartY_2.push(data.cumsum);
      });
      this.setState({
        chartData: {
          labels: this.chartX,
          datasets: [
            {
              type: "bar",
              data: this.chartY_1,
              fill: false,
              backgroundColor: "#006536",
              hoverBackgroundColor: "#006536"
            },
            {
              type: "line",
              data: this.chartY_2,
              fill: false,
              borderColor: "#0E112C",
              backgroundColor: "#0E112C",
              hoverBackgroundColor: "#0E112C",
              hoverBorderColor: "#0E112C"
            }
          ]
        }
      });
    }
  }

  datasetKeyProvider() {
    return Math.random();
  }

  render() {
    return (
      <div
        className="shadow py-4 px-4 text-left mr-3"
        style={{
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          color: "#000000"
        }}
      >
        <h3 className="mb-5">Cumulative Profit</h3>
          <div className="chart-container" style={{position:"relative", margin:"auto", height:"57vh", width:"40vw"}}>
            <Bar
              datasetKeyProvider={this.datasetKeyProvider}
              data={this.state.chartData}
              options={this.options}
            />
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: state.mypage.account,
  accNum: state.mypage.accNum,
  data: state.mypage.data
});

export default connect(mapStateToProps, { getProfit })(Profit);
