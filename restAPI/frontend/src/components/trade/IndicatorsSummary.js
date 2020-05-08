import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/trade/indicators.module.css";
import up from "../../images/icon_green.png";
import down from "../../images/icon_red.png";
const cx = classNames.bind(styles);

class IndicatorsSummary extends Component {
  render() {
    return (
      <div className={cx("container", "text-center", "main")}>
        <div className="row justify-content-center">
          <div className="col my-5">
            <h2 className="mt-5">Economic Indicators</h2>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-6 col-xs-12 mb-3 p-4 text-center">
            <div className={cx("card", "p-5")}>
              <div className={cx("title", "text-center", "mb-4")}>
                <div className={cx("icon")}>
                  <img src={up} alt="about"></img>
                  <span>50.4</span>
                </div>
              </div>
              <div className="text-left">
                <p>IHS Markit and JPMorgan Chase’s snapshot of the </p>
                <p>health of manufacturing around the world, based </p>
                <p>on surveys of multiple purchasing managers on </p>
                <p>their activity. A number above 50 signals </p>
                <p>expansion. </p>
                <br />
                <p>Updatees monthly: Last Feb 4, 2020</p>
              </div>
              <div className="form-signin">
                <button
                  className="btn btn-lg btn-primary content-center  mt-5"
                  type="button"
                >
                  History
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xs-12 mb-3 p-4 text-center">
            <div className={cx("card", "p-5")}>
              <div className={cx("title", "text-center", "mb-4")}>
                <div className={cx("icon")}>
                  <img src={down} alt="about"></img>
                  <span>+145K</span>
                </div>
              </div>
              <div className="text-left">
                <p>A measure of how tight the labor marke </p>
                <p>t is running in the world’s biggest econ-</p>
                <p>omy.</p>
                <br />
                <br />
                <br />
                <p>Udates Montly: Last Jan 10, 2020</p>
              </div>
              <div className="form-signin">
                <button
                  className="btn btn-lg btn-primary content-center  mt-5"
                  type="button"
                >
                  History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndicatorsSummary;
