import React, { Component } from "react";
// import TradingMain from "./TradingMain";
import DownloadMT4 from "./DownloadMT4";
import EcnomicCalendars from "./EcnomicCalendars";
import IndicatorsSummary from "./IndicatorsSummary";
import ServiceInfo from "./ServiceInfo";
import CalendarsDetail from "./CalendarsDetail";
import IndicatorsDetail from "./IndicatorsDetail";
import GlobalMainBanner from "../global/mainTitle";
import phone_titleImg from "../../images/header/Trading(640).png";
import web_titleImg from "../../images/header/Trading(1024).png";
import TradingMain from "../global/tradingTitle"

class Trading extends Component {
  render() {
    return (
      <>
        {/* 구분 예정 */}

        <TradingMain phone_titleImg={phone_titleImg} web_titleImg={web_titleImg} titleDesc={""} btn={true} title={""}/>
        <DownloadMT4 />
        <EcnomicCalendars />
        <ServiceInfo />
        {/* <IndicatorsSummary /> */}
        {/*<CalendarsDetail /> */}
        {/* <IndicatorsDetail /> */}
      </>
    );
  }
}

export default Trading;
