import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { AppliedFilter } from '../AppliedFilter';
import Dropdown from 'components/Dropdown';

interface RatingSelectFilterProps {
  state: string[];
  onFilterChange: (newState: string[]) => void;
}

const RatingSelectFilter = ({
  state,
  onFilterChange
}: RatingSelectFilterProps) => {
  const options = [
    { label: 'Low Risk', value: 'Low' },
    { label: 'Medium Risk', value: 'Medium' },
    { label: 'High Risk', value: 'High' }
  ];

  const [selectedRatings, setSelectedRatings] = useState<string[]>(state);

  useEffect(() => {
    onFilterChange(selectedRatings);
  }, [selectedRatings]);

  return (
    // <>
    //   <div className='rating-select filter-btn dsk'>
    //     <button
    //       className='btn btn-primary dropdown-toggle dropdown'
    //       type='button'
    //       data-bs-toggle='dropdown'
    //       data-bs-auto-close='outside'
    //       aria-expanded='false'
    //     >
    //       Select Rating
    //     </button>
    //     <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
    //       <li>
    //         <div className='dropdown-item'>
    //           <input
    //             type='checkbox'
    //             defaultChecked={lowRiskSelected}
    //             id='low-risk-checkbox'
    //             onChange={() => setLowRiskSelected(!lowRiskSelected)}
    //           />
    //           <label htmlFor='low-risk-checkbox' className='ml-3'>
    //             Low Risk
    //           </label>
    //         </div>
    //       </li>
    //       <li>
    //         <div className='dropdown-item'>
    //           <input
    //             type='checkbox'
    //             defaultChecked={mediumRiskSelected}
    //             id='medium-risk-checkbox'
    //             onChange={() => setMediumRiskSelected(!mediumRiskSelected)}
    //           />
    //           <label htmlFor='medium-risk-checkbox' className='ml-3'>
    //             Medium Risk
    //           </label>
    //         </div>
    //       </li>
    //       <li>
    //         <div className='dropdown-item'>
    //           <input
    //             type='checkbox'
    //             defaultChecked={highRiskSelected}
    //             id='high-risk-checkbox'
    //             onChange={() => setHighRiskSelected(!highRiskSelected)}
    //           />
    //           <label htmlFor='high-risk-checkbox' className='ml-3'>
    //             High Risk
    //           </label>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className='rating-select filter-btn mbl'>
    //     <button
    //       className='btn btn-primary dropdown-toggle dropdown w-100'
    //       type='button'
    //       data-bs-toggle='dropdown'
    //       data-bs-auto-close='outside'
    //       aria-expanded='false'
    //     >
    //       Select Rating
    //     </button>
    //     <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
    //       <li>
    //         <div className='dropdown-item'>
    //           <input
    //             type='checkbox'
    //             defaultChecked={lowRiskSelected}
    //             id='low-risk-checkbox'
    //             onChange={() => setLowRiskSelected(!lowRiskSelected)}
    //           />
    //           <label htmlFor='low-risk-checkbox' className='ml-3'>
    //             Low Risk
    //           </label>
    //         </div>
    //       </li>
    //       <li>
    //         <div className='dropdown-item'>
    //           <input
    //             type='checkbox'
    //             defaultChecked={mediumRiskSelected}
    //             id='medium-risk-checkbox'
    //             onChange={() => setMediumRiskSelected(!mediumRiskSelected)}
    //           />
    //           <label htmlFor='medium-risk-checkbox' className='ml-3'>
    //             Medium Risk
    //           </label>
    //         </div>
    //       </li>
    //       <li>
    //         <div className='dropdown-item'>
    //           <input
    //             type='checkbox'
    //             defaultChecked={highRiskSelected}
    //             id='high-risk-checkbox'
    //             onChange={() => setHighRiskSelected(!highRiskSelected)}
    //           />
    //           <label htmlFor='high-risk-checkbox' className='ml-3'>
    //             High Risk
    //           </label>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    // </>
    <div className='rating-select'>
      <Dropdown
        options={options}
        onChange={setSelectedRatings}
        label={'Select Rating'}
      />
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
