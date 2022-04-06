import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import GlobalContext from './GlobalContext';

interface ContextWrapperProps {
  children: React.ReactNode;
}

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<null | number>(
    null
  );

  const [daySelected, setDaySelected] = useState<null | any>(null);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
