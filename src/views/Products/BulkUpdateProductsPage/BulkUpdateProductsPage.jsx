import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { useForm, useFieldArray } from 'react-hook-form';
import { useTable, usePagination, useRowSelect } from 'react-table';

import { FaPlus, FaSearch } from 'react-icons/fa';

import { FaCaretDown } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';
import { columns as tableHeader, columnOptions } from './data';

function BulkUpdateProductsPage() {
  const tableFor = 'product(s)';
  // states
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState([]);
  const [variants, setVariants] = useState([]);
  const [columns, setColumns] = useState(tableHeader);
  const [applyAll, setApplyAll] = useState(false);

  // hooks
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      variants: variants,
    },
  });
  const { fields: variantsFiled, replace } = useFieldArray({
    control,
    name: 'variants',
  });

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
  } = useTable({ columns, data }, usePagination, useRowSelect);

  /* handlers */
  function makeReadyVariantData(data) {
    const modifiedVariants = [];
    for (let i = 0; i < data.length; i++) {
      const current = data[i].variant;
      for (let j = 0; j < current.length; j++) {
        modifiedVariants.push({
          productId: data[i].id,
          ...current[j],
          // name: data[i].name,
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
      setIsLoading(false);
      makeReadyVariantData(response.data);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function updateData(data) {
    try {
      await axiosInstance.put('api/v1/inventory/bulk-product-update/', data);
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
  // form
  const onSubmit = (data, e) => {
    if (applyAll && data.apply_all) {
      replace(replaceFromApplyHandler(data));
    } else {
      replace(replaceHandler(data));
    }
    e.target.reset();
    setApplyAll(false);
    updateData(data.variants);
    console.log(data);
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const replaceHandler = (data) => {
    const newObj = data.variants.map((variant) => {
      let updatedVariant = variant;
      // if (variant.add_new !== '') {
      //   updatedVariant.quantity =
      //     Number(variant.add_new) + Number(variant.quantity) || 0;
      // }
      return updatedVariant;
    });
    return newObj;
  };

  const replaceFromApplyHandler = (data) => {
    const newObj = data.variants.map((variant) => {
      let updatedVariant = variant;
      updatedVariant.quantity =
        Number(data.apply_all) + Number(variant.quantity);
      return updatedVariant;
    });
    return newObj;
  };

  //search
  const searchHandler = (searchInput) => {
    setData(rawData);
    if (searchInput.length > 0) {
      const searchResult = rawData.filter((product) => {
        if (product.name.toLowerCase().includes(searchInput.toLowerCase())) {
          return product;
        }
      });
      setData(searchResult);
    } else {
      setData(rawData);
    }
  };

  //select
  const columnSelectHandler = (event) => {
    let toAdd = {};
    for (let i = 0; i < event.length; i++) {
      toAdd[event[i].accessor] = true;
    }
    console.log(toAdd);
    const newColumns = tableHeader.filter((column) => {
      if (column.type !== 'inventory_location') {
        return column;
      } else if (
        column.type === 'inventory_location' &&
        toAdd[column.accessor]
      ) {
        return column;
      }
    });
    console.log(newColumns);
    setColumns(newColumns);
  };

  // page result
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
    //API
    getData();

    setPageSize(20);
  }, [setPageSize]);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            Bulk Update Products
          </h1>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb text-muted">
            <li className="breadcrumb-item">
              <Link to="/admin/index">Home</Link>
            </li>
            <li className="breadcrumb-item">Bulk Update Products</li>
          </ol>
        </nav>
        <div className="panel-container">
          <div className="table-container">
            <div className="row">
              <div className="panel-filter col-xs-12 col-md-6">
                <div className="inner-addon left-addon">
                  <FaSearch className="fa" />
                  <input
                    id="search-input"
                    type="text"
                    name="search"
                    className="form-control input-search"
                    placeholder="Search products"
                    onChange={(e) => {
                      searchHandler(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <Select
                  isMulti
                  options={columnOptions}
                  defaultValue={columnOptions}
                  placeholder="Select Inventory Locations"
                  onChange={columnSelectHandler}
                  classNamePrefix="react-select-bulk"
                />
              </div>
            </div>

            <div className="row my-2">
              <div className="text-muted col-md-6">
                <div>{pageResultText}</div>
              </div>
              <div className="col-md-6">
                <div className="form-group pull-right">
                  <div className="d-flex align-items-center">
                    <span className="mx-2">Per Page:</span>
                    <div>
                      <select
                        className="form-select"
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                        }}
                      >
                        {[20, 25, 30].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            {pageSize}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
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
                          <th scope="col" key={`col-${index}`}>
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    <tr scope="row">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="input-group m-b-sm">
                          <span className="input-group-btn">
                            <button
                              className="btn btn-primary radious-top-right-0 radious-bottom-right-0"
                              type="button"
                            >
                              %
                            </button>
                          </span>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ height: '34px' }}
                          />
                          <span className="input-group-btn">
                            <button
                              className="btn btn-primary radious-top-left-0 radious-bottom-left-0"
                              type="button"
                            >
                              <FaPlus />
                            </button>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group m-b-sm">
                          <span className="input-group-btn">
                            <button
                              className="btn btn-primary radious-top-right-0 radious-bottom-right-0"
                              type="button"
                            >
                              %
                            </button>
                          </span>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ height: '34px' }}
                          />
                          <span className="input-group-btn">
                            <button
                              className="btn btn-primary radious-top-left-0 radious-bottom-left-0"
                              type="button"
                            >
                              <FaPlus />
                            </button>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="input-group m-b-sm">
                          <span className="input-group-btn">
                            <button
                              className="btn btn-primary radious-top-right-0 radious-bottom-right-0"
                              type="button"
                            >
                              %
                            </button>
                          </span>
                          <input
                            type="text"
                            className="form-control text-center"
                            style={{ height: '34px' }}
                          />
                          <span className="input-group-btn">
                            <button
                              className="btn btn-primary radious-top-left-0 radious-bottom-left-0"
                              type="button"
                            >
                              <FaPlus />
                            </button>
                          </span>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
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
                                  ) : index === 2 ? (
                                    <textarea
                                      className="form-control"
                                      defaultValue={row.original.name}
                                    />
                                  ) : index === 3 ? (
                                    <input
                                      className="form-control"
                                      defaultValue={row.original.price}
                                    />
                                  ) : index === 6 ? (
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                    />
                                  ) : index !== 1 &&
                                    index !== 2 &&
                                    index !== 6 ? (
                                    <input className="form-control" />
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
                                  <td>Size: {variant.value}</td>
                                  <td>
                                    <textarea
                                      className="form-control"
                                      defaultValue={variant.name}
                                      {...register(`variants[${index}].name`)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      defaultValue={variant.price}
                                      min="0"
                                      type="number"
                                      {...register(
                                        `variants[${index}].selling_price`
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="number"
                                      defaultValue={variant.cost_price}
                                      {...register(
                                        `variants[${index}].cost_price`
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="number"
                                      defaultValue={variant.compare_at_price}
                                      {...register(
                                        `variants[${index}].compare_at_price`
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      defaultChecked={variant.on_sale}
                                      {...register(
                                        `variants[${index}].on_sale`
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      className="form-control"
                                      type="text"
                                      defaultValue={variant.barcode}
                                      {...register(
                                        `variants[${index}].bar_code`
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      {...register(
                                        `variants[${index}].variant_id`
                                      )}
                                      value={variant.id}
                                      className="d-none"
                                    />
                                  </td>
                                  {/* <td>
                                    <input
                                      {...register(
                                        `variants[${index}].product_id`
                                      )}
                                      value={variant.productId}
                                      className="d-none"
                                    />
                                  </td> */}
                                </tr>
                              );
                            }
                          })}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
                {rows.length !== 0 && (
                  <div className="form-submit-button-end">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                )}
              </form>
            </div>
            {rows.length === 0 && (
              <div className="d-flex">
                <p className="mx-auto">No records to display</p>
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

export default BulkUpdateProductsPage;
