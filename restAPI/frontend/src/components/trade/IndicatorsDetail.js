import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/trade/indicators.module.css";
const cx = classNames.bind(styles);

class IndicatorsDetail extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content text-center">
          <div className="col my-5">
            <div className={cx("title")}>
              <h2 className="my-5">Economic Indicators</h2>
            </div>
            <h1>Indicators AREA</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default IndicatorsDetail;
