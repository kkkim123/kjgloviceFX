import React from 'react';

const Partners = () => {
    const dummy = [
        {
            magicCummunity: "#33333333",
            trades: 34.2,
            grossProfit: 223.2,
            grossLoss: 241.2,
            netProfit: 35.4,
            profitFactor: -0.023,
            winners: 23,
            winnerPercentage: 77.0,
            losers: 77,
            losersPercentage: 13.0
        },
        {
            magicCummunity: "#33333333",
            trades: 34.2,
            grossProfit: 223.2,
            grossLoss: 241.2,
            netProfit: 35.4,
            profitFactor: -0.023,
            winners: 23,
            winnerPercentage: 77.0,
            losers: 77,
            losersPercentage: 13.0
        },
        {
            magicCummunity: "#33333333",
            trades: 34.2,
            grossProfit: 223.2,
            grossLoss: 241.2,
            netProfit: 35.4,
            profitFactor: -0.023,
            winners: 23,
            winnerPercentage: 77.0,
            losers: 77,
            losersPercentage: 13.0
        },
        {
            magicCummunity: "#33333333",
            trades: 34.2,
            grossProfit: 223.2,
            grossLoss: 241.2,
            netProfit: 35.4,
            profitFactor: -0.023,
            winners: 23,
            winnerPercentage: 77.0,
            losers: 77,
            losersPercentage: 13.0
        },
        {
            magicCummunity: "#33333333",
            trades: 34.2,
            grossProfit: 223.2,
            grossLoss: 241.2,
            netProfit: 35.4,
            profitFactor: -0.023,
            winners: 23,
            winnerPercentage: 77.0,
            losers: 77,
            losersPercentage: 13.0
        }
    ]

    const RowList = (Props) => {
        const dummy = Props.dummy;
        const rowList = dummy.map((rowData,i) => {
            <div className="d-flex justify-content-between" key={i} style={{ borderTop: "1px solid #000000", color: "#929292", fontSize: "1.0rem", padding: "0.8rem" }}>
                <div className="ml-2" style={{ width: "19%" }}><span>{rowData.magicCummunity}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.trades}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.grossProfit}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.grossLoss}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.netProfit}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.profitFactor}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.winners}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.winnerPercentage}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.losers}</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>{rowData.losersPercentage}</span></div>
            </div>
        })

        return (
            rowList
        );
    };

    return (
        <div className="shadow my-5 py-5 px-4 text-center mx-auto" style={{ width: "90%", borderRadius: "20px", backgroundColor: "#ffffff", color: "#000000" }}>
            <div className="text-left mb-5">
                <h3>Trading History</h3>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize: "1.0rem", padding: "0.8rem" }}>
                <div className="ml-2" style={{ width: "19%" }}><span>Magic#Cummunity</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Trades</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Gross Profit</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Gross Loss</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Net Profit</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Profit Factor</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Winners</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Winners%</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Losers</span></div>
                <div className="ml-2" style={{ width: "9%" }}><span>Losers%</span></div>
            </div>
            <RowList dummy={dummy} />
        </div>
    );
};

export default Partners;