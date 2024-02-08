import React from "react";
import Layout from "../Layout";
import './MOLeaves.css';
import WeeklyCalendar from "../WeeklyCalender";

const MOLeaves =()=>{


    return(

        <Layout>
             <div className="container-fluid">
        
        <span>MO's Leave Requests</span>
        </div>
        <div>
        <WeeklyCalendar />
        </div>

        </Layout>
    )
}


export default MOLeaves;