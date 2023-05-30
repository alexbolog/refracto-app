import React, { useState } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onChange: (selectedValue: string[]) => void;
  label: string;
}

const Dropdown = ({ options, onChange, label }: DropdownProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleOptionChange = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedSelectedValues);
    onChange(updatedSelectedValues);
  };

  return (
    <div className='dropdown'>
      <button
        className='btn btn-primary dropdown-toggle'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {label}
      </button>
      <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
        {options.map((option) => (
          <li key={option.value}>
            <div className='dropdown-item'>
              <input
                type='checkbox'
                checked={selectedValues.includes(option.value)}
                id={`checkbox-${option.value}`}
                onChange={() => handleOptionChange(option.value)}
              />
              <label htmlFor={`checkbox-${option.value}`} className='ml-3'>
                {option.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
