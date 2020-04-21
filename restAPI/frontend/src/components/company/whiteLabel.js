import React from 'react';
import '../../styles/company/introducerBroker.css'
import icon_broker from '../../images/icon_broker.png'
import check from '../../images/check.png'
import { Link } from 'react-router-dom'

const WhiteLabel = () => {
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col">
                    <img className="partner-title-img mr-3" src={icon_broker} alt="introducer"></img>
                    <span className="partner-title align-bottom">White Label</span>
                </div>
            </div>
            <div>
                <p className="text-gray text-left">GloviceFX’s white label partnership program is a turnkey solution giving your clients access to our market-leading liquidity and technology.</p>
                <br></br>
                <p className="text-center color-green"><strong>AFully Branded White Label Solution</strong></p>
                <br></br>
                <p className="text-left">Our white label program has been designed for start-up businesses with a detailed business plan and existing brokerages that have an existing client base and monthly foreign exchange volume of greater than $1 billion. As a full white label partner you will have complete control and transparency over the infrastructure through which you manage your clients.</p>
            </div>
            <div className="row feature justify-content-center p-3 my-5 text-left align-bottom">
                <div className="col-12 col-sm-6">
                    <ul>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Fully Customizable client commission structures</span>
                        </li>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>On-demand trading conditions for your clients</span>
                        </li>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Access to deep liquidity and market leading spreads from 0.0 pips</span>
                        </li>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Co-branded MT4 platforms</span>
                        </li>
                        <li>
                            <img className="partner-check-img mr-4" src={check} alt=""></img>
                            <span>Leverage off an established and trusted brand in the market</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row justify-content-center pb-5 mb-5">
                <div className="col-xs-6 col-sm-3">
                    <Link className="partner-submit rounded-pill" onClick={()=>alert('Coming Soon')}>
                        <span className="px-2">Become White Label Broker</span>
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

export default WhiteLabel;