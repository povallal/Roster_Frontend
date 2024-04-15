import React from "react";
import './Styles/NavbarConsultant.css';
import { FaUsers, FaClock, FaCubes, FaCalendarCheck, FaExclamationTriangle, FaFileAlt, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavbarConsultant = () => {
  // Use state to control the collapse of each submenu

  const [openShifts, setOpenShifts] = useState(false);
  const [openLeaves, setOpenLeaves] = useState(false);
  const [openAllShift,setOpenAllShift] =useState(false);

  // Define a function to toggle the state of each submenu
  const toggleMenu = (menu) => {
    switch (menu) {
     
      case "shifts":
        setOpenShifts(!openShifts);
        break;
   
      case "leaves":
        setOpenLeaves(!openLeaves);
        break;
     
      case "allshifts":
        setOpenAllShift(!openAllShift);
        break;

      default:
        break;
    }
  };


  return (
    <div className={`sidebar ${  openShifts  || openLeaves  ||openAllShift ? "open" : ""}`}>
      <div className="brand">Consultants</div>
      <ul className="nav">

        <li className={`nav-item ${openShifts ? "open" : ""}`}>
          <Link className="nav-link" to='/consultant-duty-request' onClick={() => toggleMenu("shifts")}>
            <FaClock /> Request Duty
          </Link>
        </li>

        <li className={`nav-item ${openShifts ? "open" : ""}`}>
          <Link className="nav-link"to='/consultant-leave-request' onClick={() => toggleMenu("leaves")}>
            <FaCalendarCheck /> Request Leave
          </Link>
        </li>
        
        <li className={`nav-item ${openAllShift ? "open" : ""}`}>
          <Link className="nav-link" to='/consultant-dashboard' onClick={() => toggleMenu("allshifts")}>
            <FaFileAlt />Today Shifts
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default NavbarConsultant;
