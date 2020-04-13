import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../../../store";
import { loadOption, addFile, getFile } from "../../../../actions/mypage";
import { Field, reduxForm, formValueSelector } from "redux-form";
import DropForm from './dropForm'
import EmployForm from "./employForm";
import FinancialForm from "./financialForm";

class MyPage extends Component {
  componentDidMount() {
    store.dispatch(loadOption());
  }

  shouldComponentUpdate(nextProps, nextState) {
   if(nextProps.user != this.props.user) {
      // store.dispatch(getFile());
   }
   return true;
  }
  

  render() {
    // {user && user.user_status !== null && user.user_status < 4 ? (
    //     <Link to="/register/address">My Page</Link>
    //   ) : (
    //     <Link to="/mypage">My page</Link>
    //   )}
    // console.log("-------------------------------");
    // console.log("User 정보");
    // console.log(this.props.user);
    // console.log("-------------------------------");
    // console.log("Option 정보");
    // console.log(this.props.option);
    // console.log("-------------------------------");
    // console.log('계좌 정보')
    // console.log('')
    // console.log('-------------------------------')
    // console.log('거래 정보')
    // console.log('')
    // console.log('-------------------------------')
    // console.log('문서 정보')
    // console.log('')
    // console.log('-------------------------------')
    // console.log('파트너 정보')
    // console.log('')
    // console.log('-------------------------------')

    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/login" />;
    // }
    return (
      /*
      user_status
      user id, first name, last name, phone. refcode-> id,추천일자, 생일
      account
      trading history
      partners

      계좌신청
      문서 업로드
      */
      <div className="container-fluid">
        <div className="row justify-content-center my-5">
          <div className="col-12 col-sm-6">
            MyPage - Detail 입니다.
            {/* Complete Profile */}
            <EmployForm/>
            <FinancialForm/>
            {/* Complete KYC(Document Upload) */}
            {/* <DropForm/> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

MyPage = connect(mapStateToProps, {loadOption})(MyPage);
  
export default reduxForm({
  form: "myPage"
})(MyPage);
