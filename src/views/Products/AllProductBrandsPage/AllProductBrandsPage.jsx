import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
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

import IndeterminateCheckbox from '../../../components/table/utils/IndeterminateCheckbox';
import GlobalFilter from '../../../components/table/utils/GlobalFilter';
import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';
import Pagination from '../../../components/others/pagination.jsx';
import { columns as tableHeader } from './demoData';

function AddNewProductBrandPage() {
  const tableFor = 'brand(s)';
  //state
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //hooks
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

  //handlers
  const deleteButtonHandler = (selectedFlatRows) => {
    const toDelete = {};
    for (let i = 0; i < selectedFlatRows.length; i++) {
      deleteData(selectedFlatRows[i].original.id);
    }
    getData();
  };
  const convertISODate = (isoDate) => {
    const date = new Date(isoDate);
    return (
      months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    );
  };

  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/brands/');
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
      await axiosInstance.delete(`api/v1/inventory/brand-details/${id}/`);
      getData();
      successToast('Deleted successfuly');
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);

      setIsLoading(false);
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
          <h1 className="page-title col-xs-12 col-md-6">Product Brands</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            {selectedFlatRows.length > 0 && (
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  deleteButtonHandler(selectedFlatRows);
                }}
              >
                Delete {selectedFlatRows.length} Brand(s)
              </button>
            )}
            <Link className="btn btn-primary" to="/admin/brands/new">
              <span className="mx-1">
                <FaPlus />
              </span>
              Add New Product Brand
            </Link>
          </div>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb text-muted">
            <li className="breadcrumb-item">
              <Link to="/admin/index">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a>Product Brands</a>
            </li>
          </ol>
        </nav>
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
                    return (
                      <tr scope="row" key={i} {...row.getRowProps()}>
                        {row.cells.map((cell, index) => {
                          return (
                            <td key={index} {...cell.getCellProps()}>
                              {index === 1 ? (
                                <img
                                  className="img-fluid rounded"
                                  src={row.original.featured_image}
                                  width="40"
                                />
                              ) : index === 2 ? (
                                <div>
                                  <Link
                                    to={{
                                      pathname: `/admin/${tableFor
                                        .replace('(', '')
                                        .replace(')', '')}/${
                                        row.original.id
                                      }/edit`,
                                      state: row.original,
                                    }}
                                    className="table-edit-page-tag"
                                  >
                                    {cell.render('Cell')}
                                  </Link>
                                  <br />
                                  <Link
                                    to={{
                                      pathname: `/admin/${tableFor
                                        .replace('(', '')
                                        .replace(')', '')}/${
                                        row.original.id
                                      }/variants`,
                                      state: row.original,
                                    }}
                                    className="table-edit-page-tag"
                                  >
                                    variants
                                  </Link>
                                </div>
                              ) : index === 4 ? (
                                <span>
                                  {convertISODate(row.original.created)}
                                </span>
                              ) : index === 5 ? (
                                <div>
                                  <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="action"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Action
                                    <span>
                                      <FaCaretDown className="btn-right-icon" />
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

export default AddNewProductBrandPage;
