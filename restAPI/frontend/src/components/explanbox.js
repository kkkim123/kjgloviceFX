import React from 'react';

// props type {
//     pageTitle string
//     pageDesc string
//     TitleColor string
// }


const Explanbox = (props) => {
    return (
        <div className="what-is container mb-3">
            <div className="col-xs-12  col-sm-12">
                <div className="m-card shadow bg-white p-4 mb-4 text-left" style={{ borderRadius: "30px", color: "#959595" }}>
                    <h4 style={{ color: props.TitleColor, textAlign:"center" }}>{props.pageTitle}</h4>
                    <br></br>
                    <div dangerouslySetInnerHTML={{ __html: props.pageDesc }}></div>
                    
                </div>
            </div>
        </div>
    );
};

export default Explanbox;