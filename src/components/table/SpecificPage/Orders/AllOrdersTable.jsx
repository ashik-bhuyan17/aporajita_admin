import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

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
import { FcCancel, FcOk } from 'react-icons/fc';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiHash,
} from 'react-icons/fi';

import IndeterminateCheckbox from '../../utils/IndeterminateCheckbox';
import GlobalFilter from '../../utils/GlobalFilter';

import './AllOrdersTable.css';

function AllOrdersTable({ tableHeader, tableData, tableFor }) {
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState(tableData);
  const deleteButtonHandler = (selectedFlatRows) => {
    const toDelete = {};
    for (let i = 0; i < selectedFlatRows.length; i++) {
      toDelete[selectedFlatRows[i].original.id] = true;
    }
    const filteredData = data.filter((item) => {
      if (!toDelete[item.id]) {
        return item;
      }
    });
    console.log(filteredData);
    setData(filteredData);
  };
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
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
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

  const addStatusClass = (status) => {
    if (status === 'Accepted') return 'orders-accepted';
    else if (status === 'Shipped') return 'orders-shipped';
    else if (status === 'Delivered') return 'light-green-bg';
    else if (status === 'Received') return 'green-bg';
    else if (status === 'On Account') return 'yellow-bg';
    else return 'orders-rejected';
  };

  useEffect(() => {
    setPageSize(15);
  }, []);

  return (
    <div className="table-container">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-header-container">
        <div className="text-muted">
          <div>{pageResultText}</div>
        </div>
        {pageOptions.length > 1 && (
          <div className="text-muted">
            <FiHash className="feather-icon-sm" />
            Page {pageIndex + 1} of {pageOptions.length}
          </div>
        )}
        <div className="page-header-button-container col-xs-12 col-md-6">
          {selectedFlatRows.length > 0 && (
            <div className="button-container">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  deleteButtonHandler(selectedFlatRows);
                }}
              >
                Print
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  deleteButtonHandler(selectedFlatRows);
                }}
              >
                Mark As Fulfiled
              </button>
            </div>
          )}
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
                        (index === 8 || index === 9) && (
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
              const status = row.original.status;
              return (
                <tr scope="row" key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {index === 1 ? (
                          <Link
                            to={{
                              pathname: `${tableFor
                                .replace('(', '')
                                .replace(')', '')}/${row.original.id}/edit`,
                              state: row.original,
                            }}
                            className="table-edit-page-tag"
                          >
                            {cell.render('Cell')}
                          </Link>
                        ) : index === 10 ? (
                          row.original.status === 'Rejected' ? (
                            <button type="button" className="btn">
                              <FcOk />
                            </button>
                          ) : row.original.status === 'Accepted' ? (
                            <button type="button" className="btn">
                              <FcCancel />
                            </button>
                          ) : (
                            ''
                          )
                        ) : index === 4 ? (
                          <span
                            className={`status-label ${addStatusClass(status)}`}
                          >
                            {cell.render('Cell')}
                          </span>
                        ) : index === 5 ? (
                          <span className="fulfilment-label">
                            {cell.render('Cell')}
                          </span>
                        ) : (
                          cell.render('Cell')
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && (
        <div className="d-flex">
          <p className="mx-auto">No records to display</p>
        </div>
      )}

      <div className="pagination-container">
        {rows.length > pageSize && (
          <div className="pagination">
            <button
              className="btn btn-primary btn-sm m-1"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <FiChevronsLeft className="feather-icon-sm" />
            </button>
            <button
              className="btn btn-primary btn-sm m-1"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <FiChevronLeft className="feather-icon-sm" />
            </button>
            <button
              className="btn btn-primary btn-sm m-1"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <FiChevronRight className="feather-icon-sm" />
            </button>
            <button
              className="btn btn-primary btn-sm m-1"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <FiChevronsRight className="feather-icon-sm" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllOrdersTable;
