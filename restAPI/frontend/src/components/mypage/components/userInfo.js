import React from 'react';

const UserInfo = (Props) => {
    return (
        <div className="d-flex shadow py-3 px-4" style={{width:"66%", borderRadius: "20px", backgroundColor: "#006536", color: "#ffffff" }}>
            <div className="justify-content-center align-items-center rounded-circle mr-4" style={{ border: "5px solid #ffffff", backgroundColor: "#aaaaaa", width: "150px", height: "150px" }}></div>
            <div className="d-flex flex-column justify-content-around text-left mr-4" style={{ color: "#ffffff" }}>
                <p>First Name : {Props.firstName}</p>
                <p>Last Name : {Props.lastName}</p>
                <p>Email : {Props.email}</p>
            </div>
            <div className="d-flex flex-column justify-content-around text-left" style={{ color: "#ffffff" }}>
                <p>CIS Number : {Props.CISNumber}</p>
                <p>Old Customer ID : {Props.oldCustomerId}</p>
                <p>Mother branch name : {Props.motherBranchName}</p>
            </div>
        </div>
    );
};

export default UserInfo;