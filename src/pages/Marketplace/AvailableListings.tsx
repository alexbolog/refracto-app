import React from 'react';
import { ProjectListItem } from 'types/projectTypes';

export const AvailableListings = ({
  listings
}: {
  listings: ProjectListItem[];
}) => {
  return (
    // <>
    //   <div className='row'>
    //     <div className='col-5'>Investment Opportunity</div>
    //     <div className='col-1'>Remaining Time</div>
    //     <div className='col-1'>Remaining Principal</div>
    //     <div className='col-1'>Price</div>
    //     <div className='col-1'>Repayment</div>
    //     <div className='col-1'>Expected ROR</div>
    //   </div>
    //   <div className='row'>
    //     <div className='col-1'>
    //       <img src={listings[0].thumbnailSrc} />
    //     </div>
    //     <div className='col-4'>{listings[0].projectTitle}</div>
    //     <div className='col-4'>{listings[0].projectTitle}</div>
    //   </div>
    // </>
    <div className='card w-100 listings'>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table table-responsive-sm'>
            <thead>
              <tr>
                <th>Investment Opportunity</th>
                <th>Remaining Time</th>
                <th>Remaining Principal</th>
                <th>Price</th>

                <th>Repayment</th>
                <th>Expected ROR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='investment-opportunity'>
                  <img src={listings[0].thumbnailSrc} />
                  <div>{listings[0].projectTitle}</div>
                </td>
                <td>10 days</td>
                <td>$800.00</td>
                <td>$830.00</td>
                <td>$865.00</td>
                <td>8.76%</td>
                <td>
                  <button className='btn btn-outline-primary w-100'>Buy</button>
                </td>
              </tr>
              {/* {items.map((row, idx) => (
                <tr key={`repayment-schedule-entry_${idx}`}>
                  <td>{formatIso(row.date)}</td>
                  <td>
                    <span
                      className={paymentStatusPillStyling(row.paymentStatus)}
                    >
                      {row.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {row.principalAmount.toLocaleString(
                      undefined,
                      toLocaleStringOptions
                    )}
                  </td>
                  <td>
                    {row.interestAmount.toLocaleString(
                      undefined,
                      toLocaleStringOptions
                    )}
                  </td>
                  <td>
                    {row.lateFees.toLocaleString(
                      undefined,
                      toLocaleStringOptions
                    )}
                  </td>
                  <td>
                    {(row.principalAmount + row.interestAmount).toLocaleString(
                      undefined,
                      toLocaleStringOptions
                    )}
                  </td>
                  <td>
                    {(row.paymentStatus === 'Done'
                      ? row.interestAmount + row.principalAmount + row.lateFees
                      : 0
                    ).toLocaleString(undefined, toLocaleStringOptions)}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
