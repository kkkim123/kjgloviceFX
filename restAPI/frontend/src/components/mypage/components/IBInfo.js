import React from 'react';
import { Link } from 'react-router-dom'

const handleClick = () => {
    alert('수정 페이지로 이동합니다.')
}

const IBInfo = (Props) => {
    let status = "";
    if(Props.data) {
        switch (Props.data.status) {
            case "P":
                status = "Pending"
                break;
            case "A":
                status = "Approved"
                break;
            case "R":
                status = "Reject"
                break;                                
            default:
                break;
        }
    }

    return (
        <div className="d-flex shadow py-3 px-4" style={{width:"100%", borderRadius: "20px", backgroundColor: "#006536", color: "#ffffff" }}>
            <div className="mb-5">
                <strong style={{ fontSize: "1.5rem" }}><strong>IB Info</strong></strong>
            </div>            
            <div className="justify-content-center align-items-center rounded-circle mr-4" style={{ border: "5px solid #ffffff", backgroundColor: "#aaaaaa", width: "150px", height: "150px" }}></div>
            <div className="d-flex flex-column justify-content-around text-left mr-4" style={{ color: "#ffffff" }}>
                <p>IB Name : {Props.data && Props.data.ib_name}</p>
                <p>IB Code : {Props.data && Props.data.ib_code}</p>
                <p>Email : {Props.data && Props.data.email}</p>
            </div>
            <div className="d-flex flex-column justify-content-around text-left" style={{ color: "#ffffff" }}>
                <p>Status : {status}</p>
                <p>Send Report : {Props.data && Props.data.send_report === "Y" ? "Yes" : 'No' }</p>
                <p>Referral Url : {Props.data && Props.data.referralurl ? Props.data.referralurl : 'none'}</p>
            </div>
            <div>
                <Link to="/company/ib/edit" onClick={handleClick} style={{ color: "#ffffff" }}>Edit</Link>
            </div>
        </div>
    );
};

export default IBInfo;