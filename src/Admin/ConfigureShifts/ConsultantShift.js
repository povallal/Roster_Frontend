import React,{useState} from "react";
import Layout from "../Layout";
import WeeklyCalendar from "./WeeklyCalender";
import { useEffect } from "react";
import { variables } from "../apiConfig";
import './ConsultantShift.css';
import DutyRequestContext from './DutyRequestContext';


const ConsultantShitft=()=>{

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchDutyRequests().then(data => {
          const transformedEvents = data.map(req => ({
            start: new Date(req.StartDate),
            end: new Date(req.EndDate),
            title: `Shift: ${req.Status} - Consultant: ${req.ConsultantName || req.ConsultantId} -Unit:${req.UnitName || req.UnitId}`,// Customize this as needed
            allDay: true, // if your events are all day events
            resource: req, // if you need to store the original request object
            status: req.Status, 
        
            
          }));
      
          setEvents(transformedEvents);
        });
      }, []);

      const eventStyleGetter = (event) => {
        let backgroundColor = '#3174ad'; // Default color for pending requests
        if (event.status === 'Accepted') {
          backgroundColor = '#28a745'; // Green for accepted requests
        } else if (event.status === 'Rejected') {
          backgroundColor = '#dc3545'; // Red for rejected requests
        }
      
        return {
          style: {
            backgroundColor
          }
        };
      };

      
      const fetchDutyRequests = async () => {
        const adminToken = sessionStorage.getItem('ADMIN_TOKEN');
        const response = await fetch(variables.API_URL+'ConsultantDuty/fetch-requests?statuses=Pending&statuses=Accepted&statuses=Rejected', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`, // Make sure to use the correct token
          },
        });
        if (!response.ok) {
            throw new Error('Server responded with an error.');
          }
        const data = await response.json();
        console.log("fetched duty requests",data);
        return data;
      };

      

      const handleRequestUpdate = async (requestId, Status) => {
        console.log("Amdin Duty Accept called",requestId,Status);
        const adminToken = sessionStorage.getItem('ADMIN_TOKEN');

        const response = await fetch(variables.API_URL+`ConsultantDuty/update-request-status/${requestId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ Status }),
        })
      
        .then(() => {
            // Fetch updated duty requests to reflect the change in the calendar
            fetchDutyRequests().then(setEvents); // Assuming setEvents updates your component state
          })
          .catch(error => {
            console.error('Error updating request:', error);
          });
      };



    return(
        <Layout>
        <div className="container-fluid">
        
        <h2> Shift Requests By Consultants</h2>
        </div>
        <div>
        <DutyRequestContext.Provider value={{ handleRequestUpdate }}>
                {/* components that need access to handleRequestUpdate */}
                <WeeklyCalendar events={events} eventPropGetter={eventStyleGetter} />
                </DutyRequestContext.Provider>
        </div>


        </Layout>
    )
}


export default ConsultantShitft;