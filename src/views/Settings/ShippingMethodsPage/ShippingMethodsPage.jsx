import { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RiDeleteBin6Fill } from 'react-icons/ri';

import axiosInstance from '../../../helpers/axios';

function ShippingMethodsPage() {
  const history = useHistory();
  //refs
  const freeShipingActivateButtonRef = useRef();
  const freeShipingDeactivateButtonRef = useRef();
  const freeShipingContentRef = useRef();
  const storePickupActivateButtonRef = useRef();
  const storePickupDeactivateButtonRef = useRef();
  const storePickupContentRef = useRef();
  const standardShippingActivateButtonRef = useRef();
  const standardShippingDeactivateButtonRef = useRef();
  const standardShippingContentRef = useRef();

  //state
  const [freeShippingData, setFreeShippingData] = useState();
  const [storePickupData, setStorePickupData] = useState();
  const [standardShippingData, setStandardShippingData] = useState([]);
  const [standardShippinginstractions , setstandardShippinginstractions] = useState('')


  const {
    register: free_shipping,
    reset: free_shipping_reset,
    handleSubmit: handleSubmitFreeShipping,
  } = useForm({
    defaultValues: {
      freeShippingData,
    },
  });
  const {
    register: store_pickup,
    reset: store_pickup_reset,
    handleSubmit: handleSubmitStore,
  } = useForm({
    defaultValues: {
      storePickupData,
    },
  });
  const {
    register: standard_shipping,
    reset: standard_shipping_reset,
    handleSubmit: handleStandardShipping,
  } = useForm({
    defaultValues: {
      standardShippingData,
    },
  });

  //ref handlers
  const freeShippingRefHandler = (status) => {
    if (status === 'show') {
      freeShipingContentRef.current.style.display = 'block';
      freeShipingDeactivateButtonRef.current.style.display = 'block';
      freeShipingActivateButtonRef.current.style.display = 'none';
    } else {
      freeShipingActivateButtonRef.current.style.display = 'block';
      freeShipingContentRef.current.style.display = 'none';
      freeShipingDeactivateButtonRef.current.style.display = 'none';
    }
  };
  const storePickupRefHandler = (status) => {
    if (status === 'show') {
      storePickupContentRef.current.style.display = 'block';
      storePickupDeactivateButtonRef.current.style.display = 'block';
      storePickupActivateButtonRef.current.style.display = 'none';
    } else {
      storePickupActivateButtonRef.current.style.display = 'block';
      storePickupContentRef.current.style.display = 'none';
      storePickupDeactivateButtonRef.current.style.display = 'none';
    }
  };
  const standardShippingRefHandler = (status) => {
    if (status === 'show') {
      standardShippingContentRef.current.style.display = 'block';
      standardShippingDeactivateButtonRef.current.style.display = 'block';
      standardShippingActivateButtonRef.current.style.display = 'none';
    } else {
      standardShippingActivateButtonRef.current.style.display = 'block';
      standardShippingContentRef.current.style.display = 'none';
      standardShippingDeactivateButtonRef.current.style.display = 'none';
    }
  };

  //handlers
  const onSubmitFreeShipping = (data) => {
    console.log(data);
  };
  const onSubmitStorePickup = (data) => {
    console.log(data);
  };
  const onSubmitStandardShiping = (data) => {
    console.log(data);
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  //API
  async function getStorePickupData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/settings/store_pickup_shipping/'
      );
      console.log(response.data);
      setStorePickupData(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getStandardShippingData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/settings/delivery_area/'
      );
      console.log('standard data',response)
      const arr = Object.values(response.data);
      const standard_shipping = arr[arr.length - 1];
      arr.pop();
      // const convertedData = {
      //   data: arr,
      //   standard_shipping,
      // };
      console.log('converted data',response.data);
      setStandardShippingData(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getFreeShippingData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/settings/free_shipping/'
      );
      console.log(response.data);
      setFreeShippingData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getstandardShippinginstractions() {
    try {
      const response = await axiosInstance.get('api/v1/settings/standard_shipping/');
      console.log("razzak",response.data);
      setstandardShippinginstractions(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function saveStandardShippingInstruction() {
    const data = {
      //rates: [],
      standard_shipping: true,
      instruction: standardShippinginstractions,
      //name: null,
       
    };
    try {
      const response = await axiosInstance.put(
        'api/v1/settings/standard_shipping/',
        data
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  console.log('standardShippingData',standardShippingData);
  console.log('freeShippingData',freeShippingData);

  async function deleteStandardShippingData(id, type) {
    console.log(id, '++', type);
    try {
      await axiosInstance.delete(`api/v1/settings/standard_shipping/`, {
        data: {
          id,
          area: type,
        },
      });
      getStandardShippingData();
    } catch (err) {
      console.log(err);
    }
  }

  async function saveFreeShippingData(shippingData = freeShippingData) {
    try {
      const response = await axiosInstance.post(
        'api/v1/settings/free_shipping/',
        shippingData
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveStorePickupData(shippingData = storePickupData) {
    try {
      const response = await axiosInstance.post(
        'api/v1/settings/store_pickup_shipping/',
        shippingData
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveStandardShippingData(newData){
    console.log('shipping data',newData)
  }

  useEffect(() => {
    getStorePickupData();
    getFreeShippingData();
    getStandardShippingData();
    getstandardShippinginstractions();
    // initalizing button status
    // if (freeShippingInstructions !== undefined) {
    //   freeShippingRefHandler('show');
    // } else {
    //   freeShippingRefHandler('hide');
    // }
    // if (standardShippingInstructions !== undefined) {
    //   standardShippingRefHandler('show');
    // } else {
    //   standardShippingRefHandler('hide');
    // }

    // setStandardShippingData({
    //   data: [
    //     {
    //       id: 1,
    //       name: 'Bangladesh',
    //       rates: [
    //         {
    //           id: 1,
    //           shipping_rate_name: 'xyz',
    //           weight_lower_limit: '1.00',
    //           weight_upper_limit: '5.00',
    //           price: '100.00',
    //           areas: [
    //             { name: 'Dhaka', value: '0.00' },
    //             { name: 'Outside Dhaka', value: '0.00' },
    //             { name: 'Jessore', value: '0.00' },
    //             { name: 'Rajshahi', value: '0.00' },
    //             { name: 'Khulna', value: '0.00' },
    //             { name: 'Sylhet', value: '0.00' },
    //             { name: 'Chittagong', value: '0.00' },
    //             { name: 'Dhaka', value: '0.00' },
    //             { name: 'Comilla', value: '0.00' },
    //             { name: 'Joypurhat', value: '0.00' },
    //             { name: 'Barisal', value: '0.00' },
    //             { name: 'Dhaka City', value: '0.00' },
    //             { name: 'Jessore', value: '0.00' },
    //             { name: 'Rajshahi', value: '0.00' },
    //             { name: 'Khulna', value: '0.00' },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    //   standard_shipping: true,
    //   instructions: '',
    // });
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div className="page-header-container">
          <h1 className="page-title">Checkout Settings</h1>
        </div>

        <div className="panel-container">
          <div className="row">
            <div className="col-xs-12 col-md-2">
              <img
                width="100"
                src="/assets/images/free_shipping.png"
                alt="delivery"
              />
            </div>
            <div className="col-xs-12 col-md-10">
              <div className="row">
                <div className="col-10">
                  <p className="row-option-title mb-2">Free Shipping</p>
                </div>
                <div className="col-2">
                  {freeShippingData?.free_shipping ? (
                    <button
                      className="btn btn-info pull-right"
                      type="button"
                      onClick={() => {
                        const newData = {
                          ...freeShippingData,
                          free_shipping: false,
                        };
                        setFreeShippingData(newData);
                        saveFreeShippingData();
                      }}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger pull-right"
                      type="button"
                      onClick={() => {
                        const newData = {
                          ...freeShippingData,
                          free_shipping: true,
                        };
                        setStorePickupData(newData);
                      }}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
              {freeShippingData?.free_shipping && (
                <div>
                  <p className="row-option-title">Instruction for Customer</p>
                  <textarea
                    className="form-control"
                    defaultValue={freeShippingData?.instruction}
                    onChange={(e) => {
                      setFreeShippingData({
                        ...freeShippingData,
                        instruction: e.target.value,
                      });
                    }}
                  />
                  <button
                    className="btn btn-primary my-2"
                    type="submit"
                    onClick={() => {
                      saveFreeShippingData();
                    }}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="panel-container">
          <div className="row">
            <div className="col-xs-12 col-md-2">
              <img
                width="100"
                src="/assets/images/store_shipping.png"
                alt="delivery"
              />
            </div>
            <div className="col-xs-12 col-md-10">
              <div className="row">
                <div className="col-10">
                  <p className="row-option-title mb-2">Store Pickup</p>
                </div>
                <div className="col-2">
                  {storePickupData?.store_pickup ? (
                    <button
                      className="btn btn-info pull-right"
                      type="button"
                      onClick={() => {
                        const newData = {
                          ...storePickupData,
                          store_pickup: false,
                        };
                        setStorePickupData(newData);
                        saveStorePickupData(newData);
                      }}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger pull-right"
                      type="button"
                      onClick={() => {
                        const newData = {
                          ...storePickupData,
                          store_pickup: true,
                        };
                        setStorePickupData(newData);
                      }}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>

              {storePickupData?.store_pickup && (
                <div>
                  <p className="row-option-title">Instruction for Customer</p>
                  <textarea
                    className="form-control"
                    {...store_pickup('instructions')}
                    onChange={(e) => {
                      storePickupData.instruction = e.target.value;
                      setStorePickupData(storePickupData);
                    }}
                    defaultValue={storePickupData.instruction}
                  />
                  <button
                    className="btn btn-primary my-2"
                    type="submit"
                    onClick={() => {
                      saveStorePickupData();
                    }}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="panel-container">
          <div className="row">
            <div className="col-xs-12 col-md-2">
              <img
                width="100"
                src="/assets/images/standard_shipping.png"
                alt="delivery"
              />
            </div>
            <div className="col-xs-12 col-md-10">
              <div className="row">
                <div className="col-10">
                  <p className="row-option-title mb-2">Standard Shipping</p>
                </div>
                <div className="col-2">
                  {standardShippingData.length>0 ? (
                    <button
                      className="btn btn-info pull-right"
                      type="button"
                      onClick={() => {
                        const newData = standardShippingData;
                        newData.standard_shipping = false;
                        setStandardShippingData(newData);
                        saveStandardShippingData({ ...newData });
                      }}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger pull-right"
                      type="button"
                      onClick={() => {
                        const newData = standardShippingData;
                        newData.standard_shipping = true;
                        setStandardShippingData({ ...newData });
                        saveStandardShippingData({ ...newData });
                      }}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
              {standardShippingData?.length> 0 && (
                <>
                  <div>
                    <p className="row-option-title">Instruction for Customer</p>
                    <textarea
                    defaultValue={standardShippinginstractions.instruction}
                      className="form-control"
                      onChange={(e) => {
                        setstandardShippinginstractions(
                        e.target.value 
                        );
                      }}
                    />
                    <button
                      className="btn btn-primary my-2"
                      type="submit"
                      onClick={() => saveStandardShippingInstruction()}
                    >
                      Update
                    </button>
                  </div>
                  <div className="pull-right">
                    <button
                      className="btn btn-primary my-2"
                      type="submit"
                      onClick={() =>
                        history.push('delivery-services/standard-shipping')
                      }
                    >
                      Add New Shipping Rate
                    </button>
                  </div>
                  <div className="table-scroll">

                    {standardShippingData.length> 0 && standardShippingData?.map((country, index) => {
                      return (
                        <table
                          className="table-responsive"
                          role="table"
                          key={index}
                        >
                          <thead className="grey-table-header">
                            <tr>
                              <th colSpan={2}>{country.country}</th>
                              <th
                                colSpan={2}
                                className="text-danger small clickable"
                                onClick={() => {
                                  deleteStandardShippingData(
                                    country.id,
                                    'country'
                                  );
                                }}
                              >
                                Remove Country
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>
                              <Link
                                to={{
                                  pathname: `delivery-services/standard-shipping/${country.id}/edit`,
                                  state: {
                                    data: country,
                                  },
                                }}
                              >
                                {country.shipping_rate_name}
                              </Link>
                            </td>
                            <td>
                              {country.weight_lower_limit} -{' '}
                              {country.weight_upper_limit}
                            </td>
                            <td>{country.price}</td>
                            <td
                              className="clickable"
                              onClick={() => {
                                deleteStandardShippingData(
                                  country.id,
                                  'rate'
                                );
                              }}
                            >
                              <RiDeleteBin6Fill
                                style={{ color: '#4E5E6A' }}
                              />
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingMethodsPage;
