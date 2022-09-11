import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { FaCaretDown, FaPlus } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import { FaEllipsisH } from 'react-icons/fa';

import IndeterminateCheckbox from '../../../components/table/utils/IndeterminateCheckbox';
import GlobalFilter from '../../../components/table/utils/GlobalFilter';
import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';
import Pagination from '../../../components/others/pagination.jsx';
import { columns as tableHeader } from './data.js';

function AllCustomersPage() {
  const tableFor = 'customer(s)';
  //csv
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);

  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //hooks
  const columns = useMemo(() => tableHeader, []);
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
            <span>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </span>
          ),
          Cell: ({ row }) => (
            <span>
              {row.original.is_default !== true && (
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              )}
            </span>
          ),
        },
        ...columns,
      ]);
    }
  );

  //handlers
  //delete
  const deleteButtonHandler = (selectedFlatRows) => {
    for (let i = 0; i < selectedFlatRows.length; i++) {
      deleteData(selectedFlatRows[i].original.id);
    }
    getData();
  };
  //API
  async function getData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/customer/customer-profile-list/'
      );
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function deleteData(id) {
    try {
      await axiosInstance.delete(
        `api/v1/customer/customer-profile-details/${id}/`
      );
      getData();
      successToast('Deleted successfuly');
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }

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
    const tempHeader = [];
    for (let i = 0; i < columns.length; i++) {
      tempHeader[i] = {
        label: columns[i].Header,
        key: columns[i].accessor,
      };
    }
    setCsvHeaders(tempHeader);
    const tempData = [];
    for (let i = 0; i < data.length; i++) {
      delete data.id;
      tempData[i] = data[i];
    }
    setCsvData(tempData);
    //API
    getData();

    setPageSize(15);
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Customers</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/customers/new" className="btn btn-primary">
              <span className="mx-1">
                <FaPlus />
              </span>
              Add New Customer
            </Link>
            {selectedFlatRows.length > 0 && (
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  deleteButtonHandler(selectedFlatRows);
                }}
              >
                Delete {selectedFlatRows.length} customer(s)
              </button>
            )}
            <button
              className="btn btn-info"
              type="button"
              id="export"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Export
              <span>
                <FaCaretDown className="btn-right-icon" />
              </span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="export">
              <li>
                <CSVLink
                  filename="sales history.csv"
                  data={csvData}
                  headers={csvHeaders}
                  className="dropdown-item"
                >
                  Export to CSV
                </CSVLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="panel-container">
          <div className="table-container">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                          className={`table-header ${
                            column.id == 'selection' ? 'checkbox-header' : ''
                          }`}
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render('Header')}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <img
                                  src="/assets/icons/sort_both.png"
                                  className="table-sort-icon"
                                />
                              ) : (
                                <img
                                  src="/assets/icons/sort_both.png"
                                  className="table-sort-icon"
                                />
                              )
                            ) : (
                              column.disableSortBy !== true &&
                              column.id !== 'selection' && (
                                <img
                                  src="/assets/icons/sort_both.png"
                                  className="table-sort-icon"
                                />
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
                                      .replace(')', '')}/${
                                      row.original.id
                                    }/edit`,
                                    state: row.original,
                                  }}
                                  className="table-edit-page-tag"
                                >
                                  {row.original.first_name}{' '}
                                  {row.original.last_name}
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
                                        <FaEllipsisH
                                          style={{ color: '#4E5E6A' }}
                                        />
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
              <div className="no-record-block">
                <p className="message">No records to display</p>
              </div>
            )}

            {rows.length > pageSize && (
              <div className="pagination-container">
                <Pagination
                  canPreviousPage={canPreviousPage}
                  previousPage={previousPage}
                  canNextPage={canNextPage}
                  nextPage={nextPage}
                  gotoPage={gotoPage}
                  totalPage={pageCount}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCustomersPage;
