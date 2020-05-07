import React, {Component} from 'react';
import Title from './components/title';
import SubmitPair from './components/submitPair';
import MostChoose from './components/mostChoose';
import LookingFor from './components/lookingFor';
import Quotes from './components/Quotes';
import check from '../../images/check.png';
import { connect } from 'react-redux';
import { getMarketQuotes } from "../../actions/footer"; 


class Crypto extends Component {
    componentDidMount() {
        this.props.getMarketQuotes('crypto');
        this.timerID = setInterval(() => this.props.getMarketQuotes('crypto'), 5500);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const titleProps = {
            pageTitle: "Cryptocurrencies",
            pageDesc: "Cryptocurrencies are volatile, unregulated, decentralized and controlled almost exclusively by retail speculators. Trade the world’s newest and most exciting asset class as CFDs with GloviceFX.",
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
                        No Crypto quotes Information
                    </span>
                    </div>}
    
                <MostChoose />
                <SubmitPair />
    
                <div className="p-5 mb-5" style={{ color: "#959595" }}>
                    <h4 style={{ color: "#000000" }}>What Are Cryptocurrencies?</h4>
                    <div className="text-left">
                        <br></br>
                        <p>Cryptocurrencies are digital, decentralized currencies that were created to work as a medium of exchange. The cryptocurrency market offers traders a new way of investing; free from intermediaries such as governments or rating agencies. Hence, price movements on cryptos is driven by a multitude of factors such as market demand and relative news.</p>
                    </div>
                </div>
                <div className="p-5 mb-5" style={{ color: "#959595" }}>
                    <h4 style={{ color: "#000000" }}>How does Crypto CFD trading work?</h4>
                    <div className="text-left">
                        <br></br>
                        <p>Bitcoin is a digital cryptocurrency that derives its value from supply and demand factors unique to this asset class. Bitcoin is available in a finite supply and therefore increases in price as demand increases.</p>
                        <p>Demand stems from speculative sources and more practical sources, for example Internet purchases paid for in Bitcoin. Bitcoin also has a tendency to react to market sentiment in more traditional markets such as equities and foreign exchange, increasing during periods of negative sentiment.</p>
                    </div>
                </div>
                <div className="m-card shadow bg-white p-5 mb-3" style={{ borderRadius: "5%", color: "#959595", width: "80%", margin: "0 auto" }}>
                    <h4 style={{ color: "#000000" }}>Crypto CFDs:</h4>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-xs-10 col-sm-4 text-left mb-5">
                            <p style={{ color: "#000000" }}>Litecoin CFD</p>
                            <div className="text-left">
                                <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                                <span>Designed by a former Google engineer to improve upon Bitcoin's technology, Litecoin offers quicker processing times and a larger number of tokens. It is also the first cryptocurrency to implement SegWit, a method of speeding up transaction times without compromising the underlying blockchain technology.</span>
                            </div>
                        </div>
                        <div className="col-xs-10 col-sm-4 text-left mb-5">
                            <p style={{ color: "#000000" }}>Ethereum CFD</p>
                            <div className="text-left">
                                <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                                <span>The world's second-largest cryptocurrency, it is labelled by many as 'the next Bitcoin'. Ethereum has received international recognition and support from giant organisations such as Microsoft, JP Morgan, and Intel.</span>
                            </div>
                        </div>
                        <div className="col-xs-10 col-sm-4 text-left mb-5">
                            <p style={{ color: "#000000" }}>Bitcoin CFD</p>
                            <div className="text-left">
                                <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                                <span>The first and largest cryptocurrency, Bitcoin paved the ways for hundreds of similar currencies and boasts a market cap of over $100 billion.</span>
                            </div>
                        </div>
                        <div className="col-xs-10 col-sm-4 text-left mb-5">
                            <p style={{ color: "#000000" }}>Ripple CFD</p>
                            <div className="text-left">
                                <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                                <span>Ripple is both a transaction network and crypto token which was created in 2012 as the go-to cryptocurrency for banks and global money transfers, and has recently experienced a period of growth.</span>
                            </div>
                        </div>
                        <div className="col-xs-10 col-sm-4 text-left mb-5">
                            <p style={{ color: "#000000" }}>EOS CFD</p>
                            <div className="text-left">
                                <img className="mr-2" src={check} alt="" style={{ width: "15px" }}></img>
                                <span>EOS is a decentralized operating system based on blockchain technology. It is designed to support of decentralized applications on a commercial-scale by giving all the required core functionalities.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <LookingFor />
            </section>
        );
    }

}


const mapStateToProps = state => ({
    data: state.footer.quotes
});

export default connect(mapStateToProps, {getMarketQuotes})(Crypto);