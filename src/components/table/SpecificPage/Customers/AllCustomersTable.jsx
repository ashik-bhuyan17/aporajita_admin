import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';

import IndeterminateCheckbox from '../../utils/IndeterminateCheckbox';
import GlobalFilter from '../../utils/GlobalFilter';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast';
import Progress from '../../../../components/loading/Progress.jsx';
import Pagination from '../../../others/pagination';

function AllCustomersTable({ tableHeader, tableData, tableFor, id }) {
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState(tableData);
  const [isLoading, setIsLoading] = useState(true);

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

  //----------API------START-------
  async function sendData() {
    console.log(selectedFlatRows);
    const data = selectedFlatRows.map((row) => row.original.id);
    console.log(data);
    try {
      const response = await axiosInstance.put(
        `/api/v1/customer/customer-group-details/${id}/`,
        {
          customer: data.length > 0 ? data : [],
        }
      );
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on saving data!, Please try again.');
      setIsLoading(false);
    }
  }

  async function removeData() {
    try {
      const response = await axiosInstance.put(`
      ​/api​/v1​/customer​/customer-group-details​/${id}​/`);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on saving data!, Please try again.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setPageSize(15);
    setData(tableData);
  }, [tableData]);

  return (
    <div className="table-container">
      <Progress isAnimating={isLoading} key={0} />
      <ToastContainer />
      {tableFor === 'select' ? (
        <label className="row-option-title">
          Select from Ungrouped Customers({data.length})
        </label>
      ) : (
        <label className="row-option-title">
          Assigned Customers({data.length})
        </label>
      )}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-header-container">
        <div className="d-flex" style={{ width: '100%' }}>
          <div className="d-flex col-6">
            {/* <button
              className="btn btn-info"
              type="button"
              onClick={() => {
                // deleteButtonHandler(selectedFlatRows);
              }}
            >
              Select All
            </button>
            <button
              className="btn btn-info"
              type="button"
              style={{ marginLeft: '4px' }}
              onClick={() => {
                // deleteButtonHandler(selectedFlatRows);
              }}
            >
              Deselect All
            </button> */}
          </div>
          <div className="d-flex justify-content-end col-6 mt-3">
            {tableFor == 'select' && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  sendData();
                }}
              >
                Add Selected
              </button>
            )}
            {tableFor !== 'select' && (
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  deleteButtonHandler(selectedFlatRows);
                }}
              >
                Remove Selected
              </button>
            )}
          </div>
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
                    className="grey-table-header"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
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
                        {index === 1
                          ? row.original.first_name + row.original.last_name
                          : cell.render('Cell')}
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
    </div>
  );
}

export default AllCustomersTable;
