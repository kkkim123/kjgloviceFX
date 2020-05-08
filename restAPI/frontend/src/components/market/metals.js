import React from 'react';
import Title from './components/title'
import SubmitPair from './components/submitPair'
import MostChoose from './components/mostChoose'
import LookingFor from './components/lookingFor'
import DownloadMT4 from "../trade/DownloadMT4";

const Metals = () => {
    const titleProps = {
        pageTitle: "Spot Metals",
        pageDesc: "The global supply and demand of Metals has a significant impact on their value. Thus, with the increase of demand, the prices of Metals rise, and vice versa – when the demand is weak, the value of Precious Metals declines. However, this effect occurs mainly in the longer term, and does not change the short-term prices.",
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

            <div className="p-4 mb-5" style={{ color: "#959595" }}>
                <h4 style={{ color: "#000000" }}>What makes the metal price moves?</h4>
                <div className="text-left">
                    <br></br>
                    <p>Metals trading is affected by seasons, market volume, and up/down trends throughout the day. As a general rule trading decisions should be made based on data from the Economic Calendar and it’s best to follow statistics from America and China.</p>
                    <br></br>
                    <p>Global industry plays a large role in trading Precious metals: silver mining companies, and the main buyers of silver, create the market for it. Therefore, it’s important to not only follow the general high-tech and metal-mining news, but also pay attention to regional events when predicting price movements. Issues with Precious Metals production or new investment into the business are things that can cause corresponding market fluctuations. E.g., the price of Silver depends on the main factors of the global economy - inflation, GDP growth, refinancing rates and decisions made by the global central banks. During periods of economic upheaval, Precious Metals prices jump, as more and more investors seek to protect their capital from febrile changes in the foreign exchange market.</p>
                    <br></br>
                    <p>Moreover, experts say that Silver is not an unlimited resource which means that its price will constantly increase over time – so, the analysts predict a further upward trend.</p>
                    <br></br>
                    <p>As a rule of thumb, gold and silver, react negatively to the growth of stock indices, at which point the attractiveness of Precious Metals as a ‘safe asset’ decreases.</p>
                    <br></br>
                    <p>As far as Platinum trading goes, the main factor affecting its exchange value is the balance of supply and demand. Unlike gold, which is mined in its purest form, Platinum exists only in the form of an alloy with other metals, due to the process of extraction and separation being complicated and energy consuming. Because of that the global annual production of Platinum is only approximately 5 million troy ounces, which is not large figure in comparison to the annual gold production, which is 17 times higher, and silver which is 100 times higher.</p>
                    <br></br>
                    <p>Platinum has specific properties that keep this metal in demand in many industries, although, approximately 40% of it is used in automobile production.</p>
                </div>
            </div>
            <DownloadMT4 />
            <LookingFor />
        </section>
    );
};

export default Metals;