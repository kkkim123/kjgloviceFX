import React, { Component } from "react";
import { connect } from "react-redux";
import { emailActive } from "../../actions/auth";

class EmailActive extends Component {

    render() {
    const uid = this.props.history.location.pathname.split("/")[4];
    const token = this.props.history.location.pathname.split("/")[5];
    this.props.emailActive(uid, token);
    this.props.history.push("/login");
    return <div>Loading...</div>;
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default EmailActive = connect(mapStateToProps, {
  emailActive
})(EmailActive);
