import { toLocaleStringOptions } from 'config';
import React, { useState } from 'react';
import { CapitalStructureItem } from 'types/projectTypes';

export const CapitalStructureTable = ({
  items
}: {
  items: CapitalStructureItem[];
}) => {
  const [totalSum, _] = useState(
    items.reduce((prev, crt) => (prev += crt.amount), 0.0)
  );
  return (
    <div className='table-responsive'>
      <table className='table table-responsive-sm'>
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Type</th>
            <th style={{ width: '25%' }}>Source</th>
            <th style={{ width: '25%' }}>% of total</th>
            <th style={{ width: '25%' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={`capital-structure-entry_${idx}`}>
              <td>{row.type}</td>
              <td>{row.source}</td>
              <td>
                {((row.amount / totalSum) * 100).toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
                %
              </td>
              <td>
                {row.amount.toLocaleString(undefined, toLocaleStringOptions)}€
              </td>
            </tr>
          ))}
          <tr className='last-row'>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>
              {totalSum.toLocaleString(undefined, toLocaleStringOptions)}€
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
