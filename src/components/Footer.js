import React from "react";
import "./css/style.css";
import { GiSelfLove } from "react-icons/gi";
import { LuClock12 } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";

const FooterComponent = () => {
  return (
    <div className="footer">
      <div className="icons">
        <div>
          <GiSelfLove />
        </div>
        <div>
          <LuClock12 />
        </div>
        <div>
          <FaRegBell />
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
