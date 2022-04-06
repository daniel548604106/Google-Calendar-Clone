import React, { useContext } from 'react';

import GlobalContext from '../context/GlobalContext';

const CreateEventButton = () => {
  const { showEventModal, setShowEventModal } = useContext(GlobalContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      <span className="pl-3 pr-7">Create</span>
    </button>
  );
};

export default CreateEventButton;
