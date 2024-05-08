'use client';

import { CMSCollection } from '@app/hooks/useWixClientServer';
import { formatDate } from '@app/utils/date-formatter';
import Link from 'next/link';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const browserLanguage = navigator.language;

export default function CalendarView({ items }: { items: CMSCollection }) {
  const itemsData = items.map((item) => item.data);

  const todaysDate = new Date();
  const todaysDateAtMidnight = new Date(todaysDate.setHours(0, 0, 0, 0));

  const [date, setDate] = useState(todaysDateAtMidnight);

  const handleCalendarChange = (value: Date) => {
    setDate(value);
  };

  const tileContent = ({
    date: currentDate,
    view,
  }: {
    date: Date;
    view: string;
  }) => {
    if (view === 'month') {
      const isBooked = itemsData.some((item) => {
        if (item) {
          const startDate = new Date(
            new Date(Date.parse(item.startDate)).setHours(0, 0, 0, 0)
          );
          const endDate = new Date(
            new Date(Date.parse(item.endDate)).setHours(0, 0, 0, 0)
          );
          currentDate.setHours(0, 0, 0, 0);

          const withinRange =
            startDate <= currentDate && currentDate <= endDate;

          return withinRange;
        }
      });

      if (isBooked) {
        return (
          <div
            style={{
              // 'linear-gradient(to right bottom, rgba(149, 199, 244, 0.6) 50%, rgba(0, 0, 0, 0) 50%)',
              backgroundColor: 'rgba(149, 199, 244, 0.6)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: '4px',
              borderRadius: '0.125rem',
            }}
          />
        );
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-y-8 items-center mt-12">
      <div className="w-full flex flex-col gap-y-4">
        <h2>Select a date to enquire</h2>
        <p className="p2">Check in only available on Saturdays</p>
        <div className="flex gap-x-2 mt-4">
          <div className="h-6 w-6 bg-blue-site opacity-60 rounded-sm"></div>
          <h5>BOOKED</h5>
        </div>
      </div>
      <Calendar
        onChange={(e) => handleCalendarChange(e as Date)}
        value={date}
        calendarType="gregory"
        showNeighboringMonth={false}
        tileContent={tileContent}
        tileClassName="relative bg-black disabled:!bg-black !text-white rounded-sm"
        locale={browserLanguage}
        className="text-white !bg-black rounded-lg !border-none !decoration-solid"
      />
      <div className="md:flex gap-x-2 mr-auto">
        <p>Want to book from {`${formatDate(date)}?`}</p>
        <Link
          href={`/contact?startDate=${date}#contact-form`}
          className="btn-main"
        >
          Enquire now
        </Link>
      </div>
    </div>
  );
}
