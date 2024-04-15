// WeeklyCalendar.js

import React ,{useState} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./WeeklyCalendar.css"; 
import { startOfDay, addHours } from "date-fns";// Import the CSS Module
import Modal from 'react-modal';
import { useEffect } from "react";
import { variables } from "../apiConfig";
import {jwtDecode} from 'jwt-decode';

const localizer = momentLocalizer(moment);


Modal.setAppElement('#root');



const WeeklyCalendar = ({ events ,eventPropGetter} ) => {


  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState({ start: null, end: null });
  const [units, setUnits] = useState([]); // State to store units
  const [selectedUnit, setSelectedUnit] = useState(''); 

   // Function to fetch units from the backend
   const fetchUnits = async () => {
    // Replace this URL with the actual URL to your backend endpoint that returns units
    const response = await fetch(variables.API_URL +"units/all-units");
    const data = await response.json();
    setUnits(data);
  };

  useEffect(() => {
    fetchUnits();
  }, []);
 

   // Function to calculate the start of the week (Monday) for the selected date
   const getWeekStart = (date) => {
    const weekStart = new Date(date);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Adjust to Monday of the current week
    return weekStart;
  };

   // Function to calculate the end of the week (Sunday) for the selected date
   const getWeekEnd = (date) => {
    const weekEnd = getWeekStart(date);
    weekEnd.setDate(weekEnd.getDate() + 6); // Move to Sunday of the current week
    weekEnd.setHours(23, 59, 59, 999);
    return weekEnd;
  };

  // Function to handle the end of a selection
  const handleSelectSlot = ({ start }) => {
    // Calculate the start and end of the week from the selected date
    const weekStart = getWeekStart(start);
    const weekEnd = getWeekEnd(start);

    // Update the state with the week's range
    setSelectedSlot({ start: weekStart, end: weekEnd });
    setModalIsOpen(true);
  };
   // Function to handle closing the modal
   const closeModal = () => {
    setModalIsOpen(false);
  };

  // Function to handle the submission of the duty request
  const submitDutyRequest = () => {
    const consultantToken = sessionStorage.getItem('CONSULTANT_TOKEN');
    // Extract consultant ID from token. You'll need to replace this with your actual token parsing logic.
 
         const decodedToken = jwtDecode(consultantToken);
          console.log(decodedToken);
          const consultantId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        
          const dutyRequestData = {
      consultantId,
      start: new Date(selectedSlot.start).toISOString(),
      end: new Date(selectedSlot.end).toISOString(),
      unitId: selectedUnit,
               };

               // Here you would make the API call to submit dutyRequestData to the backend
        console.log('Submitting duty request:', dutyRequestData);

        closeModal();
               // Construct the POST request to send the duty request data to the backend.

               
          fetch(variables.API_URL+'ConsultantDuty/"create-request'  , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Include the token in the Authorization header if your API requires it
              'Authorization': `Bearer ${consultantToken}`
            },
            body: JSON.stringify(dutyRequestData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Duty request submitted successfully', data);
          closeModal();
            // Handle successful submission (e.g., show a success message, update the calendar)
          })
          .catch(error => {
            console.error('There was an error submitting the duty request', error);
            alert(error);
            closeModal();
            // Handle errors (e.g., show an error message)
          });

    
    
  };

  return (

    <>
      <div className="calendar-styles"> 
      <Calendar
        localizer={localizer}
      
        defaultView="week"
        events={events}
        eventPropGetter={eventPropGetter} 
         views={{ month: true, week: true, day: true }}
        step={60*12}
        timeslots={1}
         showMultiDayTimes
        defaultDate={new Date()}
        onSelectSlot={handleSelectSlot}
        selectable='ignoreEvents' // This will allow selecting time slots
      />
    </div>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Duty Request Modal"
      >
              <div className="Modal-header">
            <h2>Select Shift</h2>
          </div>
          <div className="Modal-body">
            <p>
              {`Selected Slot: ${moment(selectedSlot.start).format('LL')} - ${moment(selectedSlot.end).format('LL')}`}
            </p>
            
            <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} className="Modal-select">
              {units.map(unit => (
                <option key={unit.Id} value={unit.Id}>{unit.Name}</option>
              ))}
            </select>
          </div>
          <div className="Modal-footer">
            <button onClick={submitDutyRequest} className="Modal-button SubmitButton">Submit Duty Request</button>
            <button onClick={closeModal} className="Modal-button CancelButton">Cancel</button>
          </div>
      </Modal>

    </>
  );
};

export default WeeklyCalendar;
