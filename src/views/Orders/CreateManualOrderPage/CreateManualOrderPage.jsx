import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

import { provinceData } from './demoData';
import { errorToast, successToast } from '../../../helpers/toast';
import axiosInstance from '../../../helpers/axios';

function CreateNewManualOrderPage() {
  const history = useHistory();
  //refs
  const quantityErrorRef = useRef();
  const productContentRef = useRef();

  //states
  const [isLoading, setIsLoading] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [discountType, setDiscountType] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [RegionList, setRegionList] = useState([]);
  const [preDiscountAmount, setPreDiscountAmount] = useState(0.0);
  const [preManualDiscountAmount, setPreManualDiscountAmount] = useState(0.0);
  //selection states
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
    imageURL: '',
    variants: [],
  });
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    billingAddress: '',
    customerNote: '',
    deliveryArea: '',
  });

  //product add states
  const [givenQuantity, setGivenQuantity] = useState(1);
  const [selectedVariantID, setSelectedVariantID] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [addedProductList, setAddedProductList] = useState([]);
  const [cartInformation, setCartInformation] = useState({
    subtotal: 0.00,
    discountTotal: 0.00,
    shippingTotal: 0.00,
    total: 0.00,
    afterDiscount: 0.00,
    discount: ' ',
  });


  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handlers
  const addProduct = () => {
    console.log('=====================');
    console.log({ selectedProduct });
    console.log({ givenQuantity });
    console.log('selectedVariantID', selectedVariantID);
    const variantID = selectedVariantID
      ? selectedVariantID
      : selectedProduct.variant[0].id;
    const variant = selectedProduct.variant.find(
      (variant) => variant.id == variantID
    );
    setSelectedVariant(variant);
    console.log({ variant }, { variantID });
    console.log('=====================');
    if (givenQuantity > variant.stock) {
      quantityErrorRef.current.style.display = 'block';
    } else {
      quantityErrorRef.current.style.display = 'none';
      //selected product
      // selectedProduct;
      // finding selected variant
      let selectedVariant;
      if (selectedVariantID === undefined) {
        selectedVariant = selectedProduct.variant[0];
      } else {
        for (let i = 0; i < selectedProduct.variant.length; i++) {
          console.log(selectedProduct.variant[i], selectedVariantID);
          if (selectedProduct.variant[i].id == selectedVariantID) {
            selectedVariant = selectedProduct.variant[i];
            break;
          }
        }
      }
      console.log('................');
      console.log(selectedVariant);
      console.log('................');
      //calculate total-per product
      const productTotal = parseFloat(
        givenQuantity * selectedVariant.price
      ).toFixed(2);
      // initialize variant data
      selectedVariant.imageURL = selectedProduct.imageURL;
      selectedVariant.name = selectedProduct.name;
      selectedVariant.variant = selectedVariant.value;
      selectedVariant.addedQuantity = givenQuantity;
      selectedVariant.totalPrice = parseFloat(productTotal).toFixed(2);
      selectedVariant.productId = selectedProduct.id;
      console.log(selectedProduct, '++', selectedVariant);
      //check existence
      let index = -1;
      // for (let i = 0; i < addedProductList.length; i++) {
      //   if (
      //     addedProductList[i].id === newProduct.id &&
      //     addedProductList[i].id === variant
      //   ) {
      //     alert('Already added');
      //     return;
      //   }
      // }

      //calculate subtotal
      const newSubtotal = parseFloat(
        parseFloat(cartInformation.subtotal) + parseFloat(productTotal)
      ).toFixed(2);
      //calculate total price
      const newTotal = parseFloat(
        newSubtotal
      ).toFixed(2);
      console.log({ newTotal });
      setCartInformation({
        ...cartInformation,
        subtotal: newSubtotal,
        total: newTotal,
      });
      productContentRef.current.style.display = 'none';
      console.log('......+++++++++++++++++++..........');
      console.log(selectedVariant);
      console.log('....._____________________...........');
      setAddedProductList([...addedProductList, selectedVariant]);
    }
    setSelectedVariantID(undefined);
  };
  const quantityChangeHandler = (quantity, index) => {
    //change and update particular quantity and price
    let updatedProduct = addedProductList;
    updatedProduct[index].addedQuantity = quantity;
    updatedProduct[index].totalPrice = parseFloat(
      quantity * updatedProduct[index].price
    ).toFixed(2);
    setAddedProductList([...updatedProduct]);

    //calculate total price
    let newSubtotal = 0;
    for (let i = 0; i < addedProductList.length; i++) {
      newSubtotal += parseFloat(addedProductList[i].totalPrice);
    }
    newSubtotal = parseFloat(newSubtotal).toFixed(2);
    const newTotal = parseFloat(newSubtotal).toFixed(2);
    setCartInformation({
      ...cartInformation,
      subtotal: newSubtotal,
      total: newTotal,
    });


  };

  const initalizeRegionOptions = (regions) => {
    const selectOptions = regions.map((data) => {
      return {
        ...data,
        value: data.id,
        label: `${data.region_name} `,

      };
    });
    return selectOptions;
  };
  //initial selectOptions



  const calculateshippingAmount = (regionList) => {
    let shippingrate;
    shippingrate = cartInformation.subtotal - cartInformation.discountTotal + parseFloat(regionList.region_price)
    let shippingPrice = parseFloat(regionList.region_price)
    console.log({ shippingrate }, { shippingPrice });

    setCartInformation({
      ...cartInformation,
      shippingTotal: shippingPrice,
      total: shippingrate

    });
  };

  // const calculateDiscountAmount = (discountAmount, discountType) => {
  //   let discount;
  //   let total;
  //   let afterDiscount;
  //   let Totaldiscount;
  //   if (discountType === '') {
  //     return;
  //   }
  //   if (discountType !== 'FIXED') {

  //     afterDiscount = parseFloat(
  //       (discountAmount / 100) * cartInformation.total + parseFloat(couponDiscount)
  //     ).toFixed(2);
  //     console.log(afterDiscount);
  //     discount = cartInformation.total - afterDiscount + parseFloat(cartInformation.shippingTotal)

  //   } else {
  //     console.log(couponDiscount)
  //     discount = cartInformation.total - parseFloat(discountAmount) + parseFloat(cartInformation.shippingTotal) - parseFloat(couponDiscount);
  //     afterDiscount = parseFloat(discountAmount) + parseFloat(couponDiscount);
  //   }
  //   console.log({ discount }, { afterDiscount }, { couponDiscount });
  //   setCartInformation({
  //     ...cartInformation,
  //     discountTotal: discount,
  //     afterDiscount,
  //   });
  // };

  const calculateDiscountAmount = (discountAmount, discountType) => {
    preDiscountAmount !== 0.0 ? setCartInformation({
      ...cartInformation,
      discountTotal: preDiscountAmount
    }) : setCartInformation({
      ...cartInformation,
      discountTotal: 0.00
    })
    let discountTotal = 0;
    let totalAmount = 0;
    if (discountType === '') {
      return;
    }
    else if (discountType === 'PERCENTAGE') {

      // discountTotal = parseFloat((discountAmount / 100) * cartInformation.subtotal + parseFloat(preDiscountAmount)
      // ).toFixed(2)
      discountTotal = parseFloat((discountAmount / 100) * cartInformation.subtotal).toFixed(2)
      totalAmount = cartInformation.subtotal - discountTotal + parseFloat(cartInformation.shippingTotal) - preDiscountAmount
    }
    else {

      // discountTotal = parseFloat(discountAmount) + parseFloat(preDiscountAmount)
      discountTotal = parseFloat(discountAmount)
      totalAmount = cartInformation.subtotal - parseFloat(discountTotal) + parseFloat(cartInformation.shippingTotal) - preDiscountAmount
    }
    console.log({ discountTotal }, { totalAmount }, { 'cart shipping': cartInformation.shippingTotal }, { discountAmount })
    // console.log({ discountTotal }, { totalAmount }, { 'cart shipping': cartInformation.shippingPrice })
    setPreManualDiscountAmount(0)
    setPreManualDiscountAmount(discountTotal)
    setCartInformation({
      ...cartInformation,
      total: totalAmount,
    })
    console.log({ 'total manual': totalAmount }, { 'cart total': cartInformation.total });
    // calculateTotalDiscount();
  }
  //select handlers
  const initalizeCustomerOptions = (customers) => {
    const selectOptions = customers.map((data) => {
      return {
        ...data,
        value: data.id,
        label: `Name: ${data.first_name} ${data.last_name} Phone: ${data.phone} Email: ${data.email}`,
      };
    });
    return selectOptions;
  };
  const initalizeProductOptions = (products) => {
    const selectOptions = products.map((data) => {
      return {
        ...data,
        value: data.name,
        label: data.name,
      };
    });
    return selectOptions;
  };
  const customerSelectHandler = (event) => {
    event.name = event.first_name + ' ' + event.last_name;
    console.log(event);
    setSelectedCustomer(event);
  };
  const productSelectHandler = (event) => {
    setSelectedProduct(event);
    event.imageURL = event.featured_image;
    event.price = event.variant[0].price;
    console.log(event);
    productContentRef.current.style.display = 'block';
  };
  const getOrderItems = () => {
    const items = [];
    console.log(addedProductList);
    for (let i = 0; i < addedProductList.length; i++) {
      items.push({
        compare_at_price: addedProductList[i].compare_at_price,
        quantity: addedProductList[i].addedQuantity,
        fulfilled_quantity: addedProductList[i].addedQuantity,
        // stock_control: true,
        price: addedProductList[i].price,
        product: addedProductList[i].productId,
        size: addedProductList[i].id,
        awaiting_stock: addedProductList[i].awaiting_stock,
        stock: addedProductList[i].stock,
      });
    }
    return items;
  };
  const removeFromCart = (toRemove) => {
    const filtered = addedProductList.filter((_, index) => index !== toRemove);
    setAddedProductList(filtered);
  };

  //forms handlers
  const onSubmit = (data) => {
    console.log(data);
    sendData(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.prevent.Default();
    }
  };

  //initialize select
  const customerOptions = initalizeCustomerOptions(customerList);
  const productOptions = initalizeProductOptions(productList);
  const regionOptions = initalizeRegionOptions(RegionList);

  //----------API------START-------
  async function sendData(data) {
    console.log(data)
    setIsLoading(true);
    data.value = cartInformation.shippingPrice;
    data.delivery_area_id = RegionList.id;
    data.customer = selectedCustomer.id;
    data.email = selectedCustomer.email;
    data.phone = selectedCustomer.phone;
    data.fullname = selectedCustomer.name;
    data.delivery_area = null;
    data.status = 'Accepted';
    data.promo_code_value = coupon
    data.deleivery_address = null;
    data.address = selectedCustomer.billingAddress;
    data.order_type = 'MANUAL ORDER';
    data.ordered_by = JSON.parse(localStorage.user).username;
    data.order_note = selectedCustomer.customerNote;
    data.currency = 'BDT';
    data.shipping_charge = cartInformation.shippingPrice;
    data.has_discount = data.other_discount !== '' ? true : false;
    data.other_discount =
      data.other_discount !== '' ? data.other_discount : null;
    data.oher_discount_type = discountType ? discountType : null;
    data.item_count = cartInformation.length;
    data.ordered_reference = 'ONLINE-SALE';
    data.order_item = getOrderItems();
    data.paid = 0;

    data.pathao_area_id = selectedarea.area_id;
    data.pathao_zone_id = selectedzone.zone_id;
    data.pathao_city_id = selectedcity.city_id;
    console.log(data);
    try {
      const response = await axiosInstance.post('api/v1/order/create/', data);
      console.log(response.data);
      setIsLoading(false);
      successToast('Order created');
      history.push('/admin/orders');
    } catch (err) {
      errorToast('Error!, Please try again to create order.');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function getCustomerData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/customer/customer-profile-list/'
      );
      setCustomerList(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }

  async function getRegion() {
    try {
      const response = await axiosInstance.get('api/v1/settings/regions/');
      setRegionList(response.data);
      setIsLoading(false);
      console.log("regions data", response.data);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }

  }



  async function getProductData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/products/');
      setProductList(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCustomerData();
    getProductData();
    getRegion();
  }, []);










  // pathao Deleivari area

  //states
  const [areaList, setAreaList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [zoneList, setZoneList] = useState([]);

  //selection states

  const [selectedarea, setSelectedArea] = useState({
    area_name: '',

  });
  const [selectedcity, setSelectedCity] = useState({
    city_name: '',

  });
  const [selectedzone, setSelectedZone] = useState({
    zone_name: '',

  });



  //select handlers

  const initalizeAreaOptions = (area) => {
    const selectOptions = area?.data?.data?.map((data) => {
      return {
        ...data,
        value: data.area_id,
        label: `${data.area_name}`,
      };
    });
    return selectOptions;
  };

  const areaSelectHandler = (event) => {
    event.area_name = event.area_name;
    console.log(event);
    setSelectedArea(event);
  };


  //city
  const initalizeCityOptions = (city) => {
    const selectOptions = city?.data?.data?.map((data) => {
      return {
        ...data,
        value: data.city_id,
        label: `${data.city_name}`,
      };
    });
    return selectOptions;
  };

  const citySelectHandler = (event) => {
    console.log(event)
    getZone(event.city_id)
    console.log(event);
    setSelectedCity(event);
  };

  //zone 
  const initalizeZoneOptions = (zone) => {

    const selectOptions = zone?.data?.data?.map((data) => {

      return {

        ...data,
        value: data.zone_id,
        label: `${data.zone_name}`,
      };
    });

    return selectOptions;

  };

  const zoneSelectHandler = (event) => {
    getArea(event.zone_id)
    setSelectedZone(event);
  };




  //initialize select
  const cityOptions = initalizeCityOptions(cityList);


  //----------API START-------

  //city
  async function getCityData() {
    try {
      const response = await axiosInstance.get(
        '/api/v1/order/pathao/city/'
      );
      setCityList(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }

  //Zone
  async function getZone(city_id) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/v1/order/pathao/zone/', { city_id });
      setZoneList(initalizeZoneOptions(response.data))
      console.log(initalizeZoneOptions(response.data))

      successToast('successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }


  //area
  async function getArea(zone_id) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/v1/order/pathao/area/', { zone_id });
      setAreaList(initalizeAreaOptions(response.data))
      console.log(initalizeAreaOptions(response.data))

      successToast('successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }


  useEffect(() => {
    getCityData();
  }, []);


  const [coupon, setCoupon] = useState('')
  const [checkValid, setCheckValid] = useState()
  console.log('this is', coupon)

  function handleChange(e) {
    // this.setState({[e.target.name]: e.target.value})
    // console.log("{[e.target.name]: e.target.value}", { [e.target.name]: e.target.value })
    setCoupon(e.target.value)
  }

  // coupon check
  //   async function checkCoupon() {
  //     setIsLoading(true);
  //     try {
  //       const response = await axiosInstance.get('/api/v1/app/promocodes/');
  //       console.log(response.data)
  //       const data = response.data.data.find(item => item.code === coupon)
  //       console.log(data)
  //       if (data.length > 0) {
  //         setCheckValid(true)
  //         successToast('Coupon is valid')
  //       } else {
  //         setCheckValid(false)
  //         errorToast('Coupon is invalid')
  //       }
  //       setIsLoading(false);
  //     } catch (err) {
  //       errorToast('Error on loading data!, Please try again.');
  //       console.error(err);
  //       setIsLoading(false);
  //     }
  //   }
  let handleCoupon = (coupon) => {
    const token = window.localStorage.getItem("token");

    fetch('https://aporajitatumi.somikoron.com/api/v1/app/promocodes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(res => {
        let data = res.find(x => x.code == coupon)

        if (data) {
          setCheckValid(true)
        } else {
          setCheckValid(false)

        }

        // console.log('disscount type', data.discount_type)
        setCouponDiscount(data.discount)
        // cartInformation.discount = cartInformation.discount + data.discount
        // setCartInformation({
        //   ...cartInformation,
        //   // afterDiscount: parseFloat(data.discount)
        // })
        // preManualDiscountAmount !== 0.0 ? setCartInformation({
        //   ...cartInformation,
        //   discountTotal: preManualDiscountAmount
        // }) : setCartInformation({
        //   ...cartInformation,
        //   discountTotal: 0.00
        // })
        // preDiscountAmount !== 0.0 ? setCartInformation({
        //   ...cartInformation,
        //   discountTotal: preDiscountAmount
        // }) : setCartInformation({
        //   ...cartInformation,
        //   discountTotal: 0.00
        // })
        let discountTotal = 0
        let totalAmount = 0
        let discountAmount = data.discount

        if (data.discount_type === 'PERCENTAGE') {
          // discountTotal = parseFloat((discountAmount / 100) * cartInformation.subtotal + parseFloat(preManualDiscountAmount))
          //   .toFixed(2)
          discountTotal = parseFloat((discountAmount / 100) * cartInformation.subtotal).toFixed(2)
          console.log('kichu ekta', discountTotal);
          totalAmount = cartInformation.subtotal - discountTotal + parseFloat(cartInformation.shippingTotal) - parseFloat(preManualDiscountAmount)
          console.log('kichu ekta', totalAmount);
        }
        else if (data.discount_type === 'FIXED') {
          // discountTotal = parseFloat(discountAmount) + parseFloat(preManualDiscountAmount)
          discountTotal = parseFloat(discountAmount)
          totalAmount = cartInformation.subtotal - parseFloat(discountTotal) + parseFloat(cartInformation.shippingTotal) - parseFloat(preManualDiscountAmount)
        }
        // console.log({ 'coupone dis total': discountTotal });
        console.log('kichu ekta', totalAmount);
        setCartInformation({
          ...cartInformation,
          total: totalAmount,
        })
        setPreDiscountAmount(0.0)
        setPreDiscountAmount(discountTotal)
        console.log({ 'discount pro': discountTotal }, { 'total pro': totalAmount }, { 'cart total': cartInformation.total });

      })
    // calculateTotalDiscount();
  }
  const calculateTotalDiscount = () => {
    let totalDis = parseFloat(preDiscountAmount) + parseFloat(preManualDiscountAmount);
    console.log({ 'calculate total': cartInformation });

    setCartInformation({
      ...cartInformation,
      discountTotal: 0.0
    })
    setCartInformation({
      ...cartInformation,
      discountTotal: totalDis
    })
  }

  useEffect(() => {
    calculateTotalDiscount()
  }, [preDiscountAmount, preManualDiscountAmount])

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div
          className="alert alert-danger"
          ref={quantityErrorRef}
          style={{ display: 'none' }}
        >
          <button
            type="button"
            className="btn close pull-right"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <strong>
            There is not enough product in the stock. Only available quantity is
            : {selectedVariant?.stock}
          </strong>
        </div>
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Create New Order</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/orders" className="btn btn-primary">
              <span>
                <FaShoppingCart className="mx-1" />
              </span>
              All Orders
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <div className="row">
            <div className="col-12">
              <p className="small-row-option-title my-2">
                Search CUSTOMER using NAME, PHONE or EMAIL
              </p>
              <Select
                options={customerOptions}
                placeholder=""
                onChange={customerSelectHandler}
                classNamePrefix="react-select-new-order"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="small-row-option-title my-2">
                Search PRODUCT using NAME or CODE
              </p>
              <Select
                options={productOptions}
                placeholder=""
                onChange={productSelectHandler}
                classNamePrefix="react-select-new-order"
              />
            </div>
          </div>
          <br />
          <br />
          <div style={{ display: 'none' }} ref={productContentRef}>
            <div className="row">
              <div className="col-xs-12 col-md-5">
                <div>
                  <p className="small-row-option-title mb-2">
                    Product Name: {selectedProduct.name}
                  </p>
                  <div className="mb-3 col-12">
                    <label className="small-row-option-title my-2">
                      Price:
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      value={parseFloat(selectedProduct.price).toFixed(2)}
                      onChange={(e) => {
                        setSelectedProduct({
                          ...selectedProduct,
                          price: parseFloat(e.target.value).toFixed(2),
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3 col-12">
                    <label className="small-row-option-title my-2">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={givenQuantity}
                      className={`form-control ${givenQuantity < '1' ? 'is-invalid' : ''
                        }`}
                      onChange={(e) => {
                        setGivenQuantity(e.target.value);
                      }}
                    />
                    <div className="invalid-feedback">
                      {givenQuantity < '1' && 'Quantity must be at least 1'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-7">
                <div className="row">
                  <div className="mb-3 col-xs-12 col-md-5">
                    <label className="form-label row-option-title">
                      Select Your Size
                    </label>
                    <select
                      className="form-select"
                      aria-label="dropdown"
                      onChange={(e) => {
                        console.log('----------------');
                        console.log(e.target.value);
                        setSelectedVariantID(e.target.value);
                        console.log('----------------');
                      }}
                    >
                      {selectedProduct.variant?.map((variant, index) => {
                        return (
                          <option value={variant.id} key={index}>
                            {variant.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3 col-xs-12 col-md-6">
                    <img src={selectedProduct.imageURL} alt='' />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                addProduct();
              }}
            >
              Add Product
            </button>
          </div>
        </div>

        <form
        //form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            checkKeyDown(e);
          }}
        >
          <div className="row">
            <div className="col-xs-12 col-md-8">
              <div className="panel-container">
                {addedProductList.length > 0 ? (
                  <div className="table-scroll">
                    <table className="table-responsive" role="table">
                      <thead className="grey-table-header">
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Variants</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addedProductList.map((product, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <img
                                  className="img-fluid rounded"
                                  src={product.imageURL}
                                  width="50"
                                  alt=''
                                />
                              </td>
                              <td>
                                <p className="small-row-option-title">
                                  {product.name}
                                </p>
                              </td>
                              <td>{product.variant}</td>
                              <td>
                                BDT
                                <p className="small-row-option-title">
                                  {parseFloat(product.price).toFixed(2)}
                                </p>
                              </td>
                              <td>
                                <input
                                  type="number"
                                  min="1"
                                  value={product.addedQuantity}
                                  className="form-control"
                                  onChange={(e) => {
                                    quantityChangeHandler(
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              </td>
                              <td>
                                BDT
                                <p className="small-row-option-title">
                                  {parseFloat(product.totalPrice).toFixed(2)}
                                </p>
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <span
                                  className="clickable"
                                  onClick={() => {
                                    removeFromCart(index);
                                  }}
                                >
                                  <FaTimes style={{ color: 'f25656' }} />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="table-scroll">
                      <table className="table-responsive" role="table">
                        <thead className="grey-table-header">
                          <tr>
                            <th />
                            <th />
                            <th />
                            <th />
                            <th />
                            <th />
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="6" />
                            <td className="small-row-option-title">
                              Sub Total Price
                            </td>
                            <td colSpan="3">
                              BDT &nbsp;
                              <span className="small-row-option-title">
                                {cartInformation.subtotal}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="6" />
                            <td className="small-row-option-title">
                              Shipping Price
                            </td>
                            <td colSpan="3">
                              BDT &nbsp;
                              <span className="small-row-option-title">
                                {cartInformation.shippingTotal}

                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="6" />
                            <td className="small-row-option-title">
                              Discount Price
                            </td>
                            <td colSpan="3">
                              BDT &nbsp;
                              <span className="small-row-option-title">
                                {cartInformation.discountTotal}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="6" />
                            <td className="small-row-option-title">
                              Total Price
                            </td>
                            <td colSpan="3">
                              BDT &nbsp;
                              <span className="small-row-option-title">

                                {

                                  // cartInformation.totalAmount !== '0.00'
                                  //   ? cartInformation.totalAmount
                                  //   : 
                                  cartInformation.total

                                }
                                {console.log({ cartInformation: cartInformation })}

                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="7" />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex">
                      <div>
                        <input
                          type="text"
                          {...register('promo_code_value')}
                          style={{ maxWidth: '144px', height: '33px' }}
                          className="form-control"
                          name='value'
                          onChange={handleChange}
                        />
                        {checkValid == false && <p style={{ color: 'red' }}>coupon doesn't match</p>}
                        {checkValid == true && <p style={{ color: 'green' }}>coupon  match</p>}


                      </div>
                      <button className="mx-2 btn btn-primary" type="button" onClick={() => handleCoupon(coupon)}>
                        Apply Discount Coupon

                      </button>
                    </div>
                    <hr />
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="row-option-title">
                            Choose custom discount type:
                          </label>
                          <div className="radio-container">
                            <input
                              type="radio"
                              name="discount"
                              value="Fixed"
                              className="form-check-input"
                              onChange={() => {
                                setDiscountType('FIXED');
                                calculateDiscountAmount(
                                  discountAmount,
                                  'FIXED'
                                );
                              }}
                            />
                            <span>Fixed</span>
                            <input
                              value="required"
                              type="radio"
                              name="discount"
                              className="form-check-input"
                              onChange={() => {
                                setDiscountType('PERCENTAGE');
                                calculateDiscountAmount(
                                  discountAmount,
                                  'PERCENTAGE'
                                );
                              }}
                            />
                            <span>Percent</span>
                          </div>
                          <input
                            className="form-control"
                            {...register('other_discount')}
                            placeholder="Enter custom discount"
                            style={{ maxWidth: '198px' }}
                            onChange={(e) => {
                              setDiscountAmount(e.target.value);
                              calculateDiscountAmount(
                                e.target.value,
                                discountType
                              );
                            }}
                          ></input>
                          <br />
                        </div>
                        <div className="col-md-6">
                          <div className="row align-items-center">
                            <div className="col-6">
                              <div className="radio-container">
                                <input
                                  type="checkbox"
                                  name="sms"
                                  className="form-check-input"
                                  defaultChecked="true"
                                  {...register('is_sms_send')}
                                />
                                <span>Send SMS</span>
                              </div>
                              <p
                                className="help-block"
                                style={{ lineHeight: '1.1' }}
                              >
                                SMS won't be sent if this is not checked
                              </p>
                            </div>
                            <div className="col-6">
                              <button className="btn btn-primary pull-right">
                                Create Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="table-scroll">
                    <table className="table-responsive" role="table">
                      <thead className="grey-table-header">
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Variants</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                    <div className="text-center mt-3">
                      <span className="row-option-title">No data found!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xs-12 col-md-4">
              <div className="panel-container">
                <h3 className="row-option-title">Customer Details</h3>
                <hr />
                <div className="mb-3 col-12">
                  <label className="row-option-title required">Full Name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className={`form-control ${errors.name ? 'is-invalid' : ''
                      }`}
                    value={selectedCustomer.name}
                    onChange={(e) => {
                      setSelectedCustomer({
                        ...selectedCustomer,
                        name: e.target.value,
                      });
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.name && "Can't be empty"}
                  </div>
                </div>
                <div className="mb-3 col-12">
                  <label className="row-option-title">Customer Email</label>
                  <input
                    type="email"
                    className="form-control"
                    {...register('email')}
                    value={selectedCustomer.email}
                    onChange={(e) => {
                      setSelectedCustomer({
                        ...selectedCustomer,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3 col-12">
                  <label className="row-option-title required">
                    Customer Phone
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register('phone', { required: true })}
                    className={`form-control ${selectedCustomer.phone.length > 11 ||
                      (selectedCustomer.phone.length < 11 &&
                        selectedCustomer.phone.length > 0)
                      ? 'is-invalid'
                      : ''
                      }`}
                    value={selectedCustomer.phone}
                    onChange={(e) => {
                      setSelectedCustomer({
                        ...selectedCustomer,
                        phone: e.target.value,
                      });
                    }}
                  />
                  <div className="invalid-feedback">
                    {selectedCustomer.phone.length > 11 ||
                      (selectedCustomer.phone.length < 11 &&
                        selectedCustomer.phone.length > 0)
                      ? 'Phone number length must be 11 digits'
                      : ''}
                  </div>
                </div>
                <div className="mb-3 col-12">
                  <label className="row-option-title">Billing Address</label>
                  <textarea
                    minLength="10"
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''
                      }`}
                    {...register('billing_address')}

                    value={selectedCustomer.billingAddress}
                    onChange={(e) => {
                      setSelectedCustomer({
                        ...selectedCustomer,
                        billingAddress: e.target.value,
                      });
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.name && "Minimum Length 10 characters"}
                  </div>
                </div>
                <div className="mb-3 col-12">
                  <label className="row-option-title">Customer Note</label>
                  <textarea
                    type="text"
                    className="form-control"
                    {...register('customer_note')}
                    value={selectedCustomer.customerNote}
                    onChange={(e) => {
                      setSelectedCustomer({
                        ...selectedCustomer,
                        customerNote: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-3 col-12">
                  <label className="row-option-title required">
                    Delivery Area
                  </label>
                  <Select
                    placeholder='Choose Delivery Area'
                    options={regionOptions}
                    {...register('delivery_area_id')}

                    onChange={calculateshippingAmount}
                  //onChange={(e) => {
                  //const info = cartInformation;
                  //cartInformation.shippingTotal = e.target.value;
                  //setCartInformation({ ...info });
                  //setshippingArea('150');
                  //setshippingAmount(e.target.value);
                  //calculateshippingAmount(
                  //shippingAmount,
                  //'150'
                  // );
                  //console.log("shipping", cartInformation.shippingTotal)
                  //}}

                  />

                </div>

                <div className="mb-3 col-12" >
                  <label className="form-label row-option-title">Pathao Delivery Area</label>
                  <div className="mb-3">
                    <Select
                      className="mb-3"
                      options={cityOptions}
                      placeholder="City"
                      onChange={citySelectHandler}
                      classNamePrefix="react-select-new-city"
                    />

                    <Select
                      className="mb-3"
                      options={zoneList}
                      placeholder="Zone"
                      onChange={zoneSelectHandler}
                      classNamePrefix="react-select-new-Zone"

                    />
                    <Select
                      className="mb-3"
                      options={areaList}
                      placeholder="Area"
                      onChange={areaSelectHandler}
                      classNamePrefix="react-select-new-area"
                    />
                  </div>


                </div>

                <div className="mb-3 col-12" >
                  <label className="form-label row-option-title">Pathao Instruction</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder='Instractions'
                    name="pathao_instruction"
                    {...register('pathao_instruction')}
                  />
                </div>
                <div className="mb-3 col-12" >
                  <label className="form-label row-option-title">Pathao Item Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder='Descriptions'
                    name="pathao_item_description"
                    {...register('pathao_item_description')}
                  />
                </div>



              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewManualOrderPage;
