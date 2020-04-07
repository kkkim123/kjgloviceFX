import React, { Component } from 'react';
import Features from './features';
import Partnership from './partnership';
import '../../styles/company/company.css'

class Company extends Component {
    render() {
        return (
            <div className="container">
                <Features />
                <Partnership />
            </div>
        );
    }
}

export default Company;