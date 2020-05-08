import React, { Component } from "react";
import TradingMain from "./TradingMain";
import DownloadMT4 from "./DownloadMT4";
import EcnomicCalendars from "./EcnomicCalendars";
import IndicatorsSummary from "./IndicatorsSummary";
import ServiceInfo from "./ServiceInfo";
import CalendarsDetail from "./CalendarsDetail";
import IndicatorsDetail from "./IndicatorsDetail";

class Trading extends Component {
  render() {
    return (
      <>
        {/* 구분 예정 */}
        <TradingMain />
        <section className="container">
          <DownloadMT4 />
        </section>
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
