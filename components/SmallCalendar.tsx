import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';

import GlobalContext from '../context/GlobalContext';
import { getMonth } from '../utils/day';

const SmallCalendar = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const handleChangeMonth = (index: number) => {
    setCurrentMonthIndex(index);
  };

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  const getDayClass = (day: any) => {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currentDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);

    if (nowDay === currentDay) {
      return 'bg-blue-500 rounded-full text-white';
    } else if (currentDay === slcDay) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold';
    } else {
      return '';
    }
  };

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            'MMMM YYYY'
          )}
        </p>
        <div>
          <button onClick={() => handleChangeMonth(currentMonthIndex - 1)}>
            <span className="cursor-pointer text-gray-600 mx-2">
              <Image
                width={30}
                height={30}
                className="flex items-center justify-center"
                src="/icons/chevron-left.svg"
                alt="left-icon"
              />
            </span>
          </button>
          <button onClick={() => handleChangeMonth(currentMonthIndex + 1)}>
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
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, idx) => (
          <span className="text-sm py-1 text-center" key={idx}>
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                onClick={() => {
                  setDaySelected(day);
                  setSmallCalendarMonth(currentMonthIndex);
                }}
                key={idx}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
