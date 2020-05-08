import React, { Component } from 'react';
import { connect } from "react-redux";
import store from '../../../store';
import { getOverview } from '../../../actions/mypage';
import Moment from 'moment';


class Overview extends Component {

    state = {
        acc: "",
        isLoad: false
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.account && !this.state.isLoad) {
            this.setState({
                acc: this.props.account[0].mt4_account,
                isLoad: true
            },()=>{
                this.props.getOverview(this.state.acc);
            });
        }

        // 계좌를 클릭하였을 때
        if (prevProps.accNum !== this.props.accNum) {
            this.setState(
              {
                acc: this.props.accNum,
              },
              () => {this.props.getOverview(this.state.acc)}
            );
          }
    }
    
    render() {
        return (
            <div className="shadow py-4 px-4 text-left" style={{ width: "100%", borderRadius: "20px", backgroundColor: "#ffffff", color: "#000000" }}>
                <h3>Overview</h3>
                <br></br>
                <br></br>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Balance:</span></div>
                        <div className="text-center" ><span>{this.props.info && this.props.info.balance ? this.props.info.balance.toFixed(2) : "-"}</span></div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Equity:</span></div>
                        <div className="text-center" ><span>{this.props.info && this.props.info.equity ? this.props.info.equity.toFixed(2) : "-"}</span></div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Floating P/L:</span></div>
                        <div className="text-center" ><span>{this.props.info && this.props.info.floating_profit ? this.props.info.floating_profit.toFixed(2) : "-"}</span></div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Closed profit:</span></div>
                        <div className="text-center" ><span>{this.props.info && this.props.info.closed_profit ? this.props.info.closed_profit.toFixed(2) : "-"}</span></div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Free margin:</span></div>
                        <div className="text-center" ><span>{this.props.info && this.props.info.margin_free ? this.props.info.margin_free.toFixed(2) : "-"}</span></div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Margin in use:</span></div>
                        <div className="text-center" ><span>{this.props.info && this.props.info.margin ? this.props.info.margin.toFixed(2) : "-"}</span></div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Margin Level:</span></div>
                        <div className="text-center" ><span>{this.props.info && this.props.info.margin_level ? this.props.info.margin_level.toFixed(2) + '%' : "-"}</span></div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Leverage:</span></div>
                        <div className="text-center" ><span>{this.props.info ? "1 : "+this.props.info.leverage : "-"}</span></div>
                    </div>
                    <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000000", color: "#929292", fontSize:"1.2rem", padding:"0.8rem"}}>
                        <div className="ml-1"><span>Last Update:</span></div>
                        <div className="text-center" ><span>{this.props.info && this.props.info.last_update ? Moment(this.props.info.last_update).format("DD/MM/YYYY HH:mm:ss") : "-"}</span></div>
                    </div>
                
            </div>
        );
    }

}

const mapStateToProps = state => ({
    account: state.mypage.account,
    accNum: state.mypage.accNum,
    info: state.mypage.info
  });

export default connect(mapStateToProps, {getOverview})(Overview);