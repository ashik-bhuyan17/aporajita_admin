import { PDFViewer } from '@react-pdf/renderer';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Minus, Plus, Trash } from 'react-feather';
import { FaUserAlt } from 'react-icons/fa';

import Invoice from '../../../components/pdf/Invoice';
import './ProcessSalePage.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';

function ProcessSalePage() {
  //refs
  const discardButtonRef = useRef();
  const parkSaleButtonRef = useRef();
  // const discountAllCurrencyRef = useRef();
  // const discountAllPercentageRef = useRef();
  const discountAllInputRef = useRef();
  const finishedSaleRef = useRef();
  const amountTenderedRef = useRef();
  // refs handler
  // const discountAllCurrencyRefHandler = () => {
  //   const currency = discountAllCurrencyRef.current;
  //   const percentage = discountAllPercentageRef.current;
  //   const currencyStatus = currency.classList.contains('btn-info');
  //   const percentageStatus = percentage.classList.contains('btn-info');

  //   if (percentageStatus) {
  //     percentage.classList.remove('btn-info');
  //   }
  //   if (!currencyStatus) {
  //     currency.classList.remove('btn-outline-info');
  //     currency.classList.add('btn-info');
  //   } else {
  //     currency.classList.remove('btn-info');
  //     currency.classList.add('btn-outline-info');
  //   }
  //   if (givenTotalDiscount > 0) {
  //     calulateDiscount();
  //   }
  // };
  // const discountAllPercentageRefHandler = () => {
  //   const currency = discountAllCurrencyRef.current;
  //   const percentage = discountAllPercentageRef.current;
  //   const currencyStatus = currency.classList.contains('btn-info');
  //   const percentageStatus = percentage.classList.contains('btn-info');

  //   if (currencyStatus) {
  //     currency.classList.remove('btn-info');
  //   }
  //   if (!percentageStatus) {
  //     percentage.classList.remove('btn-outline-info');
  //     percentage.classList.add('btn-info');
  //   } else {
  //     percentage.classList.remove('btn-info');
  //     percentage.classList.add('btn-outline-info');
  //   }
  //   if (givenTotalDiscount > 0) {
  //     calulateDiscount();
  //   }
  // };

  // **** states -> start *****
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const [customer, selectedCustomer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [clickedProduct, setClickedProduct] = useState('');
  const [clickedCartProduct, setClickedCartProduct] = useState('');
  // const [clickedCartProductDiscount, setClickedCartProductDiscount] = useState('')
  // const [clickedCartProductQuantity, setClickedCartProductQuantity] = useState('')

  // ## Summary Section ##
  const [subtotal, setSubtotal] = useState(parseFloat(0).toFixed(2));
  const [discountTotal, setDiscountTotal] = useState(parseFloat(0).toFixed(2));
  const [taxTotal, setTaxTotal] = useState(parseFloat(0).toFixed(2));
  const [total, setTotal] = useState(parseFloat(0).toFixed(2));
  const [givenTotalDiscountPercentage, setGivenTotalDiscountPercentage] =
    useState(0);
  const [givenTotalDiscountBDT, setGivenTotalDiscountBDT] = useState(0);
  const [taxRate, _] = useState(0);
  // ## Summary Section -> end##
  // ## Payment Details Section ##
  const [paymentDetailsPayment, setPaymentDetailsPayment] = useState([]);
  const [amountTendered, setAmountTendered] = useState(total);
  const [paymentDetailsPaymentTotal, setPaymentDetailsPaymentTotal] =
    useState(0);
  const [changes, setChanges] = useState('');
  // ## Payment Details Section -> end##
  // **** states -> end *****
  //----------API------START-------
  async function getData() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('api/v1/inventory/products/');
      setData(response.data);
      setFilteredData(getModifiedProductInformation(response.data));

      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function sendData(status) {
    setIsLoading(true);
    const data = {};
    data.customer = 1;
    // data.email = selectedCustomer.email;
    // data.fullname = selectedCustomer.name;
    // data.fullname = selectedCustomer.phone;
    data.customer = 15;
    data.email = 'wihocig163@spruzme.com';
    data.fullname = 'WALK IN';
    data.phone = '011111';
    data.delivery_area = 1;
    data.deleivery_address = null;
    data.address = selectedCustomer.billingAddress;
    data.order_type = 'MANUAL ORDER';
    data.ordered_by = JSON.parse(localStorage.user).username;
    data.currency = 'BDT';
    // data.has_discount = data.custom_discount !== '' ? true : false;
    data.other_discount = discountTotal;
    data.item_count = cartItems.length;
    data.Order_reference = 'IN-STORE-POS-SALE';
    data.order_item = getOrderItems();
    data.paid = 0;
    // data.status = status ? status : 'Completed';
    data.unit = 1;
    data.separate_delivery_address = true;
    data.register_total = '0.00';
    data.currency = 'BDT';
    data.has_discount = false;
    data.shipping_charge = '100.00';
    data.other_charges = '0.00';
    data.other_discount = '0.00';
    data.total_tax = '0.00';
    data.order_total = '1004.00';
    data.sub_total = '1004.00';
    data.paid = '0.00';
    data.total_discount = '0.00';
    data.is_fulfilled = false;
    data.balance = '0.00';
    data.promo_code = null;
    data.outlet = null;
    data.supplier = null;
    data.register = null;

    console.log('--------------------');
    console.log(data);
    console.log('--------------------');

    try {
      const response = await axiosInstance.post('api/v1/pos/create/', data);
      console.log(response.data);
      setIsLoading(false);
      // successToast('Order created');
      // history.push('/admin/orders');
    } catch (err) {
      // errorToast('Error!, Please try again to create order.');
      console.error(err);
      setIsLoading(false);
    }
  }
  //----------API------END-------
  // handlers
  const getOrderItems = () => {
    const items = [];
    console.log(cartItems);
    for (let i = 0; i < cartItems.length; i++) {
      items.push({
        compare_at_price: cartItems[i].variant.compare_at_price,
        quantity: cartItems[i].addedQuantity,
        fulfilled_quantity: cartItems[i].addedQuantity,
        unit_price: cartItems[i].variant.price,
        product: cartItems[i].id,
        size: cartItems[i].variant.id,
        discount: cartItems[i].discountedPrice,
      });
    }
    return items;
  };
  const searchHandler = (searchInput) => {
    setFilteredData(data);
    if (searchInput.length > 0) {
      const searchResult = data.filter((product) => {
        if (product.name.toLowerCase().includes(searchInput.toLowerCase())) {
          return product;
        }
      });
      setFilteredData(searchResult);
    } else {
      setFilteredData(data);
    }
  };

  const productClickedHandler = (product, variant) => {
    const productStatus = [];
    const modifiedProduct = { ...product };
    product.addedQuantity = 1;
    for (let i = 0; i < cartItems.length; i++) {
      if (product.id === cartItems[i].id && variant === cartItems[i].variant) {
        productStatus.found = true;
        productStatus.index = i;
      }
    }
    if (!productStatus.found) {
      modifiedProduct.unitPrice = product.price;
      calculateSummarySection(modifiedProduct.unitPrice, 'add');
      modifiedProduct.variant = variant;
      modifiedProduct.addedQuantity = 1;
      modifiedProduct.itemPriceAfterDiscount = modifiedProduct.unitPrice;
      modifiedProduct.itemPriceBeforeDiscount = modifiedProduct.unitPrice;
      setCartItems([...cartItems, modifiedProduct]);
    }
    console.log([...cartItems, modifiedProduct]);
    productStatus.found = false;
  };

  const updateCartItems = () => {
    let toDeductFromSubtotal;
    let toDeductFromDiscount = 0;
    let newTotal;
    let newTaxTotal;
    let newSubtotal;
    let newDiscountTotal;
    let itemPriceAfterDiscount;
    let itemPriceBeforeDiscount;
    let clickedProductIndex;
    if (clickedCartProduct.itemPriceAfterDiscount > 0) {
      toDeductFromSubtotal = clickedCartProduct.itemPriceAfterDiscount;
    } else {
      toDeductFromSubtotal =
        clickedCartProduct.itemPriceBeforeDiscount || clickedCartProduct.price;
    }
    if (clickedCartProduct.itemPriceAfterDiscount > 0) {
      toDeductFromDiscount =
        clickedCartProduct.itemPriceBeforeDiscount -
        clickedCartProduct.itemPriceAfterDiscount;
    }
    for (let i = 0; i < cartItems.length; i++) {
      if (
        cartItems[i].id === clickedCartProduct.id &&
        cartItems[i].variant === clickedCartProduct.variant
      ) {
        clickedProductIndex = i;
        break;
      }
    }
    itemPriceAfterDiscount =
      clickedCartProduct.addedQuantity * clickedCartProduct.unitPrice;
    itemPriceBeforeDiscount =
      clickedCartProduct.addedQuantity * clickedCartProduct.price;
    clickedCartProduct.itemPriceAfterDiscount =
      itemPriceAfterDiscount.toFixed(2);
    clickedCartProduct.itemPriceBeforeDiscount =
      itemPriceBeforeDiscount.toFixed(2);
    newSubtotal = (
      subtotal -
      toDeductFromSubtotal +
      itemPriceAfterDiscount
    ).toFixed(2);
    newDiscountTotal = (
      discountTotal -
      toDeductFromDiscount +
      Math.abs(itemPriceAfterDiscount - itemPriceBeforeDiscount)
    ).toFixed(2);
    setSubtotal(newSubtotal);
    setDiscountTotal(newDiscountTotal);
    newTaxTotal = (
      parseFloat(newSubtotal) *
      (parseFloat(taxRate) / 100)
    ).toFixed(2);
    setTaxTotal(newTaxTotal);
    cartItems[clickedProductIndex] = clickedCartProduct;
    setCartItems(cartItems);
    newTotal = (parseFloat(newSubtotal) + parseFloat(newTaxTotal)).toFixed(2);
    setTotal(newTotal);
    console.log(newTotal);
  };

  const deleteFromCart = (productIndex) => {
    let newSubtotal;
    let newDiscountTotal;
    let toDeductDiscount = (0).toFixed(2);
    let newTaxTotal;
    let newTotal;
    const filteredData = cartItems.filter((_, index) => {
      return productIndex !== index;
    });
    newSubtotal = (
      subtotal - cartItems[productIndex].itemPriceAfterDiscount
    ).toFixed(2);
    if (
      cartItems[productIndex].itemPriceBeforeDiscount !==
      cartItems[productIndex].price
    ) {
      toDeductDiscount =
        cartItems[productIndex].itemPriceBeforeDiscount -
        cartItems[productIndex].itemPriceAfterDiscount;
    }
    newDiscountTotal = (discountTotal - toDeductDiscount).toFixed(2);
    newTaxTotal = (
      parseFloat(newSubtotal) *
      (parseFloat(taxRate) / 100)
    ).toFixed(2);
    newTotal = (parseFloat(newSubtotal) + parseFloat(newTaxTotal)).toFixed(2);

    setDiscountTotal(newDiscountTotal);
    setSubtotal(newSubtotal);
    setTaxTotal(newTaxTotal);
    setTotal(newTotal);
    setCartItems(filteredData);
  };
  /*payment details handler -> start*/
  const updatePaymentDetailsPayment = (type) => {
    if (amountTendered <= 0) {
      return;
    }
    setPaymentDetailsPayment([
      ...paymentDetailsPayment,
      {
        type: type,
        amount: parseFloat(amountTendered).toFixed(2),
      },
    ]);
    setPaymentDetailsPaymentTotal(
      (
        parseFloat(paymentDetailsPaymentTotal) + parseFloat(amountTendered)
      ).toFixed(2)
    );
    if (
      parseFloat(paymentDetailsPaymentTotal) + parseFloat(amountTendered) >=
      total
    ) {
      finishedSaleRef.current.style.display = 'block';
      amountTenderedRef.current.style.display = 'none';
      const paidTotal = (
        parseFloat(paymentDetailsPaymentTotal) + parseFloat(amountTendered)
      ).toFixed(2);
      setChanges(parseFloat(paidTotal - total).toFixed(2));
    }
    console.log('cartItems: ', cartItems);
    console.log('subtotal: ', subtotal);
    console.log('discountTotal: ', discountTotal);
    console.log('total: ', total);
    console.log('changes: ', changes);
    console.log('paymentDetailsPayment: ', paymentDetailsPayment);
    sendData();
  };
  /*paymnet details handler -> end*/

  const resetEveryState = () => {
    setCartItems([]);
    setSubtotal(parseFloat(0).toFixed(2));
    setDiscountTotal(parseFloat(0).toFixed(2));
    setTaxTotal(parseFloat(0).toFixed(2));
    setTotal(parseFloat(0).toFixed(2));
    setPaymentDetailsPayment([]);
    setPaymentDetailsPaymentTotal(0);
    setAmountTendered(0);
    setChanges('');
    setGivenTotalDiscountBDT(0);
    setGivenTotalDiscountPercentage(0);
    finishedSaleRef.current.style.display = 'none';
    amountTenderedRef.current.style.display = 'block';
  };

  if (cartItems.length > 0) {
    discardButtonRef.current.disabled = false;
    parkSaleButtonRef.current.disabled = false;
  } else {
    if (discardButtonRef.current !== undefined) {
      discardButtonRef.current.disabled = true;
      parkSaleButtonRef.current.disabled = true;
    }
  }

  // **** calculation -> start ****
  // ## Summary Section ##
  // const calulateDiscount = (givenTotalDiscount) => {
  //   const currency =
  //     discountAllCurrencyRef.current.classList.contains('btn-info');
  //   const percentage =
  //     discountAllPercentageRef.current.classList.contains('btn-info');
  //   let total,
  //     discountTotal = parseFloat(0).toFixed(2);

  //   if (!isNaN(parseFloat(givenTotalDiscount))) {
  //     if (currency) {
  //       discountTotal = parseFloat(
  //         parseFloat(subtotal) - parseFloat(givenTotalDiscount)
  //       ).toFixed(2);
  //     } else if (percentage) {
  //       discountTotal = parseFloat(
  //         parseFloat(subtotal) *
  //           (parseFloat(givenTotalDiscount) / 100)
  //       ).toFixed(2);
  //     }
  //   }
  //   total = parseFloat(
  //     parseFloat(subtotal) +
  //       parseFloat(taxTotal) -
  //       parseFloat(discountTotal)
  //   ).toFixed(2);
  //   setSummarySection({
  //     ...summarySection,
  //     discountTotal,
  //     total,
  //   });
  // };
  const calculateSummarySection = (productPrice, command) => {
    let newTotal = total,
      newDiscountTotal = discountTotal || parseFloat(0).toFixed(2),
      newSubtotal = subtotal,
      newTaxTotal = taxTotal;

    if (command === 'add') {
      newSubtotal = (
        parseFloat(newSubtotal) + parseFloat(productPrice)
      ).toFixed(2);
    } else if (command === 'remove') {
      newSubtotal = (
        parseFloat(newSubtotal) - parseFloat(productPrice)
      ).toFixed(2);
    }
    newTaxTotal = (
      parseFloat(newSubtotal) *
      (parseFloat(taxRate) / 100)
    ).toFixed(2);
    // if (
    //   !isNaN(parseFloat(givenTotalDiscountBDT || givenTotalDiscountPercentage))
    // ) {
    //   if (givenTotalDiscountBDT > 0) {
    //     newDiscountTotal = (newSubtotal - givenTotalDiscountBDT).toFixed(2);
    //   } else if (givenTotalDiscountBDT > 0) {
    //     newDiscountTotal = (
    //       parseFloat(discountTotal) +
    //       parseFloat(productPrice) *
    //         parseFloat(givenTotalDiscountPercentage / 100)
    //     ).toFixed(2);
    //   }
    // }
    newTotal = (parseFloat(newSubtotal) + parseFloat(newTaxTotal)).toFixed(2);
    setSubtotal(newSubtotal);
    setDiscountTotal(newDiscountTotal);
    setTaxTotal(newTaxTotal);
    setTotal(newTotal);
    console.log(newTotal);
  };

  /* calculation -> end */

  const getModifiedProductInformation = (data) => {
    const modifiedProductInformation = data.map((product) => {
      return {
        ...product,
        addedQuantity: 0,
        percentageDiscount: 0,
        currencyDiscount: 0,
        unitPrice: parseFloat(0).toFixed(2),
        discountedPrice: parseFloat(0).toFixed(2),
      };
    });
    return modifiedProductInformation;
  };

  // hooks
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            {/* Dhanmondi | Pronob | */} New Sale
          </h1>
          {/* Data will be added from API */}
          <div className="page-header-button-container col-xs-12 col-md-6">
            <button
              className="btn btn-default"
              type="button"
              id="shift"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Shift
              <span>
                <ChevronDown className="feather-icon-sm" />
              </span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="shift">
              <li>
                <a className="dropdown-item" href="#">
                  Cash Management
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Download Closure Report
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Close Register
                </a>
              </li>
            </ul>
            <button
              className="btn btn-default"
              ref={discardButtonRef}
              onClick={() => {
                resetEveryState();
              }}
            >
              Discard
            </button>
            <button className="btn btn-default" ref={parkSaleButtonRef}>
              Park Sale
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetEveryState();
              }}
            >
              New Sale
            </button>
          </div>
        </div>

        <div>
          <div className="row tab-pad-top-10">
            <div
              className="col-sm-7 tab-pad-right-0 tab-pad-left-5"
              style={{ paddingTop: '14px' }}
            >
              <div className="row">
                <div>
                  <input
                    type="text"
                    name="search"
                    className="form-control search-box"
                    placeholder="Search products ... "
                    onChange={(event) => {
                      searchHandler(event.target.value);
                    }}
                  />
                </div>

                {/* Products Grid View -> start */}
                <div className="product-gallery mt-3">
                  <div className="row">
                    {filteredData.map((product, index) => {
                      return (
                        <div
                          className="col-md-4 col-lg-2 product-container mb-1"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#variantModal"
                          key={`${product.name} ${index}`}
                          onClick={() => {
                            setClickedProduct(product);
                            console.log('clicked product: ', product);
                          }}
                        >
                          <img
                            className="img-fluid"
                            src={product.featured_image}
                          />
                          <p className="product-name">{product.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Products Grid View -> end */}
              </div>
            </div>

            <div className="col-sm-5 pad-left-5 tab-pad-left-10 tab-pad-right-5">
              <div className="panel-container">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-12 add-customer-container">
                      <a
                        className="clickable underline-hover d-flex align-items-center"
                        id="AddCustomer"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FaUserAlt style={{ width: '10px' }} />
                        <span className="mx-1">Add Customer</span>
                      </a>
                      <hr className="light-dark-grey my-3" />
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="AddCustomer"
                      >
                        <li className="p-2">
                          <input
                            className="form-control"
                            placeholder="Search Customer"
                          />
                        </li>
                        <li className="p-2">
                          <button className="btn btn-info btn-sm">
                            Add New Customer
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="cart-items-container">
                      {cartItems.map((product, index) => {
                        return (
                          <div className="cart-item-container row" key={index}>
                            <div className="col-10">
                              <div
                                className="row align-items-center clickable product-info-container"
                                data-bs-toggle="modal"
                                data-bs-target="#particularProductModal"
                                onClick={() => {
                                  setClickedCartProduct(product);
                                }}
                              >
                                <div className="col-2">
                                  <span className="quantity">
                                    {product.addedQuantity}
                                  </span>
                                  <div className="hover-container">
                                    <div className="product-img">
                                      <img
                                        height="39"
                                        src={product.featured_image}
                                      />
                                    </div>
                                    <div className="process-sell-overlay">
                                      <Plus className="hover-icon" />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-7 product-title"
                                  onClick={() => {
                                    setClickedCartProduct(product);
                                  }}
                                >
                                  <span>{product.name}</span>
                                  <br />
                                  <span className="text-muted">
                                    {product.variant.value}
                                  </span>
                                </div>
                                <div className="col-3 p-0 price-container">
                                  {product.percentageDiscount <= 0 &&
                                  product.currencyDiscount <= 0 ? (
                                    <span>
                                      BDT{' '}
                                      {parseFloat(
                                        product.itemPriceBeforeDiscount
                                      ).toFixed(2)}
                                    </span>
                                  ) : (
                                    <span>
                                      BDT{' '}
                                      {parseFloat(
                                        product.itemPriceAfterDiscount
                                      ).toFixed(2)}
                                    </span>
                                  )}
                                  {(product.percentageDiscount > 0 ||
                                    product.currencyDiscount > 0) && (
                                    <div>
                                      <del>
                                        <small className="text-muted">
                                          BDT{' '}
                                          {parseFloat(
                                            product.itemPriceBeforeDiscount
                                          ).toFixed(2)}
                                        </small>
                                      </del>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-2">
                              <Trash
                                className="feather-icon-sm clickable"
                                onClick={() => {
                                  deleteFromCart(index);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="panel-footer panel-custom summary-section-container">
                  <table className="table table-summary">
                    <tbody>
                      <tr>
                        <td
                          className="summary-section-header modal-dialog-centered"
                          // data-bs-toggle="modal"
                          // data-bs-target="#discountAllModal"
                          // style={{
                          //   textDecoration: 'underline',
                          //   textDecorationColor: 'Green',
                          // }}
                        >
                          Discount
                        </td>
                        <td className="text-right summary-section-header-total">
                          BDT {discountTotal > 0 ? '- ' : ''} {discountTotal}
                        </td>
                        {/* <td className="summary-discount-input-container"></td> */}
                      </tr>
                      <tr>
                        <td className="summary-section-header">Subtotal</td>
                        <td className="text-right summary-section-header-total">
                          <span>BDT {subtotal}</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="summary-section-header">
                          Tax ({taxRate}%)
                        </td>
                        <td className="text-right summary-section-header-total">
                          BDT {taxTotal > 0 ? '+ ' : ''} {taxTotal}
                        </td>
                      </tr>
                      <tr>
                        <td className="summary-section-header">Total</td>
                        <td className="text-right summary-section-header-total">
                          BDT {total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="pay-button">
                    {cartItems.length > 0 ? (
                      <button
                        className="btn btn-warning"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#paymentDetails"
                        style={{ fontSize: '17px' }}
                        onClick={() => {
                          setAmountTendered(total);
                        }}
                      >
                        <div>PAY</div>
                        <div>BDT {total}</div>
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#paymentDetails"
                        style={{ fontSize: '17px' }}
                        disabled
                      >
                        <div>PAY</div>
                        <div>BDT 0.00</div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}

        {/* Varirants Modal -> start */}
        <div
          className="modal fade"
          id="variantModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="variantModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title option-title">
                  {clickedProduct.name}
                </p>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h5>Select Variant</h5>
                {clickedProduct !== '' &&
                  clickedProduct.variant.map((variant, index) => {
                    console.log('variant: ', variant);
                    return (
                      <button
                        className="btn btn-primary m-2"
                        data-bs-dismiss="modal"
                        key={index}
                        onClick={() => {
                          productClickedHandler(clickedProduct, variant);
                        }}
                      >
                        {variant.value}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        {/* Variants Modal -> end */}

        {/* Particular Product Modal in Cart -> start */}
        <div
          className="modal fade"
          id="particularProductModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="particularProductModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title option-title">
                  {clickedCartProduct.name}
                </p>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row p-2 justify-content-md-center">
                  <div className="col-6">
                    <div className="row justify-content-md-center">
                      <label className="row-option-title">Quantity</label>
                      <Plus
                        className="col-2 btn-primary clickable"
                        style={{ padding: '2px', height: '33px' }}
                        onClick={() => {
                          const addedQuantity =
                            Number(clickedCartProduct.addedQuantity) + 1;
                          setClickedCartProduct({
                            ...clickedCartProduct,
                            addedQuantity,
                          });
                          // changeCartItemQuantity('+');
                        }}
                      />
                      <input
                        className="form-control col"
                        type="number"
                        min="1"
                        style={{ margin: '0px' }}
                        value={clickedCartProduct.addedQuantity}
                        onChange={(e) => {
                          const addedQuantity = Number(e.target.value) || 1;
                          setClickedCartProduct({
                            ...clickedCartProduct,
                            addedQuantity,
                          });
                          // changeCartItemQuantity('input', e.target.value);
                        }}
                      />
                      <Minus
                        className="col-2 btn-primary clickable"
                        style={{ padding: '2px', height: '33px' }}
                        onClick={() => {
                          const addedQuantity =
                            Number(clickedCartProduct.addedQuantity) - 1;
                          setClickedCartProduct({
                            ...clickedCartProduct,
                            addedQuantity,
                          });
                          // changeCartItemQuantity('-');
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-6">
                    <label className="row-option-title">Discount (%)</label>
                    <input
                      className="form-control col"
                      type="number"
                      min="1"
                      value={clickedCartProduct.percentageDiscount}
                      onChange={(e) => {
                        const discount = e.target.value;
                        setClickedCartProduct({
                          ...clickedCartProduct,
                          percentageDiscount: e.target.value,
                          currencyDiscount: 0,
                          unitPrice: (
                            clickedCartProduct.price -
                            (clickedCartProduct.price * discount) / 100
                          ).toFixed(2),
                        });
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <label className="row-option-title">Discount (BDT)</label>
                    <input
                      className="form-control col"
                      type="number"
                      min="1"
                      value={clickedCartProduct.currencyDiscount}
                      onChange={(e) => {
                        setClickedCartProduct({
                          ...clickedCartProduct,
                          discountApplied: e.target.value,
                          currencyDiscount: e.target.value,
                          percentageDiscount: 0,
                          unitPrice: (
                            clickedCartProduct.price - e.target.value
                          ).toFixed(2),
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <label className="row-option-title">
                    Unit Price : {clickedCartProduct.unitPrice}
                  </label>
                </div>
                {/* <textarea className="form-control" placeholder="Notes" /> */}
                <div className="d-flex mt-3">
                  <div className="m-auto">
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        updateCartItems();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Particular Product Modal in Cart -> end */}

        {/* Discounts -> Start */}
        <div
          className="modal fade"
          id="discountAllModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="discountAllModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h5 className="modal-title" id="discountAllModalLabel">
                Give Discount To All Added Items
              </h5> */}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row p-2 align-items-center">
                  <p className="row-option-title">BDT</p>
                  <div className="col">
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      placeholder="Give discount in BDT"
                      style={{ margin: '0px' }}
                      ref={discountAllInputRef}
                      value={givenTotalDiscountBDT}
                      onChange={(e) => {
                        setGivenTotalDiscountBDT(e.target.value);
                        setGivenTotalDiscountPercentage(0);
                      }}
                    />
                  </div>
                </div>
                <div className="row p-2 align-items-center">
                  <p className="row-option-title">%</p>
                  <div className="col">
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      placeholder="Give discount in %"
                      style={{ margin: '0px' }}
                      ref={discountAllInputRef}
                      value={givenTotalDiscountPercentage}
                      onChange={(e) => {
                        setGivenTotalDiscountPercentage(e.target.value);
                        setGivenTotalDiscountBDT(0);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <div className="m-auto">
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        let newSubtotal;
                        let newDiscountTotal;
                        let newTaxTotal;
                        let newTotal;
                        if (givenTotalDiscountPercentage) {
                          const discount =
                            parseFloat(subtotal) *
                            parseFloat(
                              givenTotalDiscountPercentage / 100
                            ).toFixed(2);
                          newSubtotal = (
                            parseFloat(subtotal) - parseFloat(discount)
                          ).toFixed(2);
                        } else {
                          newSubtotal = (
                            parseFloat(subtotal) -
                            parseFloat(givenTotalDiscountBDT)
                          ).toFixed(2);
                        }
                        newDiscountTotal = (subtotal - newSubtotal).toFixed(2);
                        newTaxTotal = (
                          parseFloat(newSubtotal) *
                          (parseFloat(taxRate) / 100)
                        ).toFixed(2);
                        newTotal = (
                          parseFloat(newSubtotal) + parseFloat(newTaxTotal)
                        ).toFixed(2);

                        setDiscountTotal(newDiscountTotal);
                        setSubtotal(newSubtotal);
                        setTaxTotal(newTaxTotal);
                        setTotal(newTotal);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Discounts -> End */}

        {/* Payment Details -> Start */}
        <div
          className="modal right fade"
          id="paymentDetails"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="paymentDetailsLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="discountAllModalLabel">
                  Payment Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col">
                    <div className="sale-summary">
                      <h4>Sale Summary</h4>
                      <table className="table without-border">
                        <tbody>
                          <tr>
                            <th scope="row">Subtotal</th>
                            <td>BDT {subtotal}</td>
                          </tr>
                          <tr>
                            <th scope="row">Discount</th>
                            <td>
                              BDT {discountTotal > 0 ? '- ' : ''}{' '}
                              {discountTotal}
                            </td>
                          </tr>
                          <tr>
                            <th>Tax ({taxRate} %)</th>
                            <td>
                              BDT {taxTotal > 0 ? '+ ' : ''} {taxTotal}
                            </td>
                          </tr>
                          <tr style={{ color: 'green' }}>
                            <th>Sale Total</th>
                            <th>BDT {total}</th>
                          </tr>
                        </tbody>
                      </table>
                      <hr style={{ height: '2px', color: 'Green' }} />
                      <h5>Payments</h5>
                      <table className="table">
                        <tbody>
                          {paymentDetailsPayment.map((payment, index) => {
                            return (
                              <tr key={index}>
                                <td className="summary-section-header">
                                  {payment.type}
                                  {/* <span>
                                  <X
                                    className="feather-icon-sm clickable"
                                    style={{ color: 'red' }}
                                  />
                                </span> */}
                                </td>
                                <td>
                                  <span>BDT {payment.amount}</span>
                                </td>
                              </tr>
                            );
                          })}
                          <tr style={{ color: 'red' }}>
                            <td className="summary-section-header">To Pay</td>
                            <td className="summary-section-header">
                              BDT {total}
                            </td>
                          </tr>
                          <tr style={{ color: 'green' }}>
                            <td className="summary-section-header">Given</td>
                            <td className="summary-section-header">
                              BDT {paymentDetailsPaymentTotal}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col" ref={amountTenderedRef}>
                    <h3>Amount Tendered</h3>
                    <input
                      className="form-control"
                      value={amountTendered}
                      onChange={(e) => {
                        setAmountTendered(e.target.value);
                      }}
                    />
                    <div className="button-container">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          updatePaymentDetailsPayment('Card');
                        }}
                      >
                        Card
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          updatePaymentDetailsPayment('Cash');
                        }}
                      >
                        Cash
                      </button>
                    </div>
                    <h5>Customer: WALK IN</h5>
                    {/* <hr style={{ height: '2px', color: 'Green' }} /> */}
                    <div className="button-container">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          sendData('On Account');
                        }}
                      >
                        On Account
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          sendData('Lay By');
                        }}
                      >
                        Lay By
                      </button>
                    </div>
                  </div>

                  <div
                    className="col"
                    style={{ display: 'none' }}
                    ref={finishedSaleRef}
                  >
                    <h5>Changes</h5>
                    <h1>BDT {changes}</h1>
                    <div className="button-container">
                      <button className="btn btn-success">Email</button>
                      <button className="btn btn-primary">SMS</button>
                      {/* <button className="btn btn-info">Print</button> */}
                    </div>
                    <div className="button-container">
                      <button
                        className="btn btn-warning"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          resetEveryState();
                        }}
                      >
                        Add New Sale
                      </button>
                    </div>
                  </div>
                </div>
                {changes !== '' && (
                  <PDFViewer className="react-pdf-viewer">
                    <Invoice
                      cartItems={cartItems}
                      subtotal={subtotal}
                      discountTotal={discountTotal}
                      taxTotal={taxTotal}
                      total={total}
                      changes={changes}
                      paymentDetailsPayment={paymentDetailsPayment}
                    />
                  </PDFViewer>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Payment Details -> end */}
      </div>
    </div>
  );
}

export default ProcessSalePage;
