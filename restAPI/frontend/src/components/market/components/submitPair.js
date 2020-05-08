import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SubmitPair = (props) => {
    const { user } = props.auth;
    let link = user ? "/mypage" : "/login"
    return (
        <div className="my-5 py-5">
            <Link
                to={link}
                className="py-3 px-4 rounded-pill mr-5"
                style={{ color: "white", backgroundColor: "#006536", textDecoration:"none"}}>
                Start Trading Now
            </Link>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps)(SubmitPair);
