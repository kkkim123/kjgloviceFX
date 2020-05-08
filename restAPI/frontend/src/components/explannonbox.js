import React from 'react';

// props type {
//     pageTitle string
//     pageDesc string
//     TitleColor string
// }


const ExplanNonbox = (props) => {
    return (
        <div className="my-5 py-5">
            <div className="col-xs-10 px-4 py-3 m-auto" style={{color: "#959595" }}>
                <h3  style={{ color: props.TitleColor }}>{props.pageTitle}</h3>
                <br></br>
                <div dangerouslySetInnerHTML={{ __html: props.pageDesc }}></div>
            </div>
        </div>
    );
};

export default ExplanNonbox;