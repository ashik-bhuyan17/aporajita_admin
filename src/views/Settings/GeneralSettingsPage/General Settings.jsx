import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import timezones from '../../../assets/data/timezones';
import countries from '../../../assets/data/countries';
import currencies from '../../../assets/data/currencies';
import { errorToast, successToast } from '../../../helpers/toast';
import Progress from '../../../components/loading/Progress';
import axiosInstance from '../../../helpers/axios';

function GeneralSettingsPage() {
  //state
  const [settingData, setSettingData] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // hooks
  const {
    register: general_setting,
    handleSubmit: handleSubmitGeneral,
    formState: { errors },
    reset: general_setting_reset,
  } = useForm({
    defaultValues: settingData,
  });
  const {
    register: seo,
    handleSubmit: handleSubmitSEO,
    reset: seo_reset,
  } = useForm({
    defaultValues: {
      metaData,
    },
  });

  //handlers
  const onSubmitGeneral = (data) => {
    console.log(data);
    if (settingData?.id) {
      updateSettingData(data);
      return;
    }
    saveSettingData(data);
  };
  const onSubmitSEO = (data) => {
    console.log(data);
    if (metaData?.id) {
      updateMetaData(data);
      return;
    }
    saveMetaData(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  //API
  async function getSettingData() {
    try {
      const response = await axiosInstance.get('api/v1/settings/general/');
      setSettingData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function updateSettingData(data) {
    try {
      const response = await axiosInstance.put(
        `api/v1/settings/general/?pk=${settingData?.id}`,
        data
      );
      setSettingData(response.data);
      successToast('Updated successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function getMetaData() {
    try {
      const response = await axiosInstance.get('api/v1/company/meta/');
      setMetaData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
  async function saveSettingData(data) {
    try {
      setIsLoading(true);
      await axiosInstance.post('api/v1/settings/general/', data);
      getSettingData();
      successToast('Created successfuly');
    } catch (err) {
      setIsLoading(false);
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  async function saveMetaData(data) {
    try {
      setIsLoading(true);
      await axiosInstance.post('api/v1/company/meta/', { ...data });
      getMetaData();
      successToast('Created successfuly');
    } catch (err) {
      setIsLoading(false);
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  async function updateMetaData(data) {
    try {
      setIsLoading(true);
      await axiosInstance.put(`api/v1/company/meta/?pk=${metaData.id}`, {
        ...data,
      });
      getMetaData();
      successToast('Updated successfuly');
    } catch (err) {
      setIsLoading(false);
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }

  useEffect(() => {
    getSettingData();
    getMetaData();
  }, []);

  useEffect(() => {
    general_setting_reset(settingData);
  }, [settingData]);

  useEffect(() => {
    seo_reset(metaData);
  }, [metaData]);

  return (
    <div className="page-container-scroll">
      <Progress isAnimating={isLoading} key={0} />

      <div className="page-container">
        <form
          onSubmit={handleSubmitGeneral(onSubmitGeneral)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <div className="page-header-container row">
            <h1 className="page-title col-xs-12 col-md-6">General Settings</h1>

            <div className="page-header-button-container col-xs-12 col-md-6">
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </div>

          <div className="panel-container">
            <div className="panel-heading">
              <p className="row-option-title">All Categories</p>
            </div>
            <br />
            <div className="column-input-container">
              <div className="row">
                <div className="col-xs-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label required row-option-title">
                      Online Store name
                    </label>
                    <input
                      type="text"
                      {...general_setting('store_name', { required: true })}
                      className={`form-control ${
                        errors.store_name ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.store_name && "Can't be empty"}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Business name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...general_setting('business_name')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      {...general_setting('email')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      {...general_setting('phone')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...general_setting('street')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">City</label>
                    <input
                      type="text"
                      className="form-control"
                      {...general_setting('city')}
                    />
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
                      {...general_setting('country')}
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
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Province/Division
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...general_setting('division')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Postal code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...general_setting('postal_code')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Default currency
                    </label>
                    <select
                      className="form-select"
                      aria-label="dropdown"
                      {...general_setting('currency')}
                    >
                      {currencies.map((currency, index) => {
                        return (
                          <option value={currency} key={index}>
                            {currency}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Currency Text
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...general_setting('currency_text')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Display products per page
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      {...general_setting('product_per_page')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Product sort by
                    </label>
                    <select
                      className="form-select"
                      aria-label="dropdown"
                      {...general_setting('sort_by')}
                    >
                      <option value="NEW_PRODUCT">
                        Display New Product First
                      </option>
                      <option value="BASED_ON_ORDER">
                        Display based on Custom Order
                      </option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Timezone
                    </label>
                    <select
                      className="form-select"
                      aria-label="dropdown"
                      {...general_setting('timezone')}
                    >
                      {timezones.map((timezone, index) => {
                        return (
                          <option value={timezone.value} key={index}>
                            {timezone.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3 checkbox-container">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        {...general_setting('online')}
                      />
                      Online?
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="panel-container">
          <form
            onSubmit={handleSubmitSEO(onSubmitSEO)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <div className="panel-heading">
              <p className="row-option-title">
                Provide search engine optimization (SEO) information here
              </p>
            </div>
            <div className="column-input-container">
              <div className="row">
                <div className="col-xs-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Meta title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...seo('meta_title')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Meta description
                    </label>
                    <textarea
                      type="text"
                      rows="6"
                      className="form-control"
                      {...seo('meta_description')}
                    />
                  </div>
                </div>

                <div className="col-xs-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label row-option-title">
                      Meta keywords
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...seo('meta_keywords')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GeneralSettingsPage;
