import React, { useEffect, useState } from 'react';
import MultiRangeSlider from 'components/MultiRangeSlider';
import { Filter } from './Filter';
import { AppliedFilter } from '../AppliedFilter';

const RatingSelectFilter = ({
  state,
  onFilterChange
}: {
  state: string[];
  onFilterChange: (newState: any) => void;
}) => {
  const [lowRiskSelected, setLowRiskSelected] = useState(state.includes('Low'));
  const [mediumRiskSelected, setMediumRiskSelected] = useState(
    state.includes('Medium')
  );
  const [highRiskSelected, setHighRiskSelected] = useState(
    state.includes('High')
  );

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
    onFilterChange(ratings);
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

export const RATING_SELECT_FILTER: Filter = {
  id: 'risk-rating-filter',
  defaultState: ['Low', 'Medium', 'High'],
  filterComponent: (_, onFilterChange) => (
    <RatingSelectFilter state={_} onFilterChange={onFilterChange} />
  ),
  appliedFilterComponent: (state, resetState) =>
    state.length === 3 ? (
      <></>
    ) : (
      <AppliedFilter
        filterText='Rating'
        filterValue={state.length === 0 ? 'None' : state.join(', ')}
        onRemoveFilter={resetState}
      />
    ),
  shouldDisplay: (item, state) => {
    if (state !== undefined && state.length !== undefined && state.length > 0) {
      const riskLevelCheck =
        state.filter((lvl: string) => item.riskRatingLevel.includes(lvl))
          .length > 0;
      return riskLevelCheck;
    }
    return false;
  }
};
