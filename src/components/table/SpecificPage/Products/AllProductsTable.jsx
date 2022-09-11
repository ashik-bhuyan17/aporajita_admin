
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
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Hash,
  Navigation,
} from 'react-feather';

import IndeterminateCheckbox from '../../utils/IndeterminateCheckbox';
import GlobalFilter from '../../utils/GlobalFilter';

function AllProductsTable({ tableHeader, tableData, tableFor }) {
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState(tableData);
  const deleteButtonHandler = (selectedFlatRows) => {
    const toDelete = {};
    for (let i = 0; i < selectedFlatRows.length; i++) {
      if (!selectedFlatRows[i].original.is_default) {
        toDelete[selectedFlatRows[i].original.id] = true;
      }
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
    state: { pageIndex, pageSize, globalFilter },
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
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              {row.original.is_default !== true && (
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              )}
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

        <div className="page-header-button-container col-xs-12 col-md-6">
          {selectedFlatRows.length > 0 && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                deleteButtonHandler(selectedFlatRows);
              }}
            >
              Delete
            </button>
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
                        index !== 0 &&
                        index !== 5 && (
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
                        {index === 1 ? (
                          <img
                            className="img-fluid rounded"
                            src={row.original.imageURL}
                            width="40"
                          />
                        ) : index === 2 ? (
                          <div>
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
                            <br />
                            <Link
                              to={{
                                pathname: `${tableFor
                                  .replace('(', '')
                                  .replace(')', '')}/${
                                  row.original.id
                                }/variants`,
                                state: row.original,
                              }}
                              className="table-edit-page-tag"
                            >
                              {row.original.variants} Varaints
                            </Link>
                          </div>
                        ) : index === 5 ? (
                          <div>
                            <button
                              className="btn btn-primary"
                              type="button"
                              id="export"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Export
                              <span>
                                <ChevronDown className="feather-icon-sm" />
                              </span>
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="export"
                            >
                              <li>
                                <Link
                                  to="/admin/products/manage"
                                  className="dropdown-item"
                                >
                                  Manage Related Products
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: `${tableFor
                                      .replace('(', '')
                                      .replace(')', '')}/${
                                      row.original.id
                                    }/variants`,
                                    state: row.original,
                                  }}
                                >
                                  Manage Variants
                                </Link>
                              </li>
                            </ul>
                          </div>
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
        )}
      </div>
    </div>
  );
}

export default AllProductsTable;
