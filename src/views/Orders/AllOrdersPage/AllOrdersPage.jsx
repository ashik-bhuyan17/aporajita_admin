import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
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
import { FcCancel, FcOk, } from 'react-icons/fc';
import { FaCaretDown, FaRegCalendarAlt, FaSearch, FaCheckCircle, FaLocationArrow } from 'react-icons/fa';
import { MdOutlineDeliveryDining } from 'react-icons/md'
import { ToastContainer } from 'react-toastify';
import { Calendar, DateRangePicker } from 'react-date-range';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';

import Pagination from '../../../components/others/pagination';
import { columns as tableHeader, data as tableData } from './data';
import IndeterminateCheckbox from '../../../components/table/utils/IndeterminateCheckbox';
import './AllOrdersTable.css';
import InvoiceV2M from '../../../components/pdf/InvoiceV2M/InvoiceV2M';
import { BlobProvider, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function AllOrdersPage() {
  const statusRef = useRef(null);
  const paymentRef = useRef(null);
  const calendarFilterRef = useRef(null);
  const tableFor = 'orders';
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pickerShow, setPickerShow] = useState(false);
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
      const searchResult = rawData.filter((order) => {
        console.log(order);
        if (
          order?.fullname?.toLowerCase()?.includes(searchInput.toLowerCase()) ||
          order?.customer_phone
            ?.toLowerCase()
            ?.includes(searchInput.toLowerCase()) ||
          order?.status?.toLowerCase()?.includes(searchInput.toLowerCase()) ||
          order?.id
            ?.toString()
            .toLowerCase()
            ?.includes(searchInput.toLowerCase())
        ) {
          return order;
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
  //bulk order post api
  async function sendData(data) {
   var order_id =[]
    for(var i =0;i<selectedFlatRows.length; i++ ){
      order_id.push(selectedFlatRows[i].original.id)
    }
    console.log(order_id)
    try {
      const response = await axiosInstance.post('/api/v1/order/pathao/order/bulk',data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const handlesendData = (orderID) => {
    console.log(orderID);
    sendData(orderID);
  }
  







  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/order');
      setData(response.data);
      setRawData(response.data);
      setIsLoading(false);
      makeReadyCSV(response.data);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function makeFullfilled() {
    const orders = selectedFlatRows.map((row) => {
      return row.original;
    });
    try {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        order.is_fulfilled = true;
        const response = await axiosInstance.put(
          `api/v1/order/update/${order.id}/`,
          order
        );
        successToast(`Order Updated`);
        console.log(response.data);
        setIsLoading(false);
      }
      getData();
    } catch (err) {
      errorToast('Error!, Please try again to update');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function updateOrder(order, status) {
    try {
      order.status = status;
      const response = await axiosInstance.put(
        `api/v1/order/update/${order.id}/`,
        order
      );
      successToast(`Order ${status}`);
      console.log(response.data);
      setIsLoading(false);
      getData();
    } catch (err) {
      errorToast('Error!, Please try again to update');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function filterDataByAPI(filterType) {
    try {
      const response = await axiosInstance.get(
        `api/v1/order/order-filter/?time=${filterType}`
      );
      setData(response.data.orders);
      setRawData(response.data.orders);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function filterData() {
    const items = rawData;
    let filtered = [];
    const status = statusRef?.current?.value;
    const payment = paymentRef?.current?.value;
    if (payment !== '-1' && status !== '-1') {
      for (let i = 0; i < items.length; i++) {
        if (items[i].payment === payment && items[i].status === status) {
          filtered.push(items[i]);
        }
      }
    } else if (payment !== '-1') {
      for (let i = 0; i < items.length; i++) {
        if (items[i].payment === payment) {
          filtered.push(items[i]);
        }
      }
    } else if (status !== '-1') {
      for (let i = 0; i < items.length; i++) {
        if (items[i].status === status) {
          filtered.push(items[i]);
        }
      }
    } else {
      filtered = items;
    }
    setData(filtered);
  }
  //----------API------END-------
  const reshapeData = () => {
    const orders = selectedFlatRows.map((row) => {
      return row.original;
    });
    const reshapedOrders = orders.map((order) => {
      console.log('order: ', order);
      const container = {};
      container.customer = {
        fullname: order.fullname,
        phone: order.phone,
        delivery_address: order.address,
      };
      container.paid = order.paid;
      container.orderId = order.order_id;
      container.subtotal = order.order_total;
      container.discountTotal = order.other_discount;
      container.taxTotal = order.total_tax;
      container.total = order.order_total;
      container.changes = order.other_charges;
      container.created = order.created;
      container.servedBy = order.ordered_by;
      container.order_note = order.order_note;
      container.paymentDetailsPayment = [{}];
      container.cartItems = order.order_item.map((item) => {
        return {
          name: item.product_name,
          addedQuantity: item.quantity,
          unitPrice: item.unit_price,
          price: item.price,
          variantName: item.size_name,
          variantValue: item.size_value,
        };
      });
      return container;
    });
    console.log(reshapedOrders);
    return reshapedOrders;
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
    if (status === 'Accepted') return 'orders-accepted';
    else if (status === 'Shipped') return 'orders-shipped';
    else if (status === 'Delivered') return 'light-green-bg';
    else if (status === 'Received') return 'green-bg';
    else if (status === 'On Account') return 'yellow-bg';
    else return 'orders-rejected';
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };

  const handleSelect = (date) => {
    console.log(date); // native Date object
    selectionRange.endDate = date.selection.endDate;
  };

  const makeReadyCSV = (data) => {
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
    // delete data.id;
    // delete data.actions;
    for (let i = 0; i < data.length; i++) {
      tempData[i] = data[i];
    }
    setCsvData(tempData);
  };
  // -----pathao handle------
  async function postPathaoData(id) {
    try {
      const response = await axiosInstance.post('/api/v1/order/pathao/order/', {
        order_id: id
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const handlePathaoClick = (orderID) => {
    console.log(orderID);
    postPathaoData(orderID);
  }

  useEffect(() => {
    getData();
    // setData(tableData);

    setPageSize(15);
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        {/* {pickerShow && (
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        )} */}
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Orders</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
          {selectedFlatRows.length > 0 && (
              <button
                className="btn btn-warning"
                type="button"
                onClick={() => {
                    for(var i =0;i<selectedFlatRows.length ; i++ ){
                    handlesendData(selectedFlatRows[i].original.id);
                    console.log(selectedFlatRows[i].original.id)
                  }}
                }
              >
                Bulk Order
              </button>
            )}
            {selectedFlatRows.length > 0 && (
              <BlobProvider
                document={<InvoiceV2M orders={reshapeData()} />}
                fileName="selected_orders.pdf"
              >
                {({ url }) => (
                  <a href={url} target="_blank">
                    <button className="btn btn-danger">Print</button>
                  </a>
                )}
              </BlobProvider>
            )}
            {selectedFlatRows.length > 0 && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  makeFullfilled();
                }}
              >
                Mark As Fulfiled
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
                  filename="order history.csv"
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
              <span ref={calendarFilterRef}>Last 30 Days</span>
              <span style={{ marginLeft: '3px' }}>
                <FaRegCalendarAlt />
              </span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="calendarFilter">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    filterDataByAPI('today');
                    console.log(calendarFilterRef.current);
                    calendarFilterRef.current.innerHTML = 'Today';
                  }}
                >
                  Today
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    filterDataByAPI('yesterday');
                    calendarFilterRef.current.innerHTML = 'Yesterday';
                  }}
                >
                  Yesterday
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    filterDataByAPI('last_7_days');
                    calendarFilterRef.current.innerHTML = 'Last 7 Days';
                  }}
                >
                  Last 7 Days
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    filterDataByAPI('last_30_days');
                    calendarFilterRef.current.innerHTML = 'Last 30 Days';
                  }}
                >
                  Last 30 Days
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    filterDataByAPI('this_month');
                    calendarFilterRef.current.innerHTML = 'This Month';
                  }}
                >
                  This Month
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    filterDataByAPI('last_month');
                    calendarFilterRef.current.innerHTML = 'Last Month';
                  }}
                >
                  Last Month
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    filterDataByAPI('last_3_month');
                    calendarFilterRef.current.innerHTML = 'Last 3 Months';
                  }}
                >
                  Last 3 Months
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    filterDataByAPI('last_6_month');
                    calendarFilterRef.current.innerHTML = 'Last 6 Months';
                  }}
                >
                  Last 6 Months
                </a>
                {/* <a
                  className="dropdown-item"
                  href="#"
                  onClick={setPickerShow(!pickerShow)}
                >
                  Custom Range
                </a> */}
              </li>
            </ul>
          </div>
        </div>

        <div className="panel-container">
          <div className="table-container">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div
                    className="col-xs-2 col-md-2 padding-0"
                    style={{ width: 'auto', marginLeft: '10px' }}
                  >
                    <button
                      className="btn"
                      type="button"
                      id="filter"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Filters
                      <span>
                        <FaCaretDown className="btn-right-icon" />
                      </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="filter">
                      <li className="p-2">
                        <p className="row-option-title main-text-color">
                          Payment Method
                        </p>
                        <div>
                          <select
                            className="form-select"
                            ref={paymentRef}
                            onChange={() => {
                              filterData();
                            }}
                          >
                            <option value="-1">All</option>
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                            <option value="Cash On Deliery">
                              Cash On Deliery
                            </option>
                          </select>
                        </div>
                      </li>
                      <li className="p-2">
                        <p className="row-option-title main-text-color">
                          Status
                        </p>
                        <div>
                          <select
                            className="form-select"
                            ref={statusRef}
                            onChange={() => {
                              filterData();
                            }}
                          >
                            <option value="-1">All</option>
                            <option value="Recieved">Recieved</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Closed">Closed</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-xs-6 col-md-8 padding-0">
                    <div className="panel-filter">
                      <div className="inner-addon left-addon">
                        <FaSearch className="fa" />
                        <input
                          id="search-input"
                          type="text"
                          name="search"
                          className="form-control input-search"
                          placeholder="Name or Email or Phone or Serial or Status"
                          onChange={(e) => {
                            searchHandler(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
                                <TiArrowSortedDown className="table-sorted" />
                              ) : (
                                <TiArrowSortedUp className="table-sorted" />
                              )
                            ) : (
                              (index === 8 || index === 9) && (
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
                    const status = row.original.status;
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
                                      .replace(')', '')}/${row.original.id
                                      }/edit`,
                                    state: row.original,
                                  }}
                                  className="table-edit-page-tag"
                                >
                                  {cell.render('Cell')}
                                </Link>
                              ) : index === 4 ? (
                                <span
                                  className={`status-label ${addStatusClass(
                                    status
                                  )}`}
                                >
                                  {cell.render('Cell')}
                                </span>
                              ) : index === 5 ? (
                                row.original.is_fulfilled ? (
                                  <span className="fulfilment-label">
                                    Fulfilled
                                  </span>
                                ) : (
                                  <span className="fulfilment-label">
                                    Not Fulfilled
                                  </span>
                                )
                              ) : index === 9 ? (
                                <span>
                                  {new Date(
                                    row.original.created
                                  ).toDateString()}{' '}
                                  at{' '}
                                  {new Date(
                                    row.original.created
                                  ).toLocaleTimeString()}
                                </span>
                              ) : index === 10 ? (
                                row.original.status === 'Rejected' ? (
                                  <button
                                    type="button"
                                    className="btn"
                                    onClick={() => {
                                      updateOrder(row.original, 'Accepted');
                                    }}
                                  >
                                    <FcOk />
                                  </button>
                                ) : row.original.status === 'Accepted' ? (
                                  <button
                                    type="button"
                                    className="btn"
                                    onClick={() => {
                                      updateOrder(row.original, 'Cancelled');
                                    }}
                                  >
                                    <FcCancel />
                                  </button>
                                ) : (
                                  ''
                                )
                              ) : index === 11 ? (
                                row.original.pathao_status !== true ? <div className='btn wraper' >
                                  <MdOutlineDeliveryDining size={24} className='backgroundIcon' color='3c763d' />
                                  <FaCheckCircle className='foregroundIcon' size={8} color='3c763d' />
                                </div> : <button type="button"
                                  className="btn" onClick={() => { handlePathaoClick(row.original.id) }}>
                                  <MdOutlineDeliveryDining size={20} color='f25656' />
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

export default AllOrdersPage;
