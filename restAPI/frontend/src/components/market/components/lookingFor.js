import React from 'react';
import { Link } from 'react-router-dom';

import icon_commodity from '../../../images/market/icon_commodity.png'
import icon_energy from '../../../images/market/icon_energy.png'
import icon_crypto from '../../../images/market/icon_crypto.png'
import icon_indices from '../../../images/market/icon_indices.png'
import icon_metals from '../../../images/market/icon_metals.png'

const LookingFor = () => {
    return (
        <div className="container my-y py-5">
            <p style={{ color: "#959595" }}>Looking for more to trade?</p>
            <p>You can diversify your portfolio with us!</p>
            <br></br>
            <div className="row justify-content-center">
                <div className="col-xs-5 col-sm-2">
                    <Link to="/market/commodity">
                        <div className="px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536", height:"160px"}}>
                            <img className="mb-2" src={icon_commodity} alt="" style={{width:"70px"}}></img>
                                <span><strong>Commodity Futures</strong></span>
                        </div>
                    </Link>
                </div>
                <div className="col-xs-5 col-sm-2">
                    <Link to="/market/indices">
                        <div className="px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536", height:"160px"}}>
                            <img className="mb-2" src={icon_indices} alt="" style={{width:"70px"}}></img>
                            <p className="mt-2"><strong>Indices</strong></p>
                        </div>
                    </Link>
                </div>
                <div className="col-xs-5 col-sm-2">
                    <Link to="/market/metals">
                        <div className="px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536", height:"160px"}}>
                            <img className="mb-2" src={icon_metals} alt="" style={{width:"70px"}}></img>
                            <p className="mt-2"><strong>Metals</strong></p>
                        </div>
                    </Link>
                </div>
                <div className="col-xs-5 col-sm-2">
                    <Link to="/market/energies">
                        <div className="px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536", height:"160px"}}>
                            <img className="mb-2" src={icon_energy} alt="" style={{width:"70px"}}></img>
                            <p className="mt-2"><strong>Energy</strong></p>
                        </div>
                    </Link>
                </div>
                <div className="col-xs-5 col-sm-2">
                    <Link to="/market/crypto">
                        <div className="px-3 pt-4 pb-2" style={{border:"2px solid #0E112C", borderRadius:"15%", color:"#006536", height:"160px"}}>
                            <img className="mb-2" src={icon_crypto} alt="" style={{width:"70px"}}></img>
                            <p className="mt-2"><strong>Crypto</strong></p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LookingFor;