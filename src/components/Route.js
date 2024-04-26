import React from "react";
import HeaderComponent from "./HeaderComponent";
const style = {
  position: "absolute",
  width: "100%",
  top: "0px",
  backgroundColor: "white",
  borderRadius: "5px",
};

const TextContainer = ({ endAddress, eta }) => {
  return (
    <div style={style}>
      <HeaderComponent />
      <div style={{ padding: "3px 30px" }}>
        <p>
          <span className="textStyle"> Route: </span>Nyabugogo - Kimironko
        </p>
        <p>
          <span className="textStyle"> Next Stop: </span> {endAddress}
        </p>
        <p>
          <span className="textStyle"> ETA for Next Stop: </span> {eta} minutes
        </p>
      </div>
    </div>
  );
};

export default TextContainer;
