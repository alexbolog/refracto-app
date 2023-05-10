import React from 'react';
import { MarketplaceListing } from 'types/projectTypes';

export const AvailableListings = ({
  listings
}: {
  listings: MarketplaceListing[];
}) => {
  return (
    <div className='card listings-wrapper'>
      <div className='card-body container-fluid listings'>
        <div className='row table-header d-flex align-items-center'>
          <div className='col-lg-5'>Investment Opportunity</div>
          <div className='col-lg-1 text-center'>Remaining Time</div>
          <div className='col-lg-1 text-center'>Remaining Principal</div>
          <div className='col-lg-1 text-center'>Price</div>
          <div className='col-lg-1 text-center'>Repayment</div>
          <div className='col-lg-1 text-center'>Expected ROR</div>
        </div>
        {listings.map((listing, idx) => (
          <div
            className={`row table-content ${
              idx === listings.length - 1 ? 'last' : ''
            }`}
            key={`secondary-marketplace-listing-${idx}-${listing.projectId}`}
          >
            <div className='col-1'>
              <img src={listing.thumbnailSrc} />
            </div>
            <div className='col-4 proj-name'>{listing.projectTitle}</div>
            <div className='col-lg-1 text-center'>10 days</div>
            <div className='col-lg-1 text-center'>$800.00</div>
            <div className='col-lg-1 text-center'>$830.00</div>
            <div className='col-lg-1 text-center'>$865.00</div>
            <div className='col-lg-1 text-center'>8.76%</div>
            <div className='col-lg-2 text-center'>
              <button className='btn btn-primary btn-sm w-100'>Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
