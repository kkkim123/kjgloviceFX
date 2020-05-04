import React, { useState } from 'react';

const NoticeBox = (Props) => {
    const [hidden, setHidden] = useState(false);
    let style = { backgroundColor: "#0E112C", color: "#ffffff", borderRadius: "20px" };
     if (hidden) style.display = "none";

    return (
        <div className="shadow text-left py-3 px-5 my-4" style={style}>
            <button type="button" className="close" aria-label="Close" style={{color:"white"}} onClick={()=>setHidden(true)}>
                <span aria-hidden="true">&times;</span>
            </button>
            <p>
                <span style={{ fontSize: "2.0rem" }}><strong>{Props.title}</strong></span>
                <span style={{ fontSize: "1.5rem" }}>{Props.subtitle}</span>
            </p>
            <p style={{ margin: "0px" }}><strong>{Props.content1}{Props.id}</strong></p>
            <p><strong>{Props.content2}</strong></p>
        </div>
    );
};

export default NoticeBox;