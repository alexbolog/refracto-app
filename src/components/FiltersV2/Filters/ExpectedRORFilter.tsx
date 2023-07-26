import React from 'react';
import MultiRangeSlider from 'components/MultiRangeSlider';
import { Filter } from './Filter';
import { AppliedFilter } from '../AppliedFilter';

const ExpectedRORFilter = ({
  onFilterChange
}: {
  onFilterChange: (newState: any) => void;
}) => {
  return (
    <>
      <div className='return-range-select filter-btn'>
        <button
          className='btn btn-primary dropdown-toggle dropdown'
          type='button'
          data-bs-toggle='dropdown'
          data-bs-auto-close='outside'
          aria-expanded='false'
        >
          Select Expected ROR
        </button>
        <div
          className='dropdown-menu'
          aria-labelledby='dropdownMenuButton1'
          style={{
            padding: '0',
            background: '#fff'
          }}
        >
          <div className='p-3'>
            <MultiRangeSlider
              title='Expected Rate of Return'
              description='Drag the slider and select your expected rate of return'
              min={0}
              max={100}
              onChange={(min, max) => onFilterChange({ min, max })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const EXPECTED_ROR_FILTER: Filter = {
  id: 'expected-ROR-range-filter',
  defaultState: { min: 0, max: 100 },
  filterComponent: (_, onFilterChange) => (
    <ExpectedRORFilter onFilterChange={onFilterChange} />
  ),
  appliedFilterComponent: (state, resetState) =>
    (state.min === undefined && state.max === undefined) ||
    (state.min === 0 && state.max === 100) ? (
      <></>
    ) : (
      <AppliedFilter
        filterText='Expected ROR'
        filterValue={`${state.min === undefined ? '0' : state.min}% - ${
          state.max === undefined ? '100' : state.max
        }%`}
        onRemoveFilter={resetState}
      />
    ),
  shouldDisplay: (item, state) => {
    if (item.expectedRor === undefined) {
      return false;
    }
    let min = 0;
    let max = 1;

    if (state.min !== undefined) {
      min = state.min / 100;
    }
    if (state.max !== undefined) {
      max = state.max / 100;
    }
    const target = item.expectedRor;
    return min <= target && target <= max;
  }
};
