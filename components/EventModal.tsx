import Image from 'next/image';
import React, { useContext, useState } from 'react';

import GlobalContext from '../context/GlobalContext';

const labelClasses = ['blue', 'red'];

interface CalendarEvent {
  title: string;
  description: string;
  label: string;
  day: number;
  id: number;
}

const EventModal = () => {
  const {
    showEventModal,
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : 'indigo'
  );

  function generateLabelClasses(i: number) {
    const bg = `bg-${labelClasses[i]}-500`;
    return `${bg} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const calendarEvent: CalendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected?.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
    }
    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed inset-0 flex items-center justify-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="">
            <Image src="/icons/handle.svg" alt="close" width={30} height={30} />
          </span>
          <div>
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({ type: 'delete', payload: selectedEvent });
                  setShowEventModal(false);
                  setSelectedEvent(null);
                }}
              >
                <span>
                  <Image
                    src="/icons/trash.svg"
                    alt="close"
                    width={30}
                    height={30}
                  />
                </span>
              </button>
            )}
            <button
              onClick={() => {
                setShowEventModal(false);
                setSelectedEvent(null);
              }}
            >
              <span>
                <Image
                  src="/icons/close.svg"
                  alt="close"
                  width={30}
                  height={30}
                />
              </span>
            </button>
          </div>
        </header>
        <div className="p-3 space-y-4">
          <div className="flex items-center">
            <div></div>
            <input
              type="text"
              name="title"
              className="ml-10 pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="Add Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-5">
            <Image src="/icons/time.svg" alt="close" width={25} height={25} />
            <p>{daySelected?.format('dddd, MMMM DD')}</p>
          </div>
          <div className="flex items-center space-x-5">
            <Image
              src="/icons/segment.svg"
              alt="close"
              width={25}
              height={25}
            />
            <input
              type="text"
              name="description"
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="Add a description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />{' '}
          </div>
          <div className="flex items-center space-x-5">
            <Image
              src="/icons/bookmark.svg"
              alt="check"
              className="text-white"
              width={25}
              height={25}
            />
            {labelClasses.map((labelClass, i) => (
              <span
                onClick={() => setSelectedLabel(labelClass)}
                className={`${generateLabelClasses(i)}`}
                key={i}
              >
                {selectedLabel === labelClass && (
                  <Image
                    src="/icons/check.svg"
                    alt="check"
                    className="text-white"
                    width={15}
                    height={15}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
export type { CalendarEvent };
