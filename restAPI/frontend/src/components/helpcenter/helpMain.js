import React, { Component } from "react";
import HelpCenter from "./helpCenter";
import QnaDetail from "./qnaDetail";

class helpMain extends Component {
  render() {
    return (
      <>
        {/* 구분 예정 */}
        <HelpCenter />
        <QnaDetail />
      </>
    );
  }
}

export default helpMain;
