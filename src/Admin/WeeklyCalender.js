// WeeklyCalendar.js

import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Styles/WeeklyCalendar.css"; 
import { startOfDay, addHours } from "date-fns";// Import the CSS Module

const localizer = momentLocalizer(moment);

const events = [
    {
      start: new Date(),
      end: addHours(new Date(), 1),
      title: "Test Event",
    },
    {
      start: new Date(),
      end: addHours(new Date(), 1),
      title: "Test Event",
    },
    {
      start: new Date(),
      end: addHours(new Date(), 1),
      title: "Test Event",
    },
    // add more events
  ]

const WeeklyCalendar = () => {
  return (
        <div className="calendar-styles"> 
      <Calendar
        localizer={localizer}
        selectable
        events={events}
        views={{ month: true, week: true, day: true }}
        step={60}
        showMultiDayTimes
        defaultDate={new Date()}
      />
    </div>
  );
};

export default WeeklyCalendar;
