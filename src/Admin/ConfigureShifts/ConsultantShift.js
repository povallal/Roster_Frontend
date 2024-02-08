import React from "react";
import Layout from "../Layout";
import WeeklyCalendar from "../WeeklyCalender";

import './ConsultantShift.css';



const ConsultantShitft=()=>{

    return(
        <Layout>
        <div className="container-fluid">
        
        <span>Consultants Shift Requests</span>
        </div>
        <div>
        <WeeklyCalendar />
        </div>


        </Layout>
    )
}


export default ConsultantShitft;