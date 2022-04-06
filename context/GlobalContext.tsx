import React from 'react';

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  smallCalendarMonth: 0 as number | null,
  setSmallCalendarMonth: (month: number | null) => {},
  daySelected: null,
  setDaySelected: (day: any | null) => {},
});

export default GlobalContext;
