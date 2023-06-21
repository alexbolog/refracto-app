import React from 'react';
import { Modal } from 'react-bootstrap';
import { Filter } from './Filters/Filter';

export const FiltersModal = ({
  showModal,
  onDismissModal,
  filters,
  filterState,
  clearFilter,
  updateFilterState
}: {
  showModal: boolean;
  onDismissModal: () => void;
  filters: Filter[];
  filterState: {
    [key: string]: any;
  };
  clearFilter: (filter: Filter) => void;
  updateFilterState: (filterId: string) => (newState: any) => void;
}) => {
  return (
    <Modal show={showModal} centered size='xl'>
      <Modal.Header style={{ zIndex: 4 }}>
        <h2>Filters</h2>
      </Modal.Header>
      <Modal.Body style={{ zIndex: 4 }}>
        <div className='container-fluid mbl-filters-modal-wrapper'>
          <div className='row'>
            {filters.map((f, i) => (
              <div
                className='col-12'
                key={`mobile-modal-filter-box-item-${i}-${f.id}`}
              >
                <div className='filter-box-buttons mbl w-100 mb-4'>
                  {f.filterComponent(f.defaultState, updateFilterState(f.id))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-danger' onClick={onDismissModal}>
          Dismiss
        </button>
      </Modal.Footer>
    </Modal>
  );
};
