import React, { Component } from "react";
import MpHeader from "./mpHeader";
import Steps from "./components/steps";
import NoticeBox from "./components/noticeBox";
import UserInfo from "./components/userInfo";
import InBox from "./components/inBox";
import Profit from "./components/profit";
import Overview from "./components/overview";
import Account from "./components/account";
import TradingHistory from "./components/tradingHistory";
import Partners from "./components/partners";
import MyProfile from "./components/myProfile";
import IBInfo from "./components/IBInfo";
import PartAccount from "./components/partnersAccount";
import AllCommissionHistory from "./components/allCommissionHistory";
import CommissionHistory from "./components/commissionHistory";
import { connect } from "react-redux";

class MyPage extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <section className="container">
        {/* <MpHeader /> */}
        <Steps />
        <NoticeBox
          title="Welcome to gloviceFX"
          subtitle=" - your personal client area"
          content1="Your gloviceFX User ID: "
          id={user ? user.email : "Loading..."}
          content2="We have sent your login information to your email."
        />
        <NoticeBox
          title="Success!"
          subtitle=""
          content1="There’s never been a better time to trade with gloviceFX!"
          id=""
          content2=" Get 30% back on every deposit you make for 30days all the way up to The Big $5000! T&Cs apply"
        />
        {user && user.user_status >= 9 && 
          <NoticeBox
            title="Start Trading!"
            subtitle=""
            content1="You've come to the last level before you make a deal at gloviceFX!"
            id=""
            content2=" Please deposit the money to KJ address and finish it!"
          />
        }
        {/* <div className="d-flex justify-content-between my-5"> */}
          <UserInfo data={user} />
          {/* <InBox /> */}
        {/* </div> */}
        <Account />
        <div className="d-flex justify-content-between my-5">
          <Profit />
          <Overview />
        </div>
        <TradingHistory/>
        {user && user.user_type === "I" && 
          <>
            <IBInfo data={this.props.ib} />
            <Partners data={this.props.ib} />
            <PartAccount data={this.props.ib} />
            <AllCommissionHistory data={this.props.ib} />
            <CommissionHistory data={this.props.ib} />
          </>
        }
        {/* <MyProfile /> */}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  ib: state.mypage.ib
});

export default connect(mapStateToProps)(MyPage);
