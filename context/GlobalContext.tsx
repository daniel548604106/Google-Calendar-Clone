import React from 'react';

import { CalendarEvent } from '../components/EventModal';

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  smallCalendarMonth: 0 as number | null,
  setSmallCalendarMonth: (month: number | null) => {},
  daySelected: null as null | any,
  setDaySelected: (day: any | null) => {},
  showEventModal: false,
  setShowEventModal: (show: boolean) => {},
  savedEvents: [],
  dispatchCalEvent: ({ type, payload }: { type: string; payload: any }) => {},
  selectedEvent: null as null | CalendarEvent,
  setSelectedEvent: (event: any | null) => {},
  labels: [] as { label: string; checked: boolean }[],
  setLabels: (labels: { label: string; checked: boolean }[]) => {},
  updateLabel: ({ label, checked }: { label: string; checked: boolean }) => {},
  filteredEvents: [],
});

export default GlobalContext;
