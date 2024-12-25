import { useState } from "react";
import "./Calender2.css";

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate()); // Default to today's date
  const today = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // National holidays and events
  const holidays = {
    "1-1": { name: "New Year", details: "Happy New Year.", image: "new year.jpg" },
    "15-8": { name: "Independence Day", details: "Celebrate the freedom of India.", image: "independence.jpg" },
    "2-10": { name: "Gandhi Jayanti", details: "Remembering the father of the nation.", image: "gandhi.jpg" },
    "25-12": { name: "Christmas", details: "A day to celebrate peace and goodwill.", image: "christmas.jpeg" },
    "10-11": { name: "Diwali", details: "Festival of Lights.", image: "diwali.jpg" },
    // Add more holidays here
  };

  const events = {
    "5": ["Event 1 - Lorem Ipsum"],
    "10": ["Event 3 - Lorem Ipsum"],
    "15": ["Event 4 - Lorem Ipsum"],
    "25": ["Event 6 - Lorem Ipsum"],
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

    const blanks = Array.from({ length: firstDayOfMonth }, () => null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const allDays = [...blanks, ...days];

    return allDays.map((day, index) => {
      const isToday =
        day &&
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      // const isHoliday = holidays[day];
      const isHoliday = holidays[`${day}-${currentMonth + 1}`];


      return (
        <div key={index} className={`day-container`}>
          <div
            className={`day ${day ? "filled" : "empty"} ${
              isToday ? "today" : ""
            } ${day && !events[day] && !isHoliday ? "" : "event-day"}`}
            onClick={() => handleDayClick(day)}
          >
            {day && <span>{day}</span>}
          </div>
           {/* {events[day] && (
            <div className="events">
              {events[day].map((event, idx) => (
                <div key={idx} className="event">
                  {event}
                </div>
              ))}
            </div>
          )} */}
        </div>
      );
    });
  };

  const getDayDetails = (day) => {
    // const isHoliday = holidays[day];
    const isHoliday = holidays[`${day}-${currentMonth + 1}`]
    if (isHoliday) {
      return (
        <div className="day-details">
          <h3>{isHoliday.name}</h3>
          <p>{isHoliday.details}</p>
          <img src={`./images/${isHoliday.image}`} alt={isHoliday.name} />
        </div>
      );
    }

    return (
      <div className="day-details">
        <h3>{months[currentMonth]} {day}, {currentYear}</h3>
        <h2 className="red">No Events</h2>
        <p>Embrace the opportunities this month brings, and let each day be a step closer to your goals!</p>
        <img src={`./images/${currentMonth + 1}.jpg`} alt="Day" />
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="header">
          <button onClick={handlePreviousMonth}>&lt;</button>
          <h2>
            {months[currentMonth]} {currentYear}
          </h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="weekdays">
          {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="days-grid">{renderDays()}</div>
      </div>
      <div className="day-detail-container">
        {getDayDetails(selectedDate)}
      </div>
    </div>
  );
};

export default Calender;

