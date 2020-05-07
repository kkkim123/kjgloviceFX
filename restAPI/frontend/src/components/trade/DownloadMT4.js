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
      <section className="container">
        <div className={cx("text-center", "main", "my-5")}>


        <div className="d-flex row my-5">
          <div className="col-md-7 ml-auto">
            <img src={phone} style={{ width: "100%", maxWidth: "450px"}}/>
          </div>
          <div className="col-md-5 ml-auto">
            <div className="p-5">
              <div className="text-left">
                <h1 className="h4 text-gray-900 mb-4">GloviceFX MT4</h1>
                <p className="">
                  World most popular trading tool for trading CFDs.
                </p>
                <p>Try and make your own automated Trading bot!</p>
                <div className="form-signin">
                  <a href="https://download.mql5.com/cdn/web/fbp.limited/mt4/fbplimited4setup.exe">
                    <button
                      type="button"
                      className="btn btn-secondary mx-5 btn-lg"
                      >
                      Download MT4 for Windows
                    </button>
                  </a>
                </div>    
              </div>
            </div>
            <div className="p-5">
              <div className="text-left">
                <h1 className="h4 text-gray-900 mb-4">
                  Available on Mobile
                </h1>
                <p className="">
                  Monitor the markets on the go with our mobile
                  application and
                </p>
                <p>
                  benefit from ultra-low latency trading infrastructure,
                </p>
                <p>
                  award-winning order execution and deep liquidity.
                  Available for
                </p>
                <p>iOS and Android devices.</p>
              </div>
              {/* <div className={cx("form-signin", "justify-content-center", "d-flex")}> */}
              <div className="form-signin">
                  <button
                    type="button"
                    className="btn btn-google mx-5"
                  >
                    <img src={download_google} alt="google" />
                  </button>
                  <button type="button" className="btn btn-apple">
                      <img src={download_apple} alt="apple" />
                  </button>
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
