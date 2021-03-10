import React from "react"
import { Config } from "../../../utils/Config";


const Footer = () => {
  
  return (
    <div className="text-center py-8 text-xs">
      © Copyright {new Date().getFullYear()} {Config.title}. Powered with{" "}
      <span role="img" aria-label="Love">
        ♥
      </span>{" "}
      by <a href="https://qadamgahiii.now.sh">M. Qadamgahi</a>
    </div>
  );
}

export default Footer