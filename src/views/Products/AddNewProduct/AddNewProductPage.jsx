import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';
import axiosInstance from '../../../helpers/axios';

function AddNewProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [previousData, setPreviousData] = useState({});
  const history = useHistory();
  //refs
  const successRef = useRef();
  const errorRef = useRef();
  const featuredImageProgressRef = useRef();
  const produdctImageProgressRef = useRef();

  //state
  const [productPreviewImages, setProductPreviewImages] = useState([]);
  const [featuredPreviewImage, setFeaturedPreviewImage] = useState();
  const [featuredImage, setFeaturedImage] = useState();
  const [productImages, setProductImages] = useState([]);

  //hooks
  const { register, handleSubmit } = useForm();
  //handlers
  //image
  const featuredImageHandler = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFeaturedPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const productImagesHandler = (e) => {
    const file = e.target.files[0];
    setProductImages([...productImages, file]);
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductPreviewImages([...productPreviewImages, reader.result]);
    };
    reader.readAsDataURL(file);
  };
  const featuredImageDelete = () => {
    setFeaturedPreviewImage(false);
    setFeaturedImage(false);
  };
  const productImageDelete = (toDelte) => {
    const filteredImages = productPreviewImages.filter((_, index) => {
      if (index !== toDelte) return true;
    });
    console.log(filteredImages);
    setProductPreviewImages(filteredImages);
    setProductImages(filteredImages);
  };
  //API

  //create product
  async function sendData(data, e) {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        'api/v1/inventory/product-create/',
        data
      );
      console.log(response.data);
      successToast('Added successfuly');
      setPreviousData(response.data);
      history.push({
        pathname: `/admin/products/${response.data.id}/edit`,
        state: response.data,
      });
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
  //form
  const onSubmit = (data, e) => {
    data.delivery_info = CKEDITOR.instances.delivery_info.getData();
    data.description = CKEDITOR.instances.description.getData();
    console.log(data);

    //-------
    const formData = new FormData();
    featuredImage?.name.length &&
      formData.append('featured_image', featuredImage);
    productImages[0]?.name.length &&
      formData.append('product_image1', productImages[0]);
    productImages[1]?.name.length &&
      formData.append('product_image2', productImages[1]);
    productImages[2]?.name.length &&
      formData.append('product_image3', productImages[2]);
    formData.append('category', data.category || '');
    formData.append('brand', data.brand || '');
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('short_description', data.short_description);
    formData.append('awaiting_stock', data.awaiting_stock || 0);
    formData.append('stock', data.stock || 0);
    formData.append('on_hand', data.on_hand || 0);
    formData.append('committed', data.committed || 0);
    formData.append('available', data.available || 0);
    formData.append('sku', data.sku);
    formData.append('barcode', data.barcode);
    formData.append('is_active', data.is_active);
    formData.append('is_display', data.is_display);

    formData.append('option_values', data.option_values || '');
    formData.append('options', data.options || '');
    formData.append(
      'enable_enable_customer_note',
      data.enable_enable_customer_note
    );
    formData.append('is_featured', data.is_featured);
    formData.append('is_new', data.is_new);
    formData.append('store_only', data.store_only);
    formData.append('stock_control', data.stock_control);
    formData.append('is_require_documents', data.is_require_documents);
    formData.append('advance_price', data.advance_price || 0);
    formData.append(
      'auto_adjust_selling_price',
      data.auto_adjust_selling_price || 0
    );
    formData.append('price', data.price || 0);
    formData.append('weight', data.weight || 0);
    formData.append('unit', data.unit || 0);
    formData.append('on_sale', data.on_sale);
    formData.append('call_for_price', data.call_for_price);
    formData.append('delivery_info', data.delivery_info);
    formData.append('meta_title', data.meta_title);
    formData.append('meta_description', data.meta_description);
    formData.append('meta_keywords', data.meta_keywords);
    formData.append('value', data.value || '');

    console.log(formData);
    sendData(formData, e);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  useEffect(() => {
    CKEDITOR.replace('description');
    CKEDITOR.replace('delivery_info');
    setIsLoading(false);
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div
          className="alert alert-danger"
          ref={errorRef}
          role="alert"
          style={{ display: 'none' }}
        >
          <button
            type="button"
            className="btn-custom-close close pull-right"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <strong>Problem occured during creating a new product</strong>
        </div>
        <div
          className="alert alert-success"
          ref={successRef}
          role="alert"
          style={{ display: 'none' }}
        >
          <button
            type="button"
            className="btn-custom-close close pull-right"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <strong>Successfully created a new product</strong>
        </div>
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Add New Product</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/products/" className="btn btn-primary">
              <span className="mx-1">
                <FaGift />
              </span>
              All Products
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => {
                location.reload();
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb text-muted">
            <li className="breadcrumb-item">
              <Link to="/admin/index">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/products">Products</Link>
            </li>
            <li className="breadcrumb-item">Add New Product</li>
          </ol>
        </nav>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <div className="panel-container" style={{ marginTop: '0px' }}>
            <div className="panel-heading">
              <h4 className="panel-title">Product information</h4>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <label className="row-option-title required">
                    Product name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register('name', { required: true })}
                  />
                </div>
                <label>Product description</label>
                <textarea
                  rows="15"
                  id="description"
                  onChange={(e) => {
                    e.target.value;
                  }}
                  {...register('description')}
                ></textarea>
                <div className="form-group">
                  <label className="row-option-title">Short description</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    {...register('short_description')}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="row-option-title">
                    Product collections
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    className="form-control"
                    type="text"
                    placeholder="Select product collections..."
                  />
                </div>

                <div className="form-group">
                  <label className="row-option-title">Sku</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register('sku')}
                  />
                </div>
                <div className="form-group">
                  <label className="row-option-title">Barcode</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register('barcode')}
                  />
                </div>
                <div className="checkbox">
                  <label htmlFor="active">
                    <input
                      type="checkbox"
                      checked="checked"
                      {...register('is_active')}
                    />
                    Active
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="display">
                    <input
                      type="checkbox"
                      checked="checked"
                      {...register('is_display')}
                    />
                    Display
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="enable_customer_note">
                    <input
                      type="checkbox"
                      {...register('enable_customer_note')}
                    />
                    Enable customer note
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="featured">
                    <input
                      type="checkbox"
                      checked="checked"
                      {...register('is_featured')}
                    />
                    Featured
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="is_new">
                    <input type="checkbox" {...register('is_new')} />
                    New?
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="store_only">
                    <input type="checkbox" {...register('store_only')} />
                    Store only
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="stock_control">
                    <input type="checkbox" {...register('stock_control')} />
                    Stock control
                  </label>
                </div>
                <div className="checkbox">
                  <label htmlFor="require_docs">
                    <input
                      type="checkbox"
                      {...register('is_require_documents')}
                    />
                    Require documents
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel-heading">
              <h4 className="panel-title">Images</h4>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="file"
                    accept="image/*"
                    id="featuredImage"
                    onChange={(e) => {
                      featuredImageHandler(e);
                    }}
                  />
                  <label
                    id="upload-featured-image-button"
                    className="btn btn-link btn-upload"
                    htmlFor="featuredImage"
                  >
                    <b>Upload a featured image</b>
                  </label>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      {featuredPreviewImage && (
                        <div className="col-md-3">
                          <div className="thumbnail product-image">
                            <img src={featuredPreviewImage} />
                            <div className="after">
                              <div className="text-center">
                                <button
                                  className="btn btn-default btn-image-delete"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    featuredImageDelete();
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <hr />
                    <input
                      type="file"
                      accept="image/*"
                      id="productImage"
                      onChange={(e) => {
                        productImagesHandler(e);
                      }}
                    />
                    <label
                      id="upload-featured-image-button"
                      className="btn btn-link btn-upload"
                      htmlFor="productImage"
                    >
                      <b>Upload a product image</b>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      {productPreviewImages.map((product, index) => {
                        return (
                          <div className="col-md-3" key={index}>
                            <div className="thumbnail product-image">
                              <img src={product} />
                              <div className="after">
                                <div className="text-center">
                                  <button
                                    className="btn btn-default btn-image-delete"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      productImageDelete(index);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel-heading">
              <h4 className="panel-title">Price and Costs</h4>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="cost_price">
                      Cost price
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon">BDT </span>
                      <input
                        min="0"
                        step="0.01"
                        className="form-control"
                        type="number"
                        {...register('cost_price')}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="price">
                      Selling price
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon">BDT </span>
                      <input
                        min="0"
                        step="0.01"
                        className="form-control"
                        type="number"
                        {...register('price')}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      className="row-option-title"
                      htmlFor="compare_at_price"
                    >
                      Compare at price
                    </label>
                    <div className="input-group">
                      <span className="input-group-addon">BDT </span>
                      <input
                        min="0"
                        step="0.01"
                        className="form-control"
                        type="number"
                        {...register('compare_at_price')}
                      />
                    </div>
                    <span className="help-block">
                      This price will be displayed before selling price if the
                      product is on sale
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="tax">
                      Tax rate
                    </label>
                    <select className="form-control" {...register('tax')}>
                      <option value="">Please Select</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="weight">
                      Weight
                    </label>
                    <div className="input-group">
                      <input
                        min="0"
                        step="0.01"
                        className="form-control"
                        type="number"
                        {...register('weight')}
                      />
                      <span className="input-group-addon">Kg</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="unit">
                      Unit
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      name="product[unit]"
                      {...register('unit')}
                    />
                  </div>
                  <div className="checkbox">
                    <label htmlFor="on_sale">
                      <input type="checkbox" {...register('on_sale')} />
                      On sale
                    </label>
                  </div>
                  <div className="checkbox">
                    <label htmlFor="call_for_price">
                      <input type="checkbox" {...register('call_for_price')} />
                      Call for price
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel-heading">
              <h4 className="panel-title">
                Add product specifications (e.g. Model, Manufacturer, etc.)
              </h4>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive project-stats">
                    <table className="table" style={{ marginBottom: '0px' }}>
                      <thead>
                        <tr>
                          <th className="text-center">Attribute Name</th>
                          <th className="text-center">Attribute Value</th>
                          <th className="text-center">Searchable?</th>
                          <th className="text-center">Active?</th>
                          <th className="text-center col-md-1">Order</th>
                          <th className="text-center col-md-1">Remove</th>
                        </tr>
                      </thead>
                      <tbody id="attributes_table"></tbody>
                    </table>
                  </div>
                  <div className="pull-right">
                    <a
                      data-association-insertion-method="append"
                      className="btn btn-upload btn-upload"
                      href="#"
                    >
                      Add New Attribute
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel-heading">
              <h4 className="panel-title">
                Provide product specific delivery information
              </h4>
            </div>
            <div className="panel-body">
              <textarea
                rows="15"
                id="delivery_info"
                {...register('delivery_info')}
              ></textarea>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel-heading">
              <h4 className="row-option-title">
                Provide search engine optimization (SEO) information here
              </h4>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="meta_title">
                      Meta title
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register('meta_title')}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="row-option-title"
                      htmlFor="meta_description"
                    >
                      Meta description
                    </label>
                    <textarea
                      rows="6"
                      className="form-control"
                      {...register('meta_description')}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="meta_keywords">
                      Meta keywords
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register('meta_keywords')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary m-4 pull-right">
            Create New Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewProductPage;
