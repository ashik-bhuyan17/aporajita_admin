import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

import { errorToast, successToast } from '../../../helpers/toast';
import axiosInstance from '../../../helpers/axios';

function AddNewProductBrandPage() {
  //state
  const [brandImage1, setBrandImage1] = useState();
  const [brandImage2, setBrandImage2] = useState();

  //hooks
  const { register, handleSubmit } = useForm();
  //API
  //create product
  async function sendData(formdata, e) {
    console.log(formdata);
    try {
      await axiosInstance.post('api/v1/inventory/brands/', formdata);
      successToast('Created successfuly');
      e.target.reset();
    } catch (err) {
      errorToast('Error Occured');
      console.error(err);
    }
  }
  //form
  const onSubmit = (data, e) => {
    console.log(data);
    let formdata = new FormData();
    formdata.append('brand_image', brandImage1);
    formdata.append('brand_image2', brandImage2);
    formdata.append('name', data.name);
    formdata.append('description', data.description);
    formdata.append('meta_title', data.meta_title);
    formdata.append('meta_keywords', data.keywords);
    formdata.append('meta_description', data.meta_description);
    sendData(formdata, e);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            Add New Product Brand
          </h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/products/" className="btn btn-primary">
              <span className="mx-1">
                <FaGift />
              </span>
              All Product Brands
            </Link>
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
            <li className="breadcrumb-item" to="/admin/brands">
              <Link to="/admin/brands">Product Brands</Link>
            </li>
            <li className="breadcrumb-item">Add New Brand</li>
          </ol>
        </nav>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <div className="panel-container">
            <div className="panel-heading">
              <h4 className="row-option-title">
                Provide Product Brand information
              </h4>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      {...register('name')}
                    />
                  </div>
                  <div className="form-group">
                    <label className="row-option-title" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      rows="6"
                      className="form-control"
                      {...register('description')}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="row-option-title" htmlFor="image_for_brand">
                    Upload an image for this brand
                  </label>
                  <input
                    className="form-control d-block"
                    type="file"
                    onChange={() => {
                      setBrandImage1(e.target.files[0]);
                    }}
                    {...register('image_for_brand')}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label
                    className="row-option-title"
                    htmlFor="image_for_brand2"
                  >
                    Upload another image for this brand
                  </label>
                  <input
                    className="form-control d-block"
                    type="file"
                    onChange={() => {
                      setBrandImage2(e.target.files[0]);
                    }}
                    {...register('image_for_brand2')}
                  />
                </div>
              </div>
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

          <button type="submit" className="btn btn-primary my-2 pull-left">
            Create New Product Brand
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewProductBrandPage;
