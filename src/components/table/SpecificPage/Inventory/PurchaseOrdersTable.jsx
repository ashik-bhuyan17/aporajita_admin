import { useState, useEffect, useMemo, createRef, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table';

import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from 'react-icons/ti';

import { FaCircle, FaSearch } from 'react-icons/fa';
import Pagination from '../../../others/pagination';

function PurchaseOrdersTable({ tableHeader, tableData, tableFor, tableTab }) {
  const allData = tableData;
  //refs
  const tabRefs = useRef([]);

  //hooks
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState(tableData);
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
    state: { pageIndex, pageSize, selectedRowIds },
    setPageSize,
    prepareRow,
    selectedFlatRows,
  } = useTable({ columns, data }, useSortBy, usePagination, useRowSelect);

  //handlers
  const tabClickHandler = (tab) => {
    for (let i = 0; i < tabRefs.current.length; i++) {
      if (tabRefs.current[i].current.innerHTML === tab) {
        tabRefs.current[i].current.classList.add('selected');
      } else {
        tabRefs.current[i].current.classList.remove('selected');
      }
    }

    const filteredData = allData.filter((item) => {
      if (tab === 'All') {
        return true;
      } else {
        return item.status === tab;
      }
    });

    setData(filteredData);
  };

  //search
  const searchHandler = (searchInput) => {
    setData(tableData);
    if (searchInput.length > 0) {
      const searchResult = tableData.filter((product) => {
        if (
          product.po_number.toLowerCase().includes(searchInput.toLowerCase()) ||
          product.supplier_name
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        ) {
          return product;
        }
      });
      setData(searchResult);
    } else {
      setData(tableData);
    }
  };

  //status

  const addStatusClass = (status) => {
    if (status === 'Received') return 'green';
    else if (status === 'Partially Received') return 'light-green';
    else if (status === 'Lay By') return 'blue';
    else if (status === 'Draft') return 'pruple';
    else if (status === 'Open') return 'yellow';
    else return 'red';
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
    pageResultText = `Showing ${countStartFrom} to ${recordsCountTo} of ${totalRecords} ${tableFor}`;
  } else {
    const totalRecords = rows.length;
    const countStartFrom = totalRecords > 1 ? 1 : 0;
    const recordsCountTo = totalRecords > pageSize ? 15 : totalRecords;
    pageResultText = `Showing ${countStartFrom} to ${recordsCountTo} of ${totalRecords} ${tableFor}`;
  }

  useEffect(() => {
    setPageSize(15);
    tabRefs.current[0].current.classList.add('selected');
  }, []);

  return (
    <div className="table-container">
      <div className="table-tab-button-container">
        {tableTab.map((tab, index) => {
          const newRef = createRef();
          tabRefs.current[index] = newRef;
          return (
            <div
              className="tab-button"
              onClick={() => {
                tabClickHandler(tab);
              }}
              key={index}
              ref={tabRefs.current[index]}
              value={tab}
            >
              {tab}
            </div>
          );
        })}
      </div>

      <div className="row">
        <div className="panel-filter col-xs-12 col-md-6">
          <div className="inner-addon left-addon">
            <FaSearch className="fa" />
            <input
              id="search-input"
              type="text"
              name="search"
              className="form-control input-search"
              placeholder="Search by PO number and supplier name "
              onChange={(e) => {
                searchHandler(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="table-header-container">
        <div className="text-muted">
          <span>{pageResultText}</span>
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
                        <TiArrowUnsorted className="table-unsorted" />
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
              console.log(status);
              return (
                <tr scope="row" key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {index == 0 ? (
                          <Link
                            to={{
                              pathname: `${tableFor
                                .replace('(', '')
                                .replace(')', '')
                                .replace(' ', '-')}/${row.original.id}/edit`,
                              state: row.original,
                            }}
                            className="table-edit-page-tag"
                          >
                            {cell.render('Cell')}
                          </Link>
                        ) : (
                          <div>
                            {index === 2 && (
                              <FaCircle
                                style={{ padding: '2px', margin: '2px' }}
                                className={addStatusClass(status)}
                              />
                            )}
                            {cell.render('Cell')}
                          </div>
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
  );
}

export default PurchaseOrdersTable;
