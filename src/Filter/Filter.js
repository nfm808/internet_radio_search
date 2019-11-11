import React from 'react';
import './Filter.css';

const Filter = ({label, options, filterFunc, all}) => {

  return (
    <section className="Filter">
      <label 
        className="green" 
        htmlFor="filterSelect"
      >
        {label} 
      </label>
      <select 
        onChange={(e) => filterFunc(e.target.value)} 
        id="filterSelect"
      > 
        {all && <option 
          className="Filter--option"
          value="All"
        >
          All
        </option>}
        {options.map(option => 
          <option 
            key={option}
            className="Filter--option" 
            value={option}
          >
            {option}
          </option>
        )}
      </select>
    </section>
  )
};

export default Filter;