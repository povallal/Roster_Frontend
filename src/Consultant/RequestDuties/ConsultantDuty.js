import React,{useState} from "react";
import Layout from "../Layout";
import WeeklyCalendar from "./WeeklyCalender";
import './ConsultantDuty.css';
import { jwtDecode } from "jwt-decode";
import { variables } from "../apiConfig";
import { useEffect } from "react";



const ConsultantDuty =()=>{

    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetchDutyRequests().then(data => {
          const transformedEvents = data.map(req => ({
            // Transformation logic...
            start: new Date(req.StartDate),
            end: new Date(req.EndDate),
            title: `Shift: ${req.Status}  -Unit:${req.UnitName || req.UnitId}`,// Customize this as needed
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
        const consultantToken = sessionStorage.getItem('CONSULTANT_TOKEN');
        // Decode the token to extract the consultant ID
        const decodedToken = jwtDecode(consultantToken);
        const consultantId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      
        const response = await fetch(`${variables.API_URL}ConsultantDuty/fetch-request?consultantId=${consultantId}&statuses=Pending&statuses=Accepted&statuses=Rejected`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${consultantToken}`, // Make sure to use the correct token
          },
        });
        
        if (!response.ok) {
          throw new Error('Server responded with an error.');
        }
        const data = await response.json();
        return data;
      };
      

    

    return(
        <Layout>
        <div className="container-fluid">
        
        <h2>Consultants Duty Requests</h2>
        </div>
        <div>
        <WeeklyCalendar  events={events} eventPropGetter={eventStyleGetter}/>
        </div>


        </Layout>
    )
}



export default ConsultantDuty;