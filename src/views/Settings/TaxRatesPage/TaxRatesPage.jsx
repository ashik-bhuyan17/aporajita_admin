import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin6Fill } from 'react-icons/ri';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';

function TaxRatesPage() {
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handler
  //API
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/settings/tax-rates/');
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading visitor report!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function saveData(data) {
    const allData = { ...data };
    try {
      setIsLoading(true);
      await axiosInstance.post('api/v1/settings/tax-rates/', allData);
      getData();
      successToast('Created successfuly');
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
    setIsLoading(false);
  }
  async function deleteData(id) {
    console.log(id);
    try {
      await axiosInstance.delete(`api/v1/settings/tax-rate-details/${id}/`);
      getData();
      successToast('Deleted successfuly');
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  //form
  const onSubmitHandler = (data) => {
    console.log(data);
    saveData(data);
  };

  useEffect(() => {
    //API
    getData();
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Tax Rates</h1>
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
                  Add New Tax Rate
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="panel-container">
          <p className="row-option-title">All Tax Rate</p>
          <br />
          <div className="table-scroll">
            <table className="table-responsive" role="table">
              <thead className="grey-table-header">
                <tr>
                  <th>Name</th>
                  <th>Rate</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((tax, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link
                          to={{
                            pathname: `tax-rates/${tax.id}/edit`,
                            state: tax,
                          }}
                        >
                          {tax.name}
                        </Link>
                      </td>
                      <td>{tax.tax}</td>
                      <td
                        className="clickable"
                        onClick={() => {
                          deleteData(tax.id);
                        }}
                      >
                        <RiDeleteBin6Fill style={{ color: '#4E5E6A' }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default TaxRatesPage;
