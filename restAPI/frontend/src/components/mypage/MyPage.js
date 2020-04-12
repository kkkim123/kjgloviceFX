import React from 'react';
import MpHeader from './mpHeader'
import Steps from './components/steps'
import NoticeBox from './components/noticeBox'
import UserInfo from './components/userInfo'
import InBox from './components/inBox'
import Profit from './components/profit'
import Overview from './components/overview'
import Account from './components/account'
import TradingHistory from './components/tradingHistory'
import Partners from './components/partners'
import MyProfile from './components/myProfile'

const MyPage = () => {
    return (
        <div>
            <MpHeader />
            <Steps />
            <NoticeBox
                title="Welcome to MyFXTM"
                subtitle=" - your personal client area"
                content1="Your MyFXTM User ID: "
                id="62249056"
                content2="We have sent your login information to your email."
            />
            <NoticeBox
                title="Success!"
                subtitle=""
                content1="There’s never been a better time to trade with FXTM!"
                id=""
                content2=" Get 30% back on every deposit you make for 30days all the way up to The Big $5000! T&Cs apply"
            />
            <div className="container d-flex justify-content-between my-5">
                <UserInfo
                    firstName="James"
                    lastName="Allen"
                    CISNumber="C0000513"
                    oldCustomerId="12345"
                    email="user@email.com"
                    motherBranchName="Branch01 - Head Office"
                />
                <InBox
                    messagesNum="1"
                    unreedNum="2"
                />
            </div>

            <div className="container d-flex justify-content-between my-5">
                <Profit />
                <Overview
                    balance="4526.24"
                    equity="4552.52"
                    floatingPL="-"
                    closedProfit="-"
                    freeMargin="-474.35"
                    marginInUse="0.00"
                    marginLevel="-"
                    accountType="-"
                    lastUpdate="20/11/22"
                />
            </div>
            <Account />
            <TradingHistory />
            <Partners />
            <MyProfile />
        </div>
    );
};

export default MyPage;