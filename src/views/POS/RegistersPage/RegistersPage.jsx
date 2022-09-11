import { useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
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
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from 'react-icons/ti';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';

import { columns as tableHeader } from './demoData';
import Pagination from '../../../components/others/pagination';
import IndeterminateCheckbox from '../../../components/table/utils/IndeterminateCheckbox';
import GlobalFilter from '../../../components/table/utils/GlobalFilter';

function RegistersPage() {
  const tableFor = 'outlet(s)';
  //csv
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState([]);
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
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
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
  async function deleteButtonHandler(selectedFlatRows) {
    for (let i = 0; i < selectedFlatRows.length; i++) {
      deleteData(selectedFlatRows[i].original.id);
    }
  }
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/dummy/');
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
      await axiosInstance.delete(
        `/api/v1/inventory/update-inventory-location/${id}/`
      );
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
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Registers</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/pos/registers/new" className="btn btn-primary">
              <span className="mx-1">
                <FaPlus />
              </span>
              Create New Register
            </Link>
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
                  filename="registers.csv"
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
              {pageOptions.length > 1 && (
                <div className="text-muted">
                  <Hash className="feather-icon-sm" />
                  Page {pageIndex + 1} of {pageOptions.length}
                </div>
              )}
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
                              index !== 0 && (
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
                              {index == 1 ? (
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
                                  {cell.render('Cell')}
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

export default RegistersPage;
