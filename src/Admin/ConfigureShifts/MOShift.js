import React from "react";
import Layout from "../Layout";
import WeeklyCalendar from "../WeeklyCalender";

import './MOShift.css';


const MOShift =()=>{


    return(
        <Layout>

        <div className="container-fluid">
        
        <span>MO's Shift Requests</span>
        </div>
        <div>
        <WeeklyCalendar />
        </div>

        </Layout>
    )
}


export default MOShift; 