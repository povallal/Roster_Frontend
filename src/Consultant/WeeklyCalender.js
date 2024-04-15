// WeeklyCalendar.js

import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Styles/WeeklyCalendar.css"; 
import { startOfDay, addHours } from "date-fns";// Import the CSS Module

const localizer = momentLocalizer(moment);





const WeeklyCalendar = () => {
  return (
      <div className="calendar-styles"> 
      <Calendar
        localizer={localizer}
        selectable
        defaultView="week"
        
      
         views={{ month: true, week: true, day: true }}
        step={60*12}
        timeslots={1}
         showMultiDayTimes
        defaultDate={new Date()}
      />
    </div>
  );
};

export default WeeklyCalendar;
