import { useState, useEffect, useMemo } from 'react';
import { DownloadCloud } from 'react-feather';

import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from 'react-icons/ti';

import GlobalFilter from '../../utils/GlobalFilter';
import Pagination from '../../../others/pagination';

function RegisterClosuresTable({ tableHeader, tableData, tableFor }) {
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState(tableData);
  const {
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    state: { pageIndex, pageRows, pageSize, selectedRowIds, globalFilter },
    setPageSize,
    prepareRow,
    selectedFlatRows,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [

    //     ...columns,
    //   ]);
    // }
  );

  let pageResultText;
  if (pageIndex > 0) {
    const countStartFrom = pageIndex * pageSize + 1;
    const totalRecords = rows.length;
    const recordsCountTo =
      (pageIndex + 1) * pageSize < totalRecords
        ? countStartFrom + pageSize - 1
        : totalRecords;
    pageResultText = `Showing ${countStartFrom} to ${recordsCountTo} of ${totalRecords} ${tableFor}`;
  } else {
    const totalRecords = rows.length;
    const countStartFrom = totalRecords > 1 ? 1 : 0;
    const recordsCountTo = totalRecords > pageSize ? 15 : totalRecords;
    pageResultText = `Showing ${countStartFrom} to ${recordsCountTo} of ${totalRecords} ${tableFor}`;
  }

  useEffect(() => {
    setPageSize(15);
  }, []);

  return (
    <div className="table-container">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-search-container">
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
        {/* <div className="button-container">
          <div className="table-button">
            <select className="form-select">
              <option selected value="">
                Filter By Register
              </option>
              <option value="1">Somikoron</option>
              <option value="2">Somikoron IT</option>
            </select>
          </div>
          <div className="table-button">
            <select className="form-select">
              <option selected value="">
                Filter By Outlet
              </option>
              <option value="Uttara Outlet">Uttara Outlet</option>
              <option value="Dhanmondi Outlet">Dhanmondi Outlet</option>
            </select>
          </div>
        </div> */}
      </div>
      <div className="table-header-container">
        <div className="text-muted">
          <div>{pageResultText}</div>
        </div>
      </div>

      <div className="table-scroll">
        <table
          className="table-responsive table-container"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    scope="col"
                    key={index}
                    className="table-header"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TiArrowSortedDown className="table-sorted" />
                        ) : (
                          <TiArrowSortedUp className="table-sorted" />
                        )
                      ) : (
                        column.disableSortBy !== true && (
                          <TiArrowUnsorted className="table-unsorted" />
                        )
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr scope="row" key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                  <td>
                    <button type="button" className="btn btn-sm">
                      <DownloadCloud className="feather-icon-sm" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <div className="no-record-block">
          <p className="message">No records to display</p>
        </div>
      )}

      <div className="pagination-container">
        {rows.length > pageSize && (
          <Pagination
            canPreviousPage={canPreviousPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            nextPage={nextPage}
            gotoPage={gotoPage}
            totalPage={pageCount}
          />
        )}
      </div>
    </div>
  );
}

export default RegisterClosuresTable;
