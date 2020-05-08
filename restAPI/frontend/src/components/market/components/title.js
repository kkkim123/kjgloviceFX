import React from 'react';

const Title = (props) => {
    return (
        <div className="my-5 p-4">
            <h3>{props.pageTitle}</h3>
            <br></br>
            <span style={{color:"#959595"}}>{props.pageDesc}</span>
        </div>
    );
};

export default Title;