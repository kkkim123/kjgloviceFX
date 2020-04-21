import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";

class partners extends Component {
    componentDidMount() {
        if (this.props.data) {
            this.props.partAccount(this.props.data.ib_code);
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
          <h3>Partners Account</h3>
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
          <div className="ml-2" style={{ width: "25%" }}>
            <span>MT4 Account</span>
          </div>            
          <div className="ml-2" style={{ width: "20%" }}>
            <span>IB Code</span>
          </div>
          <div className="ml-2" style={{ width: "30%" }}>
            <span>IB Point</span>
          </div>
          <div className="ml-2" style={{ width: "25%" }}>
            <span>Created At</span>
          </div>
        </div>
        {this.props.partAcc ?
          this.props.partAcc.map((partner, i) => {
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
                <div className="ml-2" style={{ width: "25%" }}>
                  <span>{partner[2][1]}</span>
                </div>                  
                <div className="ml-2" style={{ width: "20%" }}>
                  <span>{partner[4][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "30%" }}>
                  <span>{partner[5][1]}</span>
                </div>
                <div className="ml-2" style={{ width: "25%" }}>
                  <span>
                    {Moment(partner[8][1]).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
              </div>
            );
          }) : <div>No Partners Account</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  partAcc: state.mypage.partAcc
});

export default connect(mapStateToProps)(partners);
