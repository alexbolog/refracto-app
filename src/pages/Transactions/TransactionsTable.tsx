import React from 'react';

export const TransactionsTable = () => {
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Status</th>
                <th scope='col'>Project Name</th>
                <th scope='col'>Currency</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Type</th>
                <th scope='col'>Operation</th>
                <th scope='col'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope='row'>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
