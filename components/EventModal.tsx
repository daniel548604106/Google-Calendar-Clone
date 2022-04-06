import Image from 'next/image';
import React, { useContext, useState } from 'react';

import GlobalContext from '../context/GlobalContext';

const labelClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal = () => {
  const { showEventModal, setShowEventModal, daySelected } =
    useContext(GlobalContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('indigo');

  return (
    <div className="h-screen w-full fixed inset-0 flex items-center justify-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="">
            <Image src="/icons/handle.svg" alt="close" width={30} height={30} />
          </span>
          <button onClick={() => setShowEventModal(false)}>
            <span>
              <Image
                src="/icons/close.svg"
                alt="close"
                width={30}
                height={30}
              />
            </span>
          </button>
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
                className={`bg-${labelClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
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
