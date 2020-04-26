import React from 'react';
import Title from './components/title'
import SubmitPair from './components/submitPair'
import MostChoose from './components/mostChoose'
import LookingFor from './components/lookingFor'

const Indices = () => {
    const titleProps = {
        pageTitle: "Spot Indices",
        pageDesc: "Indices are the most popular form of CFDs. GloviceFX has a large range of Indices from around the world to choose from, including the Australian S&P 200 Index, UK FTSE 100 Index, US E-mini S&P 500 and US DJIA Index.",
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

            <div className="row">
                <div className="col-xs-12 col-sm-12">
                <div className="m-card shadow bg-white p-5 mb-3" style={{ borderRadius: "5%", color: "#959595", width:"80%", margin:"0 auto"}}>
                        <h4 style={{ color: "#000000" }}>What Are Spot  Indices?</h4>
                        <br></br>
                        <p>A stock index is a good indicative measure of market performance. Indices such as the FTSE 100 and DJIA Index are baskets of blue chip stocks listed on the exchange and are generally a good measure of the current market sentiment. A change in the performance of any constituent stock in an index is reflected in a change in the overall value of that index.</p>
                        <br></br>
                        <p>Indices have the advantage of allowing traders to take a wider view of a basket of stocks rather than taking a view on one individual stock alone. Online CFD and futures based indices are offered on GloviceFX’s MetaTrader 4 Platforms.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <div className="m-card shadow bg-white p-5 mb-3" style={{ borderRadius: "5%", color: "#959595", width:"80%", margin:"0 auto"}}>
                        <h4 style={{ color: "#000000" }}>HOW TO DETERMINE IF A CLIENT IS ENTITLED DIVIDEND FROM INDEX AUS200?</h4>
                        <br></br>
                        <p>From the above example, let us assume that the ex-dividend date for Index AUS200 is on the of 18th August 2016. Therefore, a client must have an open position for Index AUS200 before the 18th of August 2016 and it must remain open until the 18th August 2016, in order to have the dividend adjustment of $2.44 per lot. To determine if the dividend adjustment is added or deducted to the client’s account, will depend on whether it is a SELL or BUY on AUS200. If the client has 1 lot of BUY for AUS200, the client will be entitled $2.44 per lot. However, if it is a SELL of AUS200, the client will be deducted $2.44 per lot. The amount $2.44 per lot will be converted to the client’s base currency, before it is being deducted.</p>
                        <br></br>
                        <p>Since this is from index AUS200, the dividend adjustment will be AUD$2.44 per lot. Alternatively, if the index is US500, the dividend adjustment would be USD$2.44 per lot. GloviceFX EX- Dividends Excel sheet shows the expected Indices that will have their index points adjusted for the given week and the actual ex-dividend adjustment amount for each indices will be updated regularly on our blog, Ex- Dividends Adjustments.</p>
                    </div>
                </div>
            </div>
            <LookingFor />
        </section>
    );
};

export default Indices;