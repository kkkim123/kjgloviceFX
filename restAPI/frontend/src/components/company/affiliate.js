import React from 'react';
import '../../styles/company/introducerBroker.css'
import icon_affiliate from '../../images/icon_affiliate.png'
import check from '../../images/check.png'
import { Link } from 'react-router-dom'

const Affiliate = () => {
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col">
                    <img className="partner-title-img mr-3" src={icon_affiliate} alt="introducer"></img>
                    <span className="partner-title align-bottom">Affiliate Program</span>
                </div>
            </div>
            <div>
                <p className="text-gray text-left">Enjoy attractive rev share commissions and bonuses by referring clients and giving them the performance they demand from a world-class Forex CFD Provider</p>
                <br></br>
                <p className="text-left color-green"><strong>Our offering with market leading trading conditions is a first choice for Forex traders all over the world. Our trading conditions make for more profitable traders and induce volume from your referrals. We call this the win/win/win model. Clients win from better trading conditions. Affiliates and GloviceFX win from happier clients producing more trading volume.</strong></p>
                <br></br>
            </div>
            <div className="row feature justify-content-center p-3 my-5 text-left align-bottom">
                <div className="col-12 col-sm-6">
                    <ul>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Attractive revenue share model</span>
                        </li>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Simple client on-boarding for higher conversions</span>
                        </li>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Commissions paid into a trading account in real time</span>
                        </li>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Transparency & Reporting</span>
                        </li>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Marketing material in 4 different languages</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row justify-content-center pb-5 mb-5">
                <div className="col-xs-6 col-sm-3">
                    <Link className="partner-submit rounded-pill" onClick={()=>alert('Coming Soon')}>
                        <span className="px-3">Become Affiliate</span>
                    </Link>
                </div>
                <div className="col-xs-6 col-sm-3">
                    <a className="partner-submit color-gray rounded-pill" href="#">
                        <span className="px-5">Email Us</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Affiliate;