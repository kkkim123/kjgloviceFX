import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class partners extends Component {
  state = {
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
    acc: 1,
    //Symbol Search
    symbol: "",
    //Type(CMD) Search
    type: "",
  };
  
    componentDidMount() {
        if (this.props.data) {
            this.props.partsCommision({
              to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
              from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
            });
        }
    }

    handleFromChange = date => {
      this.setState(
        {
          from_date: date,
        }
      )
          this.props.partsCommision({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
          });
    };
  
    handleToChange = date => {
      this.setState(
        {
          to_date: date,
        })
          this.props.partsCommision({
            to_date: Moment(this.state.to_date).format("YYYY-MM-DD"),
            from_date: Moment(this.state.from_date).format("YYYY-MM-DD"),
          });
    };

  render() {
    console.log(this.props.allHistory)
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
          <h3>Commission History - All</h3>
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
          <div className="ml-2" style={{ width: "20%" }}>
            <span>Full Name</span>
          </div>            
          <div className="ml-2" style={{ width: "20%" }}>
            <span>Resident Country</span>
          </div>
          <div className="ml-2" style={{ width: "10%" }}>
            <span>User Type</span>
          </div>
          <div className="ml-2" style={{ width: "30%" }}>
            <span>User Status</span>
          </div>
          <div className="ml-2" style={{ width: "20%" }}>
            <span>Created At</span>
          </div>
        </div>
        {this.props.partners ?
          this.props.partners.map((partner, i) => {
            let user_type = "";
            let user_status = "";

            switch (partner.user_type) {
              case "R":
                user_type = "Retail";
                break;
              case "I":
                user_type = "IB";
                break;
              default:
                break;
            }

            switch (Number(partner.user_status)) {
              case 1:
                user_status = "PENDING EMAIL ADDRESS";
                break;
              case 2:
                user_status = "CONFIRMED EMAIL ADDRESS";
                break;
              case 3:
                user_status = "PENDING PROFILE";
                break;
              case 4:
                user_status = "CONFIRMED PROFILE";
                break;
              case 5:
                user_status = "PENDING DOCUMENTS";
                break;
              case 6:
                user_status = "CONFIRMED DOCUMENTS";
                break;
              case 7:
                user_status = "PENDING OPEN ACCOUNT";
                break;
              case 8:
                user_status = "CONFIRMED OPEN ACCOUNT";
                break;
              case 9:
                user_status = "PENDING MAKE DEPOSIT";
                break;
              case 10:
                user_status = "CONFIRMED MAKE DEPOSIT";
                break;
              default:
                break;
            }
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
                  <span>{partner.last_name + " " + partner.first_name}</span>
                </div>                  
                <div className="ml-2" style={{ width: "20%" }}>
                  <span>{partner.resident_country}</span>
                </div>
                <div className="ml-2" style={{ width: "10%" }}>
                  <span>{user_type}</span>
                </div>
                <div className="ml-2" style={{ width: "30%" }}>
                  <span>{user_status}</span>
                </div>
                <div className="ml-2" style={{ width: "20%" }}>
                  <span>
                    {Moment(partner.created_at).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
              </div>
            );
          }) : <div>No All Commission History</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allHistory: state.mypage.allCommision
});

export default connect(mapStateToProps)(partners);
