import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/trade/info.module.css";
const cx = classNames.bind(styles);

class ServiceInfo extends Component {
  render() {
    return (
      <section className={cx("container", "text-center", "main")}>
        <div className="row my-5 justify-content-between">
          <div className="col-lg-6 col-xs-12 mb-3 p-4 text-center">
            <div className={cx("card", "p-5")}>
              <div className={cx("title", "text-center", "mb-4")}>
                COPY TRADING SERVICE
              </div>
              <div className="text-left">
                <p>Copy trading enables traders in the financial markets</p>
                <p>to automatically copy positions opened and managed </p>
                <p>by a selected investor, usually in the context of a</p>
                <p>social trading network.</p>
                <br />
                <p>Unlike mirror trading, a method that allows traders to</p>
                <p>copy specific strategies, copy trading links a portion</p>
                <p>of the copying trader's funds to the account of the</p>
                <p>copied investor. Any trading action made thenceforth</p>
                <p>by the copied investor, such as opening a position, as-</p>
                <p>signing Stop Loss and Take Profit orders, or closing a</p>
                <p>position, are also executed in the copying trader's ac-</p>
                <p>count according to the proportion between the</p>
                <p>copied investor's account and the copying trader's al-</p>
                <p>lotted copy trading funds.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xs-12 mb-3 p-4 text-center">
            <div className={cx("card", "p-5")}>
              <div className={cx("title", "text-center", "mb-4")}>
                PAMM SERVICE
              </div>
              <div className="text-left">
                <p>The PAMM Service is a software solution that makes</p>
                <p>possible to copy trade operations from Master ac-</p>
                <p>count to one or more Followers accounts and helps to</p>
                <p>automatize profit/loss distribution. Master operates</p>
                <p>his/her personal funds through a given PAMM Ac-</p>
                <p>count, and his/her trading strategy is replicated on</p>
                <p>the Followers' own funds. PAMM Account perfor-</p>
                <p>mance can be viewed and analyzed with the help of</p>
                <p>advanced analytics that provides information in digi-</p>
                <p>tal and graphic forms.</p>
                <br />
                <p>PAMM Service guarantees exact and instantaneous</p>
                <p>copying of trades on Follower’s funds.</p>
                <br />
                <p>PAMM Service is a cutting edge software solution that</p>
                <p>is intended to unite experienced traders (Masters) and</p>
                <p>people who are interested in financial markets (Fol-</p>
                <p>lowers) all over the world. As a result of that coopera-</p>
                <p>tion every participant gets benefits.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col">
              <div className={cx("title")}>
            <h4 className="mt-5">MAM/PAMM Features</h4>
            </div>
            <div className={cx("info", "my-5")}>
                <p>MAM manager to adjust trading parameter in real time</p>
                <p>Unlimited trading accounts and deposit amount</p>
                <p>Trades – Full, Mini & Micro Lot accounts for best allocation advantage</p>
                <p>Allocations to accounts at as little as 0.01 lots (1000 units)</p>
                <p>All normal order types accepted: Market, Stop, Limit</p>
                <p>All unique order types accepted: Trailing Stop, Close by and Close all</p>
                <p>Manage multiple master accounts having different strategies</p>
                <p>Allows Expert Advisor (EA) trading of managed accounts from client side</p>
                <p>Each Sub Account has an output to screen report</p>
                <p>Market watch window within MAM</p>
                <p>Live order management monitoring within MAM including P&L</p>
                <p>STP on master account for bulk order execution, with instant allocation to sub accounts</p>
                <p>Monitor commissions and performance in real time</p>
                <p>Manage Monthly, Quarterly and Annual client reports through the MetaTrader Manager</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ServiceInfo;
