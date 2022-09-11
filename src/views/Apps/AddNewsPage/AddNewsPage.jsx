import { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';

function AddNewsPage() {
  //state
  const [clickedStatus, setClickStatus] = useState(false);
  const [popupPreviewImages, setPopupImages] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //handlers
  const popupImageHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPopupImages([...popupPreviewImages, reader.result]);
    };
    reader.readAsDataURL(file);
  };
  const productImageDelete = (toDelte) => {
    const filteredImages = popupPreviewImages.filter((_, index) => {
      if (index !== toDelte) return true;
    });
    console.log(filteredImages);
    setPopupImages(filteredImages);
  };
  //----------API------START-------
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/dummy/');
      setData(response.data);
      setRawData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);

      setIsLoading(false);
    }
  }
  async function deleteData(id) {
    try {
      await axiosInstance.delete(
        `/api/v1/inventory/update-inventory-location/${id}/`
      );
      getData();
      successToast('Deleted successfuly');
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      console.error(err);
    }
  }
  //----------API------END-------
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <h1 className="page-title col-xs-12 col-md-6">Add News</h1>
        <div className="panel-container">
          <p className="row-option-title">News Settings</p>
          <div className="button-container px-3 mt-3">
            {!clickedStatus && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setClickStatus(!clickedStatus);
                }}
              >
                Enable News
              </button>
            )}
            {clickedStatus && (
              <button
                type="button"
                className="btn btn-primary mr-0"
                onClick={() => {
                  setClickStatus(!clickedStatus);
                }}
              >
                Disable News
              </button>
            )}
          </div>

          <div className="mb-3 px-3">
            <input
              type="file"
              accept="image/*"
              id="featuredImage"
              onChange={(e) => {
                popupImageHandler(e);
              }}
            />
            <label
              id="upload-featured-image-button"
              className="btn btn-link btn-upload"
              htmlFor="featuredImage"
            >
              <b>Upload Upto 3 Images</b>
            </label>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {popupPreviewImages.map((product, index) => {
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
  );
}

export default AddNewsPage;
