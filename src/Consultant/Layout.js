import React from "react";
import HeaderConsultant from "./HeaderConsultant";
import NavbarConsultant from "./NavbarConsultant";
import './Styles/Layout.css'

const Layout = ({ children }) => {

  return (
    <div className="layout">
     <NavbarConsultant/>
      <div className="content">
        <HeaderConsultant/>
        <div className="child">

        
        {children}

        </div>
      </div>
    </div>
  );
};

export default Layout;
