import React from 'react';
import Title from './components/title'
import SubmitPair from './components/submitPair'
import MostChoose from './components/mostChoose'
import LookingFor from './components/lookingFor'

const Energies = () => {
    const titleProps = {
        pageTitle: "Energies",
        pageDesc: "Energies are volatile, unregulated, decentralized and controlled almost exclusively by retail speculators. Trade the world’s newest and most exciting asset class as CFDs with GloviceFX.",
    }
    return (
        <section className="container">
            <Title
                pageTitle={titleProps.pageTitle}
                pageDesc={titleProps.pageDesc}
            />

            {/* 기존 테이블 폼 */}

            <MostChoose />
            <SubmitPair />

            <div className="p-5 mb-5" style={{ color: "#959595" }}>
                <h4 style={{ color: "#000000" }}>What Are Energies?</h4>
                <div className="text-left">
                    <br></br>
                    <p>Energies are digital, decentralized currencies that were created to work as a medium of exchange. The Energies market offers traders a new way of investing; free from intermediaries such as governments or rating agencies. Hence, price movements on cryptos is driven by a multitude of factors such as market demand and relative news.</p>
                </div>
            </div>
            <LookingFor />
        </section>
    );
};

export default Energies;