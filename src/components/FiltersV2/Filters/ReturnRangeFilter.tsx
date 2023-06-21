import React from 'react';
import MultiRangeSlider from 'components/MultiRangeSlider';
import { Filter } from './Filter';
import { AppliedFilter } from '../AppliedFilter';

const ReturnRangeFilter = ({
  onFilterChange
}: {
  onFilterChange: (newState: any) => void;
}) => {
  return (
    <>
      <div className='return-range-select filter-btn dsk'>
        <button
          className='btn btn-primary dropdown-toggle dropdown'
          type='button'
          data-bs-toggle='dropdown'
          data-bs-auto-close='outside'
          aria-expanded='false'
        >
          Select Return Range
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
              min={0}
              max={100}
              onChange={(min, max) => onFilterChange({ min, max })}
              title='Expected Return Range'
              description='Drag the slider and select your expected return range'
            />
          </div>
        </div>
      </div>
      <div className='return-range-select filter-btn mbl'>
        <button
          className='btn btn-primary dropdown-toggle dropdown w-100'
          type='button'
          data-bs-toggle='dropdown'
          data-bs-auto-close='outside'
          aria-expanded='false'
        >
          Select Return Range
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
              min={0}
              max={100}
              onChange={(min, max) => onFilterChange({ min, max })}
              title='Expected Return Range'
              description='Drag the slider and select your expected return range'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const RETURN_RANGE_FILTER: Filter = {
  id: 'return-range-filter',
  defaultState: { min: 0, max: 100 },
  filterComponent: (_, onFilterChange) => (
    <ReturnRangeFilter onFilterChange={onFilterChange} />
  ),
  appliedFilterComponent: (state, resetState, isMobile) =>
    (state.min === undefined && state.max === undefined) ||
    (state.min === 0 && state.max === 100) ? (
      <></>
    ) : (
      <AppliedFilter
        filterText='Return range'
        filterValue={`${state.min === undefined ? '0' : state.min}% - ${
          state.max === undefined ? '100' : state.max
        }%`}
        onRemoveFilter={resetState}
        isMobile={isMobile}
      />
    ),
  shouldDisplay: (item, state) => {
    if (item.returnPercentage === undefined) {
      return false;
    }
    let min = 0;
    let max = 100;

    if (state.min !== undefined) {
      min = state.min;
    }
    if (state.max !== undefined) {
      max = state.max;
    }
    const target = item.returnPercentage * 100;
    return min <= target && target <= max;
  }
};
