import React, { useEffect, useState } from 'react';

export const RatingSelect = ({
  onChange
}: {
  onChange: (ratings: string[]) => void;
}) => {
  const [lowRiskSelected, setLowRiskSelected] = useState(true);
  const [mediumRiskSelected, setMediumRiskSelected] = useState(true);
  const [highRiskSelected, setHighRiskSelected] = useState(true);

  useEffect(() => {
    const ratings = [];
    if (lowRiskSelected) {
      ratings.push('Low');
    }
    if (mediumRiskSelected) {
      ratings.push('Medium');
    }
    if (highRiskSelected) {
      ratings.push('High');
    }
    onChange(ratings);
  }, [lowRiskSelected, mediumRiskSelected, highRiskSelected]);

  return (
    <div className='rating-select'>
      <button
        className='btn btn-primary dropdown-toggle dropdown'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Select Rating
      </button>
      <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
        <li>
          <div className='dropdown-item'>
            <input
              type='checkbox'
              defaultChecked={lowRiskSelected}
              id='low-risk-checkbox'
              onChange={() => setLowRiskSelected(!lowRiskSelected)}
            />
            <label htmlFor='low-risk-checkbox' className='ml-3'>
              Low Risk
            </label>
          </div>
        </li>
        <li>
          <div className='dropdown-item'>
            <input
              type='checkbox'
              defaultChecked={mediumRiskSelected}
              id='medium-risk-checkbox'
              onChange={() => setMediumRiskSelected(!mediumRiskSelected)}
            />
            <label htmlFor='medium-risk-checkbox' className='ml-3'>
              Medium Risk
            </label>
          </div>
        </li>
        <li>
          <div className='dropdown-item'>
            <input
              type='checkbox'
              defaultChecked={highRiskSelected}
              id='high-risk-checkbox'
              onChange={() => setHighRiskSelected(!highRiskSelected)}
            />
            <label htmlFor='high-risk-checkbox' className='ml-3'>
              High Risk
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};
