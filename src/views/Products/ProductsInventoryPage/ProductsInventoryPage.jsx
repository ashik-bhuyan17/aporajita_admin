import React, { useState, useEffect, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { FaPlus, FaRegEye } from 'react-icons/fa';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Hash,
} from 'react-feather';
import { FaCaretDown } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import GlobalFilter from '../../../components/table/utils/GlobalFilter';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';
import { columns as tableHeader } from './data';

function ProductsInventoryPage() {
  const tableFor = 'product(s)';
  //state
  const [data, setData] = useState([]);
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({
    variant_id: '',
    product_id: '',
    index: 0,
  });
  //hooks
  const columns = useMemo(() => tableHeader, []);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      variants: variants,
    },
  });
  const { fields: variantsField } = useFieldArray({
    control,
    name: 'variants',
  });

  const onSubmit = (data) => {
    data = data.variants;
    console.log(selectedProduct);
    console.log(data);
    updateData({
      variant_id: selectedProduct.variant_id,
      product_id: selectedProduct.product_id,
      quantity: data[selectedProduct.index].add_new,
    });
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
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
    useRowSelect
  );

  //handlers
  function makeReadyVariantData(data) {
    const modifiedVariants = [];
    for (let i = 0; i < data.length; i++) {
      const current = data[i].variant;
      for (let j = 0; j < current.length; j++) {
        modifiedVariants.push({
          productId: data[i].id,
          ...current[j],
        });
      }
    }
    setVariants(modifiedVariants);
  }
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/products/');
      setData(response.data);
      makeReadyVariantData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function updateData(data) {
    try {
      await axiosInstance.put('api/v1/inventory/product-inventory/', data);
      setIsLoading(false);
      successToast('Updated successfuly');
      getData();
    } catch (err) {
      errorToast('Error on updating data!, Please try again.');
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
  }, [setPageSize, reset]);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            Manage Products Inventory
          </h1>
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
                <a className="dropdown-item" href="#">
                  Export to CSV
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="panel-container">
          <div className="table-container">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div className="table-search-container"></div>
            <div className="table-header-container">
              <div className="text-muted">
                <div>{pageResultText}</div>
              </div>

              <div className="page-header-button-container col-xs-12 col-md-6">
                <ul className="dropdown-menu" aria-labelledby="export">
                  <li>
                    <a className="dropdown-item" href="#">
                      Export to CSV
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="table-scroll">
              <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => checkKeyDown(e)}
              >
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
                            key={`col-${index}`}
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
                                index === 1 && (
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
                        <React.Fragment key={i}>
                          <tr
                            scope="row"
                            key={`row-${i}`}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell, index) => {
                              return (
                                <td
                                  key={`row-${index}`}
                                  {...cell.getCellProps()}
                                >
                                  {index === 0 ? (
                                    <img
                                      className="img-fluid rounded"
                                      src={row.original.featured_image}
                                      width="40"
                                    />
                                  ) : (
                                    cell.render('Cell')
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                          {variants.map((variant, index) => {
                            if (row.original.id === variant.productId) {
                              return (
                                <tr scope="row" key={`variants-${index}`}>
                                  <td></td>
                                  <td></td>
                                  <td>Size: {variant.value}</td>
                                  <td>{variant.on_hand}</td>
                                  <td>{variant.commited}</td>
                                  <td>{variant.available}</td>
                                  <td>
                                    <div className="input-group">
                                      <input
                                        id="adjustment"
                                        type="number"
                                        name="adjustment"
                                        className="form-control btn-adjust radious-top-right-0 radious-bottom-right-0"
                                        step="1"
                                        {...register(
                                          `variants[${index}].add_new`
                                        )}
                                      />
                                      <div className="input-group-btn">
                                        <button
                                          className="btn btn-success btn-adjust radious-top-left-0 radious-bottom-left-0"
                                          type="submit"
                                          onClick={() => {
                                            setSelectedProduct({
                                              variant_id: variant.id,
                                              product_id: variant.productId,
                                              index,
                                            });
                                          }}
                                        >
                                          <FaPlus />
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-default"
                                      data-bs-toggle="modal"
                                      data-bs-target="#detailsModal"
                                    >
                                      <FaRegEye />
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </form>
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
            <div
              className="modal fade"
              id="detailsModal"
              aria-labelledby="detailsModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Stock Level Adjustments</h3>
                  </div>
                  <div className="modal-body"></div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-default"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsInventoryPage;
