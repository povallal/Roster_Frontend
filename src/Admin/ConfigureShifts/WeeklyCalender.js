// WeeklyCalendar.js

import React,{useState} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./WeeklyCalendar.css"; 
import { startOfDay, addHours } from "date-fns";// Import the CSS Module
import { useContext } from "react";
import DutyRequestContext from './DutyRequestContext';

const localizer = momentLocalizer(moment);

function UpdateStatusModal({ isOpen, onClose, onUpdate, requestId }) {
  return (
    isOpen ? (
      <div className="modal">
        <p>Update the status of the request:</p>
        <button onClick={() => onUpdate(requestId, 'Accepted')}>Accept</button>
        <button onClick={() => onUpdate(requestId, 'Rejected')}>Reject</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  );
}

const WeeklyCalendar = ({ events ,eventPropGetter}) => {
  const { handleRequestUpdate } = useContext(DutyRequestContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);

const openModal = (requestId) => {
  setCurrentRequestId(requestId);
  setIsModalOpen(true);
};

// Add to your component's return statement
<UpdateStatusModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onUpdate={handleRequestUpdate}
  requestId={currentRequestId}
/>
  return (
        <div className="calendar-styles"> 
      <Calendar
        localizer={localizer}
        selectable
        defaultView="week"
         events={events}
        views={{ month: true, week: true, day: true }}
        step={60*6}
        timeslots={1}
        showMultiDayTimes
        defaultDate={new Date()}
        eventPropGetter={eventPropGetter} // Use the prop here
        onSelectEvent={event => {
          const dutyRequest = event.resource; // Access the original duty request
          console.log("Selected duty request:", dutyRequest);
          openModal(dutyRequest.Id);
          // You can now use dutyRequest to show details or to approve/reject
        }}
       
        


      />
        {/* Ensure UpdateStatusModal is within the return statement */}
        <UpdateStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={(requestId, status) => {
          handleRequestUpdate(requestId, status).then(() => {
            setIsModalOpen(false); // Close the modal after updating
            // Optionally, refresh the events here to reflect the change
          });
        }}
        requestId={currentRequestId}
      />

    </div>
  );
};

export default WeeklyCalendar;
