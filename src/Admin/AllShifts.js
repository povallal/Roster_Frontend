import React from "react";
import Layout from "./Layout";
import WeeklyCalendar from "./WeeklyCalender";

import "./Styles/AllShift.css"

const AllShift=()=>{


    return(
        <Layout>

            <div className="container-fluid">
        
        <span>Shifts</span>
        </div>
        <div>
        <WeeklyCalendar />
        </div>


        </Layout>
    )
}


export default AllShift;