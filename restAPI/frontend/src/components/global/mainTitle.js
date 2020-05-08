import React from "react";
import { Link } from "react-router-dom";

const GlobalMainBanner = (props) => {
  console.log(props);
  return (
    <div className="bgImg" style={{padding:"55px 0px 0px 0px"}}>
      <div
        style={{
          backgroundImage: `url(${props.titleImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundSize:"100%"
        }}
      >
        <div
          className="container text-left mb-5"
          style={{ width: "90%", color: "#ffffff", padding: "43% 0px 13%" }}
        >
          <div className="w-100">
          <div dangerouslySetInnerHTML={{ __html: props.title }} style={{color:"#000", fontSize:"1.75rem",fontWeight:"bold"}}></div>
          <div dangerouslySetInnerHTML={{ __html: props.Desc }} style={{color:"#000"}}></div>  
            {props.btn &&
            <Link
              to="/trading"
              className="rounded-pill px-5 py-3 mt-2 mb-5"
              style={{
                color: "#ffffff",
                backgroundColor: "#006536",
                textDecoration: "none",
                display:"inline-block"
                }}
            >
              <strong>Start Trading</strong>
            </Link>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMainBanner;
