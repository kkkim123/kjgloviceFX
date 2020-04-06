import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/trade/download.module.css";
import download_google from "../../images/download_google.png";
import download_apple from "../../images/download_apple.png";
const cx = classNames.bind(styles);

class DownloadMT4 extends Component {
  render() {
    return (
      <div className={cx("container-fluid", "text-center", "main")}>
        <div className="row justify-content-center">
          <div className="col my-5">
            <div className="p-0">
              <div className="row">
                <div
                  className={cx(
                    "col",
                    "d-none",
                    "d-lg-block",
                    "bg-phone-image"
                  )}
                ></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-left">
                      <h1 className="h4 text-gray-900 mb-4">GloviceFX MT4</h1>
                      <p className="">
                        World most popular trading tool for trading CFDs.
                      </p>
                      <p>Try and make your own automated Trading bot!</p>
                      <div className="form-signin">
                      <button
                        type="button"
                        className="btn btn-secondary mx-5 btn-lg"
                        >
                         Download MT4 for Windows
                        </button>
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
                    <div className={cx("form-signin","text-left", "ml-3rem")}>
                        <button
                        type="button"
                        className="btn btn-secondary mx-5 btn-lg btn-google"
                        >
                            <img className={cx("img-resize")} src={download_google} alt="google" />
                        </button>
                        <button type="submit" className="btn btn-primary btn-lg btn-apple">
                            <img className={cx("img-resize")} src={download_apple} alt="apple" />
                        </button>
                  </div>                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DownloadMT4;
