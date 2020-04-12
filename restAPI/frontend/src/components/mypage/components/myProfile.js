import React from 'react';

const MyProfile = () => {
    const dummy = {
        firstName: "Allen",
        lastName: "James",
        FXTMId: "62249056",
        status: "new",
        contactMethod: "Actions",
        phone: "+821054295120",
        email: "fxsample@glovice.com",
        additionalEmail: "testemail@glovice.com",
        partnerId: "dummyId",
        resistrationDate: "YY-MM-DD",
        dateOfBirth: "YY-MM-DD"
    };

    return (
        <div className="container-fluid my-5 py-5" style={{ backgroundColor: "#0E112C", color: "#ffffff" }}>
            <div className="container" style={{ width: "90%" }}>
                <div className="mb-5">
                    <h3>My Profile</h3>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="mx-4" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#0E112C", width: "40%", padding: "4rem" }}>
                        <h3 style={{ color: "#006536" }}>{dummy.lastName} {dummy.firstName}</h3>
                        <h3 style={{ color: "#000000" }}>MyFXTM ID: {dummy.FXTMId}</h3>
                    </div>
                    <div className="mx-4" style={{ borderRadius: "20px", backgroundColor: "#ffffff", color: "#0E112C", width: "40%", padding: "4rem" }}>
                        <h3>Satus: <span style={{ color: "#006536" }}>{dummy.status}</span></h3>
                        <span style={{ color: "#929292", fontSize: "0.8rem" }}>
                            <p style={{ margin: "0" }}>To gain access to all the features within MyFXTM,</p>
                            <p>
                                please
                                <a style={{ color: "#006536", textDecoration: "none !important", cursor: "pointer" }} href="#">
                                    complete your profile.
                                </a>
                            </p>
                        </span>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-5" style={{ color: "#929292" }}>
                    <div className="mx-4 p-3" style={{ borderRadius: "20px", backgroundColor: "#ffffff", width: "40%" }}>
                        <h3 style={{ color: "#000000" }}>Contact Information</h3>
                        <div className="d-flex font-weight-bold py-2" style={{ fontSize: "0.8rem", borderTop: "1px solid #66A386" }}>
                            <div className="w-25 text-left">
                                <span>Contact Method</span>
                            </div>
                            <div className="w-75 text-right">
                                <span>{dummy.contactMethod}</span>
                            </div>
                        </div>
                        <div className="d-flex py-2" style={{ fontSize: "0.8rem", borderTop: "1px solid #66A386" }}>
                            <div className="w-25 text-left">
                                <span>Mobile phone</span>
                            </div>
                            <div className="w-75 text-right">
                                <span>{dummy.phone}</span>
                            </div>
                        </div>
                        <div className="d-flex py-2" style={{ fontSize: "0.8rem", borderTop: "1px solid #66A386" }}>
                            <div className="w-25 text-left">
                                <span>Email</span>
                            </div>
                            <div className="w-75 text-right">
                                <span>{dummy.email}</span>
                            </div>
                        </div>
                        <div className="d-flex py-2" style={{ fontSize: "0.8rem", borderTop: "1px solid #66A386" }}>
                            <div className="w-25 text-left">
                                <span>Additional Email</span>
                            </div>
                            <div className="w-75 text-right">
                                <span>{dummy.additionalEmail}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mx-4 p-3" style={{ borderRadius: "20px", backgroundColor: "#ffffff", width: "40%" }}>
                        <h3 style={{ color: "#000000" }}>Other Detail</h3>
                        <div className="d-flex font-weight-bold py-2" style={{ fontSize: "0.8rem", borderTop: "1px solid #66A386" }}>
                            <div className="w-25 text-left">
                                <span>Details</span>
                            </div>
                            <div className="w-75 text-right">
                            </div>
                        </div>
                        <div className="d-flex py-2" style={{ fontSize: "0.8rem", borderTop: "1px solid #66A386" }}>
                            <div className="w-25 text-left">
                                <span>Partner ID</span>
                            </div>
                            <div className="w-75 text-right">
                                <span>{dummy.partnerId}</span>
                            </div>
                        </div>
                        <div className="d-flex py-2" style={{ fontSize: "0.8rem", borderTop: "1px solid #66A386" }}>
                            <div className="w-25 text-left">
                                <span>Registration Date</span>
                            </div>
                            <div className="w-75 text-right">
                                <span>{dummy.resistrationDate}</span>
                            </div>
                        </div>
                        <div className="d-flex py-2" style={{ fontSize: "0.8rem", borderTop: "1px solid #66A386" }}>
                            <div className="w-25 text-left">
                                <span>Date of Birth</span>
                            </div>
                            <div className="w-75 text-right">
                                <span>{dummy.dateOfBirth}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;