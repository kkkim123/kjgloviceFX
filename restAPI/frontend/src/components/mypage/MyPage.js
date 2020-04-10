import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
// import store from "../store";
// import { loadOption } from "../actions/auth";

class MyPage extends Component {
  componentDidMount() {
    // store.dispatch(loadOption());
  }
  
  render() {
    // {user && user.user_status !== null && user.user_status < 4 ? (
    //     <Link to="/register/address">My Page</Link>
    //   ) : (
    //     <Link to="/mypage">My page</Link>
    //   )}

    console.log('User 정보')
    console.log(this.props.user);
    console.log('-------------------------------')
    console.log('파트너 정보')
    console.log('')
    console.log('-------------------------------')
  

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
              MyPage 입니다.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token
});

export default connect(mapStateToProps, { loadUser })(MyPage);
// export default MyPage;
