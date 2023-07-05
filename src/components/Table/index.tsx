import React from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { InvestmentTransaction } from 'types/accountTypes';
import './style.css';

export const Table = ({
  columns,
  data
}: {
  columns: ColumnDef<InvestmentTransaction>[];
  data: InvestmentTransaction[];
}) => {
  const [sortingState, setSortingState] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState
    },
    onSortingChange: setSortingState,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  return (
    <div className='card card-body'>
      <div className='table-responsive'>
        <div className='transactions-table'>
          <table className='table'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`${
                            header.column.getCanSort() ? 'sortable' : ''
                          } ${
                            header.column.getIsSorted() === false
                              ? ''
                              : header.column.getIsSorted() === 'asc'
                              ? 'sorted-asc'
                              : 'sorted-desc'
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
