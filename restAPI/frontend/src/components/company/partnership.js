import React, { Component } from 'react';
import styles from '../../styles/company/partnership.module.css'
import introduter from '../../images/introduter.png'
import broker from '../../images/broker.png'
import affiliate from '../../images/affiliate.png'
import check from '../../images/check.png'
import submit_filled from '../../images/submit_filled.png'

import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class Partnership extends Component {
    render() {
        return (
            <div className={cx("container", "partnership","mt-5")}>
                <div className="row justify-content-center">
                    <div className={cx("choose", "col", "my-5")}>
                        <div className={cx("title")}>
                            <p>Choose Your Partnership Scheme</p>
                        </div>
                        <p>We offer various partnership schemes to suit your individual preferences.</p>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-lg-4 col-xs-12 mb-3 p-4 text-center">
                        <div className={cx("card p-4")}>
                            <p><img className={cx("main-img")} src={introduter}></img></p>
                            <p className={cx("title")}>Introducer</p>
                            <p className={cx("description")}>Customised rebate schemes and flexible payout options</p>
                            <div className={cx("item-box", "text-left")}>
                                <img className={cx("check-img")} src={check}></img>
                                <p>FX Minors and Exotics: Receive up to $50 per million US$ traded*</p>
                                <img className={cx("check-img")} src={check}></img>
                                <p>FX Majors: Receive up to $35 per million US$ traded*</p>
                            </div>
                            <a className={cx("submit", "mt-4")} href="#">
                                <div className="position-relative">
                                    <img className={cx("submit-img")} src={submit_filled} />
                                    <div className={cx("submit-text", "position-absolute", "p-2")}>
                                        <p className="">Become Introducer</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xs-12 mb-3 p-4 text-center">
                        <div className={cx("card p-4")}>
                            <p><img className={cx("main-img")} src={introduter}></img></p>
                            <p className={cx("title")}>Introducer</p>
                            <p className={cx("description")}>Customised rebate schemes and flexible payout options</p>
                            <div className={cx("item-box", "text-left")}>
                                <img className={cx("check-img")} src={check}></img>
                                <p>FX Minors and Exotics: Receive up to $50 per million US$ traded*</p>
                                <img className={cx("check-img")} src={check}></img>
                                <p>FX Majors: Receive up to $35 per million US$ traded*</p>
                            </div>
                            <a className={cx("submit", "mt-4")} href="#">
                                <div className="position-relative">
                                    <img className={cx("submit-img")} src={submit_filled} />
                                    <div className={cx("submit-text", "position-absolute", "p-2")}>
                                        <p className="">Become Introducer</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xs-12 mb-3 p-4 text-center">
                        <div className={cx("card p-4")}>
                            <p><img className={cx("main-img")} src={introduter}></img></p>
                            <p className={cx("title")}>Introducer</p>
                            <p className={cx("description")}>Customised rebate schemes and flexible payout options</p>
                            <div className={cx("item-box", "text-left")}>
                                <img className={cx("check-img")} src={check}></img>
                                <p>FX Minors and Exotics: Receive up to $50 per million US$ traded*</p>
                                <img className={cx("check-img")} src={check}></img>
                                <p>FX Majors: Receive up to $35 per million US$ traded*</p>
                            </div>
                            <a className={cx("submit", "mt-4")} href="#">
                                <div className="position-relative">
                                    <img className={cx("submit-img")} src={submit_filled} />
                                    <div className={cx("submit-text", "position-absolute", "p-2")}>
                                        <p className="">Become Introducer</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Partnership;