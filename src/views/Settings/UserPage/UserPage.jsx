import { useEffect, useState, useMemo } from 'react';
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

import { columns as tableHeader, data as tableData } from './table';
import GlobalFilter from '../../../components/table/utils/GlobalFilter';
import axiosInstance from '../../../helpers/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';

function UserPage() {
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
    useRowSelect
  );

  //handelrs

  let pageResultText;
  if (pageIndex > 0) {
    const countStartFrom = pageIndex * pageSize + 1;
    const totalRecords = rows.length;
    const recordsCountTo =
      (pageIndex + 1) * pageSize < totalRecords
        ? countStartFrom + pageSize - 1
        : totalRecords;
    pageResultText = `Showing ${countStartFrom} to ${recordsCountTo} of ${totalRecords} user(s)`;
  } else {
    const totalRecords = rows.length;
    const countStartFrom = totalRecords > 1 ? 1 : 0;
    const recordsCountTo = totalRecords > pageSize ? 15 : totalRecords;
    pageResultText = `Showing ${countStartFrom} to ${recordsCountTo} of ${totalRecords} user(s)`;
  }

  useEffect(() => {
    //API
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('api/v1/inventory/users/');
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        successToast('Updated successfuly');
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        errorToast('Error occured!, Please try again.');
      }
    }

    // getData();

    setPageSize(15);
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Users</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/users/new" className="btn btn-primary">
              Add New User
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <div className="row">
            <div className="panel-filter col-12">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
          </div>

          <div className="text-muted">
            <div>{pageResultText}</div>
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
                        className="grey-table-header"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
                            index === 0 && (
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
                            {index === 0 ? (
                              <Link
                                to={{
                                  pathname: `users/${row.original.id}/edit`,
                                  state: row.original,
                                }}
                                className="table-edit-page-tag"
                                style={{ color: '#337ab7' }}
                              >
                                {cell.render('Cell')}
                              </Link>
                            ) : index === 6 ? (
                              <button type="button" className="btn btn-default">
                                Resend
                              </button>
                            ) : index === 7 ? (
                              <Link
                                to={{
                                  pathname: `users/${row.original.id}/edit`,
                                  state: row.original,
                                }}
                                className="btn btn-default"
                              >
                                Edit
                              </Link>
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
  );
}

export default UserPage;
