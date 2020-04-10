import React from 'react';
import icon_about from '../../images/icon_about.png'
import '../../styles/company/aboutGlovice.css'


const AboutGlovice = () => {
    return (
        <div className="container my-5">
            <div className="text-left my-5">
                <img className="icon" src={icon_about} alt=""></img>
                <span className="ag-title ml-2"><strong>About GloviceFX</strong></span>
            </div>
            <div className="text-left pb-5">
                <p className="subtitle"><strong>GLOVICEFX’S MISSION</strong></p>
                <br></br>
                <p>GloviceFX attempts to achieve a perfect result of sincere, accessible, worthwhile and advanced services. Our mission is to satisfy the needs of our clients and partners, so we believe this is the only right way of doing a business.</p>
                <p>1. To provide a unique trading system and environment for our clients</p>
                <p>2. To keep our position as the outstanding broker in the Forex market</p>
                <p>3. To give the clients full information about the services we offer</p>
                <p>4. To build a trustworthy relationship between GloviceFX Innovation Limited and its clients</p>
                <p>5. To provide simple operation system with all legal requirements</p>
                <p>6. To be innovative and developed with use of up-to-dated technology</p>
                <br></br>
                <br></br>
                <p className="subtitle"><strong>WE KNOW TRADING</strong></p>
                <br></br>
                <p>GloviceFX offers its clients high-class services as well as reliable and accessible environment using modern technologies. We provide both new and professional traders with MetaTrader 4 which is the most popular platform and allows them an immediate Forex trading by using advanced trading tools in the global market.</p>
                <p>We provide with the greatest customer service to everyone – <strong>24 hours a day, 5 days a week online support covering</strong> with a professional and technical support team to give solutions and consultation service.</p>
                <br></br>
                <p><strong>extremely low market spreads, no-requotes, full STP and DMA, absolute transparency and the latest trading
                technology</strong></p>
            </div>
        </div>
    );
};

export default AboutGlovice;