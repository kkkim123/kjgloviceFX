import React from 'react';
import ETFs from '../../../images/main/ETFs.png'
import commodity from '../../../images/market/icon_commodity.png'
import energy from '../../../images/market/icon_energy.png'
import a from "../../../images/icon/2.svg"
import b from "../../../images/icon/3.svg"
import c from "../../../images/icon/17.svg"
import d from "../../../images/icon/18.svg"
import e from "../../../images/icon/19.svg"
import f from "../../../images/icon/21.svg"
//0507 반응형 css by kkk
import "../../../styles/mediaquery.css"

const Classes = () => {
    return (
        <section className="container-fluid" style={{ backgroundColor: "#0E112C", color: "#ffffff"}}>
            <div className="text-left my-5 phone-padding web-padding">
                <div className="my-5">
                    <h3>6 Asset Classes</h3>
                    <br></br>
                    <p style={{ margin: "0" }}>Discover the world’s key markets through</p>
                    <p>RoboForex accounts and platforms.</p>
                </div>

                {/* <div className="px-0 py-3 my-3 mr-2 ml-0  col">
                    <h3>Indices Trading Benefits</h3>
                    <br></br>
                    <p>Meta Trader4, Meta Trader5 R Trader Platforms</p>
                    <p>Tight spreads - no mark up</p>
                    <p>Levergae: up to 1:100</p>
                    <p>Over 10 instruments</p>
                    
                </div> */}
                <div className="d-flex flex-wrap">
                    <a href={"/market/forex"} target="_self" className="text-center p-3 my-3 mx-2 col market-size" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={a} style={{ width: "101px" }}/>
                        <h4 style={{ color: "#006536" }}><strong>Forex</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade fast-growing global ETF  industry with over $3 trillion in assets in management</p>
                    </a>
                    {/* </a> */}
                    <a href={"/market/commodity"} target="_self" className="p-3 my-3 mx-2 text-center col market-size" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={b}  style={{ width: "101px" }}/>
                        <h4 style={{ color: "#006536" }}><strong>Soft Commodities</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade ETFs on grown commodities such as coffee, cocoa, sugar, corn, wheat, soybean, fruit</p>
                    </a>
                    <a href={"/market/indices"} target="_self" className="p-3 my-3 mx-2 text-center col market-size" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={c}  style={{ width: "101px" }}/>
                        <h4 style={{ color: "#006536" }}><strong>Indices</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade CFDs and commodity ETFs on energy market including oil, natural gas, heating oil, ethanol and purified terephthalic acid</p>
                    </a>
                    <a href={"/market/metals"} target="_self" className="text-center p-3 my-3 mx-2 col market-size" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={d}  style={{ width: "101px" }}/>
                        <h4 style={{ color: "#006536" }}><strong>Metals</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade fast-growing global ETF  industry with over $3 trillion in assets in management</p>
                    </a>
                    <a href={"/market/energies"} target="_self" className="p-3 my-3 mx-2 text-center col market-size" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={e}  style={{ width: "101px" }}/>
                        <h4 style={{ color: "#006536" }}><strong>Energy</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade ETFs on grown commodities such as coffee, cocoa, sugar, corn, wheat, soybean, fruit</p>
                    </a>
                    <a href={"/market/crypto"} target="_self" className="p-3 my-3 mx-2 text-center col market-size" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#959595"}}>
                        <img className="my-5" src={f}  style={{ width: "101px" }}/>
                        <h4 style={{ color: "#006536" }}><strong>Crypto</strong></h4>
                        <br></br>
                        <p style={{ color: "#959595", fontSize: "0.9rem" }}>Trade CFDs and commodity ETFs on energy market including oil, natural gas, heating oil, ethanol and purified terephthalic acid</p>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Classes;