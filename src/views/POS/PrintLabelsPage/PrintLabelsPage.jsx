import './PrintLabelsPage.css';

function PrintLabelsPage() {
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div id="generate_product_label" className="">
          <div className="page-title col-xs-12 col-md-6">
            <h3>Print Product Labels</h3>
          </div>

          <div id="main-wrapper">
            <div id="pl_data" data-currency="BDT " data-tax-data="[]"></div>
            <div className="row">
              <div className="col-md-6">
                <div className="panel white-panel non-printable">
                  <div className="panel-heading">
                    <h3 className="panel-title">Print Labels</h3>
                  </div>
                  <div className="panel-body">
                    <h3>Label Type : A4 label sheet</h3>
                    <hr />
                    <div className="row" style={{ paddingLeft: '15px' }}>
                      <h3>Select Format</h3>
                      <div className="radio" style={{ paddingLeft: '15px' }}>
                        <label>
                          <input
                            type="radio"
                            name="format"
                            value="4"
                            data-bind="checked: $root.format, value: $root.format"
                          />
                          4 labels per row
                        </label>
                      </div>
                      <div className="radio" style={{ paddingLeft: '15px' }}>
                        <label>
                          <input
                            type="radio"
                            name="format"
                            value="6"
                            data-bind="checked: $root.format"
                          />
                          6 labels per row
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className="row" style={{ paddingLeft: '15px' }}>
                      <h3>Select Symbologies</h3>
                      <select
                        className="form-control"
                        style={{ width: '50%' }}
                        name="timezone"
                        data-bind="options: $root.symbologiesArray, optionsText:'code',optionsValue:'id', value:$root.symbology,optionsCaption: 'Choose...'"
                      >
                        <option value="">Choose...</option>
                        <option value="1">CODE_25_INTERLEAVED</option>
                        <option value="2">CODE_25_IATA</option>
                        <option value="3">CODE_39</option>
                        <option value="4">CODE_93</option>
                        <option value="5">CODE_128A</option>
                        <option value="6">CODE_128B</option>
                        <option value="7">CODE_128C</option>
                        <option value="8">EAN_13</option>
                        <option value="9">EAN_8</option>
                      </select>
                    </div>
                    <hr />
                    <div className="row" style={{ paddingLeft: '15px' }}>
                      <h3>Include In Print</h3>
                      <div className="col-md-6">
                        <div className="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              data-bind="checked: $root.showPrice"
                            />
                            Price
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              data-bind="checked: $root.showTotalPrice"
                            />
                            Tax Inclusive Price
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              data-bind="checked: $root.showBarcodeNumber"
                            />
                            Barcode Number
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              data-bind="checked: $root.showName"
                            />
                            Product Name
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              data-bind="checked: $root.showSku"
                            />
                            SKU
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <h3 style={{ paddingLeft: '15px' }}>Preview</h3>
                      <div className="text-center">
                        <div className="preview">
                          <img
                            src="https://www.isostech.com/wp-content/uploads/2015/03/1DBarcode.png"
                            height="70"
                            width="200"
                          />
                          <div>
                            <span data-bind="visible: $root.showBarcodeNumber()">
                              25458888877899
                            </span>
                          </div>
                          <div>
                            <span
                              className="modified-text"
                              data-bind="visible: $root.showName()"
                            >
                              T-Shirt
                            </span>
                          </div>
                          <div>
                            <span
                              data-bind="visible: $root.showSku()"
                              style={{ display: 'none' }}
                            >
                              1101
                            </span>
                          </div>
                          <div>
                            <span data-bind="visible: $root.showPrice()">
                              USD 75.00
                            </span>
                          </div>
                          <div>
                            <span
                              data-bind="visible: $root.showTotalPrice()"
                              style={{ display: 'none' }}
                            >
                              USD 100.50
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="printable-content printable-content">
                  <div className="row"></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="panel white-panel">
                  <div className="panel-heading">
                    <div className="search-input col-md-6">
                      <h3 className="panel-title">Select Products</h3>
                    </div>

                    <div className="pull-right" style={{ marginTop: '-5px' }}>
                      <button
                        style={{ marginLeft: '10px', display: 'none' }}
                        className="btn btn-danger pull-right"
                        data-bind="visible: $root.added_products().length > 1, click: $root.removeAllItem"
                      >
                        Remove All
                      </button>
                      <button
                        className="btn btn-primary pull-right"
                        data-bind="enable: $root.selectedProducts().length > 0 , click: generateBarcode"
                        disabled=""
                      >
                        Print Barcode
                      </button>
                    </div>
                  </div>

                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="inner-addon left-addon">
                          <i className="fa fa-search"></i>
                          <input
                            id="search-input"
                            type="text"
                            name="search"
                            className="form-control input-search"
                            placeholder="Search by product name, sku ..."
                            data-bind="hasFocus: showProductSearchModal"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="table-responsive project-stats">
                        <table
                          className="table dataTable"
                          data-bind="loadingWhen: isLoading()"
                        >
                          <thead>
                            <tr>
                              <th className="text-left col-md-3">
                                Product Name
                              </th>
                              <th className="text-left col-md-3">SKU</th>
                              <th className="text-left col-md-3">Barcode</th>
                              <th className="text-center col-md-3">
                                Label Quantity
                              </th>
                              <th className="text-right col-md-3">Action</th>
                            </tr>
                          </thead>
                          <tbody data-bind="foreach: added_products"></tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="product_search_modal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                >
                  <div className="vertical-alignment-helper">
                    <div className="modal-dialog  modal-lg vertical-align-center">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div
                            className="col-md-6"
                            style={{ paddingLeft: '0px' }}
                          >
                            <h3 className="modal-title" id="myModalLabel">
                              Search Products
                            </h3>
                          </div>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="inner-addon left-addon">
                                <i className="fa fa-search"></i>
                                <input
                                  className="form-control"
                                  id="product_search"
                                  name="product_search"
                                  data-bind="textInput: $root.product_search_text"
                                  type="text"
                                  placeholder="Search by product name, sku ..."
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="scrollable-menu"
                            style={{ minWidth: '100%' }}
                            role="menu"
                            data-bind="loadingWhen: isLoading()"
                          >
                            <div className="table-responsive">
                              <table className="table dataTable">
                                <thead>
                                  <tr>
                                    <th style={{ width: '15px' }}>
                                      <span>
                                        <input
                                          type="checkbox"
                                          data-bind="click: $root.selectAllItem"
                                        />
                                      </span>
                                    </th>
                                    <th>Product</th>
                                    <th>SKU</th>
                                    <th>Current Stock</th>
                                  </tr>
                                </thead>
                                <tbody data-bind="foreach: $root.product_search_results"></tbody>
                                <tbody data-bind="visible: $root.product_search_results().length == 0">
                                  <tr className="odd">
                                    <td
                                      valign="top"
                                      colspan="8"
                                      className="dataTables_empty"
                                    >
                                      No products found
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bind="enable: $root.selectedProducts().length > 0, click: $root.addSelectedProducts"
                            disabled=""
                          >
                            Add Selected Products
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary pull-right"
              data-bind="enable: $root.selectedProducts().length > 0 , click: generateBarcode"
              disabled=""
            >
              Print Barcode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintLabelsPage;
