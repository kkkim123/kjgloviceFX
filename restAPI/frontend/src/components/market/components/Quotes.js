import React, { Component } from 'react';

const Quotes = (props) => {
    let forexSymbol;
    
    if(props.type){
        if(props.type === "indices"){
            forexSymbol = require(`../../../images/market/indicessymbol/KJ GLOVICE_National Flag (Indices) _${props.markets}.svg`);
        }else if(props.type === "forex") {
            forexSymbol = require(`../../../images/market/forexsymbol/KJ GLOVICE_National Flag (Forex) _${props.markets}.svg`);
        }
    }
    return (
        <div
            className="d-flex justify-content-between py-3"
            style={{
                borderTop: "1px solid #000000",
                fontSize: "1rem",
                padding: "0.8rem",
                margin: "0px 20px"
            }}
            key={props.idx}
        >
            <div className="ml-2  my-auto" style={{ width: "10%"}}>
                <div style={{display:"inline-block",    position: "absolute"}}><img src={forexSymbol.default}  style={{display:"block"}}/></div>
                <span style={{display:"inline-block"}}>{props.markets}</span>
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