import React, { Component } from 'react';
import classNames from "classnames/bind";
import styles from "../../styles/trade/calendar.module.css";
const cx = classNames.bind(styles);


class CalendarsDetail extends Component {
    render() {
        return (
            <section className="container">
            <div className="row justify-content text-center">
              <div className="col my-5">
                <div className={cx("title")}>
                  <h2 className="my-5">Economic Calendar</h2>
                </div>
                <iframe src="https://www.mql5.com/en/economic-calendar/widget?mode=2&amp;dateFormat=DMY" width="90%" height="600px" id="widgetPreview"></iframe>
              </div>
            </div>
          </section>
        );
    }
}

export default CalendarsDetail;