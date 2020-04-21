import React from 'react';

const UserInfo = (Props) => {
    return (
        <div className="d-flex shadow py-3 px-4" style={{width:"100%", borderRadius: "20px", backgroundColor: "#006536", color: "#ffffff" }}>
            <div className="mb-5">
                <strong style={{ fontSize: "1.5rem" }}><strong>User Info</strong></strong>
            </div>
            <div className="justify-content-center align-items-center rounded-circle mr-4" style={{ border: "5px solid #ffffff", backgroundColor: "#aaaaaa", width: "150px", height: "150px" }}></div>
            <div className="d-flex flex-column justify-content-around text-left mr-4" style={{ color: "#ffffff" }}>
                <p>First Name : {Props.data && Props.data.first_name}</p>
                <p>Last Name : {Props.data && Props.data.last_name}</p>
                <p>Email : {Props.data && Props.data.email}</p>
            </div>
            <div className="d-flex flex-column justify-content-around text-left" style={{ color: "#ffffff" }}>
                <p>User Type : {Props.data && Props.data.user_type === "R" ? "Retail" : "IB"}</p>
                <p>Referral Code : {Props.data && Props.data.referral_code ? Props.data.referral_code : 'none' }</p>
                <p>Referral WebSite : 
                    {
                        Props.data && Props.data.referral_website ? 
                        <a href={Props.data.referral_website} target='_blank' style={{color:"#ffffff"}}> {Props.data.referral_website}</a> : 'none'
                    }
                </p>
            </div>
        </div>
    );
};

export default UserInfo;