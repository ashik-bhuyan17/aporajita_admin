import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../../helpers/axios';
import { errorToast, successToast } from '../../../../helpers/toast.js';

function EditTaxRatesPage() {
  //initalize
  const history = useHistory();
  const location = useLocation();
  const previousData = location.state;

  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...previousData },
  });

  //API
  async function updateData(data) {
    const allData = { ...previousData, ...data };
    try {
      await axiosInstance.put(
        `api/v1/settings/tax-rate-details/${data.id}/`,
        allData
      );
      successToast('Updated successfuly');
      setTimeout(() => {
        history.goBack();
      }, 1000);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  //form
  const onSubmitHandler = (data) => {
    console.log(data);
    updateData(data);
  };

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Edit Tax Rate</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/tax-rates" className="btn btn-success">
              View All Tax Rate
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <p className="row-option-title">Tax Rate</p>
          <br />
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="row align-items-center">
              <div className="mb-3 col-xs-12 col-md-4">
                <label className="row-option-title required">Name</label>
                <input
                  type="text"
                  placeholder="Standard tax"
                  {...register('name', { required: true })}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.name && "Can't be empty"}
                </div>
              </div>
              <div className="mb-3 col-xs-12 col-md-4">
                <label className="row-option-title required">Rate</label>
                <input
                  type="number"
                  min="0"
                  placeholder="For example 10"
                  {...register('tax', { required: true })}
                  className={`form-control ${errors.tax ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.tax && "Can't be empty"}
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <button className="btn btn-primary my-0" type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTaxRatesPage;
