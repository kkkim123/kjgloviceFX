import React from "react";

const NewTitle = (props) => {
    console.log(props)
  return (
    <div className="my-5 p-4">
      <h3>{props.pageTitle}</h3>
      <div style={{overflow: "hidden" }}>
      <img className={"w-100"} src={props.pageImg} style={{maxHeight: "initial",marginTop: "-12%",marginBottom: "-11%"}}></img>
      </div>
      <span style={{color:"#959595"}}>{props.pageDesc}</span>
    </div>
  );
};

export default NewTitle;
