import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Trash } from 'react-feather';

function CreateNewTransferOrderPage() {
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
          <h1 className="page-title col-xs-12 col-md-6">Inventory Transfer</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link
              to="/admin/inventory/transfer-orders"
              className="btn btn-success"
            >
              All Inventory Transfer
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <div className="panel-container">
            <p className="option-title">Transfer Information</p>
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-md-3">
                  <label className="form-label row-option-title">
                    TO Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    disabled
                    placeholder="TO-03"
                    {...register('to_number')}
                  />
                </div>
                <div className="mb-3 col-md-3">
                  <label className="form-label row-option-title required">
                    From Location
                  </label>
                  <select
                    className="form-select"
                    {...register('from_location')}
                  >
                    <option value="">Select from location</option>
                    <option value="Dhanmondi Outlet">Dhanmondi Outlet</option>
                    <option value="Sylhet Outlet">Sylhet Outlet</option>
                  </select>
                </div>
                <div className="mb-3 col-md-3">
                  <label className="form-label row-option-title required">
                    To Location
                  </label>
                  <select className="form-select" {...register('to_location')}>
                    <option value="">Select to location</option>
                    <option value="Dhanmondi Outlet">Dhanmondi Outlet</option>
                    <option value="Sylhet Outlet">Sylhet Outlet</option>
                  </select>
                </div>
                <div className="mb-3 col-md-3">
                  <label className="form-label row-option-title required">
                    Due Date
                  </label>
                  <input
                    type="date"
                    {...register('due_date', { required: true })}
                    className={`form-control ${
                      errors.due_date ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.due_date && "Can't be empty"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-container">
            <p className="option-title">Search Products</p>
            <input
              className="form-control"
              placeholder="Search by product name"
            />
          </div>
          <div className="panel-container">
            <p className="option-title">Transfer Items</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Variant Options</th>
                  <th scope="col">SKU</th>
                  <th scope="col">Available Quantity</th>
                  <th scope="col">Transfer Quantity</th>
                  <th scope="col">Unit Cost (BDT)</th>
                  <th scope="col">Tax Amount (BDT)</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Jamdani</th>
                  <td>Size: 15</td>
                  <td></td>
                  <td>8</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      {...register('transfer_quantity')}
                    />
                  </td>
                  <td>100.00</td>
                  <td>100.00</td>
                  <td>
                    <Trash className="feather-icon-sm clickable" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" className="text-right font-500">
                    Total
                  </td>
                  <td colSpan="2">100.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="form-submit-button-end mt-2">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewTransferOrderPage;
