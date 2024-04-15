import React from "react";
import './Styles/Navbaradmin.css';
import { FaUsers, FaClock, FaCubes, FaCalendarCheck, FaExclamationTriangle, FaFileAlt, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbaradmin = () => {
  // Use state to control the collapse of each submenu
  const [openUsers, setOpenUsers] = useState(false);
  const [openShifts, setOpenShifts] = useState(false);
  const [openUnits, setOpenUnits] = useState(false);
  const [openLeaves, setOpenLeaves] = useState(false);
  const [openConflicts, setOpenConflicts] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const [openAllShift,setOpenAllShift] =useState(false);

  // Define a function to toggle the state of each submenu
  const toggleMenu = (menu) => {
    switch (menu) {
      case "users":
        setOpenUsers(!openUsers);
        break;
      case "shifts":
        setOpenShifts(!openShifts);
        break;
      case "units":
        setOpenUnits(!openUnits);
        break;
      case "leaves":
        setOpenLeaves(!openLeaves);
        break;
      case "conflicts":
        setOpenConflicts(!openConflicts);
        break;
      case "reports":
        setOpenReports(!openReports);
        break;
      case "groups":
        setOpenGroups(!openGroups);
        break;
      case "allshifts":
        setOpenAllShift(!openAllShift);
         break;
      default:
        break;
    }
  };


  return (
    <div className={`sidebar ${openUsers || openShifts || openUnits || openLeaves || openConflicts || openReports || openGroups ||openAllShift ? "open" : ""}`}>
      <div className="brand">Admin</div>
      <ul className="nav">

     

        {/* Users Dropdown */}
        <li className={`nav-item ${openUsers ? "open" : ""}`}>
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLinkUsers" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => toggleMenu("users")}>
            <FaUsers /> Users
          </a>
          {/* Dropdown Items */}
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkUsers">
            <Link className="dropdown-item" to="/chief-consultant">Chief Consultants</Link>
            <Link className="dropdown-item" to="/consultant">Consultants</Link>
            <Link className="dropdown-item" to="/medical-officers">Medical Officers</Link>
        </div>
        </li>
        

        {/* Other Nav Items */}
        <li className={`nav-item ${openShifts ? "open" : ""}`}>
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLinkShifts" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => toggleMenu("shifts")}>
            <FaClock /> Configure Shifts
          </a>
          {/* Dropdown Items */}
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkShifts" style={{ display: openShifts ? "block" : "none" }}>
            
            <Link className="dropdown-item" to="/consultant-duty">Consultants</Link>
            <Link className="dropdown-item" to="/mo-duty"> Medical Officers</Link>
          </div>
        </li>

        <li className={`nav-item ${openUnits ? "open" : ""}`}>
          <Link className="nav-link" to="/configure-units" onClick={() => toggleMenu("units")}>
           <FaCubes /> Configure Units
             </Link>
          
        </li>

        <li className={`nav-item ${openLeaves ? "open" : ""}`}>
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLinkLeaves" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => toggleMenu("leaves")}>
            <FaCalendarCheck /> Manage Leaves
          </a>
          {/* Dropdown Items */}
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkLeaves" style={{ display: openLeaves ? "block" : "none" }}>
            
            <Link className="dropdown-item" to="/consultant-leave">   Consultants</Link>
            <Link className="dropdown-item" to="/mo-leave">  Medical Officers</Link>
          </div>
        </li>


        <li className={`nav-item ${openConflicts ? "open" : ""}`}>
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLinkConflicts" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => toggleMenu("conflicts")}>
            <FaExclamationTriangle /> Conflicts
          </a>
          {/* Dropdown Items */}
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkConflicts" style={{ display: openConflicts ? "block" : "none" }}>
            
            <Link className="dropdown-item" to="/leave-conflict">   Leaves</Link>
            <Link className="dropdown-item" to="/shift-conflict">   Shifts</Link>


          </div>
        </li>



        <li className={`nav-item ${openReports ? "open" : ""}`}>
          <Link className="nav-link" to='/generate-reports' onClick={() => toggleMenu("reports")}>
            <FaFileAlt /> Generate Reports
          </Link>
        </li>

        <li className={`nav-item ${openGroups ? "open" : ""}`}>
          <Link className="nav-link"to='/configure-mo-group' onClick={() => toggleMenu("groups")}>
            <FaUserFriends /> Configure MO's Group
          </Link>
        </li>
        
        <li className={`nav-item ${openAllShift ? "open" : ""}`}>
          <Link className="nav-link" to='/admin-dashboard' onClick={() => toggleMenu("allshifts")}>
            <FaFileAlt /> Today Shifts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbaradmin;
