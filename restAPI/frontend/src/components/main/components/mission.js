import React from 'react';
import {phone, web} from '../../../styles/mediaquery.css'

const Mission = () => {
    return (
        <section className="container">
            <div className="my-5 p-2">
                <h2>GLOVICE FX’s MISSION</h2>
                <br></br>
                <div className="d-flex flex-wrap p-3 justify-content-center ">
                    <div className="my-3 p-2 text-left phone web">
                        <h1>01</h1>
                        <br></br>
                        <p>To provide a unique trading system and environment for our clients</p>
                    </div>
                    <div className="my-3 p-2 text-left phone web">
                        <h1>02</h1>
                        <br></br>
                        <p>To keep our position as the outstanding broker in the Forex market</p>
                    </div>
                    <div className="my-3 p-2 text-left phone web">
                        <h1>03</h1>
                        <br></br>
                        <p>To give the clients full infor mation about the services we offer</p>
                    </div>
                
                    <div className="my-3 p-2 text-left phone web">
                        <h1>04</h1>
                        <br></br>
                        <p>To build a trustworthy relationship between Pearl Black Finance and its clients</p>
                    </div>
                    <div className="my-3 p-2 text-left phone web">
                        <h1>05</h1>
                        <br></br>
                        <p>To provide simple opertaion system with all legal requirements</p>
                    </div>
                    <div className="my-3 p-2 text-left phone web">
                        <h1>06</h1>
                        <br></br>
                        <p>To be innovative and devel oped with use of up-to-dated technology</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;