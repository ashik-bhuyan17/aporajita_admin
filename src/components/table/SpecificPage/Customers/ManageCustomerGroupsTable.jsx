import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import { RiDeleteBin6Fill } from 'react-icons/ri';

function ManageCustomerGroupsTable({
  tableHeader,
  tableData,
  tableFor,
  deleteData,
}) {
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
    state: { pageIndex, pageRows, pageSize, selectedRowIds, globalFilter },
    setPageSize,
    prepareRow,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  //API
  // async function deleteData(id) {
  //   try {
  //     await axiosInstance.delete(`api/v1/customer/customer-group-list​/${id}/`);
  //     getData();
  //     successToast('Deleted successfuly');
  //   } catch (err) {
  //     errorToast('Error occured!, Please try again.');
  //   }
  // }

  useEffect(() => {
    setPageSize(15);
    setData(tableData);
  }, [tableData]);

  return (
    <div className="table-container">
      <div className="table-header-container"></div>
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
                        {index === 0 ? (
                          <Link
                            to={{
                              pathname: `/admin/customers/groups/${row.original.id}/edit`,
                              state: row.original,
                            }}
                            className="table-edit-page-tag"
                          >
                            {cell.render('Cell')}
                          </Link>
                        ) : index === 3 ? (
                          <button
                            className="btn btn-sm"
                            onClick={() => {
                              deleteData(row.original.id);
                            }}
                          >
                            <RiDeleteBin6Fill style={{ color: '#4E5E6A' }} />
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

export default ManageCustomerGroupsTable;
