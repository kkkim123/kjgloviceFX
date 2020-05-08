import React, { Component } from 'react';


const Quotes = (props) => {
    return (
        <div
            className="d-flex justify-content-between"
            style={{
                borderTop: "1px solid #000000",
                fontSize: "1rem",
                padding: "0.8rem"
            }}
            key={props.idx}
        >
            <div className="ml-2  my-auto" style={{ width: "10%" }}>
                <span>{props.markets}</span>
            </div>
            <div className="ml-2  my-auto" style={{ width: "20%" }}>
                <span>{props.market_sell}</span>
            </div>
            <div className="ml-2  my-auto" style={{ width: "15%" }}>
                <span>{props.market_buy}</span>
            </div>
        </div>
    )
}

export default Quotes;