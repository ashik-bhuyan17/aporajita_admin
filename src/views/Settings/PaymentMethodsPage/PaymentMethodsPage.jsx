import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import axiosInstance from '../../../helpers/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';

function PaymentMethodsPage() {
  const [isLoading, setIsLoading] = useState(true);
  //refs
  const bKashRef = useRef();
  const bKashActivateButton = useRef();
  const bKashDeactivateButton = useRef();
  const cashOnDeliveryRef = useRef();
  const cashOnDeliveryActivateButton = useRef();
  const cashOnDeliveryEditButton = useRef();
  const cashOnDeliveryDeactivateButton = useRef();

  //state
  const [bKashData, setbKashData] = useState([]);
  const [cashOnDelivery, setCashOnDelivery] = useState([]);

  // hooks
  const { register: bKash_payment, handleSubmit: handleSubmitBKashPayment } =
    useForm({
      defaultValues: {
        // instructions:
      },
    });
  const {
    register: cash_on_delivery,
    handleSubmit: handleSubmitCashOnDelivery,
  } = useForm({
    defaultValues: {
      // instructions:
    },
  });

  //handlers
  const onSubmitBKashPayment = (data) => {
    console.log(data);
  };
  const onSubmitCashOnDelivery = (data) => {
    console.log(data.instructions);
    try {
        const response =  axiosInstance.post('/api/v1/settings/cash-on-payment/', {
        // order_id: id
        cash_on : true,
        description: data.instructions,

      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  //ref handler
  const bKashRefHanlder = (status) => {
    if (status === 'show') {
      bKashRef.current.style.display = 'block';
      bKashDeactivateButton.current.style.display = 'block';
      bKashActivateButton.current.style.display = 'none';
    } else {
      bKashRef.current.style.display = 'none';
      bKashDeactivateButton.current.style.display = 'none';
      bKashActivateButton.current.style.display = 'block';
    }
  };

  const cashOnDeliveryRefHanlder = (status) => {
    if (status === 'show') {
      cashOnDeliveryRef.current.style.display = 'block';
      cashOnDeliveryDeactivateButton.current.style.display = 'block';
      cashOnDeliveryEditButton.current.style.display = 'block';
      cashOnDeliveryActivateButton.current.style.display = 'none';
    } else {
      cashOnDeliveryRef.current.style.display = 'none';
      cashOnDeliveryDeactivateButton.current.style.display = 'none';
      cashOnDeliveryEditButton.current.style.display = 'none';
      cashOnDeliveryActivateButton.current.style.display = 'block';
    }
  };

  useEffect(() => {
    //API
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('api/v1/inventory/users/');
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        successToast('Updated successfuly');
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        errorToast('Error occured!, Please try again.');
      }
    }
    // getData();
    bKashData.length > 0 ? bKashRefHanlder('show') : bKashRefHanlder('hide');
    cashOnDelivery.length > 0
      ? cashOnDeliveryRefHanlder('show')
      : cashOnDeliveryRefHanlder('hide');
  });

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container">
          <h1 className="page-title">Payment Methods</h1>
        </div>
        <div className="panel-container">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <p className="row-option-title">Bkash Payment</p>
            </div>
            <div className="col-xs-12 col-md-8">
              <hr className="light-grey" />
              <div className="row">
                <div className="page-header-button-container">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      bKashRefHanlder('show');
                    }}
                    ref={bKashActivateButton}
                  >
                    Activate
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      bKashRefHanlder('hide');
                    }}
                    ref={bKashDeactivateButton}
                  >
                    Deactivate
                  </button>
                </div>
              </div>
              <form
                onSubmit={handleSubmitBKashPayment(onSubmitBKashPayment)}
                onKeyDown={(e) => checkKeyDown(e)}
              >
                <hr className="light-grey" />
                <div className="column-input-container" ref={bKashRef}>
                  <p>
                    Enter the discount amount for this payment method. For
                    example, you might want to discount 10% who make payments
                    with bKash. Customer will see this discount in the checkout
                    page. Apply additional Charge/Discount for this payment
                    method Specify the type of charge Apply Additional Charge
                    Apply Discount Specify the Charge/Discount Type Fixed
                    Percentage Amount
                  </p>
                  <div className="row">
                    <div className="col-2 row-option-title"></div>
                    <div className="col-10 mt-2">
                      <div className="mb-3 checkbox-container">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            {...bKash_payment('additional_charge_or_discount')}
                          />
                          Apply additional Charge/Discount for this payment
                          method
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 row-option-title-right">
                      Specify the type of charge
                    </div>
                    <div className="col-10 mt-2">
                      <div className="radio-container-col">
                        <div>
                          <input
                            type="radio"
                            value="Apply Additional Charge"
                            className="form-check-input"
                            {...bKash_payment('type_of_charge')}
                          />
                          <span className="form-check-label">
                            Apply Additional Charge
                          </span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Apply Discount"
                            className="form-check-input"
                            {...bKash_payment('type_of_charge')}
                          />
                          <span className="form-check-label">
                            Apply Discount
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 row-option-title-right">
                      Specify the Charge/Discount Type
                    </div>
                    <div className="col-10 mt-2">
                      <div className="radio-container-col">
                        <div>
                          <input
                            type="radio"
                            value="Fixed"
                            className="form-check-input"
                            {...bKash_payment('type_of_charge_type')}
                          />
                          <span className="form-check-label">Fixed</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="Percentage"
                            className="form-check-input"
                            {...bKash_payment('type_of_charge_type')}
                          />
                          <span className="form-check-label">Percentage</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 row-option-title-right">Amount</div>
                    <div className="col-10 mt-2">
                      <input
                        type="text"
                        className="form-control"
                        {...bKash_payment('amount')}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 row-option-title-right">
                      Customer Instruction
                    </div>
                    <div className="col-10 mt-2">
                      <textarea
                        type="text"
                        className="form-control"
                        {...bKash_payment('instruction')}
                      />
                    </div>
                  </div>
                  <div className="page-header-button-container mt-3">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="panel-container">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <p className="row-option-title">Cash on Delivery</p>
            </div>
            <div className="col-xs-12 col-md-8">
              <p>
                Provide customers with instructions to pay outside of your web
                store
              </p>
              <hr className="light-grey" />
              <div className="column-input-container">
                <div className="page-header-button-container">
                  <button
                    type="button"
                    className="btn btn-primary mb-0"
                    ref={cashOnDeliveryActivateButton}
                    onClick={() => {
                      cashOnDeliveryRefHanlder('show');
                    }}
                  >
                    Activate
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary mb-0"
                    ref={cashOnDeliveryEditButton}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mb-0"
                    ref={cashOnDeliveryDeactivateButton}
                    onClick={() => {
                      cashOnDeliveryRefHanlder('hide');
                    }}
                  >
                    Deactivate
                  </button>
                </div>
                <form
                  onSubmit={handleSubmitCashOnDelivery(onSubmitCashOnDelivery)}
                  onKeyDown={(e) => {
                    checkKeyDown(e);
                  }}
                  ref={cashOnDeliveryRef}
                >
                  <hr className="light-grey" />
                  <p>
                    Enter the payment instructions – displayed on the payment
                    page, before the customer has placed their order.
                  </p>
                  <textarea
                    className="form-control"
                    {...cash_on_delivery('instructions')}
                  />
                  <hr className="light-grey" />
                  <div className="page-header-button-container mt-3">
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => {
                        cashOnDeliveryRefHanlder('hide');
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodsPage;
