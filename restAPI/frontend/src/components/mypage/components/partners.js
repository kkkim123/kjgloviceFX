import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import store from "../../../store";
import { partLoad } from "../../../actions/mypage";

class partners extends Component {
  state = {
    isLoad: false
  }
    componentDidMount() {
        if (this.props.data) {
          store.dispatch(partLoad(this.props.data.ib_code))
        }
    }

    componentDidUpdate() {
      if (this.props.data && !this.state.isLoad) {
        store.dispatch(partLoad(this.props.data.ib_code))
        this.setState({
          isLoad: true
        })
      }
    }

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
          <h3>Partners List</h3>
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
          }) : <div>No Partners</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  partners: state.mypage.partner
});

export default connect(mapStateToProps)(partners);
