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
    <div className='capital-structure-table-wrapper'>
      <div className='capital-structure-table-row'>
        <div className='type t-header'>Type</div>
        <div className='source t-header'>Source</div>
        <div className='percentage t-header'>% of total</div>
        <div className='amount t-header'>Amount</div>
      </div>
      {items.map((r, idx) => (
        <div
          className='capital-structure-table-row'
          key={`capital-structure-key-${idx}`}
        >
          <div className='type'>{r.type}</div>
          <div className='source'>{r.source}</div>
          <div className='percentage'>
            {((r.amount / totalSum) * 100).toLocaleString(
              undefined,
              toLocaleStringOptions
            )}
            %
          </div>
          <div className='amount'>
            {r.amount.toLocaleString(undefined, toLocaleStringOptions)}€
          </div>
        </div>
      ))}
      <div className='capital-structure-table-row total'>
        <div className='type' style={{ fontWeight: 700 }}>
          Total
        </div>
        <div className='source'></div>
        <div className='percentage'>100.00%</div>
        <div className='amount'>
          {totalSum.toLocaleString(undefined, toLocaleStringOptions)}€
        </div>
      </div>
    </div>
  );
};
