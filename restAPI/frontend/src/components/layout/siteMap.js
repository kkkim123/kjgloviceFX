import React, { Component } from "react";
import { Link } from "react-router-dom";

class siteMap extends Component {
  render() {
    return (
      <section className="container">
        <div className="my-5">
          <h2>GloviceFX Site Map</h2>
        </div>
        <div className="text-left row">
          <div className="col">
            <Link to="/main">
              <h4 className="title-line w-auto">Main</h4>
            </Link>
          </div>
          <div className="col">
            <Link to="/market">
              <h4 className="title-line w-auto">Market</h4>
            </Link>
            <Link to="/market/forex">
              <h5>- Forex</h5>
            </Link>
            <Link to="/market/commodity">
              <h5>- Commodity</h5>
            </Link>
            <Link to="/market/indices">
              <h5>- Indices</h5>
            </Link>
            <Link to="/market/metals">
              <h5>- Metals</h5>
            </Link>
            <Link to="/market/energies">
              <h5>- Energy</h5>
            </Link>
            <Link to="/market/crypto">
              <h5>- Crypto</h5>
            </Link>
          </div>
          <div className="col">
            <Link to="/trading">
              <h4 className="title-line w-auto">Trading</h4>
            </Link>
          </div>
          <div className="col">
            <Link to="/company">
              <h4 className="title-line w-auto">Company</h4>
            </Link>
            <Link to="/company/about">
              <h5>- About</h5>
            </Link>
            <Link to="/company/partnership">
              <h5>- Partnership</h5>
            </Link>
            <Link to="/company/helpCenter">
              <h5>- Help Center</h5>
            </Link>
          </div>
          <div className="col">
            <Link to="/mypage/">
              <h4 className="title-line w-auto">My Page</h4>
            </Link>
            <Link to="/mypage">
              <h5>- My Details</h5>
            </Link>
            <Link to="/mypage">
              <h5>- My Files</h5>
            </Link>
            <Link to="/mypage">
              <h5>- My Accounts</h5>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default siteMap;
