import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GlobalMainBanner = (props) => {
  // console.log(props);

  const [deviceType,setDeviceType] = useState(props.web_titleImg);
  // componentWillMount(){
  //   this.setState({width: window.innerwidth+ 'px'});
  // }
  useEffect(() => {
    if(window.innerWidth > 425){
      setDeviceType(props.web_titleImg);
    } else{
      setDeviceType(props.phone_titleImg);
    }
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 425){
        if(deviceType !== props.web_titleImg){
          setDeviceType(props.web_titleImg);
        }
      } else{
        if(deviceType !== props.phone_titleImg){
          setDeviceType(props.phone_titleImg);
        }
      }
    });
  });

  return (
    <div className="bgImg" style={{padding:"55px 0px 0px 0px"}}>
      <div
        style={{
          position:"relative",
          maxWidth:"1400px",
          margin:"auto"
        }}
      >
        <img src={deviceType} 
          style={{
            left: "0",
            width: "100%"
            }}
        />
        <div
          className="text-left"
          style={{ width: "90%", color: "#ffffff", position:"absolute" ,bottom: "0", margin: "5%"}}
        >
          <div className="w-100">
            <div dangerouslySetInnerHTML={{ __html: props.title }} style={{color:"#000", fontSize:"1.75rem",fontWeight:"bold"}}></div>
            <div dangerouslySetInnerHTML={{ __html: props.Desc }} style={{color:"#000"}}></div>  
              {props.btn &&
              <Link
                to="/trading"
                className="rounded-pill px-5 py-3 mt-2"
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
