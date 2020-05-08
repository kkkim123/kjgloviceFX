import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/trade/info.module.css";
import Explanbox from "../explanbox"
import ExplanNonbox from "../explannonbox";
const cx = classNames.bind(styles);

class ServiceInfo extends Component {
  render() {
    return (
      <section className={cx("container", "text-center", "main")}>
          <Explanbox  pageTitle={"COPY TRADING SERVICE"} pageDesc={"\
            <p>Copy trading enables traders in the financial markets\
            to automatically copy positions opened and managed \
            by a selected investor, usually in the context of a\
            social trading network.</p>\
            <p>Unlike mirror trading, a method that allows traders to\
            copy specific strategies, copy trading links a portion\
            of the copying trader's funds to the account of the\
            copied investor. Any trading action made thenceforth\
            by the copied investor, such as opening a position, as-\
            signing Stop Loss and Take Profit orders, or closing a\
            position, are also executed in the copying trader's ac-\
            count according to the proportion between the\
            copied investor's account and the copying trader's al-\
            lotted copy trading funds.</p>"} TitleColor={"#006536"} />

          <Explanbox  pageTitle={"PAMM SERVICE"} pageDesc={"\
            <p>The PAMM Service is a software solution that makes\
            possible to copy trade operations from Master ac-\
            count to one or more Followers accounts and helps to\
            automatize profit/loss distribution. Master operates\
            his/her personal funds through a given PAMM Ac-\
            count, and his/her trading strategy is replicated on\
            the Followers' own funds. PAMM Account perfor-\
            mance can be viewed and analyzed with the help of\
            advanced analytics that provides information in digi-\
            tal and graphic forms.</p>\
            <p>PAMM Service guarantees exact and instantaneous\
            copying of trades on Follower’s funds.</p>\
            <p>PAMM Service is a cutting edge software solution that\
            is intended to unite experienced traders (Masters) and\
            people who are interested in financial markets (Fol-\
            lowers) all over the world. As a result of that coopera-\
            tion every participant gets benefits.</p>"} TitleColor={"#006536"} />
            
          <ExplanNonbox pageTitle={"MAM/PAMM Features"} TitleColor={"#006536"} pageDesc={"\
            MAM manager to adjust trading parameter in real time<br>\
            Unlimited trading accounts and deposit amount<br>\
            Trades – Full, Mini & Micro Lot accounts for best allocation advantage<br>\
            Allocations to accounts at as little as 0.01 lots (1000 units)<br>\
            All normal order types accepted: Market, Stop, Limit<br>\
            All unique order types accepted: Trailing Stop, Close by and Close all<br>\
            Manage multiple master accounts having different strategies<br>\
            Allows Expert Advisor (EA) trading of managed accounts from client side<br>\
            Each Sub Account has an output to screen report<br>\
            Market watch window within MAM<br>\
            Live order management monitoring within MAM including P&L<br>\
            STP on master account for bulk order execution, with instant allocation to sub accounts<br>\
            Monitor commissions and performance in real time<br>\
            Manage Monthly, Quarterly and Annual client reports through the MetaTrader Manager<br>"}/>
      </section>
    );
  }
}

export default ServiceInfo;
