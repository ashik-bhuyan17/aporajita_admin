import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Trash } from 'react-feather';

function CreateNewPurchaseOrderPage() {
  //   states

  // demo data
  const suppliers = [
    { value: 'Somikoron', label: 'Somikoron' },
    {
      value: 'Somikoron Cosmetics',
      label: 'Somikoron Cosmetics',
    },
  ];

  // hooks
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // handlers
  const onSubmit = (data) => {
    console.log(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Inventory Purchase</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link
              to="/admin/inventory/purchase-orders"
              className="btn btn-primary"
            >
              All Purchase Orders
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <div className="panel-container">
            <p className="panel-heading">Purchase Information</p>
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-md-3">
                  <label className="form-label row-option-title">
                    PO Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    disabled
                    placeholder="PO-03"
                    {...register('po_number')}
                  />
                </div>
                <div className="mb-3 col-md-3">
                  <label className="form-label row-option-title required">
                    Supplier
                  </label>
                  <input
                    className="form-control"
                    placeholder={'Search Supplier'}
                  />
                </div>
                <div className="mb-3 col-md-3">
                  <label className="form-label row-option-title required">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    {...register('purchase_date', { required: true })}
                    className={`form-control ${
                      errors.purchase_date ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.purchase_date && "Can't be empty"}
                  </div>
                </div>
                <div className="mb-3 col-md-3">
                  <label className="form-label row-option-title required">
                    Expected Date
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.expected_date ? 'is-invalid' : ''
                    }`}
                    {...register('expected_date', { required: true })}
                  />
                  <div className="invalid-feedback">
                    {errors.expected_date && "Can't be empty"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-container">
            <p className="panel-heading">Search Products</p>
            <input
              className="form-control"
              placeholder="Search by product name"
            />
          </div>
          <div className="panel-container">
            <p className="panel-heading">Purchase Items</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Variant Options</th>
                  <th scope="col">SKU</th>
                  <th scope="col">Order Quantity</th>
                  <th scope="col">Received</th>
                  <th scope="col">Deliver To</th>
                  <th scope="col">Unit Cost</th>
                  <th scope="col">Tax (BDT)</th>
                  <th scope="col">Tax Amount (BDT)</th>
                  <th scope="col">Received Amount (BDT)</th>
                  <th scope="col">Total Amount (BDT)</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Jamdani</th>
                  <td>Size: 15</td>
                  <td></td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      {...register('order_quanity')}
                    />
                  </td>
                  <td>0</td>
                  <td>
                    <select className="form-select" {...register('deliver_to')}>
                      <option value="">Select</option>
                      <option value="Dhanmondi Outlet">Dhanmondi Outlet</option>
                      <option value="Sylhet Outlet">Sylhet Outlet</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      {...register('unit_cost')}
                    />
                  </td>
                  <td>
                    <select className="form-select" {...register('tax')}>
                      <option value="">Select</option>
                      <option value="BD Tax">BD Tax Rate (10%)</option>
                    </select>
                  </td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>
                    <Trash className="feather-icon-sm clickable" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" className="text-right font-500">
                    Additional Cost (e.g. Shipment/Freight)
                  </td>
                  <td colSpan="2">
                    <input
                      type="number"
                      min="0"
                      defaultValue="0.00"
                      className="form-control"
                      {...register('additional_cost')}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" className="text-right font-500">
                    Total
                  </td>
                  <td colSpan="2">0.00</td>
                </tr>
              </tbody>
            </table>
            <p className="panel-heading">Notes</p>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Put any additional note for this purchase"
            ></textarea>
          </div>

          <div className="form-submit-button-end mt-2">
            <button type="submit" className="btn btn-default  m-1">
              Create As Draft
            </button>
            <button type="submit" className="btn btn-primary m-1">
              Create And Approve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewPurchaseOrderPage;
