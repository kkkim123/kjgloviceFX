import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import store from "../../../store";
import { partAccount, changePartAcc } from "../../../actions/mypage";

class partners extends Component {
  state = {
    isLoad: false
  }

    componentDidMount() {
        if (this.props.data) {
          store.dispatch(partAccount(this.props.data.ib_code))
        }
    }

    componentDidUpdate() {
      if (this.props.data && !this.state.isLoad) {
        store.dispatch(partAccount(this.props.data.ib_code))
        this.setState({
          isLoad: true
        })
      }
    }

    handleClick = (data) => {
      this.props.changePartAcc(data)
    }
    

  render() {
    // console.log(this.props.partAcc)
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
          <h3>Partners Account
          <span style={{fontSize: '1.2rem', fontWeight: '300'}}> Clcik Partners Account Number!</span>
          </h3>
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
        {this.props.partAcc && this.props.partAcc.length > 0 ?
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
                <div className="ml-2" style={{ width: "25%", cursor: "pointer" }} onClick={()=>this.handleClick(partner[2][1])}>
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
                    {Moment(partner[7][1]).format("YYYY-MM-DD HH:mm")}
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

export default connect(mapStateToProps, {changePartAcc})(partners);
