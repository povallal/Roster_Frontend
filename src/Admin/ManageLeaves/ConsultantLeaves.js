
import React from "react";
import Layout from "../Layout";
import WeeklyCalendar from "../WeeklyCalender";
import './ConsultantLeaves.css'


const ConsultantLeaves = () =>{
    

    return(

        <Layout>
            
        <div className="container-fluid">
        
        <span>Consultants Leave Requests</span>
        </div>
        <div>
        <WeeklyCalendar />
        </div>
     

        </Layout>
    )
}


export default ConsultantLeaves;

