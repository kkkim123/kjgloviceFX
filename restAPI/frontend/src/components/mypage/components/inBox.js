import React from 'react';
import email from '../../../images/myPage/email.png'

const InBox = (Props) => {
    return (
        <div className="shadow py-4 px-4 text-left" style={{width:"32%", borderRadius: "20px", backgroundColor: "#ffffff", color: "#000000", height: "182px" }}>
            <div className="mb-4">
                <img className="mb-3 mr-2" src={email} alt="" style={{ width: "45px" }}></img>
                <span style={{ fontSize: "2.2rem" }}><strong>Inbox</strong></span>
            </div>
            <div>
                <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>
                    <span style={{ color: "#000000" }}>You have </span>
                    <span style={{ color: "#006536" }}>{Props.messagesNum} messages, {Props.unreedNum} unread.</span>
                </p>
            </div>
        </div>
    );
};

export default InBox;