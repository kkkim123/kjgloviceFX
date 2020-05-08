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
    this.state = {
      footer: [
        {key:"EURUSD", value: 0},
        {key:"GBPUSD", value: 0},
        {key:"USOIL", value: 0}
      ]
    }
  }

  // 10초 interval로 footer 호출
  componentDidMount() {
    // this.props.getMetaQuotes();
    if (this.footerTimerId === undefined) {
      this.footerTimerId = setInterval(
        () => this.props.getMetaQuotes(), 6500
      );
    } else {
      clearInterval(this.footerTimerId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.footer === undefined) {
      this.props.getMetaQuotes();
    }
  }

  // interval 제거
  componentWillUnmount() {
    clearInterval(this.footerTimerId);
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <>
        <li className="nav-item item">
          <Link className="nav-link" to="/mypage">My Page</Link>
        </li>
        <li className="nav-item item">
          <Link className="nav-link" to="#" onClick={this.props.logout}>Logout</Link>
        </li>
      </>
    );

    const guestLinks = (
      <>
        <li className="nav-item item">
          <Link className="nav-link" to="/login">My Page</Link>
        </li>
        <li className="nav-item item">
          <Link className="nav-link register-content rounded-pill" to="/login" >Sign in</Link>
        </li>
      </>      
    );
    return (
      <div className="footer">
        <div className="d-flex justify-content-center align-content-center flex-wrap ft1">
          {this.props.footer ? (this.props.footer && this.props.footer.map((item, i) => (
          <div className="item" key={i}>
            <span className="name">{item.key}</span>
            <br></br>
            <span className="value">{item.value}</span>
          </div>
          // 데이터가 없는 경우, state에 default값 넣음
          ))): this.state.footer.map((item, i) => (
            <div className="item" key={i}>
              <span className="name">{item.key}</span>
              <br></br>
              <span className="value">{item.value}</span>
            </div>
          ))}
          <div className="item">
            <span className="name">Invest Responsibly:</span>
            <br></br>
            <span className="desc">
              Trading CFDs involves significant risks
            </span>
            <br></br>
          </div>
          <div className="item pt-2">
            <span className="register-button">
              {!isAuthenticated ? (
                <Link to="/login">Sign in</Link>
              ) : (
                <Link onClick={this.props.logout} to="#">Logout</Link>
                  // <a onClick={this.props.logout}>Logout</a>
              )}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-around align-content-center flex-wrap ft2">
          <div></div>
          <div></div>

          <div className="item">
            <span className="name" ><Link to="company/helpCenter" style={{color:"white"}}>HELP</Link></span>
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
  footer: state.footer.quotes
});

export default connect(mapStateToProps, { getMetaQuotes })(Footer);
// export default Footer;
