import React, {Component} from 'react';
import Title from './components/title';
import SubmitPair from './components/submitPair';
import MostChoose from './components/mostChoose';
import LookingFor from './components/lookingFor';
import Quotes from './components/Quotes';
import { connect } from 'react-redux';
import { getMarketQuotes } from "../../actions/footer"; 
import pageImg from "../../images/header/SPOT-INDICES(1024).jpg"
import NewTitle from '../global/newTitle';
import Explanbox from '../explanbox';

class Indices extends Component {
    componentDidMount() {
        this.props.getMarketQuotes('indices');
        if (this.timerID === undefined) {
            this.timerID = setInterval(() => this.props.getMarketQuotes('indices'), 11000);
        } else {
            clearInterval(this.timerID);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const titleProps = {
            pageTitle: "Spot Indices",
            pageDesc: "Indices are the most popular form of CFDs. GloviceFX has a large range of Indices from around the world to choose from, including the Australian S&P 200 Index, UK FTSE 100 Index, US E-mini S&P 500 and US DJIA Index.",
            pageImg
        }
        const data = [
            {
                "key": "Australia 200",
                "sell": "5448.50",
                "buy": "5448.40"
            },
            {
                "key": "Hong Kong 50",
                "sell": "24576.30",
                "buy": "24576.60"
            },
            {
                "key": "Spain 35",
                "sell": "6759.50",
                "buy": "6759.50"
            },
            {
                "key": "Netherlands 25",
                "sell": "518.67",
                "buy": "518.94"
            }
        ];

        
        return (
            <section className="container">
                <NewTitle 
                    pageImg={titleProps.pageImg} 
                    pageTitle={titleProps.pageTitle}
                    pageDesc={titleProps.pageDesc} 
                />
                {/* <Title
                    pageTitle={titleProps.pageTitle}
                    pageDesc={titleProps.pageDesc}
                /> */}
    
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
                        <Quotes idx={i} key={i} markets={item.key} market_sell={item.sell} market_buy={item.buy} type={"indices"}/>
                        ))): <div className="item">
                    <span className="desc">
                        No Indices quotes Information
                    </span>
                    </div>}
    
                <MostChoose />
                <SubmitPair />
    


                <Explanbox  pageTitle={"What Are Spot  Indices?"}  TitleColor={"#000"} pageDesc={"\
                <p>A stock index is a good indicative measure of market performance. Indices such as the FTSE 100 and DJIA Index are baskets of blue chip stocks listed on the exchange and are generally a good measure of the current market sentiment. A change in the performance of any constituent stock in an index is reflected in a change in the overall value of that index.</p>\
                <p>Indices have the advantage of allowing traders to take a wider view of a basket of stocks rather than taking a view on one individual stock alone. Online CFD and futures based indices are offered on GloviceFX’s MetaTrader 4 Platforms.</p>"}/>
                <Explanbox  pageTitle={"HOW TO DETERMINE IF A CLIENT IS ENTITLED DIVIDEND FROM INDEX AUS200?"}  TitleColor={"#000"} pageDesc={"\
                <p>From the above example, let us assume that the ex-dividend date for Index AUS200 is on the of 18th August 2016. Therefore, a client must have an open position for Index AUS200 before the 18th of August 2016 and it must remain open until the 18th August 2016, in order to have the dividend adjustment of $2.44 per lot. To determine if the dividend adjustment is added or deducted to the client’s account, will depend on whether it is a SELL or BUY on AUS200. If the client has 1 lot of BUY for AUS200, the client will be entitled $2.44 per lot. However, if it is a SELL of AUS200, the client will be deducted $2.44 per lot. The amount $2.44 per lot will be converted to the client’s base currency, before it is being deducted.</p>\
                <p>Since this is from index AUS200, the dividend adjustment will be AUD$2.44 per lot. Alternatively, if the index is US500, the dividend adjustment would be USD$2.44 per lot. GloviceFX EX- Dividends Excel sheet shows the expected Indices that will have their index points adjusted for the given week and the actual ex-dividend adjustment amount for each indices will be updated regularly on our blog, Ex- Dividends Adjustments.</p>"}/>
                <LookingFor />
            </section>
        );
    }
}

const mapStateToProps = state => ({
    data: state.footer.markets
});

export default connect(mapStateToProps, {getMarketQuotes})(Indices);

// import React from 'react';
// import Title from './components/title'
// import SubmitPair from './components/submitPair'
// import MostChoose from './components/mostChoose'
// import LookingFor from './components/lookingFor'
// import Explanbox from '../explanbox';
// import GlobalMainBanner from '../global/mainTitle';
// import titleImg from "../../images/main/glovicefx_main_mobile.png";
// import DownloadMT4 from "../trade/DownloadMT4";

// const Indices = () => {
//     const titleProps = {
//         pageTitle: "Spot Indices",
//         pageDesc: "Indices are the most popular form of CFDs. GloviceFX has a large range of Indices from around the world to choose from, including the Australian S&P 200 Index, UK FTSE 100 Index, US E-mini S&P 500 and US DJIA Index.",
//     }
//     return (
//         <>
//         <GlobalMainBanner titleImg={titleImg} title={titleProps.pageTitle} Desc={titleProps.pageDesc} />
//         <section className="container">
//             <Title
//                 pageTitle={titleProps.pageTitle}
//                 pageDesc={titleProps.pageDesc}
//             />

//             {/* 기존 테이블 폼 */}

//             <MostChoose />
//             <SubmitPair />
//             <Explanbox  pageTitle={"What Are Spot  Indices?"}  TitleColor={"#000"} pageDesc={"\
//             <p>A stock index is a good indicative measure of market performance. Indices such as the FTSE 100 and DJIA Index are baskets of blue chip stocks listed on the exchange and are generally a good measure of the current market sentiment. A change in the performance of any constituent stock in an index is reflected in a change in the overall value of that index.</p>\
//             <p>Indices have the advantage of allowing traders to take a wider view of a basket of stocks rather than taking a view on one individual stock alone. Online CFD and futures based indices are offered on GloviceFX’s MetaTrader 4 Platforms.</p>"}/>
//             <Explanbox  pageTitle={"HOW TO DETERMINE IF A CLIENT IS ENTITLED DIVIDEND FROM INDEX AUS200?"}  TitleColor={"#000"} pageDesc={"\
//             <p>From the above example, let us assume that the ex-dividend date for Index AUS200 is on the of 18th August 2016. Therefore, a client must have an open position for Index AUS200 before the 18th of August 2016 and it must remain open until the 18th August 2016, in order to have the dividend adjustment of $2.44 per lot. To determine if the dividend adjustment is added or deducted to the client’s account, will depend on whether it is a SELL or BUY on AUS200. If the client has 1 lot of BUY for AUS200, the client will be entitled $2.44 per lot. However, if it is a SELL of AUS200, the client will be deducted $2.44 per lot. The amount $2.44 per lot will be converted to the client’s base currency, before it is being deducted.</p>\
//             <p>Since this is from index AUS200, the dividend adjustment will be AUD$2.44 per lot. Alternatively, if the index is US500, the dividend adjustment would be USD$2.44 per lot. GloviceFX EX- Dividends Excel sheet shows the expected Indices that will have their index points adjusted for the given week and the actual ex-dividend adjustment amount for each indices will be updated regularly on our blog, Ex- Dividends Adjustments.</p>"}/>
//             <DownloadMT4 />
//             <LookingFor />
//         </section>
//         </>
//     );
// };

// export default Indices;
