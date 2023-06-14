import React from 'react';
import MultiRangeSlider from 'components/MultiRangeSlider';
import { Filter } from './Filter';
import { AppliedFilter } from '../AppliedFilter';

const PriceRangeFilter = ({
  min,
  max,
  onFilterChange
}: {
  min: number;
  max: number;
  onFilterChange: (newState: any) => void;
}) => {
  return (
    <div className='return-range-select'>
      <button
        className='btn btn-primary dropdown-toggle dropdown'
        type='button'
        data-bs-toggle='dropdown'
        data-bs-auto-close='outside'
        aria-expanded='false'
      >
        Price
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
            min={min}
            max={max}
            onChange={(min, max) => onFilterChange({ min, max })}
            title='Price range'
            description='Drag the slider and select your desired price range'
          />
        </div>
      </div>
    </div>
  );
};

export const getPriceRangeFilter = (min: number, max: number): Filter => {
  return {
    id: 'price-range-filter',
    defaultState: { min: min, max: max },
    filterComponent: (_, onFilterChange) => (
      <PriceRangeFilter onFilterChange={onFilterChange} min={min} max={max} />
    ),
    appliedFilterComponent: (state, resetState) =>
      (state.min === undefined && state.max === undefined) ||
      (state.min === 0 && state.max === max) ? (
        <></>
      ) : (
        <AppliedFilter
          filterText='Price'
          filterValue={`${state.min === undefined ? '0' : state.min} - ${
            state.max
          }`}
          onRemoveFilter={resetState}
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
};
