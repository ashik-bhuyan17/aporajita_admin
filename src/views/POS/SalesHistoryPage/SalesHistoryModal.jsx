export default function SalesHistoryModal({ order, handleShowModal }) {
  return (
    <div
      className="modal right show"
      id="salesHistoryModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="big-row-option-title">{order.id}/Completed</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                handleShowModal();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="page-header-container row">
              <div className="col-xs-12 col-md-6">
                <h3 className="big-row-option-title">WALK IN</h3>
              </div>
              <div className="page-header-button-container col-xs-12 col-md-6">
                <button className="btn btn-default">Print</button>
                <button className="btn btn-primary">Refund</button>
              </div>
            </div>
            <div className="table-scroll">
              <table className="table-responsive">
                <tbody>
                  {order.order_item.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            className="img-fluid rounded"
                            src={product.product_image}
                            width="50"
                            alt="product"
                          />
                        </td>
                        <td>
                          <span>{product.product_name}</span>
                          <br />
                          <br />
                          <span className="small-text text-muted">
                            SKU: {product.sku} / Barcode: {product.barcode}
                          </span>
                        </td>
                        <td>x{product.quantity}</td>
                        <td>BDT {product.unit_price}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="2" />
                    <td className="small-row-option-title">Subtotal</td>
                    <td className="small-row-option-title">
                      {order.sub_total} BDT
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" />
                    <td className="small-row-option-title">Discount</td>
                    <td className="small-row-option-title">
                      {order.total_discount} BDT
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" />
                    <td className="small-row-option-title">Tax</td>
                    <td className="small-row-option-title">
                      {order.total_tax} BDT
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" />
                    <td className="small-row-option-title">Total</td>
                    <td className="small-row-option-title">
                      {order.total_tax} BDT
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" />
                    <td className="small-row-option-title">Total Paid</td>
                    <td className="small-row-option-title">{order.paid} BDT</td>
                  </tr>
                  <tr>
                    <td colSpan="2" />
                    <td className="small-row-option-title">Balance</td>
                    <td className="small-row-option-title">
                      {order.balance} BDT
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />

            {/* <h3 className="big-row-option-title">Payments</h3>
            <div className="table-scroll">
              <table className="table-responsive">
                <thead className="grey-table-header">
                  <tr>
                    <th>Payment</th>
                    <th>Payment Date</th>
                    <th>Reference</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Card</td>
                    <td>Oct 24, 2021 at 02:53 PM</td>
                    <td>In store POS sale</td>
                    <td>BDT</td>
                  </tr>
                  <tr>
                    <td>Cash</td>
                    <td>Oct 24, 2021 at 02:53 PM</td>
                    <td>In store POS sale</td>
                    <td>BDT</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="big-row-option-title">Sale History</h3>
            <div className="table-scroll">
              <table className="table-responsive">
                <thead className="grey-table-header">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th className="text-right">Date Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Completed</td>
                    <td></td>
                    <td className="text-right">Oct 24, 2021 at 02:53 PM</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
