import React from 'react';
import ETFs from '../../../images/main/ETFs.png'
import commodity from '../../../images/market/icon_commodity.png'
import energy from '../../../images/market/icon_energy.png'

const Classes = () => {
    return (
        <div className="text-left" style={{ backgroundColor: "#0E112C", color: "#ffffff"}}>
            <div className="container my-5 p-5" style={{ width: "90%" }}>
                <div className="my-5">
                    <h3>6 Asset Classes</h3>
                    <br></br>
                    <p style={{ margin: "0" }}>Discover the world’s key markets through</p>
                    <p>RoboForex accounts and platforms.</p>
                    <br></br>
                    <div>
                        <span className="mr-4"><strong>Forex</strong></span>
                        <span className="mr-4"><strong>Commodity</strong></span>
                        <span className="mr-4"><strong>Indices</strong></span>
                        <span className="mr-4"><strong>Metals </strong></span>
                        <span className="mr-4"><strong>Energy </strong></span>
                        <span className="mr-4"><strong>Crypto</strong></span>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="w-25">
                        <h3>Indices <br></br>Trading Benefits</h3>
                        <br></br>
                        <p>Meta Trader4, Meta Trader5<br></br>R Trader Platforms</p>
                        <p>Tight spreads - no mark up</p>
                        <p>Levergae: up to 1:100</p>
                        <p>Over 10 instruments</p>
                        <br></br>
                        <br></br>
                        <a className="rounded-pill py-3 px-4" style={{ border: "1px solid #ffffff" }}>
                            <strong>Learn More</strong>
                        </a>
                    </div>
                    <div className="w-25 text-center px-3 mx-2" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595", height:"380px" }}>
                        <img className="my-5" src={ETFs} alt="" style={{ width: "80px" }}></img>
                        <h4 style={{ color: "#006536" }}><strong>ETFs</strong></h4>
                        <br></br>
                        <span style={{ color: "#959595", fontSize: "0.9rem" }}>Trade fast-growing global ETF  industry with over $3 trillion in assets in management</span>
                    </div>
                    <div className="w-25 text-center px-3 mx-2" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595", height:"380px" }}>
                        <img className="my-5" src={commodity} alt="" style={{ width: "80px" }}></img>
                        <h4 style={{ color: "#006536" }}><strong>Soft Commodities</strong></h4>
                        <br></br>
                        <span style={{ color: "#959595", fontSize: "0.9rem" }}>Trade ETFs on grown commodities such as coffee, cocoa, sugar, corn, wheat, soybean, fruit</span>
                    </div>
                    <div className="w-25 text-center px-3 mx-2" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595", height:"380px" }}>
                        <img className="my-5" src={energy} alt="" style={{ width: "80px" }}></img>
                        <h4 style={{ color: "#006536" }}><strong>Energies</strong></h4>
                        <br></br>
                        <span style={{ color: "#959595", fontSize: "0.9rem" }}>Trade CFDs and commodity ETFs on energy market including oil, natural gas, heating oil, ethanol and purified terephthalic acid</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Classes;