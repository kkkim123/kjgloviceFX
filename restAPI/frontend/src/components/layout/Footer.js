import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import "../../styles/layout/footer.css";
import iconTwitter from "../../images/icon_twitter.png";
import iconFacebook from "../../images/icon_facebook.png";
import iconInstagram from "../../images/icon_instagram.png";
import iconYoutube from "../../images/icon_youtube.png";
import iconGoogle from "../../images/icon_google.png";

import { getMetaQuotes } from "../../actions/footer"; 

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getMetaQuotes();
  }

  render() {
    const { isAuthenticated, data } = this.props;

    return (
      <div className="footer">
        <div className="d-flex justify-content-center align-content-center flex-wrap ft1">
          {this.props.data ? (this.props.data && this.props.data.map((item, i) => (
          <div className="item" key={i}>
            <span className="name">{item.key}</span>
            <br></br>
            <span className="value">{item.value}</span>
          </div>
          ))): <div className="item">
              <span className="name">No Data</span>
              <br></br>
              <span className="desc">
                No Quotes Information
              </span>
            </div>}
          <div className="item">
            <span className="name">Invest Responsibly:</span>
            <br></br>
            <span className="desc">
              Trading CFDs involves significant risks
            </span>
            <br></br>
          </div>
          <div className="item pt-2">
            <span className="resister-button">
              {!isAuthenticated ? (
                <Link to="/register/user">Register</Link>
              ) : (
                <Link onClick={this.props.logout} to="/login">Logout</Link>
                  // <a onClick={this.props.logout}>Logout</a>
              )}
            </span>
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
              <a href="#">
                <img src={iconTwitter}></img>
              </a>
            </div>
            <div className="item">
              <a href="#">
                <img src={iconGoogle}></img>
              </a>
            </div>
            <div className="item">
              <a href="#">
                <img src={iconFacebook}></img>
              </a>
            </div>
            <div className="item">
              <a href="#">
                <img src={iconInstagram}></img>
              </a>
            </div>
            <div className="item">
              <a href="#">
                <img src={iconYoutube}></img>
              </a>
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

const mapStateToProps = state => ({
  auth: state.auth,
  data: state.footer.quotes
});

export default connect(mapStateToProps, { getMetaQuotes })(Footer);
// export default Footer;
