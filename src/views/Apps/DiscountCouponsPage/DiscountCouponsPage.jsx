import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import { FcCancel, FcOk } from 'react-icons/fc';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';
import Pagination from '../../../components/others/pagination';

import { columns as tableHeader } from './data';
import IndeterminateCheckbox from '../../../components/table/utils/IndeterminateCheckbox';
import EditCouponPage from './CreateNewCouponPage/EditCouponPage';

function DiscountCouponsPage() {
  const tableFor = 'orders';
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState([]);
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
    pageCount,
    state: { pageIndex, pageSize },
    setPageSize,
    prepareRow,
    selectedFlatRows,
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

  //handlers
  //search
  const searchHandler = (searchInput) => {
    setData(rawData);
    if (searchInput.length > 0) {
      const searchResult = rawData.filter((discount) => {
        if (
          discount.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          discount.code.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return discount;
        }
      });
      setData(searchResult);
    } else {
      setData(rawData);
    }
  };
  async function deleteButtonHandler(selectedFlatRows) {
    for (let i = 0; i < selectedFlatRows.length; i++) {
      deleteData(selectedFlatRows[i].original.id);
    }
  }
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/app/promocodes/');
      console.log("dfsafdsaf", response.data);
      setData(response.data);
      setRawData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function deleteData(id) {
    try {
      await axiosInstance.delete(`/api/v1/app/promocode/${id}/`);
      getData();
      successToast('Deleted successfuly');
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  //----------API------END-------
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
    getData();

    setPageSize(15);
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Discounts</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link
              to="/admin/apps/discount-coupons/create-new"
              className="btn btn-primary"
            >
              <span className="mx-1">
                <FaPlus />
              </span>
              Add New Discount
            </Link>
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

        <div className="panel-container">
          <div className="table-container">
            <div className="panel-filter">
              <div className="inner-addon left-addon">
                <FaSearch className="fa" />
                <input
                  id="search-input"
                  type="text"
                  name="search"
                  className="form-control input-search"
                  placeholder="Search name or code"
                  onChange={(e) => {
                    searchHandler(e.target.value);
                  }}
                />
              </div>
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
                    const status = row.original.status;
                    return (
                      <tr scope="row" key={i} {...row.getRowProps()}>
                        {row.cells.map((cell, index) => {
                          return (
                            <td key={index} {...cell.getCellProps()}>
                              {index === 1 ? (
                                <Link
                                  // to={{
                                  //   pathname: `${tableFor
                                  //     .replace('(', '')
                                  //     .replace(')', '')}/${
                                  //     row.original.id 

                                  //   }/edit`,
                                  //   state: row.original,

                                  // }}

                                  to={{ pathname: '/admin/apps/edit-coupons', data: row.original }}
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
                                //   className={`status-label ${addStatusClass(
                                //     status
                                //   )}`
                                // }
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
        </div>
      </div>
    </div>
  );
}

export default DiscountCouponsPage;
