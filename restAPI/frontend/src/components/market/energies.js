import React, {Component} from 'react';
import Title from './components/title';
import SubmitPair from './components/submitPair';
import MostChoose from './components/mostChoose';
import LookingFor from './components/lookingFor';
import Quotes from './components/Quotes';
import { connect } from 'react-redux';
import { getMarketQuotes } from "../../actions/footer"; 


class Energies extends Component {
    componentDidMount() {
        this.props.getMarketQuotes('energies');
        if (this.timerID === undefined) {
            this.timerID = setInterval(() => this.props.getMarketQuotes('energies'), 11000);
        } else {
            clearInterval(this.timerID);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const titleProps = {
            pageTitle: "Energies",
            pageDesc: "Energies are volatile, unregulated, decentralized and controlled almost exclusively by retail speculators. Trade the world’s newest and most exciting asset class as CFDs with GloviceFX.",
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
                        <span className="desc">
                            No Energies quotes Information
                        </span>
                        </div>}
    
                <MostChoose />
                <SubmitPair />
    
                <div className="p-5 mb-5" style={{ color: "#959595" }}>
                    <h4 style={{ color: "#000000" }}>What Are Energies?</h4>
                    <div className="text-left">
                        <br></br>
                        <p>Energies are digital, decentralized currencies that were created to work as a medium of exchange. The Energies market offers traders a new way of investing; free from intermediaries such as governments or rating agencies. Hence, price movements on cryptos is driven by a multitude of factors such as market demand and relative news.</p>
                    </div>
                </div>
                <LookingFor />
            </section>
        );
    }
}


const mapStateToProps = state => ({
    data: state.footer.markets
});

export default connect(mapStateToProps, {getMarketQuotes})(Energies);