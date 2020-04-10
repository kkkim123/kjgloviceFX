import React, { Component } from "react";
import Company from "./company";
import Partnership from "./partnership";

class Trading extends Component {
  render() {
    return (
      <>
        {/* 구분 예정 */}
        <Company />
        <Partnership />
        {/* <AboutGlovice />
        <PrivacyStatement />
        <AmlPolicy />
        <Terms />
        <IntroducerBroker />
        <WhiteLabel />
        <Affiliate /> */}
      </>
    );
  }
}

export default Trading;
