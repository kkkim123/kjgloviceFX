import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return <div>Loading...</div>;
      } else if (!auth.isAuthenticated) {
        return <Redirect to='/login' />;
      } else {
        // return <Component {...props} />;
        console.log(props);
        return <div>{props.email}로 인증 메일을 전송하였습니다.</div>
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
