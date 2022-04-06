import React, { useContext } from 'react';

import GlobalContext from '../context/GlobalContext';

const Labels = () => {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <div>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label, checked }, index) => (
        <label key={index} className="flex items-center mt-30">
          <input
            type="checkbox"
            onChange={() => updateLabel({ label, checked: !checked })}
            checked={checked}
            className={`form-checkbox h-5 w-5 bg-${label}-400`}
          />
          <span className="ml-2 text-gray-700 capitalize">{label}</span>
        </label>
      ))}
    </div>
  );
};

export default Labels;
