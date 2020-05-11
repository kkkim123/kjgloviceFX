import React from "react";
import MostChoose from "../market/components/mostChoose";
// import MainBanner from "../main/components/mainBanner";
import Mission from "../main/components/mission";
import Classes from "../main/components/classes";
import StartSteps from "../main/components/startSteps";
import DownloadMT4 from "../trade/DownloadMT4";
import GlobalMainBanner from "../global/mainTitle";
import phone_titleImg from "../../images/main/glovicefx_main_mobile.png";
import web_titleImg from "../../images/main/glovicefx_main_pc.png";

const Main = () => {
  return (
    <>
      <GlobalMainBanner phone_titleImg={phone_titleImg} web_titleImg={web_titleImg} title={"\
        <div className='mb-4'>\
        <h3>\
        <strong>Surplus and stable</strong>\
        </h3>\
        <h3>\
        <strong>liquidity from top tier </strong>\
        </h3>\
        <h3>\
        <strong>banks around the world</strong>\
        </h3>\
        </div>"} titleDesc={""} btn={true}
      />
      <Mission />
      <Classes />
      <DownloadMT4 />
      <StartSteps />
    </>
  );
};

export default Main;
