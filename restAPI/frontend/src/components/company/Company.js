import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/company/company.css'
import icon_about from '../../images/icon_about.png'
import icon_policy from '../../images/icon_policy.png'
import icon_privacy from '../../images/icon_privacy.png'
import icon_terms from '../../images/icon_terms.png'


const Card = (props) => {
    return (
        <div className="col-xs-12 col-sm-4 mr-4">
            <div className="text-left mb-4">
                <img className="icon" src={props.icon} alt={props.name}></img>
                <span className="title ml-2">{props.name}</span>
            </div>
            <div className="content text-left">
                {props.text}
            </div>
            <Link to={props.link} className="learn-more text-right"><p>Learn more</p></Link>
            {/* <a className="learn-more text-right" href="#"><p>Learn more</p></a> */}
        </div>
    );
};

const Company = () => {
    return (
        <>
            <div className="row justify-content-center mt-5">
                <Card
                    name='About GloviceFX'
                    icon={icon_about}
                    text='GloviceFX attempts to achieve a perfect result of sincere, accessible, worthwhile and advanced services. Our mission is to satisfy the needs of our clients and partners, so we 
believe this is the only right way of doing a business.'
                    link="/company/about"
                />
                <Card
                    name='Privacy Statement'
                    icon={icon_privacy}
                    text='Protecting the privacy and safeguarding the personal and financial information of our clients and website visitors is one of our highest priorities. The following Privacy Statement explains how GloviceFX collects and protects your personal information. References to "GloviceFX" in this Privacy Statement include all GloviceFX companies and divisions.'
                    link="/company/privacy"
                />
            </div>
            <div className="row justify-content-center mt-5">

                <Card
                    name='AML Policy'
                    icon={icon_policy}
                    text='Money laundering is the act of converting money or other monetary instruments gained from illegal activity into money or investments hat appear to be legitimate so that its illegal source cannot be traced.'
                    link="/company/aml"
                />
                <Card
                    name='Terms And Conditions'
                    icon={icon_terms}
                    text='Responsibility of visitors Type of investment advice provided to you Risk Disclosure Products and services…'
                    link="/company/terms"
                />
            </div>
            <div className="mt-5 py-3">
                <p className="title">Departments Email</p>
                <div className="content">
                    <p>Sales Department : sales@pearlblackfs.com</p>
                    <p>Support Department: support@pearlblackfs.com</p>
                    <p>General Inquiries : general@pearlblackfs.com</p>
                </div>
            </div>
            {/* <div className="row" */}
            </>
    );
};

export default Company;