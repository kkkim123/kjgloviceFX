import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../styles/layout/footer.css';
import iconTwitter from '../../images/icon_twitter.png';
import iconFacebook from '../../images/icon_facebook.png';
import iconInstagram from '../../images/icon_instagram.png';
import iconYoutube from '../../images/icon_youtube.png';
import iconGoogle from '../../images/icon_google.png';


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GOLD: 1477.53,
            EURUSD: 1.11377,
            GBPUSD: 1.31024,
            USOIL: 60.493,
            AAPL: 280.75,
            SP500: 2798.50
        }
    }
    render() {
        return (
            <div className="container-flud footer">
                <div className="d-flex justify-content-center align-content-center flex-wrap ft1">
                    <div className="item">
                        <span className="name">GOLD</span><br></br>
                        <span className="value">{this.state.GOLD}</span>
                    </div>
                    <div className="item">
                        <span className="name">EURUSD</span><br></br>
                        <span className="value">{this.state.EURUSD}</span>
                    </div>
                    <div className="item">
                        <span className="name">GBPUSD</span><br></br>
                        <span className="value">{this.state.GBPUSD}</span>
                    </div>
                    <div className="item">
                        <span className="name">USOIL</span><br></br>
                        <span className="value">{this.state.USOIL}</span>
                    </div>
                    <div className="item">
                        <span className="name">AAPL</span><br></br>
                        <span className="value">{this.state.AAPL}</span>
                    </div>
                    <div className="item">
                        <span className="name">SP500</span><br></br>
                        <span className="value">{this.state.SP500}</span>
                    </div>
                    <div className="item">
                        <span className="name">Invest Responsibly:</span><br></br>
                        <span className="desc">Trading CFDs involves significant risks</span><br></br>
                    </div>
                    <div className="item pt-2">
                        <span className="resister-button"><Link to="/register/user">Resister</Link></span>
                    </div>
                </div>
                <div className="d-flex justify-content-around align-content-center flex-wrap ft2">
                    <div></div>
                    <div></div>


                    <div className="item">
                        <span className="name">HELP</span>
                    </div>
                    <div className="d-flex justify-content-center align-content-center flex-wrap">
                    <div className="item">
                        <a href="#"><img src={iconTwitter}></img></a>
                    </div>
                    <div className="item">
                        <a href="#"><img src={iconGoogle}></img></a>
                    </div>
                    <div className="item">
                        <a href="#"><img src={iconFacebook}></img></a>
                    </div>
                    <div className="item">
                        <a href="#"><img src={iconInstagram}></img></a>
                    </div>
                    <div className="item">
                        <a href="#"><img src={iconYoutube}></img></a>
                    </div>
                    </div>
                    

                    <div className="item">
                        <span className="name">SITE MAP</span>
                    </div>

                    <div></div>
                    <div></div>

                </div>

            </div>

        );
    }
}

export default Footer;