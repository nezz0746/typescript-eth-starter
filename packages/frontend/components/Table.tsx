/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, { useState } from 'react';
import IconButton from './IconButton';

export interface DataProps {
  columns: { name: string; key: string }[];
  colCollection: any[] | undefined;
  onRemoveRow?: (id: string) => void;
  onRowClick?: (index: number) => void;
}

export default function Table({
  colCollection,
  columns,
  onRemoveRow,
  onRowClick,
}: DataProps): JSX.Element {
  const [indexOpen, setIndexOpen] = useState(-1);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(({ name, key }) => {
                    return (
                      <th
                        key={`${name}${key}`}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {name}
                      </th>
                    );
                  })}
                  <th />
                </tr>
              </thead>
              <tbody className="bg-white">
                {colCollection &&
                  colCollection.map((rowData, rowIndex) => {
                    return (
                      <tr
                        key={rowIndex}
                        onClick={() => {
                          if (onRowClick) {
                            if (rowIndex === indexOpen) {
                              setIndexOpen(-1);
                            } else {
                              setIndexOpen(rowIndex);
                            }
                            onRowClick(rowIndex);
                          }
                        }}
                        className={classNames({
                          'hover:bg-gray-100 border-b border-gray-100 select-none cursor-pointer':
                            true,
                          'bg-gray-100': rowIndex === indexOpen,
                        })}
                      >
                        {columns.map(({ key }, colIndex) => {
                          return (
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                              // eslint-disable-next-line react/no-array-index-key
                              key={`${rowIndex}${colIndex}`}
                            >
                              {rowData[key]}
                            </td>
                          );
                        })}
                        {onRemoveRow && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <IconButton
                              icon="trash"
                              onClick={() => {
                                onRemoveRow(rowData.id);
                              }}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
