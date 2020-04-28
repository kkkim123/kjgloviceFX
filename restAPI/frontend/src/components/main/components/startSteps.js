import React from 'react';
import register from '../../../images/main/register.png'
import verify from '../../../images/main/verify.png'
import fund from '../../../images/main/fund.png'
import trade from '../../../images/main/trade.png'

const StartSteps = () => {
    return (
        <section className="container my-5 pb-5">
            <h3>Start Trading in 4 Steps</h3>
            <br></br>
            <br></br>
            <div className="d-flex justify-content-around row">
                <div className="col-md-3 px-4 pb-5 col-sm-10" style={{ color: "#959595"}}>
                    <img className="mb-4" alt="" src={register} style={{ width: "50px" }}></img>
                        <h4 style={{ color: "#006536" }} className="pb-2">Register ▶</h4>
                    <span style={{ fontSize: "0.9rem" }}>Open your trading account via Glovice FX</span>
                </div>
                <div className="col-md-3 px-4 pb-5 col-sm-10" style={{ color: "#959595"}}>
                    <img className="mb-4" alt="" src={verify} style={{ width: "35px" }}></img>
                        <h4 style={{ color: "#006536" }} className="pb-2">Verify ▶</h4>
                    <span style={{ fontSize: "0.9rem" }}>Upload your documents to verify your account</span>
                </div>
                <div className="col-md-3 px-4 pb-5 col-sm-10" style={{ color: "#959595"}}>
                    <img className="mb-4" alt="" src={fund} style={{ width: "50px" }}></img>
                        <h4 style={{ color: "#006536" }} className="pb-2">Fund ▶</h4>
                    <span style={{ fontSize: "0.9rem" }}>Login to FxPro Direct and fund your account</span>
                </div>                                
                <div className="col-md-3 col-sm-10 px-4 pb-5" style={{ color: "#959595"}}>
                    <img className="mb-4" alt="" src={trade} style={{ width: "50px" }}></img>
                        <h4 style={{ color: "#006536" }} className="pb-2">Trade ▶</h4>
                    <span style={{ fontSize: "0.9rem" }}>Start trading on more than 250 instruments</span>
                </div>
            </div>
        </section>
    );
};

export default StartSteps;