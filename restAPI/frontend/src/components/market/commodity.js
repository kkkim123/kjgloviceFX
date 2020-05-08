import React, {Component} from 'react';
import Title from './components/title';
import SubmitPair from './components/submitPair';
import MostChoose from './components/mostChoose';
import LookingFor from './components/lookingFor';
import Quotes from './components/Quotes';
import ExplanNonbox from '../explannonbox';
import DownloadMT4 from "../trade/DownloadMT4";
import { connect } from 'react-redux';
import { getMarketQuotes } from "../../actions/footer"; 


class Commodity extends Component {
    componentDidMount() {
        this.props.getMarketQuotes('commodity');
        if (this.timerID === undefined) {
            this.timerID = setInterval(() => this.props.getMarketQuotes('commodity'), 11000);
        } else {
            clearInterval(this.timerID);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const titleProps = {
            pageTitle: "Commodity Futures",
            pageDesc: "we offer a range of soft commodity products to trade, including corn, soybeans, sugar, cocoa, coffee, and wheat as CFDs – all with low spreads and leverage up to 1:100.",
        }
    
        return (
            <section className="container">
                <Title
                    pageTitle={titleProps.pageTitle}
                    pageDesc={titleProps.pageDesc}
                />
    
                <div className="d-flex justify-content-between"
                    style={{
                        borderTop: "1px solid #000000",
                        color: "#929292",
                        fontSize: "1.2rem",
                        padding: "0.8rem"
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
                        <Quotes idx={i} markets={item.key} market_sell={item.sell} market_buy={item.buy} />
                        ))): <div className="item">
                            <span className="name">No Data</span>
                            <br></br>
                            <span className="desc">
                                No Commodity quotes Information
                            </span>
                            </div>}
    
                <MostChoose />
                <SubmitPair />
                <ExplanNonbox pageTitle={"What Are Commodity Futures?"} TitleColor={"#000"} 
                  pageDesc={"<p>Futures are financial contracts for the specific asset to be bought or sold at a set time in the future. The final price level is determined by both parties, a buyer and a seller, and is known as the forward price. The specified date of the future payment is known as the expiration date.</p>\
                  <p>Contract for difference (CFD) on commodity futures allow for trade on the price fluctuations of a wide range of assets: commodities. If investors make a forecast about the quotes increase, they open a Buy position on the trading platform. If they think the chart will move down, they make an online order to Sell.</p>"}/>
                  <DownloadMT4 />
                <LookingFor />
            </section>
        );
    }
}


const mapStateToProps = state => ({
    data: state.footer.markets
});

export default connect(mapStateToProps, {getMarketQuotes})(Commodity);

