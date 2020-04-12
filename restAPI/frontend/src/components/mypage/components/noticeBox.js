import React from 'react';

const NoticeBox = (Props) => {
    return (
        <div className="container shadow text-left py-3 px-5 mx-auto my-4" style={{ backgroundColor: "#0E112C", color: "#ffffff", borderRadius: "20px" }}>
            <button type="button" className="close" aria-label="Close" style={{color:"#ffffff"}}>
                <span aria-hidden="true" style={{fontSize:"2.5rem"}}>&times;</span>
            </button>
            <p>
                <span style={{ fontSize: "2.0rem" }}><strong>{Props.title}</strong></span>
                <span style={{ fontSize: "1.5rem" }}>{Props.subtitle}</span>
            </p>
            <p style={{ margin: "0px" }}><strong>{Props.content1}{Props.id}</strong></p>
            <p><strong>{Props.content2}</strong></p>
        </div>
    );
};

export default NoticeBox;