import React from 'react';
import dollar from '../../../images/myPage/dollar.png'

const Account = () => {
    const dummy = [
        {
            accountNumber: "GBP62249056",
            accountCurrency: "GBP",
            accountBalance: "0",
            accountDeposit: false
        },
        {
            accountNumber: "GBP62123456",
            accountCurrency: "GBP",
            accountBalance: "1",
            accountDeposit: false
        },
        {
            accountNumber: "GBP62255556",
            accountCurrency: "GBP",
            accountBalance: "100",
            accountDeposit: true
        },
        {
            accountNumber: "GBP6000056",
            accountCurrency: "GBP",
            accountBalance: "0",
            accountDeposit: true
        },
        {
            accountNumber: "GBP60987656",
            accountCurrency: "GBP",
            accountBalance: "9999",
            accountDeposit: false
        }
    ]

    const RowList = (Props) => {
        const dummy = Props.dummy;
        const rowList = dummy.map((rowData) =>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize: "1.2rem", padding: "0.8rem" }}>
                <div className="ml-2" style={{ width: "5%" }}>
                    <img src={dollar} alt="" style={{ width: "25px" }}></img>
                </div>
                <div className="ml-2" style={{ width: "25%" }}><span>{rowData.accountNumber}</span></div>
                <div className="ml-2" style={{ width: "30%" }}><span>{rowData.accountCurrency}</span></div>
                <div className="ml-2" style={{ width: "25%" }}><span>{rowData.accountBalance}</span></div>
                <div className="ml-2" style={{ width: "15%" }}>
                    {rowData.accountDeposit === true
                        ? <a href="#" className="px-3 py-2 rounded-pill" style={{ color: "#ffffff", backgroundColor: "#006536", fontWeight: "bold", textDecoration: "none" }}>Deposit</a>
                        : null
                    }
                </div>
            </div>
        )

        return (
            rowList
        );
    };

    return (
        <div className="shadow my-5 py-5 px-4 text-center mx-auto" style={{ width: "90%", borderRadius: "20px", backgroundColor: "#ffffff", color: "#000000" }}>
            <div className="text-left mb-5">
                <h3>Account</h3>
            </div>
            <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize: "1.2rem", padding: "0.8rem" }}>
                <div className="ml-2" style={{ width: "5%" }}><span>Type</span></div>
                <div className="ml-2" style={{ width: "25%" }}><span>Number</span></div>
                <div className="ml-2" style={{ width: "30%" }}><span>Currency</span></div>
                <div className="ml-2" style={{ width: "25%" }}><span>Balance</span></div>
                <div className="ml-2" style={{ width: "15%" }}><span>Deposit</span></div>
            </div>
            <RowList dummy={dummy} />
        </div>
    );
};

export default Account;