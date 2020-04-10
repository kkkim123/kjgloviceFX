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
        return <Redirect to='/trading' />;
        // return <Component {...props} />;
        // console.log('Component: ', Component)
        // console.log('auth: ', auth)
        // console.log('rest: ', rest)
        // console.log('props: ', props)
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
