import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../../../helpers/axios';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast } from '../../../../helpers/toast';
import { toggleOptionByRef } from '../../../../utils/refHandler';
import SingleSelectWithSearch from '../../../../components/selectBox/SingleSelectWithSearch';
import MultiSelectWithSearch from '../../../../components/selectBox/MultiSelectWithSearch';
import moment from 'moment'
import Select from 'react-select';
import {
  discountOnDropdownData,
  discountTypeDropdownData,
  applyDiscountDropDownData,
  collectionOptions,
  productOptions,
} from '../dropdownData';
import { useLocation } from 'react-router-dom';

/* eslint-disable */

function EditCouponPage() {
  //geting data from discount page
  const location = useLocation();
  const couponID = location.data.id;
  const couponData = location.data;
  // console.log(couponID, location.data);

  //states
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // *T* will add state for checkboxes/select options of coupon
  // *T* will check ref value -> display -> none to reset value
  const [discountCampaignStatus, setDiscountCampaignStatus] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [Disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [coupon, setCoupon] = useState({});

  //hooks
  const { register, handleSubmit } = useForm();

  // ref
  const couponUsageLimitRef = useRef();
  const endDateRef = useRef();
  const discountTypeRef = useRef();
  const ordersOverDiscountAmountRef = useRef();
  const searchCollectionRef = useRef();
  const searchProductRef = useRef();
  const discountApplyRef = useRef();

  //state handler
  const onChangeStartDateHandler = (date) => {
    // might need to convert date value
    setStartDate(date);
  };
  const onChangeEndDateHandler = (date) => {
    setEndDate(date);
  };
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const onChangeDiscountTypeHandler = (event) => {
    if (event.value === 'percentage') {
      discountTypeRef.current.innerHTML = '%';
      setDiscountType('PERCENTAGE');
    } else {
      discountTypeRef.current.innerHTML = 'BDT';
      setDiscountType('AMOUNT');

    }
  };


  const [getProductLIst, setGetProductLIst] = useState([])
  const [categoriesList, setCategoriesLIst] = useState([])
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch('https://aporajitatumi.somikoron.com/api/v1/inventory/products/', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(res => res.json())
      .then(res => {
        var result = Object.keys(res).map(key => ({ value: res[key].id, label: res[key].name }));
        setGetProductLIst(result)
      })


    fetch('https://aporajitatumi.somikoron.com/api/v1/inventory/product-categories/', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    })
      .then(res => res.json())
      .then(res => {
        var result = Object.keys(res).map(key => ({ value: res[key].id, label: res[key].name }));
        setCategoriesLIst(result)
      })


  }, [])

  // for product
  const [product, setProduct] = useState()
  let activateLasers = (e) => {
    // console.log("value", Array.isArray(e) ? e.map(x => x.value) : [])
    // console.log(Array.isArray(e) ? e.map(x => x.label) : [])
    setProduct(Array.isArray(e) ? e.map(x => x.value) : [])
  }

  //  for Categories
  const [collectionData, setCollectionData] = useState()
  let categories = (e) => {
    // console.log("value", Array.isArray(e) ? e.map(x => x.value) : [])
    // console.log(Array.isArray(e) ? e.map(x => x.label) : [])
    setCollectionData(Array.isArray(e) ? e.map(x => x.value) : [])
  }


  const [discountOn, setDiscountOn] = useState('ALL_ORDERS');
  const onChangeDiscountHandler = (event) => {
    if (event.value === 'all_orders' || event.value === 'first_order') {
      ordersOverDiscountAmountRef.current.style.visibility = 'hidden';
      searchCollectionRef.current.style.display = 'none';
      searchProductRef.current.style.display = 'none';
      discountApplyRef.current.style.display = 'none';
      setDiscountType(event.value);
    } else if (event.value === 'orders_over') {
      ordersOverDiscountAmountRef.current.style.visibility = 'visible';
      searchCollectionRef.current.style.display = 'none';
      searchProductRef.current.style.display = 'none';
      discountApplyRef.current.style.display = 'none';
    } else if (event.value === 'collections') {
      searchCollectionRef.current.style.display = 'block';
      discountApplyRef.current.style.display = 'block';
      ordersOverDiscountAmountRef.current.style.visibility = 'hidden';
      searchProductRef.current.style.display = 'none';
    } else {
      searchProductRef.current.style.display = 'block';
      discountApplyRef.current.style.display = 'block';
      ordersOverDiscountAmountRef.current.style.visibility = 'hidden';
      searchCollectionRef.current.style.display = 'none';
    }
  };
  //form
  const onSubmit = (e) => {
    console.log('onsubmit', data);
    let dateEnd;
    if (data.expire_limit == true) {
      console.log("data.expire_limit", data.expire_limit);
      dateEnd = null
    } else {
      dateEnd = moment(endDate).format('YYYY-MM-DD')
    }
    const payload = {
      name: data.name,
      code: data.code,
      discount_type: discountType,
      discount: data.discount,
      discount_order_type: discountOn,
      orders_over: data.discount_amount || null,
      is_active: data.is_active,
      limit: data.limit,
      usage_limit: data.usage_limit,
      expire_limit: data.expire_limit,
      valid_from: moment(startDate).format('YYYY-MM-DD'),
      valid_to: dateEnd,
      products: product || null,
      collections: collectionData || null

    }
    console.log("payload", payload);
    sendData(payload, e);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  //----------API------START-------
  async function sendData(payload, e) {
    try {
      const response = await axiosInstance.put(`api/v1/app/promocode/${couponID}/`, payload);
      // axios.post('api/v1/app/promocodes/', payload)
      //     .then(response => console.log(response));
      console.log("response", response);
      setData(response.data);
      setIsLoading(false);
      e.target.reset();
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      setIsLoading(false);
    }
  }
  const handlecouponUse = () => {
    setDisabled(!Disabled)
  };
  const handleEndDate = () => {
    setIsDisabled(!isDisabled)
  };

  // async function getData() {
  //   try {
  //     const response = await axiosInstance.get('api/v1/app/promocodes/');
  //     console.log("edit coupon", response.data);
  //     setData(response.data);
  //     setRawData(response.data);
  //     setIsLoading(false);
  //   } catch (err) {
  //     errorToast('Error on loading data!, Please try again.');
  //     console.error(err);

  //     setIsLoading(false);
  //   }

  // }
  async function getCoupon() {
    try {
      const response = await axiosInstance.get(`api/v1/app/promocode/${couponID}/`);
      console.log("edit coupon", response);
      setData(response.data);
      setDiscountCampaignStatus(response.data.is_active);
      setStartDate(Date.parse(response.data.valid_from));
      setEndDate(Date.parse(response.data.valid_to));
      setDiscountType(response.data.discount_type);
      setDiscountOn(response.data.discount_order_type);
      // setRawData(response.data);
      // setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }

  }

  console.log(data);
  useEffect(() => {
    // getData();
    getCoupon();
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            Edit Discount Coupon
          </h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link
              type="button"
              to="/admin/apps/discount-coupons"
              className="btn btn-primary"
            >
              View All Discounts
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <div className="panel-container">
            <div className="container">
              <div className="row top-row">
                <div className="col-md-4">
                  <h2 className="big-row-option-title">General Information</h2>
                  <p className="text-muted row-description">
                    Specify the discount campaign details such as name (e.g.
                    Monsoon Promotion) ,  code (e.g. APORAJITA_MONSOON)  and usage
                    limit. You can also generate a random discount code.
                  </p>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="required row-option-title">
                          Name
                        </label>
                        <input
                          onKeyUp={(e) => {
                            console.log(e.target.value);
                            setData({ ...data, name: e.target.value })
                          }}
                          defaultValue={data.name}
                          type="text"
                          name="name"
                          className="form-control"
                          {...register('name')}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="required row-option-title">
                          Code
                        </label>
                        <input
                          onKeyUp={(e) => {
                            setData({ ...data, code: e.target.value })
                          }}
                          defaultValue={data.code}
                          type="text"
                          name="code"
                          className="form-control"
                          style={{ color: '#563d7c' }}
                          {...register('code')}
                        />
                        (Generate Random New Code)
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="checkbox">
                        <br />
                        <label className="row-option-title">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={discountCampaignStatus}
                            onChange={() => {
                              setDiscountCampaignStatus(
                                !discountCampaignStatus
                              );
                            }}
                            {...register('is_active')}
                          />
                          Active
                        </label>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div
                      className="col-md-3 toggle-display-content-show"
                      ref={couponUsageLimitRef}
                    >
                      <label className="row-option-title">
                        How many times this coupon can be used?
                      </label>

                      <input
                        onKeyUp={(e) => {
                          setData({ ...data, limit: e.target.value })
                        }}
                        defaultValue={data.limit}
                        disabled={Disabled}
                        type="number"
                        className="form-control"
                        min="0"
                        {...register('limit')}
                      />
                    </div>
                    <div className="col-md-3">
                      <div className="checkbox">
                        <br />
                        <label className="row-option-title">
                          <input
                            checked={data.usage_limit}
                            className="form-check-input"
                            type="checkbox"
                            value='0'
                            onChange={() => {
                              toggleOptionByRef(couponUsageLimitRef);
                            }}
                            {...register('usage_limit')}
                            onClick={handlecouponUse}
                          />
                          No usage limit
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-container">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h2 className="big-row-option-title">Date Range</h2>
                  <p className="text-muted row-description">
                    Specify the discount campaign durations.
                  </p>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="required row-option-title">
                        Start Date
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          onChangeStartDateHandler(date);
                        }}
                        className={'form-control'}
                        {...register('valid_from')}
                      />
                    </div>
                    <div className="col-md-3" ref={endDateRef}>
                      <label className="row-option-title">End Date</label>
                      <DatePicker
                        disabled={isDisabled}
                        selected={endDate}
                        onChange={(date) => {
                          onChangeEndDateHandler(date);
                        }}
                        className={'form-control'}
                        {...register('valid_to')}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="checkbox">
                        <br />
                        <label className="row-option-title">
                          <input
                            checked={data.expire_limit}
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => {
                              toggleOptionByRef(endDateRef);
                            }}
                            {...register('expire_limit')}
                            onClick={handleEndDate}
                          // disabled={true}
                          />
                          Never expires
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h2 className="big-row-option-title">Discount On</h2>
                  <p className="text-muted row-description">
                    Choose how the discount will be applied. It can be applied
                    with a fixed value or percentage. You can further choose
                    applicable criteria by selecting the order type, product and
                    collections.
                  </p>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="row-option-title">
                          Discount Type
                        </label>
                        <SingleSelectWithSearch
                          options={discountTypeDropdownData}
                          placeholder={''}
                          handleChange={onChangeDiscountTypeHandler}
                          {...register('discount_type')}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="required row-option-title">
                        Discount
                      </label>
                      <div className="input-group">
                        <input
                          onKeyUp={(e) => {
                            setData({ ...data, discount: e.target.value })
                          }}
                          defaultValue={data.discount}
                          type="text"
                          className="form-control"
                          {...register('discount')}
                        />
                        <span
                          className="input-group-text"
                          ref={discountTypeRef}
                        >
                          %
                        </span>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="row-option-title">Discount On</label>
                        <SingleSelectWithSearch
                          options={discountOnDropdownData}
                          placeholder={''}
                          handleChange={onChangeDiscountHandler}
                          {...register('discount_type')}
                        />
                      </div>
                    </div>
                    <div className="col-md-3" style={{ visibility: 'hidden' }}>
                      <div className="form-group">
                        <label className="required row-option-title">
                          Amount
                        </label>
                        <div
                          className="input-group"
                          ref={ordersOverDiscountAmountRef}
                        >
                          <input
                            type="text"
                            className="form-control"
                            {...register('discount_amount')}
                          />
                          <span className="input-group-text">BDT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-md-12"
                      ref={searchCollectionRef}
                      style={{ display: 'none' }}
                    >
                      {/* <MultiSelectWithSearch
                        options={collectionOptions}
                        placeholder={'Search Collections'}
                        {...register('discount_type')}

                      /> */}

                      <Select
                        isMulti
                        options={categoriesList}
                        // placeholder={placeholder}
                        classNamePrefix="react-select"
                        onChange={categories}

                      />
                    </div>
                    {/* <h1>data is {[getProductLIst]}</h1> */}
                    <div
                      className="col-md-12"
                      ref={searchProductRef}
                      style={{ display: 'none' }}
                    >
                      {/* <MultiSelectWithSearch
                        options={productOptions}
                        // options={getProductLIst}
                        placeholder={'Search Products'}
                        onChange={activateLasers()}
                      /> */}
                      <Select
                        isMulti
                        options={getProductLIst}
                        // placeholder={placeholder}
                        classNamePrefix="react-select"
                        onChange={activateLasers}

                      />
                    </div>
                  </div>
                  <div
                    className="row"
                    ref={discountApplyRef}
                    style={{ display: 'none' }}
                  >
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="row-option-title">Apply</label>
                        <SingleSelectWithSearch
                          options={applyDiscountDropDownData}
                          placeholder={''}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary m-4 pull-right">
            Update Coupon
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCouponPage;
