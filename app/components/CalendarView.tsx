'use client';

import { formatDate } from '@app/utils/date-formatter';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({
  items,
  className,
  title,
  subtitle,
}: {
  items: (Record<string, any> | null | undefined)[];
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  const [browserLanguage, setBrowserLanguage] = useState<string>();

  useEffect(() => {
    if (navigator) {
      setBrowserLanguage(navigator.language);
    }
  }, []);

  const itemsData = items.map((item) => item?.data);

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
    <div
      className={classNames(
        className,
        'flex flex-col gap-y-4 items-center bg-slate-site rounded-lg py-2 md:px-2'
      )}
    >
      <div className="text-center flex flex-col gap-y-1">
        {title && <h2>Select a date to enquire</h2>}
        {subtitle && <p className="p2">Check in only available on Saturdays</p>}
        <div className="flex justify-center gap-x-2 mt-4 items-center">
          <div className="h-4 w-4 bg-blue-site opacity-60 rounded-sm" />
          <h6>BOOKED</h6>
        </div>
      </div>
      <Calendar
        onChange={(e) => handleCalendarChange(e as Date)}
        value={date}
        calendarType="gregory"
        showNeighboringMonth={false}
        tileContent={tileContent}
        tileClassName="relative bg-black disabled:!bg-black !text-white rounded-sm"
        locale={browserLanguage || 'en'}
        className="text-white !bg-slate-site rounded-lg !border-none !decoration-solid"
      />
      <div className="flex flex-col gap-y-2 items-center text-center">
        <p className="p2">Want to book from {`${formatDate(date)}?`}</p>
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
