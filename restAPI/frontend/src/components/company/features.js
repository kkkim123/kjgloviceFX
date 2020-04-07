import React, { Component } from 'react';
import styles from '../../styles/company/features.module.css'
import icon_about from '../../images/icon_about.png'
import icon_privacy from '../../images/icon_privacy.png'
import icon_policy from '../../images/icon_policy.png'
import icon_terms from '../../images/icon_terms.png'

import classNames from "classnames/bind";
const cx = classNames.bind(styles);

class Features extends Component {
    render() {
        return (
            <div className={cx("container", "features", "my-5")}>
                <div className="row justify-content-center">
                    <div className="col-md-5 col-xs-12 mt-5 mb-3">
                        <div className={cx("title", "text-left")}>
                            <div className={cx("icon")}>
                                <img src={icon_about} alt="about"></img>
                                <span>About GloviceFX</span>
                            </div>
                        </div>
                        <div className={cx("content", "text-left", "mt-3", "mb-5")}>
                            <span>
                                GloviceFX attempts to achieve a perfect result of sincere, accessible, worthwhile and advanced services. Our mission is to satisfy the needs of our clients and partners, so we
                                believe this is the only right way of doing a business.
                        </span>
                        </div>
                        <div className={cx("learn-more", "text-right", "mt-2")}>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-5 col-xs-12 mt-5 mb-3">
                        <div className={cx("title", "text-left")}>
                            <div className={cx("icon")}>
                                <img src={icon_privacy} alt="about"></img>
                                <span>Privacy Statement</span>
                            </div>
                        </div>
                        <div className={cx("content", "text-left", "mt-3", "mb-5")}>
                            <span>
                                Protecting the privacy and safeguarding the personal and financial information of our clients and website visitors is one of our highest priorities. The following Privacy Statement explains how GloviceFX collects and protects your personal information. References to "GloviceFX" in this Privacy Statement include all GloviceFX companies and divisions.
                        </span>
                        </div>
                        <div className={cx("learn-more", "text-right", "mt-2")}>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    <div className="col-md-5 col-xs-12 mt-5 mb-3">
                        <div className={cx("title", "text-left")}>
                            <div className={cx("icon")}>
                                <img src={icon_policy} alt="about"></img>
                                <span>AML Policy</span>
                            </div>
                        </div>
                        <div className={cx("content-b", "text-left", "mt-3", "mb-5")}>
                            <span>
                                Money laundering is the act of converting money or other monetary instruments gained from illegal activity into money or investments hat appear to be legitimate so that its illegal source cannot be traced.
                        </span>
                        </div>
                        <div className={cx("learn-more", "text-right", "mt-2")}>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-5 col-xs-12 mt-5 mb-3">
                        <div className={cx("title", "text-left")}>
                            <div className={cx("icon")}>
                                <img src={icon_terms} alt="about"></img>
                                <span>Terms And Conditions</span>
                            </div>
                        </div>
                        <div className={cx("content-b", "text-left", "mt-3", "mb-5")}>
                            <span>
                                Responsibility of visitors Type of investment advice provided to you Risk Disclosure Products and services…
                        </span>
                        </div>
                        <div className={cx("learn-more", "text-right", "mt-3")}>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className={cx("col", "department", "my-5")}>
                        <div className={cx("title")}>
                            <p>Departments Email</p>
                        </div>
                        <p>Sales Department : sales@pearlblackfs.com</p>
                        <p>Support Department: support@pearlblackfs.com</p>
                        <p>General Inquiries : general@pearlblackfs.com</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Features;