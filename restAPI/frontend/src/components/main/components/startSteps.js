import React from 'react';
import register from '../../../images/main/register.png'
import verify from '../../../images/main/verify.png'
import fund from '../../../images/main/fund.png'
import trade from '../../../images/main/trade.png'

const StartSteps = () => {
    return (
        <div className="container my-5 pb-5">
            <h3>Start Trading in 4 Steps</h3>
            <br></br>
            <br></br>
            <div className="d-flex justify-content-around">
                <div className="w-25 mx-4 px-4" style={{ color: "#959595"}}>
                    <img className="mb-4" alt="" src={register} style={{ width: "50px" }}></img>
                    <a className="" href="#" style={{ color: "#006536" }}>
                        <h4>Register ▶</h4>
                    </a>
                    <br></br>
                    <span style={{ fontSize: "0.9rem" }}>Open your trading account via Glovice FX</span>
                </div>
                <div className="w-25 mx-4 px-4" style={{ color: "#959595"}}>
                    <img className="mb-3" alt="" src={verify} style={{ width: "35px" }}></img>
                    <a className="" href="#" style={{ color: "#006536" }}>
                        <h4>Verify ▶</h4>
                    </a>
                    <br></br>
                    <span style={{ fontSize: "0.9rem" }}>Upload your documents to verify your account</span>
                </div>
                <div className="w-25 mx-4 px-4" style={{ color: "#959595"}}>
                    <img className="mb-3" alt="" src={fund} style={{ width: "50px" }}></img>
                    <a className="" href="#" style={{ color: "#006536" }}>
                        <h4>Fund ▶</h4>
                    </a>
                    <br></br>
                    <span style={{ fontSize: "0.9rem" }}>Login to FxPro Direct and fund your account</span>
                </div>
                <div className="w-25 mx-4 px-4" style={{ color: "#959595"}}>
                    <img className="mb-4" alt="" src={trade} style={{ width: "50px" }}></img>
                    <a className="" href="#" style={{ color: "#006536" }}>
                        <h4>Trade ▶</h4>
                    </a>
                    <br></br>
                    <span style={{ fontSize: "0.9rem" }}>Start trading on more than 250 instruments</span>
                </div>
            </div>
        </div>
    );
};

export default StartSteps;