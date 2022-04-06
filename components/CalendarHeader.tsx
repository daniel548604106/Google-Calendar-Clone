import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useContext } from 'react';

import GlobalContext from '../context/GlobalContext';

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handleChangeMonth = (index: number) => {
    setMonthIndex(index);
  };

  const handleResetMonth = () => {
    setMonthIndex(dayjs().month());
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <Image
        width={50}
        height={50}
        src="/google-calendar-logo.png"
        alt="google calendar logo"
      />
      <h2 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h2>
      <button
        onClick={() => handleResetMonth()}
        className="border rounded py-2 px-4 mr-5"
      >
        Today
      </button>
      <button onClick={() => handleChangeMonth(monthIndex - 1)}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
      </button>
      <button onClick={() => handleChangeMonth(monthIndex + 1)}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  );
};

export default CalendarHeader;
