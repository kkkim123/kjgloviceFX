import React from 'react';
import icon_policy from '../../images/icon_policy.png'
import '../../styles/company/amlPolicy.css'

const AmlPolicy = () => {
    return (
        <section className="container">
            <div className="text-left my-5">
                <img className="icon" src={icon_policy} alt=""></img>
                <span className="ag-title ml-2"><strong>AML Policy</strong></span>
            </div>
            <div className="text-left pb-5">
                <p className="subtitle"><strong>Anti-money laundering</strong></p>
                <p>Money laundering is the act of converting money or other monetary instruments gained from illegal activity into money or investments hat appear to be legitimate so that its illegal source cannot be traced.</p>
                <p>The company is committed to assisting governments combat the threat from money laundering. For that purpose the company has a partnership with the global Information consulting company which has high specialized and sophisticated electronic system, and sets up the process of verifying customers transparently to try to prevent money laundering and the movement of funds derived from criminal activities.</p>
                <br></br>
                <p>The company prohibits the movement of money derived from criminal activities thoroughly to prevent the money laundering. This will in turn restrict the availability of funds used for illegal activities. Money laundering is a serious criminal offence. The company has policies in order to prevent money laundering based on Anti-Money Laundering Committee (AMLC) instruction</p>
                <br></br>
                <p>Money laundering is a serious criminal offence. The company has policies in order to prevent money laundering based on Anti-Money Laundering Committee (AMLC) instructions.</p>
                <p>1. Confirming the identity of our clients</p>
                <p>2. Retaining transaction and identification records</p>
                <p>3. Determining that the clients are not known or suspected criminals by checking their names against the list of known criminals</p>
                <p>4. Following clients’ money transactions</p>
                <p>5. Training staff in terms of anti-money laundering regulations</p>
                <br></br>
                <p>For security reasons, the company does not accept cash deposits and does not pay out cash under any circumstances.</p>
                <p>The company reserves the right to refuse a transaction at any stage, where it believes the transfer to be connected in any way to money laundering or criminal activity. The company is prohibited from informing the client that it has been reported for suspicious activity. The company will be obliged to report this suspicious activity to the relevant authorities.</p>
                <br></br>
                <p>These guidelines have been performed to protect GloviceFX and its clients.</p>
                <br></br>
                <p><strong>extremely low market spreads, no-requotes, full STP and DMA, absolute transparency and the latest trading technology</strong></p>
            </div>
        </section>
    );
};

export default AmlPolicy;