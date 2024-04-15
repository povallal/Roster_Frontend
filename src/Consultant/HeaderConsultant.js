import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import "./Styles/HeaderConsultant.css";
import { NavLink, useNavigate ,Link} from "react-router-dom";

const HeaderConsultant = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('CONSULTANT_TOKEN');
    navigate('/'); // Redirect to the login page
  };


  return (
    <div className="navbar">
      <div className="navbar-icons">
        <FaBell className="icon" />
        <FaUser className="icon" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default HeaderConsultant;
