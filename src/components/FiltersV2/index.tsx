import React, { useState } from 'react';
import { AppliedFilter } from './AppliedFilter';
import { DEADLINE_FILTER } from './Filters/DeadlineFilter';
import { RETURN_RANGE_FILTER } from './Filters/ReturnRangeFilter';
import { RATING_SELECT_FILTER } from './Filters/RatingSelectFilter';
import { Filter } from './Filters/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const FiltersV2 = ({
  //   filters,
  items,
  onFilterChange
}: {
  //   filters: Filter[];
  items: any[];
  onFilterChange: (newItems: any[]) => void;
}) => {
  const filters: Filter[] = [
    RETURN_RANGE_FILTER,
    RATING_SELECT_FILTER,
    DEADLINE_FILTER
  ];
  const [initialItems] = useState(items);
  const [filterState, setFilterState] = useState<{
    [key: string]: any;
  }>({});

  const updateFilterState = (filterId: string) => (newState: any) => {
    const co = filterState;
    co[filterId] = newState;
    setFilterState(co);
    applyFilters(co);
    console.log('update filter state', co);
  };

  const applyFilters = (newFilters: { [key: string]: any }) => {
    const newItems = [];
    for (let i = 0; i < initialItems.length; i++) {
      const currentItem = initialItems[i];
      let shouldDisplay = true;
      for (let j = 0; j < filters.length && shouldDisplay; j++) {
        const currentFilter = filters[j];
        const state = newFilters[currentFilter?.id];
        if (state === undefined) {
          continue;
        }
        shouldDisplay =
          shouldDisplay && currentFilter.shouldDisplay(currentItem, state);
        console.log('should display', i, shouldDisplay);
      }
      if (shouldDisplay) {
        newItems.push(currentItem);
      }
    }
    console.log('new items', initialItems);
    console.log('filtered items', newItems);
    onFilterChange(newItems);
  };

  //TODO: FIX FILTER CLEAR
  const clearFilter = (filter: Filter) => {
    const remainingItems: { [key: string]: any } = {};
    const objKeys = Object.keys(filterState);
    debugger;
    for (let i = 0; i < objKeys.length; i++) {
      const key = objKeys[i];
      if (key === filter.id) {
        remainingItems[key] = filter.defaultState;
      } else {
        remainingItems[key] = filterState[key];
      }
    }
    setFilterState(remainingItems);
    applyFilters(remainingItems);
  };

  return (
    // <div>
    //   {filters.map((f, i) => (
    //     <div className={`filter-box-item-${i}-${f.id}`}>
    //       {f.filterComponent(f.defaultState, updateFilterState(f.id))}
    //     </div>
    //   ))}
    // </div>
    <div className='container-fluid p-0'>
      <div className='row'>
        <div className='col-12'>
          <div className='card w-100 filter-box-wrapper'>
            <div className='card-body border-0'>
              <div className='container-fluid p-0 m-0'>
                <div className='row'>
                  <div
                    className='col-lg-6 col-sm-10 col-md-10 w-auto'
                    style={{ minWidth: '50%' }}
                  >
                    <div className='input-group search-bar-container'>
                      <span className='input-group-text search-icon'>
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className='text-primary'
                        />
                      </span>
                      <input
                        type='text'
                        className='form-control h-100 search-bar-input'
                        placeholder='Search for a project'
                        // onChange={(e) => handleUpdateInput(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-sm-2 col-md-2 d-flex justify-content-end ml-auto w-auto filter-box-buttons'>
                    {filters.map((f, i) => (
                      <div key={`filter-box-item-${i}-${f.id}`}>
                        {f.filterComponent(
                          f.defaultState,
                          updateFilterState(f.id)
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col applied-filters-container'>
          {filters.map((f, idx) =>
            filterState[f.id] === undefined
              ? null
              : f.appliedFilterComponent(filterState[f.id], () =>
                  clearFilter(f)
                )
          )}
        </div>
      </div>
    </div>
  );
};

export const FilterRenderer = ({ filters }: { filters: Filter[] }) => {
  const [state] = useState(filters[0].defaultState);
};
