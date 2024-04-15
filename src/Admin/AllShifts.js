import React from "react";
import Layout from "./Layout";
import WeeklyCalendar from "./WeeklyCalender";

import "./Styles/AllShift.css"

const AllShiftAdmin=()=>{


    return(
        <Layout>

            <div className="container-fluid">
        
        <h2>Scheduled Shift Today</h2>
    

        <div>
        <WeeklyCalendar />
        </div>
        </div>

        </Layout>
    )
}


export default AllShiftAdmin;