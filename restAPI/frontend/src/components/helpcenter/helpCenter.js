import React from 'react';
import check from '../../images/check.png';
import '../../styles/company/helpCenter.css';
import { Link } from 'react-router-dom'

const HelpCenter = () => {
    return (
        <div className="hc">
            <div className="my-5">
                <h2>GloviceFX Help Center</h2>
            </div>
            <div className="hc-usual row my-3">
                <div className="col-xs-12 col-sm-4 px-4 py-3 my-3">
                    <a className="d-flex" href="#">
                        <div className="mr-3">
                            <img className="check-img mt-2" src={check} alt=""></img>
                        </div>
                        <div className="qna-item">
                            <p className="hc-category">Accounts</p>
                            <p className="hc-question">How do I open a live trading account?</p>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-4 px-4 py-3 my-3">
                    <a className="d-flex" href="#">
                        <div className="mr-3">
                            <img className="check-img mt-2" src={check} alt=""></img>
                        </div>
                        <div className="qna-item">
                            <p className="hc-category">Verification</p>
                            <p className="hc-question">What documents do you require?</p>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-4 px-4 py-3 my-3">
                    <a className="d-flex" href="#">
                        <div className="mr-3">
                            <img className="check-img mt-2" src={check} alt=""></img>
                        </div>
                        <div className="qna-item">
                            <p className="hc-category">Verification</p>
                            <p className="hc-question">Are my personal details secure with you?</p>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-4 px-4 py-3 my-3">
                    <a className="d-flex" href="#">
                        <div className="mr-3">
                            <img className="check-img mt-2" src={check} alt=""></img>
                        </div>
                        <div className="qna-item">
                            <p className="hc-category">MT4 & MT5 Platform</p>
                            <p className="hc-question">Are your platforms compatible with Mac?</p>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-4 px-4 py-3 my-3">
                    <a className="d-flex" href="#">
                        <div className="mr-3">
                            <img className="check-img mt-2" src={check} alt=""></img>
                        </div>
                        <div className="qna-item">
                            <p className="hc-category">MT4 & MT5 Platform</p>
                            <p className="hc-question">Why is the ‘Modify’ button greyed out when I try to set SL/TP for an exsiting order?</p>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-4 px-4 py-3 my-3">
                    <a className="d-flex" href="#">
                        <div className="mr-3">
                            <img className="check-img mt-2" src={check} alt=""></img>
                        </div>
                        <div className="qna-item">
                            <p className="hc-category">FxPro Edge Platform</p>
                            <p className="hc-question">Why is the Modify position button greyed out when I try to set SL/TP for an existing order?</p>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-4 px-4 py-3 my-3">
                    <a className="d-flex" href="#">
                        <div className="mr-3">
                            <img className="check-img mt-2" src={check} alt=""></img>
                        </div>
                        <div className="qna-item">
                            <p className="hc-category">Deposit/Withdrawal</p>
                            <p className="hc-question">What methods can I use to deposit funds into my FxPro account?</p>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-4 px-4 py-3 my-3">
                    <a className="d-flex" href="#">
                        <div className="mr-3">
                            <img className="check-img mt-2" src={check} alt=""></img>
                        </div>
                        <div className="qna-item">
                            <p className="hc-category">Deposit/Withdrawal</p>
                            <p className="hc-question">How do I transfer funds from my FxPro Wallet to my trading account?</p>
                        </div>
                    </a>
                </div>
            </div>
            <div className="my-5" style={{color:"#959595"}}>
                <p>Can’t find what you need?</p>
                <p>Please contact us. We are with you all the time!</p>
            </div>
            <div className="d-flex flex-wrap p-3 justify-content-center ">
                <Link to="#" className="live-chat-button rounded-pill px-5 py-3 mx-3 p-btn" onClick={()=> alert('comming soon')} >
                    LiveChat
                </Link>
                <Link className="request-button rounded-pill px-4 py-3 mx-3 p-btn" to="#" onClick={()=> alert('comming soon')} >
                    Request a call back
                </Link>
            </div>
        </div>
    );
};

export default HelpCenter;