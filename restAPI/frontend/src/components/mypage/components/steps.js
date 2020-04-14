import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const emptyCircle = {
  backgroundColor: "#ffffff",
  color: "#006536",
  border: "2px solid #006536",
  width: "170px",
  height: "170px"
};

const fullCircle = 
  "background-color: #006536;color: #ffffff;border: 2px solid #006536;width: 170px;height: 170px;"
;

const linkHover = {
  cursor: "default"
};

const Steps = user => {
  const [profile] = useState({
    backgroundColor: "#ffffff",color: "#006536",border: "2px solid #006536", width: "170px",height: "170px"
  });
  const [kyc] = useState({
    backgroundColor: "#ffffff",color: "#006536",border: "2px solid #006536", width: "170px",height: "170px"
  });
  const [account] = useState({
    backgroundColor: "#ffffff",color: "#006536",border: "2px solid #006536", width: "170px",height: "170px"
  });
  const [trading] = useState({
    backgroundColor: "#ffffff",color: "#006536",border: "2px solid #006536", width: "170px",height: "170px"
  });


  useEffect(() => {
    switch (Number(user.status)) {
      case 1:
      case 2:
      case 3:
        break;
      case 4:
      case 5:
        document.getElementsByClassName('profile')[0].style = fullCircle
        break;
      case 6:
      case 7:
          document.getElementsByClassName('profile')[0].style = fullCircle
          document.getElementsByClassName('kyc')[0].style = fullCircle
        break;
      case 8:
      case 9:
          document.getElementsByClassName('profile')[0].style = fullCircle
          document.getElementsByClassName('kyc')[0].style = fullCircle
          document.getElementsByClassName('account')[0].style = fullCircle
        break;
        case 10:
            document.getElementsByClassName('profile')[0].style = fullCircle
            document.getElementsByClassName('kyc')[0].style = fullCircle
            document.getElementsByClassName('account')[0].style = fullCircle
            document.getElementsByClassName('trading')[0].style = fullCircle
            break;
      default:
        break;
    }
  });

  return (
    <div className="container my-5 py-5">
      <div className="shadow px-5 py-5" style={{ borderRadius: "20px" }}>
        <h2 className="mb-4">
          <strong>Start Trading in 4 Steps</strong>
        </h2>
        <div className="d-flex justify-content-center align-items-center py-5">
          <Link id="profile" style={linkHover}>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle profile"
              style={emptyCircle}
            >
              <span className="" style={{ fontSize: "1.2rem" }}>
                <strong>
                  Complete<br></br>Profile
                </strong>
              </span>
            </div>
          </Link>
          <div
            className="h-50"
            style={{ borderBottom: "2px solid #006536", width: "80px" }}
          ></div>
          <Link id="kyc" style={linkHover}>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle kyc"
              style={emptyCircle}
            >
              <span className="" style={{ fontSize: "1.2rem" }}>
                <strong>
                  Complete<br></br>KYC
                </strong>
              </span>
            </div>
          </Link>
          <div
            className="h-50"
            style={{ borderBottom: "2px solid #006536", width: "80px" }}
          ></div>
          <Link id="account" style={linkHover}>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle account"
              style={emptyCircle}
            >
              <span className="" style={{ fontSize: "1.2rem" }}>
                <strong>Open Account</strong>
              </span>
            </div>
          </Link>
          <div
            className="h-50"
            style={{ borderBottom: "2px solid #006536", width: "80px" }}
          ></div>
          <Link id="trading" style={linkHover}>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle trading"
              style={emptyCircle}
            >
              <span className="" style={{ fontSize: "1.2rem" }}>
                <strong>Start Trading</strong>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Steps;
