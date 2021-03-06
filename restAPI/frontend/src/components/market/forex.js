import React, { Component } from 'react';
import Title from './components/title';
import SubmitPair from './components/submitPair';
import MostChoose from './components/mostChoose';
import LookingFor from './components/lookingFor';
import Quotes from './components/Quotes';
import Explanbox from '../explanbox';
import ExplanNonbox from '../explannonbox';
import titleImg from "../../images/main/glovicefx_main_mobile.png";
import GlobalMainBanner from '../global/mainTitle';
import DownloadMT4 from "../trade/DownloadMT4";
import check from '../../images/check.png';
import { connect } from 'react-redux';
import { getMarketQuotes } from "../../actions/footer"; 
import pageImg from "../../images/header/FOREX1024.jpg"
import NewTitle from '../global/newTitle';
// import forexSymbol from "../../images/market/forexsymbol/KJ GLOVICE_National Flag (Forex) _AUDJPY.svg"

class Forex extends Component {
    componentDidMount() {
        this.props.getMarketQuotes('forex');
        if (this.timerID === undefined) {
            this.timerID = setInterval(() => this.props.getMarketQuotes('forex'), 11000); 
        } else {
            clearInterval(this.timerID);
        }

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const data = [{"key":"AUDUSD","sell":"0.65181","buy":"0.65194"},{"key":"CADCHF","sell":"0.69733","buy":"0.69750"},{"key":"CADJPY","sell":"76.880","buy":"76.897"},{"key":"CHFJPY","sell":"110.239","buy":"110.259"},{"key":"EURCAD","sell":"1.50903","buy":"1.50924"},{"key":"EURCHF","sell":"1.05244","buy":"1.05259"},{"key":"EURGBP","sell":"0.87542","buy":"0.87558"},{"key":"EURJPY","sell":"116.029","buy":"116.043"},{"key":"EURUSD","sell":"1.08221","buy":"1.08230"},{"key":"GBPCAD","sell":"1.72362","buy":"1.72387"},{"key":"GBPCHF","sell":"1.20209","buy":"1.20228"},{"key":"GBPJPY","sell":"132.530","buy":"132.547"},{"key":"GBPUSD","sell":"1.23609","buy":"1.23623"},{"key":"USDCAD","sell":"1.39435","buy":"1.39452"},{"key":"USDCHF","sell":"0.97242","buy":"0.97257"}];
        // const quotesProps = this.props.data;
        const titleProps = {
            pageTitle: "Forex",
            pageDesc: "Foreign exchange trading involves trading one currency pair against another, predicting that one currency will rise or fall against another. Currencies are traded in pairs, like the Euro versus the US Dollar (EUR/USD).",
            pageImg
        }

        return (
            <section className="container">
                {/* <img imgURL={headerImg}></img> */}

                <NewTitle 
                    pageImg={titleProps.pageImg} 
                    pageTitle={titleProps.pageTitle}
                    pageDesc={titleProps.pageDesc} 
                />
                
                {/* <Title
                    pageTitle={titleProps.pageTitle}
                    pageDesc={titleProps.pageDesc}
                /> */}
                {/* <Quotes test={this.props.data}/> */}
                
                <div className="d-flex justify-content-between"
                    style={{
                        borderTop: "1px solid #000000",
                        color: "#929292",
                        fontSize: "1.2rem",
                        padding: "0.8rem",
                        margin: "0px 20px"
                    }}
                >
                    <div className="ml-2" style={{ width: "10%" }}>
                    <span>Markets</span>
                    </div>
                    <div className="ml-2" style={{ width: "20%" }}>
                    <span>Sell</span>
                    </div>            
                    <div className="ml-2" style={{ width: "15%" }}>
                    <span>Buy</span>
                    </div>
                </div>
                {this.props.data ? (this.props.data && this.props.data.map((item, i) => (
                        <Quotes key={item.key} markets={item.key} market_sell={item.sell} market_buy={item.buy} type={"forex"}/>
                        ))): <div className="item">
                            <span className="desc">
                                No forex quotes Information
                            </span>
                            </div>}

                <SubmitPair />
                <MostChoose />
                
             <h2>What is Forex?</h2>
             <br></br>
             <br></br>
             <Explanbox  pageTitle={"HISTORY OF THE FOREX MARKET"} pageDesc={"\
             <p>Prior to 1971, speculation was not permitted in the currency markets due to an agreement called the Bretton Woods Agreement. This agreement was set up in 1945 with with the purpose of stabilizing international currencies and preventing money fleeing across nations. This agreement fixed all national currencies against the dollar and set the dollar at a rate of $35 per ounce of gold.</p>\
             <p>In 1971, the Bretton Woods agreement was finally abandoned and the US dollar was no longer convertible to gold. By 1973, currencies of the major industrialized nations were floating more freely, helped by the forces of supply and demand. Prices were set, with volumes, speed and price volatility, all increasing during the 1970’s. This guided the way to new financial instruments, market deregulation and open trade. It also led to a rise in the power of speculators.</p>\
             <p>Accelerated with the arrival of computers during the 1980’s, the movement of money across borders became a continuum, trading through the Asian, European and American time zones. The big banks created dealing rooms where hundreds of millions of Dollars, Euros, Pounds and Yen were exchanged within minutes.</p>\
             <p>London has developed to become the world’s leading international financial center and is the world’s largest Forex market. In the 1980s, it became the key center in the Eurodollar market when British banks began lending dollars as an alternative to pounds in order to maintain their leading position in global finance. London’s convenient geographical location (operating during Asian and American markets) is also instrumental in preserving its dominance in the Euro market.</p>"} TitleColor={"#000"} />
             <Explanbox  pageTitle={"FOREX (FOREIGN EXCHANGE)"}  TitleColor={"#000"} pageDesc={"\
             <p>Forex means foreign exchange. Sometimes it is also called FX. A simple way to understand the Forex market is to think of it as changing money when you travel abroad. When you change money, you sell one currency and buy another at the current exchange rate. This is because the value of your own currency is not equal to the value of the currency you wish to buy. In effect, you have traded currency and this is very similar to Forex trading.</p>\
             <p>Currencies constantly need to be exchanged in order to conduct business. This makes the Forex market one of the largest, most liquid financial market in the world. The daily volume of trades on the London Stock Exchange is USD 7 billion, whereas the daily volume on the Forex market was $5.3 trillion in April 2013 according to the BIS triennial report.</p>"} />
             <Explanbox  pageTitle={"WHERE IS FOREX SITUATED?"}  TitleColor={"#000"} pageDesc={"\
             <p>Unlike other financial markets the Forex market has no central location or exchange. The market is so large that it is unlikely to be affected by one person or one company – it takes much bigger processes to influence the direction of the market. It works almost the same way as the internet does (World Wide Web). That means that every order from any trader is executed in a global network of demand and supply, called the ECN network (Electronic Network of Banks). That fact adds reliability and transparency into Forex trading transactions.</p> "}/>

                
            <SubmitPair />
            <ExplanNonbox pageTitle={"What Is Forex Trading?"} TitleColor={"#000"} 
            pageDesc={"<p>Forex trading is the simultaneous buying of one currency and the selling of another. When you trade Forex, you can trade with a broker through a trading platform. Currencies are always traded in pairs, for example GBP/USD (trading the British pound against the US dollar). The first currency in the pair is known as the base currency, the second one is the quote currency. They are also often referred to as “buy” and “sell” or “offer” and “bid”</p>\
            <p>Daily currency fluctuations are usually very small. Most currency pairs move less than one cent per day, representing a less than 1% change in the value of the currency. This makes foreign exchange one of the least risky financial markets in the world.</p>"}/>
            <ExplanNonbox pageTitle={"AVAILABLE CURRENCY PAIRS"} TitleColor={"#000"} 
            pageDesc={"<p>The “majors” and the “commodity pairs” are the most liquid and most widely traded currency pairs in the Forex market. These pairs and their combinations make up the vast majority of all trading in the Forex market. Because these pairs typically have the largest volume of buyers and sellers, they also typically will have the tightest spreads.</p>"}/>

            <div className="vertical-line" style={{border:"1px solid #66A386"}}></div>
            <div className="col-xs-10 px-4 py-3 m-auto">
                <h3>FOREX MARKET</h3>
                <h3>PARTICIPANTS</h3>
                <br></br>
                <p className="text-left" style={{ color: "#959595" }}>The most important Forex market participants are :</p>
                <br></br>
                <div className="text-left">
                    <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                    <span>Central and Commercial Banks</span>
                </div>
                <div className="text-left">
                    <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                    <span>International Trade Companies</span>
                </div>
                <div className="text-left">
                    <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                    <span>Forex Brokers (ECN, STP and Dealing-Desk brokers)</span>
                </div>
                <div className="text-left">
                    <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                    <span>Large, Medium and Small Institutional Investors (i.e. Investment Companies, etc.)</span>
                </div>
                <div className="text-left">
                    <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                    <span>Common Retail Traders</span>
                </div>
                <div className="text-left">
                    <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                    <span>World Travellers</span>
                </div>
            </div>
            
            <DownloadMT4 />
            <LookingFor />
        
        </section>
        
        );
    }
}

const mapStateToProps = state => ({
    data: state.footer.markets
});

export default connect(mapStateToProps, {getMarketQuotes})(Forex);

//  import React from 'react';
//  import Title from './components/title'
// import SubmitPair from './components/submitPair'
// import MostChoose from './components/mostChoose'
// import LookingFor from './components/lookingFor'
// import check from '../../images/check.png'
// import { __RouterContext } from 'react-router';
// import Explanbox from '../explanbox';
// import ExplanNonbox from '../explannonbox';
// import titleImg from "../../images/main/glovicefx_main_mobile.png";
// import GlobalMainBanner from '../global/mainTitle';
// import DownloadMT4 from "../trade/DownloadMT4";

// const Forex = () => {
//     const titleProps = {
//         pageTitle: "Forex",
//         pageDesc: "Foreign exchange trading involves trading one currency pair against another, predicting that one currency will rise or fall against another. Currencies are traded in pairs, like the Euro versus the US Dollar (EUR/USD).",
//     }
//     console.log(__RouterContext)
//     return (
//         <>
//         <GlobalMainBanner titleImg={titleImg} title={titleProps.pageTitle} Desc={titleProps.pageDesc}  />
//         <section className="container">
            
//             <Title
//                 pageTitle={titleProps.pageTitle}
//                 pageDesc={titleProps.pageDesc}
//             />

//             {/* 기존 테이블 폼 */}

//             <SubmitPair />
//             <MostChoose />

//             <h2>What is Forex?</h2>
//             <br></br>
//             <br></br>
//             <Explanbox  pageTitle={"HISTORY OF THE FOREX MARKET"} pageDesc={"\
//             <p>Prior to 1971, speculation was not permitted in the currency markets due to an agreement called the Bretton Woods Agreement. This agreement was set up in 1945 with with the purpose of stabilizing international currencies and preventing money fleeing across nations. This agreement fixed all national currencies against the dollar and set the dollar at a rate of $35 per ounce of gold.</p>\
//             </br>\
//             <p>In 1971, the Bretton Woods agreement was finally abandoned and the US dollar was no longer convertible to gold. By 1973, currencies of the major industrialized nations were floating more freely, helped by the forces of supply and demand. Prices were set, with volumes, speed and price volatility, all increasing during the 1970’s. This guided the way to new financial instruments, market deregulation and open trade. It also led to a rise in the power of speculators.</p>\
//             <br>\
//             <p>Accelerated with the arrival of computers during the 1980’s, the movement of money across borders became a continuum, trading through the Asian, European and American time zones. The big banks created dealing rooms where hundreds of millions of Dollars, Euros, Pounds and Yen were exchanged within minutes.</p>\
//             <br>\
//             <p>London has developed to become the world’s leading international financial center and is the world’s largest Forex market. In the 1980s, it became the key center in the Eurodollar market when British banks began lending dollars as an alternative to pounds in order to maintain their leading position in global finance. London’s convenient geographical location (operating during Asian and American markets) is also instrumental in preserving its dominance in the Euro market.</p>"} TitleColor={"#000"} />
//             <Explanbox  pageTitle={"FOREX (FOREIGN EXCHANGE)"}  TitleColor={"#000"} pageDesc={"\
//             <p>Forex means foreign exchange. Sometimes it is also called FX. A simple way to understand the Forex market is to think of it as changing money when you travel abroad. When you change money, you sell one currency and buy another at the current exchange rate. This is because the value of your own currency is not equal to the value of the currency you wish to buy. In effect, you have traded currency and this is very similar to Forex trading.</p>\
//             </br>\
//             <p>Currencies constantly need to be exchanged in order to conduct business. This makes the Forex market one of the largest, most liquid financial market in the world. The daily volume of trades on the London Stock Exchange is USD 7 billion, whereas the daily volume on the Forex market was $5.3 trillion in April 2013 according to the BIS triennial report.</p>"} />
//             <Explanbox  pageTitle={"WHERE IS FOREX SITUATED?"}  TitleColor={"#000"} pageDesc={"\
//             <p>Unlike other financial markets the Forex market has no central location or exchange. The market is so large that it is unlikely to be affected by one person or one company – it takes much bigger processes to influence the direction of the market. It works almost the same way as the internet does (World Wide Web). That means that every order from any trader is executed in a global network of demand and supply, called the ECN network (Electronic Network of Banks). That fact adds reliability and transparency into Forex trading transactions.</p>/ "}/>

//             <SubmitPair />
//             <ExplanNonbox pageTitle={"What Is Forex Trading?"} TitleColor={"#000"} 
//             pageDesc={"<p>Forex trading is the simultaneous buying of one currency and the selling of another. When you trade Forex, you can trade with a broker through a trading platform. Currencies are always traded in pairs, for example GBP/USD (trading the British pound against the US dollar). The first currency in the pair is known as the base currency, the second one is the quote currency. They are also often referred to as “buy” and “sell” or “offer” and “bid”</p>\
//             <p>Daily currency fluctuations are usually very small. Most currency pairs move less than one cent per day, representing a less than 1% change in the value of the currency. This makes foreign exchange one of the least risky financial markets in the world.</p>"}/>
//             <ExplanNonbox pageTitle={"AVAILABLE CURRENCY PAIRS"} TitleColor={"#000"} 
//             pageDesc={"<p>The “majors” and the “commodity pairs” are the most liquid and most widely traded currency pairs in the Forex market. These pairs and their combinations make up the vast majority of all trading in the Forex market. Because these pairs typically have the largest volume of buyers and sellers, they also typically will have the tightest spreads.</p>"}/>

//             <div className="vertical-line" style={{border:"1px solid #66A386"}}></div>
//             <div className="col-xs-10 px-4 py-3 m-auto">
//                 <h3>FOREX MARKET</h3>
//                 <h3>PARTICIPANTS</h3>
//                 <br></br>
//                 <p className="text-left" style={{ color: "#959595" }}>The most important Forex market participants are :</p>
//                 <br></br>
//                 <div className="text-left">
//                     <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
//                     <span>Central and Commercial Banks</span>
//                 </div>
//                 <div className="text-left">
//                     <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
//                     <span>International Trade Companies</span>
//                 </div>
//                 <div className="text-left">
//                     <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
//                     <span>Forex Brokers (ECN, STP and Dealing-Desk brokers)</span>
//                 </div>
//                 <div className="text-left">
//                     <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
//                     <span>Large, Medium and Small Institutional Investors (i.e. Investment Companies, etc.)</span>
//                 </div>
//                 <div className="text-left">
//                     <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
//                     <span>Common Retail Traders</span>
//                 </div>
//                 <div className="text-left">
//                     <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
//                     <span>World Travellers</span>
//                 </div>
//             </div>
            
//             <DownloadMT4 />
//             <LookingFor />
        
//         </section>
//         </>
//     );
// };

// export default Forex;

