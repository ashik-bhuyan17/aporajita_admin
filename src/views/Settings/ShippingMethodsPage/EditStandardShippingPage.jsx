import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import axiosInstance from '../../../helpers/axios';
import { toast } from 'react-toastify';

export default function EditStandardShippingPage() {
  const history = useHistory();
  const { id } = useParams();
  const prevData = history.location.state;
  // console.log(prevData);

  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [regionalDetails, setRegionalDetails] = useState([]);

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const getStandardShippingData = async () => {
    const response = await axiosInstance.put(
      `api/v1/settings/edit_delivery_area/${id}/`
    );
    setData(response.data);
    setRegionalDetails(response.data.regional_details);
  };

  useEffect(() => {
    // const info = prevData.data.rates.pop();
    // console.log('info', info);
    // setInfo(info);
    getStandardShippingData();
  }, []);

  const updateShippingData = async () => {
    try {
      let send_data = {...data};
      send_data.regional_details = regionalDetails;
      const response = await axiosInstance.put(
        `api/v1/settings/edit_delivery_area/${data.id}/`, send_data
      );
      if (response.status === 200) {
        alert('Content updated successfully');
        getStandardShippingData();
      }
      // setStorePickupData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterRegionalData = (id) => {
    let prev_data = regionalDetails;
    const filtered_regional_data = prev_data.filter((region) => {
      return region.id !== id;
    });

    setRegionalDetails(filtered_regional_data);
  };

  return (
    <div className='page-container-scroll'>
      <div className='page-container'>
        <div className='page-header-container row'>
          <h1 className='page-title col-xs-12 col-md-6'>
            Edit   Rates for {data.name}
          </h1>
          <div className='page-header-button-container col-xs-12 col-md-6'>
            <Link to='/admin/delivery-services' className='btn btn-primary'>
              View All Shipping Rates
            </Link>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='panel-container'>
              <div className='panel-heading'>
                <p className='row-option-title'>Default Values</p>
              </div>
              <div className='column-input-container'>
                <div className='mb-3'>
                  <label className='form-label row-option-title'>
                    Shipping Rate Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    defaultValue={data?.shipping_rate_name}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label row-option-title'>
                    Weight Range
                  </label>
                  <div className='row'>
                    <div className='col-md-5'>
                      <input
                        type='number'
                        className='form-control'
                        defaultValue={data?.weight_lower_limit}
                      />
                    </div>
                    <div className='col-md-1'> -</div>
                    <div className='col-md-5'>
                      <input
                        type='number'
                        className='form-control'
                        defaultValue={data?.weight_upper_limit}
                      />
                    </div>
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='form-label row-option-title'>Price</label>
                  <input
                    type='number'
                    defaultValue={data?.price}
                    className='form-control'
                  />
                </div>
              </div>
              <div className='form-submit-button-end'>
                <button
                  onClick={updateShippingData}
                  type='submit' className='btn btn-primary'>
                  Update Shipping Rate
                </button>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='panel-container'>
              <div className='panel-heading'>
                <p className='row-option-title'>
                  Adjust Regional Rates for {data?.name}
                </p>
              </div>
              <div className='column-input-container'>
                <div className='row mb-2'>
                  <div className='col-md-5'>
                    <label className='form-label row-option-title'>
                      Region
                    </label>
                  </div>
                  <div className='col-md-5'>
                    <label className='form-label row-option-title'>
                      Adjust Price
                    </label>
                  </div>
                </div>
                {regionalDetails.length > 0 && regionalDetails?.map((area, index) => {
                  return (
                    <div className='row mb-2' key={index}>
                      <div className='col-md-5'>
                        <input
                          onChange={(event) => {
                            const prev_data = { ...regionalDetails };
                            prev_data[index].region_name = event.target.value;
                            setData(prev_data);
                          }}
                          name={'region_name'}
                          type='text'
                          className='form-control'
                          value={area.region_name}
                        />
                      </div>
                      <div className='col-md-5'>
                        <input
                          onChange={(event) => {
                            const prev_data = { ...regionalDetails };
                            prev_data[index].region_price = event.target.value;
                            setData(prev_data);
                          }}
                          name={'region_price'}
                          type='number'
                          className='form-control'
                          value={area.region_price}
                        />
                      </div>
                      <div className='col-md-2'>
                        <FaTimes onClick={() => filterRegionalData(area.id)}
                                 style={{ color: 'f25656', cursor: 'pointer' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='form-submit-button-end'>
                <button
                  onClick={() => {
                    setRegionalDetails([regionalDetails, { region_name: '', region_price: '' }]);
                  }}
                  type='submit' className='btn btn-primary'>
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
