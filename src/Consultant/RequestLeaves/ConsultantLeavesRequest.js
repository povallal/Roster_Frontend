import React from "react";
import Layout from "../Layout";
import WeeklyCalendar from "../WeeklyCalender";

import './ConsultantLeaves.css';
import { DefaultContext } from "react-icons";



const ConsultantLeavesRequest =()=>{

    return(
        <Layout>
        <div className="container-fluid">
        
        <span> Consultants Leave Requests </span>
        </div>
        <div>
        <WeeklyCalendar />
        </div>


        </Layout>
    )
}

export default ConsultantLeavesRequest;