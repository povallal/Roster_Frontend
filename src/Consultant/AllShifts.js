import React,{useState} from "react";
import Layout from "./Layout";
import WeeklyCalendar from "./WeeklyCalender";

import "./Styles/AllShift.css"

const AllShiftCon=()=>{

    

    return(
        <Layout>
        
         <div className="container-fluid">
        
        <h2>Scheduled Shift Today</h2>
        </div>

      
        <WeeklyCalendar />
       


        </Layout>
    )
}


export default AllShiftCon;