import React from 'react';
import mainBanner from '../../../images/main/mainBanner.png'

const MainBanner = () => {
    return (
        <div className="container-fluid"
                style={{
                    backgroundImage: `url(${mainBanner})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "700px",
                    padding: "250px 0"
                }}>
                <div className="container text-left mb-5" style={{ width: "90%", color: "#ffffff" }}>
                    <div className="w-50 px-5">
                        <div className="mb-4">
                            <h3><storng>Surplus and stable</storng></h3>
                            <h3><storng>liquidity from top tier </storng></h3>
                            <h3><storng>banks around the world</storng></h3>
                        </div>
                        <br></br>
                        <br></br>
                        <a href="#"
                            className="rounded-pill px-5 py-3 my-5"
                            style={{
                                color: "#ffffff",
                                backgroundColor: "#006536",
                                textDecoration: "none"
                            }}>
                            <strong>Start Trading</strong>
                        </a>
                    </div>
                </div>
            </div>
    );
};

export default MainBanner;