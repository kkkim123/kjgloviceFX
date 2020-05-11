import React from 'react';
import { Link } from 'react-router-dom';

import icon_commodity from '../../../images/market/icon_commodity.png'
import icon_energy from '../../../images/market/icon_energy.png'
import icon_crypto from '../../../images/market/icon_crypto.png'
import icon_indices from '../../../images/market/icon_indices.png'
import icon_metals from '../../../images/market/icon_metals.png'

const LookingFor = () => {
    console.log(`${window.location.protocol}//${window.location.host}`);
    return (
        <div className="container my-y py-5">
            <p style={{ color: "#959595" }}>Looking for more to trade?</p>
            <p>You can diversify your portfolio with us!</p>
            <br></br>
            <div className="row d-flex flex-wrap p-3 justify-content-center ">
                <Link to="/market/forex" className=" p-2 phone web cursor-pointer">
                    <div className=" px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536"}}>
                        <img className="mb-2" src={icon_crypto} alt="" style={{width:"70px"}}></img>
                        <p className="mt-2"><strong>forex</strong></p>
                    </div>
                </Link>
                <Link to="/market/commodity" className=" p-2 phone web cursor-pointer">
                    <div className=" px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536"}}>
                        <img className="mb-2" src={icon_commodity} alt="" style={{width:"70px"}}></img>
                        <p className="mt-2"><strong>Commodity</strong></p>
                    </div>
                </Link>
                <Link to="/market/indices" className=" p-2 phone web cursor-pointer">
                    <div className=" px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536"}}>
                        <img className="mb-2" src={icon_indices} alt="" style={{width:"70px"}}></img>
                        <p className="mt-2"><strong>Indices</strong></p>
                    </div>
                </Link>
                <Link to="/market/metals" className=" p-2 phone web cursor-pointer">
                    <div className=" px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536"}}>
                        <img className="mb-2" src={icon_metals} alt="" style={{width:"70px"}}></img>
                        <p className="mt-2"><strong>Metals</strong></p>
                    </div>
                </Link>
                <Link to="/market/energies" className=" p-2 phone web cursor-pointer">
                    <div className=" px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536"}}>
                        <img className="mb-2" src={icon_energy} alt="" style={{width:"70px"}}></img>
                        <p className="mt-2"><strong>Energy</strong></p>
                    </div>
                </Link>
                <Link to="/market/crypto" className=" p-2 phone web cursor-pointer">
                    <div className=" px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536"}}>
                        <img className="mb-2" src={icon_crypto} alt="" style={{width:"70px"}}></img>
                        <p className="mt-2"><strong>Crypto</strong></p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default LookingFor;