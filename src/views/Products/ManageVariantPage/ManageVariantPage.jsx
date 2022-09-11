import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import { FaRegTrashAlt, FaPlus, FaGift } from 'react-icons/fa';
import axiosInstance from '../../../helpers/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';

function ManageVariantPage() {
  //state
  const [isLoading, setIsLoading] = useState(true);

  //refs
  const variantRef = useRef();

  //state
  const [productData, setProductData] = useState();
  const [variants, setVariants] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState('');

  // hooks
  const location = useLocation();
  const history = useHistory();
  const productPath = history.location.pathname.replace('variants', 'edit');
  /* making ready to intialize previousData */
  const previousData = location.state;
  const {
    control: variant_control,
    register: variant_register,
    handleSubmit: variantHandleSubmit,
  } = useForm({
    defaultValues: {
      variants: variants,
    },
  });
  const {
    fields: variantFields,
    append: variantFieldsAppend,
    remove: variantFieldsRemove,
    insert: variantFieldsInsert,
  } = useFieldArray({
    control: variant_control,
    name: 'variants',
    keyName: 'field_id',
  });
  const {
    register: option_register,
    handleSubmit: optionHandleSubmit,
    control: option_control,
    formState: { option_error },
  } = useForm({
    defaultValues: {
      options: options,
    },
  });
  const {
    fields: optionFields,
    append: optionFieldsAppend,
    remove: optionFieldsRemove,
    insert: optionFieldsInsert,
  } = useFieldArray({
    control: option_control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'options', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  // handlers
  async function getProductSizeData() {
    try {
      const response = await axiosInstance.get(
        `api/v1/inventory/product-size/${previousData.id}/`
      );
      console.log(response.data);
      setProductData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);

      setIsLoading(false);
      errorToast('Error occured!, Please try again.');
    }
  }
  async function deleteVariantData(id) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(
        `api/v1/inventory/product-size-details/${id}/`
      );
      getProductSizeData();
      successToast('Deleted successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }
  async function sendOptionData(data, e) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `api/v1/inventory/product-size/${previousData.id}/`,
        data
      );
      successToast('Updated successfuly');
      setIsLoading(false);

      const variants = await getProductSizeData();
      generateVariants(variants.data.variant);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }
  async function sendVariantData(data, index) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `api/v1/inventory/product-size-details/${variants[index].id}/`,
        data
      );
      successToast('Updated successfuly');
      setIsLoading(false);
      getProductSizeData();
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }
  //generate
  const generateVariants = (variants) => {
    console.log(variants);
    variantFieldsRemove();
    variantRef.current.classList.remove('d-none');
    for (let i = 0; i < variants?.length; i++) {
      //const values = options[i].value.split(',');
      variantFieldsAppend({
        value: variants[i].value,
        stock: variants[i].stock,
        sku: variants[i].sku,
        barcode: variants[i].barcode,
        price: variants[i].price,
        cost_price: variants[i].cost_price,
        compare_at_price: variants[i].compare_at_price,
        weight: variants[i].weight,
      });
    }
  };
  //forms
  const onOptionSubmit = (data, e) => {
    // generateVariants(data.options);
    setOptionName(data.options[0].name);
    sendOptionData(
      { name: data.options[0].name, value: data.options[0].value },
      e
    );
  };
  const onVariantSubmit = (data) => {
    console.log(data);
    for (let i = 0; i < data.variants.length; i++) {
      sendVariantData(data.variants[i], i);
    }
    setIsLoading(false);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  //delete all variants
  const deleteAllVariants = () => {
    try {
      for (let i = 0; i < variants?.length; i++) {
        deleteVariantData(variants[i].id);
      }
      variantFieldsRemove();
      optionFieldsRemove();
      optionFieldsAppend([
        {
          name: '',
          value: '',
        },
      ]);
      variantRef.current.classList.add('d-none');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (previousData.variant?.length < 1) {
      optionFieldsAppend([
        {
          name: '',
          value: '',
        },
      ]);
    } else {
      console.log(productData);
      getProductSizeData();
      const variant = productData;
      setVariants(variant);
      generateVariants(variant);
      variantRef.current.classList.remove('d-none');
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    setVariants(productData);
    generateVariants(productData);
    variantRef.current.classList.remove('d-none');
  }, [productData]);

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12">
            Manage Variants of &nbsp;
            <Link
              to={{
                pathname: productPath,
                state: productData,
              }}
            >
              {previousData.name}
            </Link>
          </h1>
        </div>
        <div className="page-header-container">
          <nav aria-label="breadcrumb" className="col-xs-12 col-md-6">
            <ol className="breadcrumb text-muted">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin/products">Products</Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  to={{
                    pathname: productPath,
                    state: productData,
                  }}
                >
                  Edit Product
                </Link>
              </li>
            </ol>
          </nav>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/products" className="btn btn-primary">
              <span className="mx-1">
                <FaGift />
              </span>
              All Products
            </Link>
            <Link to="admin/products/new" className="btn btn-primary">
              <span className="mx-1">
                <FaPlus />
              </span>
              Add New Products
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="panel-container">
              <p className="row-option-title">Manage Variants</p>
              <div className="column-input-container">
                <div className="table-scroll">
                  <form
                    onSubmit={optionHandleSubmit(onOptionSubmit)}
                    onKeyDown={(e) => checkKeyDown(e)}
                  >
                    <table className="table-responsive">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="text-left grey-table-header"
                          >
                            Option Name
                          </th>
                          <th
                            scope="col"
                            className="text-left grey-table-header"
                          >
                            Option Values
                          </th>
                          <th className="text-left grey-table-header" />
                        </tr>
                      </thead>
                      <tbody>
                        {optionFields.map((option, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    option_error ? 'is-invalid' : ''
                                  }`}
                                  placeholder="e.g. Size"
                                  {...option_register(`options.${index}.name`, {
                                    required: true,
                                  })}
                                />
                                <div className="invalid-feedback">
                                  {option_error && 'This field is required.	'}
                                </div>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    option_error ? 'is-invalid' : ''
                                  }`}
                                  placeholder="e.g. Small, Medium, Large"
                                  {...option_register(
                                    `options.${index}.value`,
                                    { required: true }
                                  )}
                                />
                                <div className="invalid-feedback">
                                  {option_error && 'This field is required.	'}
                                </div>
                              </td>
                              <td>
                                <button
                                  className="btn btn-default"
                                  onClick={() => {
                                    optionFieldsRemove(index);
                                  }}
                                >
                                  <FaRegTrashAlt className="fa" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="page-header-button-container mt-2">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => {
                          optionFieldsAppend({ name: '', value: '' });
                        }}
                      >
                        Add Another Option
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Generate Variants
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <form
              onSubmit={variantHandleSubmit(onVariantSubmit)}
              onKeyDown={(e) => {
                checkKeyDown(e);
              }}
              className="d-none"
              ref={variantRef}
            >
              <div className="panel-container">
                <p className="row-option-title">
                  Total: {variantFields.length} Variant(s)
                </p>
                <div className="table-scroll">
                  <table className="table-responsive">
                    <thead>
                      <tr>
                        <th scope="col" className="grey-table-header">
                          {optionName}
                        </th>
                        <th scope="col" className="grey-table-header">
                          Stock Quantity
                        </th>
                        <th scope="col" className="grey-table-header">
                          SKU
                        </th>
                        <th scope="col" className="grey-table-header">
                          Barcode
                        </th>
                        <th scope="col" className="grey-table-header">
                          Selling price (BDT )
                        </th>
                        <th scope="col" className="grey-table-header">
                          Cost price (BDT )
                        </th>
                        <th scope="col" className="grey-table-header">
                          Compare at price (BDT )
                        </th>
                        <th scope="col" className="grey-table-header">
                          Weight (Kg)
                        </th>
                        <th scope="col" className="grey-table-header">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {variantFields.map((variant, index) => {
                        // console.log(variantFields);
                        return (
                          <tr key={index}>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                disabled
                                {...variant_register(
                                  `variants[${index}].value`
                                )}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                disabled
                                {...variant_register(
                                  `variants[${index}].stock`
                                )}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                {...variant_register(`variants[${index}].sku`)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                {...variant_register(
                                  `variants[${index}].barcode`
                                )}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                className="form-control"
                                {...variant_register(
                                  `variants[${index}].price`
                                )}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                className="form-control"
                                {...variant_register(
                                  `variants[${index}].cost_price`
                                )}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                className="form-control"
                                {...variant_register(
                                  `variants[${index}].compare_at_price`
                                )}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                className="form-control"
                                {...variant_register(
                                  `variants[${index}].weight`
                                )}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-default"
                                type="button"
                                onClick={(e) => {
                                  deleteVariantData(variants[index].id);
                                  variantFieldsRemove(index);
                                }}
                              >
                                <FaRegTrashAlt className="fa clickable" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="page-header-button-container mt-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteAllVariants();
                  }}
                >
                  Delete All Variants
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Variants
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageVariantPage;
