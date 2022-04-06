import dayjs from 'dayjs';
import React, { useState } from 'react';

import GlobalContext from './GlobalContext';

interface ContextWrapperProps {
  children: React.ReactNode;
}

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
