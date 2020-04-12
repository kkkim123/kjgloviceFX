import React from 'react';
import MostChoose from '../market/components/mostChoose'
import MainBanner from '../main/components/mainBanner'
import Mission from '../main/components/mission'
import Classes from '../main/components/classes'
import StartSteps from '../main/components/startSteps'
import DownloadMT4 from '../trade/DownloadMT4'

const Main = () => {
    return (
        <div>
            <MainBanner />
            <Mission />
            <Classes />
            {/* trading 메인의 두번째 container(핸드폰 이미지있는) */}
            <DownloadMT4 />
            <StartSteps />
        </div>

    );
};

export default Main;