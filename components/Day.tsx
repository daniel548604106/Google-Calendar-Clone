import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';

import GlobalContext from '../context/GlobalContext';
import { CalendarEvent } from './EventModal';

interface DayProps {
  day: any;
  rowIdx: number;
}

const Day = ({ day, rowIdx }: DayProps) => {
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState([]);

  function getCurrentDayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt: CalendarEvent) =>
        dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDayEvents(events);
  }, [day, filteredEvents]);
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt: CalendarEvent, i: number) => (
          <div
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            key={evt.id}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
