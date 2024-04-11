import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles'; // Import useTheme hook
import { tokens } from "../../theme";
import Header from "../../components/Header";
import './index.css'; // Import the CSS file for styling

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    const blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(
        <td key={`blank-${i}`} className="calendar-day empty">{""}</td>
      );
    }

    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <td key={`day-${day}`} className="calendar-day">
          {day}
        </td>
      );
    }

    const totalSlots = [...blanks, ...days];
    const rows = [];
    let cells = [];

    totalSlots.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(day);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, i) => {
      return <tr key={`row-${i}`}>{row}</tr>;
    });
  };

  const prevMonth = () => {
    setCurrentMonth(prevMonth => {
      const prev = new Date(prevMonth);
      prev.setMonth(prev.getMonth() - 1);
      return prev;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(nextMonth => {
      const next = new Date(nextMonth);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  };

  return (
    <div className="calendar-container"> {/* Centered container */}
      <h1>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h1>
      <div className="calendar-nav">
        <button onClick={prevMonth}>&#8249;</button>
        <button onClick={nextMonth}>&#8250;</button>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            {weekdaysShort.map((day, index) => (
              <th key={index} className="calendar-header">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateCalendar()}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
