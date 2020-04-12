import React from 'react';

const Steps = () => {
    return (
        <div className="container my-5 py-5">
            <div className="shadow px-5 py-5" style={{borderRadius:"20px"}}>
                <h2 className="mb-4"><strong>Start Trading in 4 Steps</strong></h2>
                <div className="d-flex justify-content-center align-items-center py-5">
                    <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ color: "#ffffff", border: "2px solid #006536", backgroundColor: "#006536", width: "170px", height: "170px" }}>
                        <span className="" style={{ fontSize: "1.2rem" }}><strong>Complete<br></br>Profile</strong></span>
                    </div>
                    <div className="h-50" style={{ borderBottom: "2px solid #006536", width: "80px" }}></div>
                    <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ color: "#006536", border: "2px solid #006536", backgroundColor: "#ffffff", width: "170px", height: "170px" }}>
                        <span className="" style={{ fontSize: "1.2rem" }}><strong>Complete<br></br>KYC</strong></span>
                    </div>
                    <div className="h-50" style={{ borderBottom: "2px solid #006536", width: "80px" }}></div>
                    <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ color: "#006536", border: "2px solid #006536", backgroundColor: "#ffffff", width: "170px", height: "170px" }}>
                        <span className="" style={{ fontSize: "1.2rem" }}><strong>Open Account</strong></span>
                    </div>
                    <div className="h-50" style={{ borderBottom: "2px solid #006536", width: "80px" }}></div>
                    <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ color: "#006536", border: "2px solid #006536", backgroundColor: "#ffffff", width: "170px", height: "170px" }}>
                        <span className="" style={{ fontSize: "1.2rem" }}><strong>Start Trading</strong></span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Steps;