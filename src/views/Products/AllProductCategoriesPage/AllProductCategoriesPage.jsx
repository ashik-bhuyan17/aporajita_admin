import { useEffect, useMemo, useState } from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Progress from '../../../components/loading/Progress.jsx';

import IndeterminateCheckbox from '../../../components/table/utils/IndeterminateCheckbox';
import GlobalFilter from '../../../components/table/utils/GlobalFilter';

import { errorToast, successToast } from '../../../helpers/toast';
import axiosInstance from '../../../helpers/axios';
import { columns as tableHeader } from './data.js';

function AllProductCategoriesPage() {
  const tableFor = 'product(s)';
  //state
  const [data, setData] = useState([]);
  const [featuredClicked, setfeaturedClicked] = useState(false);
  const [rawData, setRawData] = useState([]);
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
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/products/');
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function addData(id) {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`api/v1/product-details/${id}/`);
      getData();
      successToast('Deleted successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  //----------API------END--------

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
          <h1 className="page-title col-xs-12 col-md-6">
            Manage Product Categories
          </h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb text-muted">
            <li className="breadcrumb-item">
              <Link to="/admin/index">Home</Link>
            </li>
            <li className="breadcrumb-item">Product Categories</li>
          </ol>
        </nav>
        <div className="panel-container">
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-primary">Add New Category</button>
              <p className="text-muted">e.g. Men, Women, Shirt, Pant, etc.</p>
              {/* <input
                type="text"
                className="form-control mt-3"
                placeholder="Search categories by name"
              /> */}
              <div className="categories-container px-4">
                <div
                  className="clickable"
                  onClick={() => {
                    setfeaturedClicked(true);
                  }}
                >
                  <FaFolder /> Featured Collection
                </div>
              </div>
            </div>
            {featuredClicked && (
              <div className="col-md-9">
                <div className="table-tab-button-container">
                  <div className="tab-button selected">Products</div>
                </div>
                <button className="btn btn-primary mb-3">Add Products</button>
                <div className="table-scroll">
                  <div className="table-container">
                    <GlobalFilter
                      filter={globalFilter}
                      setFilter={setGlobalFilter}
                      placeholder="Search products"
                    />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProductCategoriesPage;
