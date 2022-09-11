import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import {
  FaRegFileAlt,
  FaSearch,
  FaCaretDown,
  FaRegCalendarAlt,
} from 'react-icons/fa';

import { errorToast } from '../../../../helpers/toast';
import axiosInstance from '../../../../helpers/axios';
import Progress from '../../../../components/loading/Progress';
import Pagination from '../../../../components/others/pagination';
import { columns as tableHeader, data as tableData } from './data.js';

function SupplierPaymentsReportPage() {
  //state
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //csv
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);
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
    state: { pageIndex, pageSize },
    setPageSize,
    prepareRow,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  //handlers
  //search
  const searchHandler = (searchInput) => {
    setData(rawData);
    if (searchInput.length > 0) {
      const searchResult = rawData.filter((order) => {
        if (
          order.customer.toLowerCase().includes(searchInput.toLowerCase()) ||
          order.phone_number
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          order.status.toLowerCase().includes(searchInput.toLowerCase()) ||
          order.order_id.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return order;
        }
      });
      setData(searchResult);
    } else {
      setData(rawData);
    }
  };

  //page result
  let pageResultText;
  if (pageIndex > 0) {
    const countStartFrom = pageIndex * pageSize + 1;
    const totalRecords = rows.length;
    const recordsCountTo =
      (pageIndex + 1) * pageSize < totalRecords
        ? countStartFrom + pageSize - 1
        : totalRecords;
    pageResultText = `Showing ${countStartFrom} to ${recordsCountTo} of ${totalRecords} supplier(s)`;
  } else {
    const totalRecords = rows.length;
    const countStartFrom = totalRecords > 1 ? 1 : 0;
    const recordsCountTo = totalRecords > pageSize ? 15 : totalRecords;
    pageResultText = `Showing ${countStartFrom} to ${recordsCountTo} of ${totalRecords} supplier(s)`;
  }

  useEffect(() => {
    //API
    (async function getData() {
      try {
        const response = await axiosInstance.get('api/v1/inventory/dummy/');
        setData(response.data);
        setRawData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);

        setIsLoading(false);
        errorToast('Error on loading supplier report!, Please try again.');
      }
    })();
    //CSV
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
    const items = document.getElementsByClassName('page-item');
    if (items > 2) {
      items[2].classList.add('active');
    }
  }, [setPageSize, pageCount]);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Inventory Report</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
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
            <button
              className="btn btn-success"
              type="button"
              id="calendarFilter"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Last 30 Days
              <span style={{ marginLeft: '3px' }}>
                <FaRegCalendarAlt />
              </span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="calendarFilter">
              <li>
                <a className="dropdown-item" href="#">
                  Today
                </a>
                <a className="dropdown-item" href="#">
                  Yesterday
                </a>
                <a className="dropdown-item" href="#">
                  Last 7 Days
                </a>
                <a className="dropdown-item" href="#">
                  Last 30 Days
                </a>
                <a className="dropdown-item" href="#">
                  This Month
                </a>
                <a className="dropdown-item" href="#">
                  Last Month
                </a>
                <a className="dropdown-item" href="#">
                  Last 3 Months
                </a>
                <a className="dropdown-item" href="#">
                  Last 6 Months
                </a>
                <a className="dropdown-item" href="#">
                  Custom Range
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2" style={{ padding: '20px' }}>
            <ul className="list-unstyled report">
              <li>
                <Link to="/admin/reports/current-inventory-report">
                  <FaRegFileAlt className="fa-right" />
                  Current Inventory Report
                </Link>
              </li>

              <li>
                <Link to="/admin/reports/stock-adjustment-report">
                  <FaRegFileAlt className="fa-right" />
                  Stock Adjustment Report
                </Link>
              </li>
              <li className="active">
                <Link to="/admin/reports/supplier-payments-report">
                  <FaRegFileAlt className="fa-right" />
                  Supplier Payments Report
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="panel-container">
                <div className="table-container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="panel-filter">
                        <div className="inner-addon left-addon">
                          <FaSearch className="fa" />
                          <input
                            id="search-input"
                            type="text"
                            name="search"
                            className="form-control input-search"
                            placeholder="Filter by supplier names"
                            onChange={(e) => {
                              searchHandler(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-scroll">
                    <table
                      className="table-responsive table-container"
                      {...getTableProps()}
                    >
                      <thead className="grey-table-header">
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                              <th
                                scope="col"
                                key={index}
                                className={`table-header ${
                                  index !== 0 ? 'text-right' : ''
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
                        <tr>
                          <td className="bold">Summary</td>
                          <td className="bold text-right">0.00</td>
                          <td className="bold text-right">0.00</td>
                          <td className="bold text-right">0.00</td>
                          <td className="bold text-right">0.00</td>
                          <td className="bold text-right">0.00</td>
                        </tr>
                        {page.map((row, i) => {
                          prepareRow(row);
                          const status = row.original.status;
                          console.log(status);
                          return (
                            <tr key={i} {...row.getRowProps()}>
                              {row.cells.map((cell, index) => {
                                return (
                                  <td
                                    key={index}
                                    {...cell.getCellProps()}
                                    className={`${
                                      index !== 0 ? 'text-right' : ''
                                    }`}
                                  >
                                    {index === 3 ||
                                    index === 4 ||
                                    index === 5 ? (
                                      <span>- {cell.render('Cell')} </span>
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
                  {rows.length > 0 && (
                    <div className="text-muted">
                      <div>{pageResultText}</div>
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
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SupplierPaymentsReportPage;
