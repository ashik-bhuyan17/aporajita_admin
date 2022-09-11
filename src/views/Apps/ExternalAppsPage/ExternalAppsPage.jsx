import { useEffect, useState } from 'react';
import {
  FaGoogle,
  FaFacebookSquare,
  FaRegChartBar,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import { AiFillWechat } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress';

function ExternalAppsPage() {
  //state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liveChatbuttonClickStatus, setLiveChatbuttonClickStatus] =
    useState(false);
  const [fbPixelButtonClickStatus, setFbPixelButton] = useState(false);
  const [googleAdsenseClickStatus, setGoogleAdsenseClickStatus] =
    useState(false);
  const [googleAnalyticsClickStatus, setGoogleAnalyticsClickStatus] =
    useState(false);
  const [orderPlacedFbPixelClickStatus, setOrderPlacedFbPixelClickStatus] =
    useState(false);
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

  //----------API------END-------
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <div>
            <h1 className="page-title col-xs-12 col-md-6">
              External Store Apps
            </h1>
          </div>
        </div>
        <div className="panel-container">
          <section className="mb-1">
            <div
              className="two-icon-button-container big-button primary"
              data-bs-toggle="collapse"
              data-bs-target="#LiveChat"
              aria-expanded="false"
              onClick={() => {
                setLiveChatbuttonClickStatus(!liveChatbuttonClickStatus);
              }}
            >
              <span className="icon-container">
                <AiFillWechat
                  style={{ width: '18px', height: 'auto', fontSize: '14px' }}
                />
              </span>
              <span className="button-title mx-3">Live Chat Integration</span>
              <span className="pull-right">
                {!liveChatbuttonClickStatus && (
                  <FaPlus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
                {liveChatbuttonClickStatus && (
                  <FaMinus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
              </span>
            </div>
            <div className="collapse form-floating m-3" id="LiveChat">
              <p className="row-option-title">
                Enter Code From Your Live Chat Provider
              </p>
              <textarea
                className="form-control"
                rows="4"
                id="livechat"
              ></textarea>
              <button className="btn btn-primary mt-4">Save</button>
            </div>
          </section>

          <section className="mb-1">
            <div
              className="two-icon-button-container big-button success my-2"
              data-bs-toggle="collapse"
              data-bs-target="#GoogleAnalytics"
              aria-expanded="false"
              onClick={() => {
                setGoogleAnalyticsClickStatus(!googleAnalyticsClickStatus);
              }}
            >
              <span className="icon-container">
                <FaRegChartBar
                  style={{ width: '14px', height: 'auto', fontSize: '14px' }}
                />
              </span>
              <span className="button-title mx-3">
                Google Analytics Integration
              </span>
              <span className="pull-right">
                {!googleAnalyticsClickStatus && (
                  <FaPlus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
                {googleAnalyticsClickStatus && (
                  <FaMinus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
              </span>
            </div>
            <div className="collapse form-floating m-3" id="GoogleAnalytics">
              <p className="row-option-title">
                Enter Your Google Analytics Code
              </p>
              <textarea
                className="form-control"
                id="googleAnalytics"
                rows="4"
              ></textarea>
              <button className="btn btn-primary mt-4">Save</button>
            </div>
          </section>

          <section className="mb-1">
            <div
              className="two-icon-button-container big-button danger"
              data-bs-toggle="collapse"
              data-bs-target="#GoogleAdsense"
              aria-expanded="false"
              onClick={() => {
                setGoogleAdsenseClickStatus(!googleAdsenseClickStatus);
              }}
            >
              <span className="icon-container">
                <FaGoogle
                  style={{ width: '14px', height: 'auto', fontSize: '14px' }}
                />
              </span>
              <span className="button-title mx-3">
                Google Adsense Integration
              </span>
              <span className="pull-right">
                {!googleAdsenseClickStatus && (
                  <FaPlus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
                {googleAdsenseClickStatus && (
                  <FaMinus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
              </span>
            </div>
            <div className="collapse form-floating m-3" id="GoogleAdsense">
              <p className="row-option-title">Enter Your Google Adsense Code</p>
              <textarea
                className="form-control"
                rows="4"
                id="googleAdsense"
              ></textarea>
              <button className="btn btn-primary mt-4">Save</button>
            </div>
          </section>

          <section className="mb-1">
            <div
              className="two-icon-button-container big-button info"
              data-bs-toggle="collapse"
              data-bs-target="#FacebookPixel"
              aria-expanded="false"
              onClick={() => {
                setFbPixelButton(!fbPixelButtonClickStatus);
              }}
            >
              <span className="icon-container">
                <FaFacebookSquare
                  style={{ width: '14px', height: 'auto', fontSize: '14px' }}
                />
              </span>
              <span className="button-title mx-3">
                Facebook Pixel Integration
              </span>
              <span className="pull-right">
                {!fbPixelButtonClickStatus && (
                  <FaPlus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
                {fbPixelButtonClickStatus && (
                  <FaMinus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
              </span>
            </div>
            <div className="collapse form-floating m-3" id="FacebookPixel">
              <p className="row-option-title">Enter Code For Facebook Pixel</p>
              <textarea
                className="form-control"
                rows="4"
                id="facebookPixel"
              ></textarea>
              <button className="btn btn-primary mt-4">Save</button>
            </div>
          </section>

          <section className="mb-1">
            <div
              className="two-icon-button-container big-button primary"
              data-bs-toggle="collapse"
              data-bs-target="#OrderedFBPixel"
              aria-expanded="false"
              onClick={() => {
                setOrderPlacedFbPixelClickStatus(
                  !orderPlacedFbPixelClickStatus
                );
              }}
            >
              <span className="icon-container">
                <FaFacebookSquare
                  style={{ width: '14px', height: 'auto', fontSize: '14px' }}
                />
              </span>
              <span className="button-title mx-3">
                Order Placed Facebook Pixel Integration
              </span>
              <span className="pull-right">
                {!orderPlacedFbPixelClickStatus && (
                  <FaPlus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
                {orderPlacedFbPixelClickStatus && (
                  <FaMinus
                    style={{
                      width: '16px',
                      height: '15px',
                      strokeWidth: '20px',
                    }}
                  />
                )}
              </span>
            </div>
            <div className="collapse form-floating m-3" id="OrderedFBPixel">
              <p className="row-option-title">
                Enter Code For Order Placed Facebook Pixel
              </p>
              <textarea
                className="form-control"
                rows="4"
                id="orderedFBPixel"
              ></textarea>
              <button className="btn btn-primary mt-4">Save</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ExternalAppsPage;
