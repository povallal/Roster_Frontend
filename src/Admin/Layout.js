import React from "react";
import Navbaradmin from "./Navbaradmin";
import Headeradmin from "./Headeradmin";
import './Styles/Layout.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbaradmin />
      <div className="content">
        <Headeradmin />
        {children}
      </div>
    </div>
  );
};

export default Layout;
