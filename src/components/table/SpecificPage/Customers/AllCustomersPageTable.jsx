
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
import { FaEllipsisH } from 'react-icons/fa';
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

function AllCustomersPageTable({ tableHeader, tableData, tableFor }) {
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
                        index === 1 && (
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
                        ) : index === 5 ? (
                          <button className="btn btn-sm">
                            <div className="dropdown">
                              <div
                                type="button"
                                id="user"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <div className="navbar-title-container">
                                  <FaEllipsisH style={{ color: '#4E5E6A' }} />
                                </div>
                              </div>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="user"
                              >
                                <li>
                                  <Link
                                    to="/admin/settings/1/edit-profile"
                                    className="dropdown-item"
                                  >
                                    Order/Sales Hisotory
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </button>
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

export default AllCustomersPageTable;
