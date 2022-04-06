import dayjs from 'dayjs';
import React, { useEffect, useMemo, useReducer, useState } from 'react';

import { CalendarEvent } from '../components/EventModal';
import GlobalContext from './GlobalContext';

interface ContextWrapperProps {
  children: React.ReactNode;
}

function savedEventsReducer(
  state: any,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case 'push':
      return [...state, payload];
      break;
    case 'update':
      return state.map((evt: CalendarEvent) =>
        evt.id === payload.id ? payload : evt
      );
      break;
    case 'delete':
      return state.filter((evt: CalendarEvent) => evt.id !== payload.id);

    default:
      throw new Error();
      break;
  }
}

function initEvents() {
  if (typeof localStorage !== 'undefined') {
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
  }
}

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<null | number>(
    null
  );

  const [selectedEvent, setSelectedEvent] = useState<null | CalendarEvent>(
    null
  );
  const [daySelected, setDaySelected] = useState<any>(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [labels, setLabels] = useState<{ label: string; checked: boolean }[]>(
    []
  );

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents?.filter((evt: any) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  function updateLabel(label: { label: string; checked: boolean }) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [
        ...new Set<string>(
          savedEvents.map(
            (evt: { label: string; checked: boolean }) => evt.label
          )
        ),
      ].map((label: string) => {
        const currentLabel = prevLabels.find(
          (lbl: { label: string; checked: boolean }) => lbl.label === label
        );
        return { label, checked: currentLabel ? currentLabel.checked : true };
      });
    });
  }, [savedEvents]);

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
        showEventModal,
        setShowEventModal,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        dispatchCalEvent,
        labels,
        filteredEvents,
        updateLabel,
        setLabels,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
