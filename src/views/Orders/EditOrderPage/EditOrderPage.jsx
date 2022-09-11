import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaEllipsisH,
  FaCheckSquare,
  FaMinusSquare,
  FaRegMoneyBillAlt,
} from 'react-icons/fa';
import Select from 'react-select';

import { errorToast, successToast } from '../../../helpers/toast';
import './EditOrderPage.css';
import { BlobProvider } from '@react-pdf/renderer';
import InvoiceV2 from '../../../components/pdf/InvoiceV2/InvoiceV2';
import axiosInstance from '../../../helpers/axios';
import { ToastContainer } from 'react-toastify';
import Progress from '../../../components/loading/Progress';

function EditOrderPage() {
  const location = useLocation();
  //states
  const previousData = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditOrderItemModal, setShowEditOrderItemModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showAddNewItemModal, setShowAddNewItemModal] = useState();
  const [paidTotal, setPaidTotal] = useState(0);
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [reference, setReference] = useState('');
  const [inventoryVariant, setInventoryVariant] = useState();
  //handler
  const handleShowInventoryModal = () => {
    setShowInventoryModal(!showInventoryModal);
  };
  const handlePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };
  const handleEditOrderItemModal = () => {
    setShowEditOrderItemModal(!showEditOrderItemModal);
  };
  const handleNoteModal = () => {
    setShowNoteModal(!showNoteModal);
  };
  /* add New Order item */
  const [givenQuantity, setGivenQuantity] = useState(1);
  const productContentRef = useRef();
  const [selectedVariantID, setSelectedVariantID] = useState();
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
    imageURL: '',
    variants: [],
  });
  const handleAddNewItemModal = () => {
    setShowAddNewItemModal(!showAddNewItemModal);
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
  const productOptions = initalizeProductOptions(productList);
  const productSelectHandler = (event) => {
    setSelectedProduct(event);
    event.imageURL = event.featured_image;
    event.price = event.variant[0].price;
    console.log(event);
    productContentRef.current.style.display = 'block';
  };

  const reshapeData = () => {
    const reshapedOrders = {};
    reshapedOrders.customer = {
      fullname: data.fullname,
      phone: data.phone,
      delivery_address: data.address,
    };
    reshapedOrders.orderId = data.order_id;
    reshapedOrders.subtotal = data.order_total;
    reshapedOrders.discountTotal = data.other_discount;
    reshapedOrders.taxTotal = data.total_tax;
    reshapedOrders.total = data.order_total;
    reshapedOrders.paid = data.paid;
    reshapedOrders.changes = data.other_charges;
    reshapedOrders.created = data.created;
    reshapedOrders.servedBy = data.ordered_by;
    reshapedOrders.paymentDetailsPayment = [{}];
    reshapedOrders.cartItems = data.order_item?.map((item) => {
      return {
        name: item.product_name,
        addedQuantity: item.quantity,
        unitPrice: item.unit_price,
        price: item.price,
        variantName: item.size_name,
        variantValue: item.size_value,
      };
    });
    reshapedOrders.order_note = data.order_note;
    console.log(reshapedOrders);
    return reshapedOrders;
  };

  //API
  async function addProduct() {
    const modifiedData = data;
    const variantID = selectedVariantID
      ? selectedVariantID
      : selectedProduct.variant[0];
    console.log('selectedProduct', selectedProduct);
    const product = selectedProduct.variant.find(
      (product) => product.id === variantID.id
    );
    console.log('---------');
    console.log('variant data',variantID);
    console.log(selectedProduct.id, variantID);
    console.log('---===------');
    console.log('product ', product);
    console.log('---------');

    modifiedData.order_item.push({
      compare_at_price: product.compare_at_price,
      quantity: givenQuantity,
      fulfilled_quantity: givenQuantity,
      stock_control: true,
      price: product.price || selectedProduct.price,
      product: selectedProduct.id,
      size: variantID.id,
      awaiting_stock: 0,
      discount: product?.discount ? product.discount : null,
      id: product.id,
      product_name: product.name,
      size_name: variantID.name,
      size_value: variantID.value,
      barcode: product.barcode,
      unit_price: product.price,
      order: previousData.id,
    });
    modifiedData.value = 150;
    modifiedData.delivery_area_id = 150;
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `api/v1/order/update/${previousData.id}/`,
        modifiedData
      );
      console.log('response',response)
      setIsLoading(false);
      getData();
    } catch (err) {
      console.log(err);
    }
  }
  async function getData() {
    try {
      const response = await axiosInstance.get(
        `api/v1/order/update/${previousData.id}/`
      );
      console.log('response', response.data);
      setIsLoading(false);
      setData(response.data);
    } catch (err) {
      errorToast('An error occured');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function saveNote() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `api/v1/order/update/${previousData.id}/`,
        data
      );
      console.log(response.data);
      setIsLoading(false);
      getData();
    } catch (err) {
      errorToast('Error!, Please try again to update');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function saveInventory() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `api/v1/order/update/${previousData.id}/`,
        data
      );
      console.log(response.data);
      setIsLoading(false);
      getData();
    } catch (err) {
      errorToast('Error!, Please try again to update');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function updateItems() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `api/v1/order/update/${previousData.id}/`,
        data
      );
      console.log(response.data);
      setIsLoading(false);
      getData();
    } catch (err) {
      errorToast('Error!, Please try again to update');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function changeOrderStatus(status) {
    setIsLoading(true);
    const newData = data;
    newData.status = status;
    try {
      const response = await axiosInstance.put(
        `api/v1/order/update/${previousData.id}/`,
        newData
      );
      console.log(response.data);
      setIsLoading(false);
      successToast(`Order ${status}`);
      getData();
    } catch (err) {
      errorToast('Error!, Please try again to update');
      console.error(err);
      setIsLoading(false);
    }
  }

  async function addPayment() {
    setIsLoading(true);
    const newData = data;
    newData.paid = paidTotal;
    newData.payment_method = paymentMethod;
    newData.payment_status = 'PARTIAL';
    newData.reference = reference;
    newData.amount = paidTotal;
    try {
      const response = await axiosInstance.put(
        `api/v1/order/update/${previousData.id}/`,
        newData
      );
      console.log(response.data);
      setIsLoading(false);
      successToast(`Payment Added`);
      getData();
    } catch (err) {
      errorToast('Error!, Please try again to update');
      console.error(err);
      setIsLoading(false);
    }
    handlePaymentModal();
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
    getData();
    setData(previousData);
    getProductData();
  }, []);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">ORD-{data.id}</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <span className="order-balance">
              Balance: BDT {data.order_total}
            </span>
            <span className="order-status mx-2">{data.status}</span>
            <span className="order-type">Manual Order</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="panel-container">
              <div className="table-scroll">
                <table className="table-responsive" role="table">
                  <thead className="grey-table-header">
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Instruction</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>
                        <button
                          className="btn btn-default"
                          id="tableHeaderButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FaEllipsisH style={{ width: '10px' }} />
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="tableHeaderButton"
                        >
                          <li>
                            <span
                              className="dropdown-item clickable"
                              onClick={() => {
                                handleAddNewItemModal();
                              }}
                            >
                              Add New Order Item
                            </span>
                            <span
                              className="dropdown-item clickable"
                              onClick={() => {
                                handleNoteModal();
                              }}
                            >
                              Add Notes
                            </span>
                          </li>
                        </ul>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.order_item?.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              className="img-fluid rounded"
                              src={product.product_image}
                              width="50"
                              alt="product"
                            />
                          </td>
                          <td>
                            <p className="small-row-option-title">
                              {product.product_name} : {product.size_value}
                            </p>
                            <span style={{ fontSize: '11.5px' }}>
                              SKU: / Barcode:
                            </span>
                            <br />
                            <span style={{ fontSize: '11.5px' }}>
                              Fulfilled: {product.fulfilled_quantity}/0
                            </span>
                          </td>
                          <td>-</td>
                          <td>
                            BDT {product.unit_price} x {product.quantity}
                          </td>
                          <td>
                            BDT{' '}
                            {parseFloat(
                              product.unit_price * product.quantity
                            ).toFixed(2)}
                          </td>
                          <td>
                            <button
                              className="btn btn-default"
                              id="tableDataButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <FaEllipsisH style={{ width: '10px' }} />
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="tableDataButton"
                            >
                              <li>
                                <span
                                  className="dropdown-item clickable"
                                  onClick={() => {
                                    setInventoryVariant(index);
                                    handleShowInventoryModal();
                                  }}
                                >
                                  Adjust Inventory
                                </span>
                                <span
                                  className="dropdown-item clickable"
                                  onClick={() => {
                                    handleEditOrderItemModal();
                                  }}
                                >
                                  Edit
                                </span>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan="4" />
                      <td className="t-r">Subtotal</td>
                      <td className="t-r">BDT {data.sub_total}</td>
                    </tr>
                    {/* <tr>
                      <td colSpan="4" />
                      <td>Total Discount </td>
                      <td>- BDT {data.other_discount}</td>
                    </tr> */}
                    <tr>
                      <td colSpan="4" />
                      <td className="t-r">Tax</td>
                      <td className="t-r">BDT {data.total_tax}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" />
                      <td className="t-r">Shipping</td>
                      <td className="t-r">BDT {data.shipping_charge}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" />
                      <td className="bold t-r">Total</td>
                      <td className="bold t-r">BDT {data.order_total}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" />
                      <td className="bold t-r">Total Paid</td>
                      <td className="bold t-r">BDT {data.paid}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" />
                      <td className="bold t-r">Balance</td>
                      <td className="red bold t-r">BDT {data.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {data.status === 'Recieved' && (
                <div className="row">
                  <hr className="light-grey" />
                  <div className="col-md-9">
                    <FaCheckSquare style={{ color: 'green' }} />
                    <label className="row-option-title mx-1">
                      Accept this Order
                    </label>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-primary pull-right">
                      Accept
                    </button>
                  </div>
                </div>
              )}
              <div className="row">
                <hr className="light-grey" />
                <div className="col-md-9">
                  <FaCheckSquare style={{ color: 'green' }} />
                  <label className="row-option-title mx-1">
                    Ship this Order
                  </label>
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-primary pull-right"
                    onClick={() => {
                      changeOrderStatus('Shipped');
                    }}
                    disabled={data.status === 'Shipped'}
                  >
                    {data.status !== 'Shipped' ? 'Ship' : 'Shipped'}
                  </button>
                </div>
              </div>
              <div className="row">
                <hr className="light-grey" />
                <div className="col-md-9">
                  <FaMinusSquare style={{ color: '#CC3300' }} />
                  <label className="row-option-title mx-1">
                    Reject this Order
                  </label>
                </div>
                <div className="col-md-3">
                  {data.status === 'Rejected' ? (
                    <button className="btn btn-primary pull-right" disabled>
                      Rejected
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary pull-right"
                      onClick={() => {
                        changeOrderStatus('Rejected');
                      }}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
              <div className="row">
                <hr className="light-grey" />
                <div className="col-md-9">
                  <FaRegMoneyBillAlt style={{ color: 'green' }} />
                  <label className="row-option-title mx-1">
                    Manage payments for this Order
                  </label>
                  <br />
                  {/* <span className="text-info" style={{ fontSize: '11px' }}>
                    This order was placed with{' '}
                    <span style={{ textDecoration: 'underline' }}>
                      Cash on delivery
                    </span>{' '}
                    method.
                  </span> */}
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-primary pull-right"
                    onClick={() => {
                      handlePaymentModal();
                    }}
                  >
                    Payments
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel-container">
              <section>
                <BlobProvider
                  document={<InvoiceV2 order={reshapeData()} />}
                  fileName="selected_orders.pdf"
                >
                  {({ url }) => (
                    <a href={url} target="_blank">
                      <button type="button" className="btn btn-info">
                        Generate Invoice
                      </button>
                    </a>
                  )}
                </BlobProvider>
                <button type="button" className="btn btn-info mx-1">
                  Generate Shipping Label
                </button>
                <hr className="light-grey" />
              </section>
              <section>
                <div>
                  <FaUser />
                  <span className="mx-1">Name: {data.fullname}</span>
                </div>
                <div>
                  <FaEnvelope />
                  <span className="mx-1">Email: {data.customer_email}</span>
                </div>
                <div>
                  <FaPhoneAlt />
                  <span className="mx-1">Phone: {data.customer_phone}</span>
                </div>
                <hr className="light-grey" />
              </section>
              <section>
                <div>
                  <span className="row-option-title">
                    Billing and Shipping Address
                  </span>
                  {/* <p className="row-option-title clickable pull-right">EDIT</p> */}
                </div>
                <div>
                  <p className="m-0">Name: {data.fullname}</p>
                  <p>Address: {data.delivery_address}</p>
                </div>
              </section>
            </div>
            <div className="panel-container my-4">
              <p className="row-option-title">Manage Notes</p>
              <p className="text-center my-2">
                {data.order_note !== '' ? data.order_note : 'No note available'}
              </p>
              <div
                className="page-header-button-container clickable"
                onClick={() => {
                  handleNoteModal();
                }}
              >
                <p className="row-option-title">ADD NOTE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <div
          className="modal show"
          tabIndex="-1"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Paid Total</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handlePaymentModal();
                  }}
                />
              </div>
              <div className="modal-body">
                <label className="form-label required row-option-title mb-2">
                  Payment Method
                </label>
                <select
                  className="form-control mb-2"
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                >
                  <option value="-1">Select</option>
                  <option value="CASHON_DELIVERY">Cash On Delivery</option>
                  <option value="BKASH">bKash</option>
                  <option value="CASH">Cash</option>
                  <option value="SL_COMMERZ_PAYMENT_GATEWAY">
                    SSL_COMMERZ_PAYMENT_GATEWAY
                  </option>
                  <option value="CARD">Card</option>
                </select>
                <label className="form-label required row-option-title mb-2">
                  Reference
                </label>
                <textarea
                  col={3}
                  type="number"
                  className="form-control mb-2"
                  onChange={(e) => {
                    setReference(e.target.value);
                  }}
                />
                <label className="form-label required row-option-title mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control mb-2"
                  onChange={(e) => {
                    setPaidTotal(e.target.value);
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handlePaymentModal();
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    addPayment();
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditOrderItemModal && (
        <div
          className="modal show"
          tabIndex="-1"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontSize: '14px' }}>
                  Edit Order Item
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleEditOrderItemModal();
                  }}
                />
              </div>
              <div className="modal-body">
                <table className="table-responsive" role="table">
                  <thead className="grey-table-header">
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.order_item?.map((product, index) => {
                      console.log('product',product)
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              className="img-fluid rounded"
                              src={product.product_image}
                              width="50"
                              alt="product"
                            />
                          </td>
                          <td
                            className="bold"
                            style={{ maxWidth: '200px', color: '#563d7c' }}
                          >
                            {product.product_name} : {product.size_value}
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="number"
                              style={{ width: '80px' }}
                              defaultValue={product.quantity}
                              onChange={(e) => {
                                product.quantity = e.target.value;
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    updateItems();
                    handleEditOrderItemModal();
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  class="btn btn-default"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleEditOrderItemModal();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showNoteModal && (
        <div
          className="modal show"
          tabIndex="-1"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontSize: '14px' }}>
                  Order Notes
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleNoteModal();
                  }}
                />
              </div>
              <div className="modal-body">
                <label className="row-option-title required">Note</label>
                <br />
                <textarea
                  className="form-control"
                  rows={5}
                  onChange={(e) => {
                    data.order_note = e.target.value;
                  }}
                ></textarea>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    saveNote();
                    handleNoteModal();
                  }}
                >
                  Add New Note
                </button>
                <button
                  type="button"
                  class="btn btn-default"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleNoteModal();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showInventoryModal && (
        <div
          className="modal show"
          tabIndex="-1"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontSize: '14px' }}>
                  Adjust Inventory :{' '}
                  {data.order_item[inventoryVariant].product_name} : Size(
                  {data.order_item[inventoryVariant].size})
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleShowInventoryModal();
                  }}
                />
              </div>
              <div className="modal-body">
                <div className="table-scroll">
                  <table className="table-responsive" role="table">
                    <thead className="grey-table-header">
                      <tr>
                        <th>Inventory Location</th>
                        <th>Awaiting Stock</th>
                        <th>Current Stock</th>
                        <th>Adjustment</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Online</td>
                        <td>
                          {data.order_item[inventoryVariant].awaiting_stock}
                        </td>
                        <td>{data.order_item[inventoryVariant].stock}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                              data.order_item[inventoryVariant].awaiting_stock =
                                Number(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => {
                              saveInventory();
                              handleShowInventoryModal();
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleShowInventoryModal();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddNewItemModal && (
        <div
          className="modal show"
          tabIndex="-1"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontSize: '14px' }}>
                  Add new order item
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleAddNewItemModal();
                  }}
                />
              </div>
              <div className="modal-body">
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
                            className={`form-control ${
                              givenQuantity < '1' ? 'is-invalid' : ''
                            }`}
                            onChange={(e) => {
                              setGivenQuantity(e.target.value);
                            }}
                          />
                          <div className="invalid-feedback">
                            {givenQuantity < '1' &&
                              'Quantity must be at least 1'}
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
                          <img src={selectedProduct.imageURL} alt="product" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleAddNewItemModal();
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    addProduct();
                    handleAddNewItemModal();
                  }}
                >
                  Add Selected Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditOrderPage;
