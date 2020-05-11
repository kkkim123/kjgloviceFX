import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from 'classnames/bind';
import styles from "../../styles/trade/trade.module.css";
const cx = classNames.bind(styles);

const TradingMain = (props) => {
	const [deviceType,setDeviceType] = useState(props.web_titleImg);
  
  useEffect(() => {
    if(window.innerWidth > 425){
      setDeviceType(props.web_titleImg);
    } else{
      setDeviceType(props.phone_titleImg);
    }
    window.addEventListener('resize', () => {
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



	const { user } = props.auth;
	let link = user ? "/mypage" : "/login"

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
			<div style={{color:"#fff", fontSize:"1.75rem",fontWeight:"bold"}}>
      <h2 className="mt-5">MetaTrader4</h2>
        <h2 className="mb-3">trading platform</h2>
      </div>
			<div style={{color:"#ccc"}}>
      <p>
        MetaTrader4 has established itself as the industry standard.
        Combining an intuitive user interface with a customisable feature-rich
        environment, the MT4 trading platform provides everything a trader needs to chart
        assets, place orders and manage positions.</p>
      </div>  
			  {props.btn &&
        <Link
        to={link}
        className="rounded-pill px-5 py-3"
        style={{
          color: "#ffffff",
          backgroundColor: "#006536",
          textDecoration: "none",
          display:"inline-block"
          }}
        >
        <strong>Start Trading Now</strong>
        </Link>

			  }

		  </div>
		</div>
	  </div>
	</div>
  );
  
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TradingMain);






// const GlobalMainBanner = (props) => {

//   const [deviceType,setDeviceType] = useState(props.web_titleImg);
  
//   useEffect(() => {
// 	if(window.innerWidth > 425){
// 	  setDeviceType(props.web_titleImg);
// 	} else{
// 	  setDeviceType(props.phone_titleImg);
// 	}
// 	window.addEventListener('resize', ()=>{
// 	  if(window.innerWidth > 425){
// 		if(deviceType !== props.web_titleImg){
// 		  setDeviceType(props.web_titleImg);
// 		}
// 	  } else{
// 		if(deviceType !== props.web_titleImg){
// 		  setDeviceType(props.phone_titleImg);
// 		}
// 	  }
// 	});
//   });

//   return (
// 	<div className="bgImg" style={{padding:"55px 0px 0px 0px"}}>
// 	  <div
// 		style={{
// 		  position:"relative"
// 		}}
// 	  >
// 		<img src={deviceType} 
// 		  style={{
// 			left: "0",
// 			width: "100%"
// 			}}
// 		/>
// 		<div
// 		  className="text-left"
// 		  style={{ width: "90%", color: "#ffffff", position:"absolute" ,bottom: "0", margin: "5%"}}
// 		>
// 		  <div className="w-100">
// 			<div style={{color:"#000", fontSize:"1.75rem",fontWeight:"bold"}}>
//       <h2 className="mt-5">MetaTrader4</h2>
//         <h2 className="mb-5">trading platform</h2>
//       </div>
// 			<div style={{color:"#000"}}>
//       <p>
//         MetaTrader4 has established itself as the industry standard.
//         Combining an
//       </p>
//       <p>
//         intuitive user interface with a customisable feature-rich
//         environment, the
//       </p>
//       <p>
//         MT4 trading platform provides everything a trader needs to chart
//       </p>
//       <p>assets, place orders and manage positions.</p>
//       </div>  
// 			  {props.btn &&
// 			  <Link to={link}>
//         <button className="btn btn-lg btn-primary mt-10" type="button">
//         Start Trading Now
//         </button>
//         </Link>
// 			  }

// 		  </div>
// 		</div>
// 	  </div>
// 	</div>
//   );
// };

// export default GlobalMainBanner;
