import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { useForm, useFieldArray } from 'react-hook-form';
import { useTable, usePagination, useRowSelect } from 'react-table';
import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast.js';
import { FaSearch } from 'react-icons/fa';
import Pagination from '../../../others/pagination';

function BulkInventoryEntryTable({
  tableHeader,
  tableData,
  tableVariants,
  tableFor,
  columnOptions,
}) {
  // states
  const [variants, setVariants] = useState(tableVariants);
  const [data, setData] = useState(tableData);
  const [columns, setColumns] = useState(tableHeader);
  const [applyAllAmount, setApplyAllAmount] = useState(0);
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
  // form
  const onSubmit = (data, e) => {
    console.log('data', data);
    if (applyAll) {
      replace(replaceFromApplyHandler(data));
    } else {
      replace(replaceHandler(data));
      for (const variant of variants) {
        variant.stock += applyAllAmount;
      }
    }
    saveData(data.variants);
    e.target.reset();
    setApplyAll(false);
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const replaceHandler = (data) => {
    const newObj = data.variants.map((variant) => {
      let updatedVariant = variant;
      if (variant.add_new === '') {
        // updatedVariant.quantity =
        //   Number(variant.add_new) + Number(variant.quantity);
        updatedVariant.add_new = null;
      }
      return updatedVariant;
    });
    return newObj;
  };

  const replaceFromApplyHandler = (data) => {
    const newObj = data.variants.map((variant) => {
      let updatedVariant = variant;
      updatedVariant.add_new = applyAllAmount;
      return updatedVariant;
    });
    console.log({ newObj });
    return newObj;
  };

  //search
  const searchHandler = (searchInput) => {
    setData(tableData);
    if (searchInput.length > 0) {
      const searchResult = tableData.filter((product) => {
        if (
          product.product_name.toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return product;
        }
      });
      setData(searchResult);
    } else {
      setData(tableData);
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

  async function saveData(data) {
    try {
      await axiosInstance.put('api/v1/inventory/bulk-inventory-entry/', data);
      location.reload();
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);
    }
  }

  useEffect(() => {
    setPageSize(15);
    setVariants(tableVariants);
  }, [tableVariants]);

  return (
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
            defaultValue={columnOptions[0]}
            placeholder="Select Inventory Locations"
            onChange={columnSelectHandler}
            classNamePrefix="react-select-bulk"
          />
        </div>
      </div>

      <div className="row">
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
                  {[15, 20, 25, 30].map((pageSize) => (
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
              <tr>
                <td colSpan="5"></td>
                <td>
                  <div className="input-group m-b-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quick add "
                      {...register('apply_all')}
                      onChange={(e) => setApplyAllAmount(e.target.value)}
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-default radious-top-left-0 radious-bottom-left-0"
                        type="button"
                        onClick={() => {
                          setApplyAll(true);
                        }}
                      >
                        Apply
                      </button>
                    </span>
                  </div>
                </td>
                <td />
                <td />
              </tr>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <React.Fragment key={i}>
                    <tr scope="row" key={`row-${i}`} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td key={`row-${index}`} {...cell.getCellProps()}>
                            {index === 0 ? (
                              <img
                                className="img-fluid rounded"
                                src={row.original.featured_image}
                                width="40"
                              />
                            ) : index === 1 ? (
                              <Link
                                to={{
                                  pathname: `../products/${row.original.id}/edit`,
                                  state: row.original,
                                }}
                                className="table-edit-page-tag"
                              >
                                {row.original.product_name}
                              </Link>
                            ) : (
                              cell.render('Cell')
                            )}
                          </td>
                        );
                      })}
                      <td />
                      <td />
                    </tr>
                    {variants?.map((variant, index) => {
                      if (row.original.id === variant.productId) {
                        return (
                          <tr scope="row" key={`variants-${index}`}>
                            <td />
                            <td>Size: {variant.value}</td>
                            <td />
                            <td />
                            <td>{variant.cost_price}</td>
                            <td>
                              <div className="input-group m-b-sm">
                                {applyAll ? (
                                  <input
                                    min="0"
                                    type="number"
                                    className="form-control"
                                    defaultValue={applyAllAmount}
                                    {...register(`variants[${index}].add_new`)}
                                  />
                                ) : (
                                  <input
                                    min="0"
                                    type="number"
                                    className="form-control"
                                    {...register(`variants[${index}].add_new`)}
                                  />
                                )}

                                <span className="input-group-addon">
                                  {variant.stock || 0}
                                </span>
                              </div>
                            </td>
                            <td>
                              <input
                                defaultValue={variant.id}
                                type="number"
                                className="d-none form-control"
                                {...register(`variants[${index}].variant_id`)}
                              />
                            </td>
                            <td />
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
                Update Inventory
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

export default BulkInventoryEntryTable;
