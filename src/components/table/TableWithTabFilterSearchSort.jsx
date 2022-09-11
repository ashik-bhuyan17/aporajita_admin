
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



import GlobalFilter from './utils/GlobalFilter';

function TableWithTabFilterSearchSort({
  tableHeader,
  tableData,
  tableFor,
  tableTab,
}) {
  const columns = useMemo(() => tableHeader, []);
  //   const data = useMemo(() => tableData, []);
  const allData = tableData;

  const tabRefs = useRef([]);
  const [data, setData] = useState(tableData);

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
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
        )}
      </div>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
}

export default TableWithTabFilterSearchSort;
