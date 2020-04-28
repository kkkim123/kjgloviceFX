import React from 'react';
import ETFs from '../../../images/main/ETFs.png'
import commodity from '../../../images/market/icon_commodity.png'
import energy from '../../../images/market/icon_energy.png'

const Classes = () => {
    return (
        <section className="container-fluid" style={{ backgroundColor: "#0E112C", color: "#ffffff"}}>
            <div className="text-left my-5 p-5">
                <div className="my-5">
                    <h3>6 Asset Classes</h3>
                    <br></br>
                    <p style={{ margin: "0" }}>Discover the world’s key markets through</p>
                    <p>RoboForex accounts and platforms.</p>
                    <br></br>
                    <div className="row row-cols-xs-3">
                        <span className="flex-grow-0 col"><strong>Forex</strong></span>
                        <span className="flex-grow-0 col"><strong>Commodity</strong></span>
                        <span className="flex-grow-0 col"><strong>Indices</strong></span>
                        <span className="flex-grow-0 col"><strong>Metals </strong></span>
                        <span className="flex-grow-0 col"><strong>Energy </strong></span>
                        <span className="flex-grow-0 col"><strong>Crypto</strong></span>
                    </div>
                </div>
                <div className="row">
                    <div className="px-3 my-3 mx-2 col">
                        <h3>Indices <br></br>Trading Benefits</h3>
                        <br></br>
                        <p>Meta Trader4, Meta Trader5<br></br>R Trader Platforms</p>
                        <p>Tight spreads - no mark up</p>
                        <p>Levergae: up to 1:100</p>
                        <p>Over 10 instruments</p>
                        <br></br>
                        <br></br>
                        <button type="button" className="btn rounded-pill py-3 px-4" style={{ border: "1px solid #ffffff", color: "inherit" }}>
                            <strong>Learn More</strong>
                        </button>
                    </div>
                    <div className="text-center px-3 my-3 mx-2 col" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={ETFs}/>
                        <h4 style={{ color: "#006536" }}><strong>ETFs</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade fast-growing global ETF  industry with over $3 trillion in assets in management</p>
                    </div>
                    <div className="px-3 my-3 mx-2 text-center col" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={commodity}/>
                        <h4 style={{ color: "#006536" }}><strong>Soft Commodities</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade ETFs on grown commodities such as coffee, cocoa, sugar, corn, wheat, soybean, fruit</p>
                    </div>
                    <div className="px-3 my-3 mx-2 text-center col" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={energy}/>
                        <h4 style={{ color: "#006536" }}><strong>Energies</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade CFDs and commodity ETFs on energy market including oil, natural gas, heating oil, ethanol and purified terephthalic acid</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Classes;