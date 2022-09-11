/*
import { useCallback } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

function TableWithCheckBox({ tableData, setSelectedRows, toggleCleared }) {
  const handleRowSelected = useCallback((state) => {
    if (state.selectedCount) {
      setSelectedRows(state.selectedRows);
    } else {
      setSelectedRows(false);
    }
  }, []);
  return (
    <div className="main">
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={tableData.columns}
          data={tableData.data}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          paginationPerPage={15}
          highlightOnHover
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </DataTableExtensions>
    </div>
  );
}

export default TableWithCheckBox;
*/
