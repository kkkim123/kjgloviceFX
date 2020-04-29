import React from 'react';

const Overview = (Props) => {
    return (
        <div className="shadow py-4 px-4 text-left" style={{ width: "100%", borderRadius: "20px", backgroundColor: "#ffffff", color: "#000000" }}>
            <h3>Overview</h3>
            <br></br>
            <br></br>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Balance:</span></div>
                <div className="text-center" ><span>{Props.balance}</span></div>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Equity:</span></div>
                <div className="text-center" ><span>{Props.equity}</span></div>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Floating P/L:</span></div>
                <div className="text-center" ><span>{Props.floatingPL}</span></div>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Closed profit:</span></div>
                <div className="text-center" ><span>{Props.closedProfit}</span></div>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Free margin:</span></div>
                <div className="text-center" ><span>{Props.freeMargin}</span></div>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Margin in use:</span></div>
                <div className="text-center" ><span>{Props.marginInUse}</span></div>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Margin Level:</span></div>
                <div className="text-center" ><span>{Props.marginLevel}</span></div>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Account type:</span></div>
                <div className="text-center" ><span>{Props.accountType}</span></div>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                <div className="ml-1"><span>Last Update:</span></div>
                <div className="text-center" ><span>{Props.lastUpdate}</span></div>
            </div>
        </div>
    );
};

export default Overview;