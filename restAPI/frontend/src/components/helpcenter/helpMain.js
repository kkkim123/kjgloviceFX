import React, { Component } from "react";
import HelpCenter from "./helpCenter";
import QnaDetail from "./qnaDetail";

class helpMain extends Component {
  render() {
    return (
      <section className="container">
        <HelpCenter />
        <QnaDetail />
      </section>
    );
  }
}

export default helpMain;
