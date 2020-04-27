import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "../../styles/trade/calendar.module.css";
const cx = classNames.bind(styles);

class EcnomicCalendars extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://c.mql5.com/js/widgets/calendar/widget.js?6";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div className={cx("bgImg", "text-center", "main")}>
        <div className="row justify-content-center">
          <div className="col my-5">
            <div className={cx("calendar", "cal-signin")}>
              <div className={cx("cal-body", "text-center")}>
                <h5 className={cx("cal-title")}>Ecnomic Calendars</h5>
              </div>
              <iframe src="https://www.mql5.com/en/economic-calendar/widget?mode=2&amp;dateFormat=DMY" width="90%" height="600px" id="widgetPreview"></iframe>
            </div>
            <div className="form-signin">
              <Link to="/trading/calendar">
              <button
                className="btn btn-lg btn-primary content-center  mt-5"
                type="button"
              >
                Read More
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EcnomicCalendars;
