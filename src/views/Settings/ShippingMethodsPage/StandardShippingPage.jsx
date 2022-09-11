import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import Progress from '../../../components/loading/Progress.jsx';
import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast';
import countries from '../../../assets/data/countries';

export default function StandardShippingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [rateInfo, setRateInfo] = useState({
    shipping_rate_name: '',
    weight_lower_limit: 0,
    weight_upper_limit: 0,
    price: 0,
  });
  const [data, setData] = useState({
    standard_shipping: true,
    instruction: '',
    name: 'Bangladesh',
    rates: [],
  });

  async function saveData() {
    const allData = { ...data };
    allData.rates.push(rateInfo);
    try {
      setIsLoading(true);
      await axiosInstance.post('api/v1/settings/standard_shipping/', allData);
      successToast('Created successfuly');
      console.log("all data",allData)
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
    setIsLoading(false);
  }

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            Edit Shipping Rates for Bangladesh
          </h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/delivery-services" className="btn btn-primary">
              View All Shipping Rates
            </Link>
          </div>
        </div>

        <div className="col-xs-12 col-md-6">
          <div className="mb-3">
            <label className="form-label row-option-title">
              Country
            </label>
            <select
              className="form-select"
              aria-label="dropdown"
              onChange={(e) => {
                      const info = rateInfo;
                      info.country = e.target.value;
                      console.log("dfjhkfhfgh",info);
                      setRateInfo(info);
                    }}
               
            >
              {countries.map((country, index) => {
                return (
                  <option value={country} key={index}>
                    {country}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="panel-container">
              <div className="panel-heading">
                <p className="row-option-title">Default Values</p>
              </div>
              <div className="column-input-container">
                <div className="mb-3">
                  <label className="form-label row-option-title">
                    Shipping Rate Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      const info = rateInfo;
                      info.shipping_rate_name = e.target.value;
                      setRateInfo(info);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label row-option-title">
                    Weight Range
                  </label>
                  <div className="row">
                    <div className="col-md-5">
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => {
                          const info = rateInfo;
                          info.weight_lower_limit = e.target.value;
                          setRateInfo(info);
                        }}
                      />
                    </div>
                    <div className="col-md-1"> - </div>
                    <div className="col-md-5">
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => {
                          const info = rateInfo;
                          info.weight_upper_limit = e.target.value;
                          setRateInfo(info);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label row-option-title">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      const info = rateInfo;
                      info.price = e.target.value;
                      setRateInfo(info);
                    }}
                  />
                </div>
              </div>
              <div className="form-submit-button-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    saveData();
                  }}
                >
                  Update Shipping Rate
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel-container">
              <div className="panel-heading">
                <p className="row-option-title">Adjust Regional Rates</p>
              </div>
              <div className="column-input-container">
                <div className="row mb-2">
                  <div className="col-md-5">
                    <label className="form-label row-option-title">
                      Region
                    </label>
                  </div>
                  <div className="col-md-5">
                    <label className="form-label row-option-title">
                      Adjust Price
                    </label>
                  </div>
                </div>
                {data?.rates?.map((area, index) => {
                  return (
                    <div className="row mb-2" key={index}>
                      <div className="col-md-5">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            const rates = data.rates;
                            rates[index].name = e.target.value;
                            setData({ ...data, rates });
                          }}
                        />
                      </div>
                      <div className="col-md-5">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => {
                            const rates = data.rates;
                            rates[index].value = e.target.value;
                            setData({ ...data, rates });
                          }}
                        />
                      </div>
                      <div className="col-md-2">
                        <FaTimes style={{ color: 'f25656' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="form-submit-button-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    setData({
                      ...data,
                      rates: [...data.rates, { name: '', value: '' }],
                    });
                  }}
                >
                  Add New Regional Rates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
