'use client';

import Link from 'next/link';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ items }) {
  const itemsData = items.map((item) => item.data);

  const [date, setDate] = useState(new Date());

  const handleCalendarChange = (value) => {
    setDate(value);
  };

  const tileContent = ({ date: currentDate, view }) => {
    if (view === 'month') {
      // Check if any booking falls on the current date
      const isBooked = itemsData.some((item) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        // Convert current date to start of day to compare
        const currentDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        // Check if current day is within booking range
        const withinRange = startDate <= currentDay && currentDay <= endDate;
        return withinRange;
      });

      // If booked, return custom content to mark the day
      if (isBooked) {
        const currentDay = new Date(currentDate).getUTCDay();
        const isSaturday = currentDay === 5;

        return (
          <button
            disabled={!isSaturday}
            style={{
              backgroundColor: 'rgba(135, 81, 189, 0.2)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: '4px',
            }}
          ></button>
        );
      }
    }
    return null;
  };

  const browserLanguage = navigator.language;

  return (
    <>
      <Calendar
        onChange={handleCalendarChange}
        value={date}
        calendarType="gregory"
        showNeighboringMonth={false}
        tileContent={tileContent}
        tileClassName="relative"
        locale={browserLanguage}
      />
      <div>
        Want to book from {date.toDateString()}?{' '}
        <Link
          href={`/contact?startDate=${date}`}
          className="text-purple-site underline"
        >
          enquire here
        </Link>
      </div>
    </>
  );
}
