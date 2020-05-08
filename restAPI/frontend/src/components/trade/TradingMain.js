import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from 'classnames/bind';
import styles from "../../styles/trade/trade.module.css";
const cx = classNames.bind(styles);

class TradingMain extends Component {
  render() {
    const { user } = this.props.auth;
    let link = user ? "/mypage" : "/login"
    
    return (
      <div className={cx("bgImg", "text-center","main")}>
        <div className="row justify-content">
          <div className="col my-5">
            <div className={cx("trade-title")}>
              <h2 className="mt-5">MetaTrader4</h2>
              <h2 className="mb-5">trading platform</h2>
            </div>
            <p>
              MetaTrader4 has established itself as the industry standard.
              Combining an
            </p>
            <p>
              intuitive user interface with a customisable feature-rich
              environment, the
            </p>
            <p>
              MT4 trading platform provides everything a trader needs to chart
            </p>
            <p>assets, place orders and manage positions.</p>
            <div className="form-signin">
            <Link to={link}>
              <button className="btn btn-lg btn-primary mt-10" type="button">
                Start Trading Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TradingMain);
