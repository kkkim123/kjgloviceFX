import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/trade/download.module.css";
import download_google from "../../images/download_google.png";
import download_apple from "../../images/download_apple.png";
import phone from "../../images/trading_phone.png";
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles);

class DownloadMT4 extends Component {
  render() {
    return (
      <section className="">
        <div className={cx("text-center", "main", "my-5")}>


        <div className="d-flex row my-5" style={{
            maxWidth: "1400px",
            textAlign: "center",
            margin: "auto"
        }}>
          <div className="col-md-5 ml-auto">
            <img src={phone} style={{ width: "100%", maxWidth: "450px"}}/>
          </div>
          <div className="col-md-5 m-auto">
            <div className="p-3">
              <div className="">
                <h1 className="h4 text-gray-900 mb-4">GloviceFX MT4</h1>
                <p className="">
                  World most popular trading tool for trading CFDs.
                Try and make your own automated Trading bot!</p>
                <div className="form-signin">
                  <a href="https://download.mql5.com/cdn/web/fbp.limited/mt4/fbplimited4setup.exe">
                    <button
                      type="button"
                      style={{   fontSize: "17px"}}
                      className="btn btn-secondary mx-5 btn-lg"
                      >
                      Download MT4 for Windows
                    </button>
                  </a>
                </div>    
              </div>
            </div>
            <div className="p-3">
              <div className="">
                <h1 className="h4 text-gray-900 mb-4">
                  Available on Mobile
                </h1>
                <p className="">
                  Monitor the markets on the go with our mobile
                  application and
                  benefit from ultra-low latency trading infrastructure,
                  award-winning order execution and deep liquidity.
                  Available for
                  iOS and Android devices.</p>
              </div>
              {/* <div className={cx("form-signin", "justify-content-center", "d-flex")}> */}
              <div className="form-signin d-flex justify-content-center align-items-center">
                <a href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4&hl=en&referrer=ref_id%3d1154390138773894945%26utm_source%3dwww.metatrader4.com%26utm_campaign%3ddownload" target="_blank">
                  <button
                    type="button"
                    className="btn btn-google mw-300 mr-10" style={{ width: "150px", height:"50px", margin: "0.5rem" }}
                  >
                    <img src={download_google} alt="google" style={{ width: "100%" }}/>
                  </button>
                </a>
                <a href="https://apps.apple.com/us/app/metatrader-4/id496212596?utm_campaign=download&utm_source=www.metatrader4.com" target="_blank">
                  <button type="button" className="btn btn-apple mw-300 justify-content-center ml-10" style={{ width: "150px", height:"50px", margin: "0.5rem"}}>
                      <img src={download_apple} alt="apple" style={{ width: "100%" }}/>
                  </button>
                </a>
            </div>                 
            </div>
          </div>
        </div>
        </div>
      </section>
    );
  }
}

export default DownloadMT4;
