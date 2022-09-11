function InStoreSalesPage() {
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div
          id="report_data"
          data-currency="BDT "
          data-outlets='[{"id":2912,"text":"test","registers":[{"id":9972,"name":"demo","open":false,"outlet_id":2912,"outlet_name":"test","cash_management":true}]},{"id":2379,"text":"Aporajita Tumi By Shatabdi","registers":[]}]'
        ></div>
        <div id="sales-index">
          <div className="row">
            <div className="col-md-6">
              <div className="page-title col-xs-12 col-md-6">
                <h3>Sales History</h3>
              </div>
            </div>
            <div className="col-md-6">
              <div className="page-title col-xs-12 col-md-6">
                <div className="pull-right">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-info dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Export <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                      <li>
                        <a
                          data-bind="attr: {href: $root.exportUrl()}"
                          href='/admin/pos/sales/export.csv?&amp;start_date="2021-07-26T18:00:00.000Z"&amp;end_date="2021-08-25T17:59:59.999Z"'
                        >
                          Export to CSV
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success dropdown-toggle"
                    data-toggle="dropdown"
                    data-bind="reportdaterangepicker: $root.dateRange"
                    aria-expanded="false"
                  >
                    <span>Last 30 Days </span>
                    <i className="fa fa-calendar"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="main-wrapper">
            <div className="panel white-panel">
              <div className="panel-body">
                <div className="panel-filter">
                  <div className="row">
                    <div className="col-md-12">
                      <div role="tabpanel">
                        <ul className="nav nav-pills" role="tablist">
                          <li role="presentation" className="active">
                            <a
                              href="#"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="false"
                              data-bind="click: $root.statusClick.bind($data,null)"
                            >
                              All
                            </a>
                          </li>
                          <li role="presentation" className="">
                            <a
                              href="#"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="false"
                              data-bind="click: $root.statusClick.bind($data,1)"
                            >
                              Completed
                            </a>
                          </li>
                          <li role="presentation" className="">
                            <a
                              href="#"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="false"
                              data-bind="click: $root.statusClick.bind($data,0)"
                            >
                              Parked
                            </a>
                          </li>
                          <li role="presentation" className="">
                            <a
                              href="#"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="false"
                              data-bind="click: $root.statusClick.bind($data,4)"
                            >
                              Lay By
                            </a>
                          </li>
                          <li role="presentation" className="">
                            <a
                              href="#"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="false"
                              data-bind="click: $root.statusClick.bind($data,5)"
                            >
                              On Account
                            </a>
                          </li>
                          <li role="presentation" className="">
                            <a
                              href="#"
                              role="tab"
                              data-toggle="tab"
                              aria-expanded="false"
                              data-bind="click: $root.statusClick.bind($data,2)"
                            >
                              Refunded
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="inner-addon left-addon margin-top-15">
                        <i className="fa fa-search"></i>
                        <input
                          id="search-input"
                          type="text"
                          name="search"
                          className="form-control input-search"
                          placeholder="Search sales by serial or customer name"
                          data-bind="textInput: searchText,event: {keyup: onEnter}"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="pull-right margin-top-15">
                        <select
                          className="form-control"
                          data-bind="value: selectedOutlet, options:$root.outlets,optionsText:'text', optionsValue:'id', optionsCaption:'Filter by outlet..' "
                        >
                          <option value="">Filter by outlet..</option>
                          <option value="2379">
                            Aporajita Tumi By Shatabdi
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="dataTables_info"
                  role="status"
                  aria-live="polite"
                  data-bind="text:pager().ResultInfo() + 'sales(s)'"
                >
                  Showing 0 to 0 of 0 sales(s)
                </div>
                <div className="table-responsive project-stats">
                  <table
                    className="table dataTable"
                    data-bind="loadingWhen: isLoading()"
                  >
                    <thead>
                      <tr>
                        <th
                          className="sortable sorting ui-sortable"
                          data-bind="sort: { sort_by: 'serial' }"
                        >
                          Sale #
                        </th>
                        <th
                          className="text-left sortable sorting ui-sortable"
                          data-bind="sort: { sort_by: 'source' }"
                        >
                          Source
                        </th>
                        <th
                          className="text-left sortable sorting ui-sortable"
                          data-bind="sort: { sort_by: 'outlets.name' }"
                        >
                          Outlet
                        </th>
                        <th
                          className="text-left sortable sorting ui-sortable"
                          data-bind="sort: { sort_by: 'customers.first_name' }"
                        >
                          Customer
                        </th>
                        <th
                          className="text-left sortable sorting ui-sortable"
                          data-bind="sort: { sort_by: 'sale_status' }"
                        >
                          Status
                        </th>
                        <th
                          className="text-left sortable sorting ui-sortable"
                          data-bind="sort: { sort_by: 'payment_status' }"
                        >
                          Payment Status
                        </th>
                        <th
                          className="text-right sortable sorting ui-sortable"
                          data-bind="sort: { sort_by: 'total_price_normalized' }"
                        >
                          Total Price
                        </th>
                        <th
                          className="text-center sortable sorting ui-sortable"
                          data-bind="sort: { sort_by: 'created_at' }"
                        >
                          Date Created
                        </th>
                      </tr>
                    </thead>
                    <tbody data-bind="foreach: sales"></tbody>
                  </table>
                  <div className="text-center">
                    <ul
                      data-bind="visible: NeedPaging"
                      className="flip pagination pagination-sm pointer"
                      style={{ display: 'none' }}
                    >
                      <li
                        data-bind="css: { disabled: !FirstPageActive() }"
                        className="disabled"
                      >
                        <a data-bind="click: GoToFirst">«</a>
                      </li>
                      <li
                        data-bind="css: { disabled: !PreviousPageActive() }"
                        className="disabled"
                      >
                        <a data-bind="click: GoToPrevious">‹</a>
                      </li>

                      <li
                        data-bind="css: { disabled: !NextPageActive() }"
                        className="disabled"
                      >
                        <a data-bind="click: GoToNext">›</a>
                      </li>
                      <li data-bind="css: { disabled: !LastPageActive() }">
                        <a data-bind="click: GoToLast">»</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal right fade payment_modal"
              id="sale_details_modal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel2"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content" data-bind="with:sale"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InStoreSalesPage;
