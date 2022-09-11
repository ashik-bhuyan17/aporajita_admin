
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

import GlobalFilter from '../../utils/GlobalFilter';

function ProductsInventoryTable({
  tableHeader,
  tableData,
  tableVariants,
  tableFor,
}) {
  const columns = useMemo(() => tableHeader, []);
  const [data, setData] = useState(tableData);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      variants: tableVariants,
    },
  });
  const { fields: variantsFiled } = useFieldArray({
    control,
    name: 'variants',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

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
  }, []);

  return (
    <div className="table-container">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-search-container"></div>
      <div className="table-header-container">
        <div className="text-muted">
          <div>{pageResultText}</div>
        </div>

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
                    <tr scope="row" key={`row-${i}`} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td key={`row-${index}`} {...cell.getCellProps()}>
                            {index === 0 ? (
                              <img
                                className="img-fluid rounded"
                                src={row.original.imageURL}
                                width="40"
                              />
                            ) : (
                              cell.render('Cell')
                            )}
                          </td>
                        );
                      })}
                    </tr>
                    {variantsFiled.map((variant, index) => {
                      if (row.original.id === variant.productId) {
                        return (
                          <tr scope="row" key={`variants-${index}`}>
                            <td></td>
                            <td></td>
                            <td>Size: {variant.size}</td>
                            <td>{variant.on_hand}</td>
                            <td>{variant.commited}</td>
                            <td>{variant.available_to_sell}</td>
                            <td>
                              <div className="input-group">
                                <input
                                  id="adjustment"
                                  type="number"
                                  name="adjustment"
                                  className="form-control btn-adjust radious-top-right-0 radious-bottom-right-0"
                                  step="1"
                                  {...register(`variants[${index}].add_new`)}
                                />
                                <div className="input-group-btn">
                                  <button
                                    className="btn btn-success btn-adjust radious-top-left-0 radious-bottom-left-0"
                                    type="submit"
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
        )}
      </div>
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
  );
}

export default ProductsInventoryTable;
