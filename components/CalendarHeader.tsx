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
          <Image
            width={30}
            height={30}
            src="/icons/chevron-left.svg"
            alt="left-icon"
          />
        </span>
      </button>
      <button onClick={() => handleChangeMonth(monthIndex + 1)}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <Image
            width={30}
            height={30}
            className="flex items-center justify-center"
            src="/icons/chevron-right.svg"
            alt="left-icon"
          />
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  );
};

export default CalendarHeader;
