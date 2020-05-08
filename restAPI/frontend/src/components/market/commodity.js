import React from 'react';
import Title from './components/title'
import SubmitPair from './components/submitPair'
import MostChoose from './components/mostChoose'
import LookingFor from './components/lookingFor'
import ExplanNonbox from '../explannonbox';
import DownloadMT4 from "../trade/DownloadMT4";

const Commodity = () => {
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

            {/* 기존 테이블 폼 */}

            <MostChoose />
            <SubmitPair />
            <ExplanNonbox pageTitle={"What Are Commodity Futures?"} TitleColor={"#000"} 
            pageDesc={"<p>Futures are financial contracts for the specific asset to be bought or sold at a set time in the future. The final price level is determined by both parties, a buyer and a seller, and is known as the forward price. The specified date of the future payment is known as the expiration date.</p>\
            <p>Contract for difference (CFD) on commodity futures allow for trade on the price fluctuations of a wide range of assets: commodities. If investors make a forecast about the quotes increase, they open a Buy position on the trading platform. If they think the chart will move down, they make an online order to Sell.</p>"}/>
            <DownloadMT4 />
            <LookingFor />
        </section>
    );
};

export default Commodity;