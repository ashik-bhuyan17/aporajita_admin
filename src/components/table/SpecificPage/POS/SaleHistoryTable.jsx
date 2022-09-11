import { useState, useEffect, useMemo, createRef, useRef } from 'react';
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

import { FaCircle, FaSearch, FaCaretDown } from 'react-icons/fa';
import SalesHistoryModal from '../../../../views/POS/SalesHistoryPage/SalesHistoryModal';

function SalesHistoryTable({ tableHeader, tableData, tableFor, tableTab }) {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const columns = useMemo(() => tableHeader, []);
  const allData = tableData;
  const tabRefs = useRef([]);
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
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
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
      const searchResult = tableData.filter((order) => {
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
      setData(tableData);
    }
  };

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

  const addStatusClass = (status) => {
    if (status === 'Completed') return 'green';
    else if (status === 'Park') return 'purple';
    else if (status === 'Lay By') return 'blue';
    else if (status === 'On Account') return 'yellow';
    else return 'red';
  };

  const addPaymentStatusClass = (status) => {
    if (status === 'Paid') return 'green';
    else return 'red';
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setPageSize(15);
    tabRefs.current[0].current.classList.add('selected');
  }, []);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

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
        <div className="col-md-6">
          <div className="panel-filter">
            <div className="inner-addon left-addon">
              <FaSearch className="fa" />
              <input
                id="search-input"
                type="text"
                name="search"
                className="form-control input-search"
                placeholder="Search sales by serial or customer name"
                onChange={(e) => {
                  searchHandler(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="page-header-button-container">
            <select className="form-select" style={{ width: 'auto' }}>
              <option>Filter by outlet</option>
              <option>Main outlet</option>
            </select>
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
              return (
                <tr scope="row" key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {index == 0 ? (
                          <a
                            className="table-edit-page-tag clickable"
                            type="button"
                            onClick={() => {
                              setSelectedOrder(row.original);
                              handleShowModal();
                            }}
                          >
                            {cell.render('Cell')}
                          </a>
                        ) : (
                          // <Link
                          //   to={{
                          //     pathname: `${tableFor
                          //       .replace('(', '')
                          //       .replace(')', '')
                          //       .replace(' ', '-')}/${row.original.id}/edit`,
                          //     state: row.original,
                          //   }}
                          //   className="table-edit-page-tag"
                          // >
                          //   {cell.render('Cell')}
                          // </Link>
                          <div>
                            {index === 3 ? (
                              'WALK IN'
                            ) : index === 4 ? (
                              <FaCircle
                                style={{ marginRight: '2px' }}
                                className={addStatusClass(row.original.status)}
                              />
                            ) : index === 5 ? (
                              <FaCircle
                                style={{ marginRight: '2px' }}
                                className={addPaymentStatusClass(
                                  row.original.payment_status
                                )}
                              />
                            ) : index === 7 ? (
                              new Date(row.original?.created).toString()
                            ) : (
                              cell.render('Cell')
                            )}
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
        {showModal && (
          <SalesHistoryModal
            handleShowModal={handleShowModal}
            order={selectedOrder}
          />
        )}
      </div>
    </div>
  );
}

export default SalesHistoryTable;
