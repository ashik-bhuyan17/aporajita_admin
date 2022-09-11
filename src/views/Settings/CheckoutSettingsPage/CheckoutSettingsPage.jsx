import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { errorToast, successToast } from '../../../helpers/toast';
import Progress from '../../../components/loading/Progress';
import axiosInstance from '../../../helpers/axios';

function CheckoutSettingsPage() {
  // state
  const [checkoutSetting, setCheckoutSetting] = useState();
  const [checkoutField, setCheckoutField] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // hooks
  const {
    register: checkout_setting,
    handleSubmit: handleSubmitCheckout,
    reset: checkoutSettingReset,
  } = useForm({
    defaultValues: {
      checkoutSetting,
    },
  });
  const {
    register: checkout_field_setting,
    handleSubmit: handleSubmitCheckoutField,
    reset: checkoutFieldSettingReset,
  } = useForm({
    defaultValues: {
      checkoutField,
    },
  });

  //handlers
  const onSubmitCheckoutSetting = (data) => {
    console.log(data);
    saveCheckoutSettingData(data);
  };
  const onSubmitCheckoutFieldSetting = (data) => {
    console.log(data);
    saveCheckoutFieldSettingData(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  //API
  async function getCheckoutSettingData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/settings/edit_checkout_settings/'
      );
      setCheckoutSetting(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function getCheckoutFieldData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/settings/edit_checkout_field_settings/'
      );
      setCheckoutField(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function saveCheckoutSettingData(data) {
    try {
      setIsLoading(true);
      await axiosInstance.post('api/v1/settings/edit_checkout_settings/', data);
      getSettingData();
      successToast('Created successfuly');
    } catch (err) {
      setIsLoading(false);
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  async function saveCheckoutFieldSettingData(data) {
    try {
      setIsLoading(true);
      await axiosInstance.post(
        'api/v1/settings/edit_checkout_field_settings/',
        {
          ...data,
        }
      );
      getCheckoutFieldData();
      successToast('Created successfuly');
    } catch (err) {
      setIsLoading(false);
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  async function udpateCheckoutFieldData(data) {
    try {
      const response = await axiosInstance.put(
        `api/v1/settings/edit_checkout_field_settings/?pk=${checkoutField?.id}`,
        data
      );
      setCheckoutSetting(response.data);
      successToast('Updated successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function updateCheckoutSettingData(data) {
    try {
      setIsLoading(true);
      await axiosInstance.put(
        `api/v1/settings/edit_checkout_settings/?pk=${checkoutSetting.id}`,
        {
          ...data,
        }
      );
      getCheckoutFieldData();
      successToast('Updated successfuly');
    } catch (err) {
      setIsLoading(false);
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }

  useEffect(() => {
    getCheckoutSettingData();
    getCheckoutFieldData();
  }, []);

  useEffect(() => {
    checkoutSettingReset(checkoutSetting);
  }, [checkoutSetting]);

  useEffect(() => {
    checkoutFieldSettingReset(checkoutField);
  }, [checkoutField]);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div className="page-header-container">
          <h1 className="page-title">Checkout Settings</h1>
        </div>
        <form
          onSubmit={handleSubmitCheckout(onSubmitCheckoutSetting)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <div className="row">
            <div className="col-xs-12 col-md-2">
              <p className="setting-page-container-title">Checkout Settings</p>
              <p className="setting-page-container-description">
                Change checkout options
              </p>
            </div>
            <div className="col-xs-12 col-md-10">
              <div className="panel-container">
                <div className="column-input-container">
                  <div className="row">
                    <div className="mb-3 col-xs-12 checkbox-container check-options">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          {...checkout_setting('guest_checkout')}
                        />
                        Include guest checkout
                      </label>
                    </div>
                    <div className="mb-3 col-xs-12 checkbox-container check-options">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          {...checkout_setting('create_account')}
                        />
                        Allow create account
                      </label>
                    </div>

                    <div className="mb-3 col-xs-12 checkbox-container check-options">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          {...checkout_setting('seperate_delivery_address')}
                        />
                        Allow seperate delivery address
                      </label>
                    </div>

                    <div className="mb-3 col-xs-12 checkbox-container check-options">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          {...checkout_setting('social_login')}
                        />
                        Allow customer to login with facebook account
                      </label>
                    </div>

                    <div className="col-xs-12">
                      <div className="mb-3">
                        <label className="form-label row-option-title mb-3">
                          Customer document label
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          {...checkout_setting('document_label')}
                          style={{ width: '198px' }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12">
                      <div className="mb-3">
                        <label className="form-label row-option-title mb-3">
                          Billing Address Label
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          {...checkout_setting('billing_address_label')}
                          style={{ width: '198px' }}
                        />
                      </div>
                    </div>

                    <div className="col-xs-12">
                      <div className="mb-3">
                        <label className="form-label row-option-title mb-3">
                          Delivery Address Label
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          {...checkout_setting('delivery_address_label')}
                          style={{ width: '198px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-submit-button-end">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>

        <form
          onSubmit={handleSubmitCheckoutField(onSubmitCheckoutFieldSetting)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <div className="row">
            <div className="col-xs-12 col-md-2">
              <p className="setting-page-container-title">
                Checkout Field Settings
              </p>
              <p className="setting-page-container-description">
                Specific field settings for checkout page.
              </p>
            </div>
            <div className="col-xs-12 col-md-10">
              <div className="panel-container">
                <div className="column-input-container">
                  <div className="row">
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Customer note
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="customer_note"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('customer_note')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="customer_note"
                          className="form-check-input"
                          {...checkout_field_setting('customer_note')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="customer_note"
                          className="form-check-input"
                          {...checkout_field_setting('customer_note')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">Title</label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="title"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('title')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="title"
                          className="form-check-input"
                          {...checkout_field_setting('title')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="title"
                          className="form-check-input"
                          {...checkout_field_setting('title')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        First Name
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="first_name"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('first_name')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="first_name"
                          className="form-check-input"
                          {...checkout_field_setting('first_name')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="first_name"
                          className="form-check-input"
                          {...checkout_field_setting('first_name')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Last Name
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="last_name"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('last_name')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="last_name"
                          className="form-check-input"
                          {...checkout_field_setting('last_name')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="last_name"
                          className="form-check-input"
                          {...checkout_field_setting('last_name')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Email Address
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="email"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('email')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="email"
                          className="form-check-input"
                          {...checkout_field_setting('email')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="email"
                          className="form-check-input"
                          {...checkout_field_setting('email')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Company name
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="company_name"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('company_name')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="company_name"
                          className="form-check-input"
                          {...checkout_field_setting('company_name')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="company_name"
                          className="form-check-input"
                          {...checkout_field_setting('company_name')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Phone number
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="phone_number"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('phone')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="phone_number"
                          className="form-check-input"
                          {...checkout_field_setting('phone')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="phone_number"
                          className="form-check-input"
                          {...checkout_field_setting('phone')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Billing address line 1
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="billing_address_line_1"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('billing_address_line1')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="billing_address_line_1"
                          className="form-check-input"
                          {...checkout_field_setting('billing_address_line1')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="billing_address_line_1"
                          className="form-check-input"
                          {...checkout_field_setting('billing_address_line1')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Billing address line 2
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="billing_address_line_2"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('billing_address_line2')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="billing_address_line_2"
                          className="form-check-input"
                          {...checkout_field_setting('billing_address_line2')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="billing_address_line_2"
                          className="form-check-input"
                          {...checkout_field_setting('billing_address_line2')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Billing country
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="billing_country"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('billing_country')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="billing_country"
                          className="form-check-input"
                          {...checkout_field_setting('billing_country')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="billing_country"
                          className="form-check-input"
                          {...checkout_field_setting('billing_country')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Billing state
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="billing_state"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('billing_state')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="billing_state"
                          className="form-check-input"
                          {...checkout_field_setting('billing_state')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="billing_state"
                          className="form-check-input"
                          {...checkout_field_setting('billing_state')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Billing city
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="billing_city"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('billing_city')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="billing_city"
                          className="form-check-input"
                          {...checkout_field_setting('billing_city')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="billing_city"
                          className="form-check-input"
                          {...checkout_field_setting('billing_city')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Billing postal code
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="billing_postal_code"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('billing_postal_code')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="billing_postal_code"
                          className="form-check-input"
                          {...checkout_field_setting('billing_postal_code')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="billing_postal_code"
                          className="form-check-input"
                          {...checkout_field_setting('billing_postal_code')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Different delivery address
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="different_delivery_address"
                          className="form-check-input"
                          value="OPTIONAL"
                          {...checkout_field_setting(
                            'different_delivery_address'
                          )}
                        />
                        <span>Optional</span>
                        <input
                          type="radio"
                          name="different_delivery_address"
                          value="REQUIRED"
                          className="form-check-input"
                          {...checkout_field_setting(
                            'different_delivery_address'
                          )}
                        />
                        <span>Rquired</span>
                        <input
                          type="radio"
                          name="different_delivery_address"
                          value="HIDDEN"
                          className="form-check-input"
                          {...checkout_field_setting(
                            'different_delivery_address'
                          )}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery name
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_name"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_name')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_name"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_name')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_name"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_name')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery phone
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_phone"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_phone')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_phone"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_phone')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_phone"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_phone')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery address line 1
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_address_line_1"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_address_line1')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_address_line_1"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_address_line1')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_address_line_1"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_address_line1')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery address line 2
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_address_line_2"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_address_line2')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_address_line_2"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_address_line2')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_address_line_2"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_address_line2')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery country
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_country"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_country')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_country"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_country')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_country"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_country')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery state
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_state"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_state')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_state"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_state')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_state"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_state')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery city
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_city"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_city')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_city"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_city')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_city"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_city')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery postcode
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_postal_code"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_postal_code')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_postal_code"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_postal_code')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_postal_code"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_postal_code')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                    <div className="mb-3 col-xs-12 check-options-underline">
                      <label className="small-row-option-title">
                        Delivery time slot
                      </label>
                      <div className="radio-container">
                        <input
                          type="radio"
                          name="delivery_time_slot"
                          value="OPTIONAL"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_slot')}
                        />
                        <span>Optional</span>
                        <input
                          value="REQUIRED"
                          type="radio"
                          name="delivery_time_slot"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_slot')}
                        />
                        <span>Rquired</span>
                        <input
                          value="HIDDEN"
                          type="radio"
                          name="delivery_time_slot"
                          className="form-check-input"
                          {...checkout_field_setting('delivery_slot')}
                        />
                        <span>Hidden</span>
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-submit-button-end">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutSettingsPage;
