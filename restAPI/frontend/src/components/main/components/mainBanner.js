import React from "react";
// import mainBanner from "../../../images/main/glovicefx_main_mobile.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MainBanner = (props) => {
  const { user } = props.auth;
  let link = user ? "/mypage" : "/login"  
  return (
    <div className="bgImg">
      <div
        style={{
          backgroundImage: `url(${props.mainBanner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "250px 0"
        }}
      >
        <div
          className="container text-left mb-5"
          style={{ width: "90%", color: "#ffffff" }}
        >
          <div className="w-100 px-5">
            <div className="mb-4">
              <h3>
                <strong>Surplus and stable</strong>
              </h3>
              <h3>
                <strong>liquidity from top tier </strong>
              </h3>
              <h3>
                <strong>banks around the world</strong>
              </h3>
            </div>
            <br></br>
            <br></br>
            <Link
              to={link}
              className="rounded-pill px-5 py-3 my-5"
              style={{
                color: "#ffffff",
                backgroundColor: "#006536",
                textDecoration: "none"
              }}
            >
              <strong>Start Trading</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MainBanner);