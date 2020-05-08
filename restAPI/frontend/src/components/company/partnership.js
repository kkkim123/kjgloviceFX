import React from 'react';
import { Link } from "react-router-dom";
import icon_introducer from '../../images/icon_introducer.png'
import icon_broker from '../../images/icon_broker.png'
import icon_affiliate from '../../images/icon_affiliate.png'
import submit from '../../images/submit.png'
import check from '../../images/check.png'
import '../../styles/company/partnership.css'
import ExplanNonbox from '../explannonbox';

const Card = (props) => {
    return (
        <div className="partnership p-partnership-wrap mb-2 p-3">
            <div className="box p-4">
                <div className="summary mb-4">
                    <img className="ps-icon mb-2" src={props.icon} alt={props.name}></img>
                    <p className="ps-title">{props.name}</p>
                    <p className="ps-subtitle">{props.subtitle}</p>
                </div>
                <div className="ps-detail text-left">
                    <img className="ps-check" src={check} alt="check"></img>
                    <p>{props.detailFirst}</p>
                </div>
                <div className="ps-detail text-left mb-5">
                    <img className="ps-check" src={check} alt="check"></img>
                    <p>{props.detailSecond}</p>
                </div>
                <div className="mb-3">
                    <Link to={props.link} className="submit-text rounded-pill p-3">
                        {props.submitText}
                    </Link>
                    {/* <a className="submit-text rounded-pill p-3" href="#"> */}
                        {/* <img className="submit-img" src={submit} alt="submit"></img> */}
                        {/* {props.submitText} */}
                    {/* </a> */}
                </div>

            </div>
        </div>
    );
};

const Partnership = () => {
    return (
        <section className="container">
            <ExplanNonbox pageTitle={"Choose Your Partnership Scheme"} TitleColor={"#000"}
            pageDesc={"<p>We offer various partnership schemes to suit your individual preferences.</p>"}/>
            
            <div className="row d-flex flex-wrap p-3 justify-content-center mb-5 pb-5">
                <Card
                    icon={icon_broker}
                    name="White Label Broker"
                    subtitle="Customised rebate schemes and flexible payout options"
                    detailFirst="FX Minors and Exotics: Receive up to $50 per million US$ traded*"
                    detailSecond="FX Majors: Receive up to $35 per million"
                    submitText="Become White Label Broker"
                    link="/company/white"
                />
                <Card
                    icon={icon_introducer}
                    name="Introducer"
                    subtitle="Customised rebate schemes and flexible payout options"
                    detailFirst="FX Minors and Exotics: Receive up to $50 per million US$ traded*"
                    detailSecond="FX Majors: Receive up to $35 per million"
                    submitText="Become Introducer"
                    link="/company/ib"
                />                
                <Card
                    icon={icon_affiliate}
                    name="Affiliate"
                    subtitle="Commission schemes tailored to your specific needs"
                    detailFirst="Customised rebate schemes and flexible payout options"
                    detailSecond="FX Majors: Receive up to $35 per million"
                    submitText="Become Affiliate"
                    link="/company/affiliate"
                />
            </div>
        </section>
    );
};

export default Partnership;