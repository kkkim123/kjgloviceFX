import React from "react";
import MostChoose from "../market/components/mostChoose";
import MainBanner from "../main/components/mainBanner";
import Mission from "../main/components/mission";
import Classes from "../main/components/classes";
import StartSteps from "../main/components/startSteps";
import DownloadMT4 from "../trade/DownloadMT4";

const Main = () => {
  return (
    <>
      <MainBanner />
      <section className="container">
        <Mission />
      </section>
      <Classes />
      <DownloadMT4 />
      <StartSteps />
    </>
  );
};

export default Main;
