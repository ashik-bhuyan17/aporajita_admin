/* eslint-disable */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { errorToast} from '../../../helpers/toast';
import axiosInstance from '../../../helpers/axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
 
 
function PathaoDelivery(){
   
   //states
   const [isLoading, setIsLoading] = useState(true);
   const [orderList, setOrderList] = useState([]);
   const { register , handleSubmit } = useForm();
 
   //selection states
   
   const [selectedOrder, setSelectedOrder] = useState({
     fullname: '',
     phone: '',
      
   });
   
   //select handlers
   const initalizeOrderOptions = (order) => {
     const selectOptions = order.map((data) => {
       return {
         ...data,
         value: data.id,
         label: `order id: ${data.order_id}  order Type: ${data.order_type} Name: ${data.fullname}   Phone: ${data.phone}`,
       };
     });
     return selectOptions;
   };
   
   const orderSelectHandler = (event) => {
     event.name = event.first_name + ' ' + event.last_name;
     console.log(event);
     setSelectedOrder(event);
   };
  
   //forms handlers
  const onSubmit = (data) => {
    console.log(data);
    saveData(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };
 
   //initialize select
   const orderOptions = initalizeOrderOptions(orderList);
   //----------API START-------
  
   async function getOrderData() {
     try {
       const response = await axiosInstance.get(
         '/api/v1/order/'
       );
       setOrderList(response.data);
       console.log(response.data);
       setIsLoading(false);
     } catch (err) {
       errorToast('Error on loading data!, Please try again.');
       console.error(err);
       setIsLoading(false);
     }
   }
   
   useEffect(() => {
     getOrderData();
   }, []);

 
  //API
  async function saveData(data) {
    setIsLoading(true);
    data.recipient_phone = selectedOrder.phone;
    data.recipient_name = selectedOrder.fullname;
    data.recipient_zone = selectedzone.zone_id
    data.recipient_area = selectedarea.area_id
    data.recipient_city = selectedcity.city_id

    
    console.log(data) 
    try {
      await axiosInstance.post('/api/v1/order/pathao/order/',data);
      successToast('successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }

//Deleivari area


 //states
 const [areaList, setAreaList] = useState([]);
 const [cityList, setCityList] = useState([]);
 const [zoneList, setZoneList] = useState([]);
console.log(zoneList)
 //selection states
 
 const [selectedarea, setSelectedArea] = useState({
   area_name: '',
    
 });
 const [selectedcity, setSelectedCity] = useState({
  city_name: '',
   
});
const [selectedzone, setSelectedZone] = useState({
  zone_name: '',
   
});


 
 //select handlers
 
 const initalizeAreaOptions = (area) => {
   const selectOptions = area?.data?.data?.map((data) => {
     return {
       ...data,
       value: data.area_id,
       label: `${data.area_name}`,
     };
   });
   return selectOptions;
 };
 
 const areaSelectHandler = (event) => {
   event.area_name = event.area_name ;
   console.log(event);
   setSelectedArea(event);
 };


//city
const initalizeCityOptions = (city) => {
  const selectOptions = city?.data?.data?.map((data) => {
    return {
      ...data,
      value: data.city_id,
      label: `${data.city_name}`,
    };
  });
  return selectOptions;
};

const citySelectHandler = (event) => {
  console.log(event)
  getZone(event.city_id)
  console.log(event);
  setSelectedCity(event);
};

//zone 
const initalizeZoneOptions = (zone) => {
 
  const selectOptions = zone?.data?.data?.map((data) => {
   
    return {
      
      ...data,
      value: data.zone_id,
      label: `${data.zone_name}`,
    };
  });

  return selectOptions;
 
};

const zoneSelectHandler = (event) => {
  getArea(event.zone_id)
  setSelectedZone(event);
};




 //initialize select
 const cityOptions = initalizeCityOptions(cityList);

 
 //----------API START-------

 //city
  async function getCityData() {
    try {
      const response = await axiosInstance.get(
        '/api/v1/order/pathao/city/'
      );
      setCityList(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }

  //Zone
  async function getZone(city_id) {
    setIsLoading(true);
    try {
     const response = await   axiosInstance.post('/api/v1/order/pathao/zone/',{city_id});
     setZoneList(initalizeZoneOptions(response.data))
     console.log(initalizeZoneOptions(response.data))
   
      successToast('successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }
  

  //area
  async function getArea(zone_id) {
    setIsLoading(true);
    try {
     const response = await   axiosInstance.post('/api/v1/order/pathao/area/',{zone_id});
     setAreaList(initalizeAreaOptions(response.data))
     console.log(initalizeAreaOptions(response.data))
   
      successToast('successfuly');
      setIsLoading(false);
    } catch (err) {
      errorToast('Error occured!, Please try again.');
      setIsLoading(false);
    }
  }
  

  useEffect(() => {
    getCityData();
  }, []);



  

  return (
    <div className='main'>
      <div className='row'>
        <div className="col-xs-12 col-md-8 bg-white formLeft shadow"> 
          <div className=" d-flex justify-content-between mt-5 ">
            <h3>New Delivery</h3>
            <div>
              <Link to="/admin/orders/delivery"style={{textDecoration:'none'}} className="btn btn-danger m-2">
                Create Delivery Link
              </Link>
              <Link to="/admin/orders/bulk-order"style={{textDecoration:'none'}} className="btn btn-outline-danger m-2 ">
                Bulk Order
              </Link>
              <Link to="/admin/orders/delivery"style={{textDecoration:'none'}} className="btn btn-outline-danger m-2">
                Partial
              </Link>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <div className= "row mt-4">
              <div className="col-xs-12 col-md-12">
                <label className="form-label row-option-title">Order Item</label>
                <Select
                options={orderOptions}
                placeholder=""
                onChange={orderSelectHandler}
                classNamePrefix="react-select-new-order"
              />
              </div>
            </div>
            <div className= "row mt-4">
              <div className="col-xs-12 col-md-4">
                <label className="form-label row-option-title">Store</label>
                <select
                  className="form-select"
                  aria-label="dropdown"
                  name = "store_id"
                  {...register('store_id')}
                >
                  <option value="1">Aporajita Tumi</option>
                </select>
              </div>
              <div className="col-xs-12 col-md-4">
                <label className="form-label row-option-title">Product Type</label>
                <select
                  className="form-select"
                  aria-label="dropdown"
                  name = "item_type"
                  {...register('item_type')}
                >
                  <option value="1">Parcel</option>
                  <option value="2">Doccument</option>
                  <option value="3">Fragile</option>
                </select>
              </div>
              <div className=" col-xs-12 col-md-4">
                <label className="form-label row-option-title">Merchant Order ID </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Type id (optional)'
                  name = "merchant_order_id"
                  {...register('merchant_order_id')}
                />
              </div>
            </div>

            <div className ="row mt-3">
              <div className=" col-xs-12 col-md-8">
                <h4>Recipient Details</h4>

                <div className="mt-3 col-12">
                  <label className="form-label row-option-title">Recipient’s Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder = 'Enter Phone Number'
                    {...register('recipient_phone')}
                    value={selectedOrder.phone}
                    onChange={(e) => {
                      setSelectedOrder({
                        ...selectedOrder,
                        recipient_phone: e.target.value,
                      });
                    }}
                    
                    
                  />
                </div>

                <div className="mt-3 col-12">
                  <label className="form-label row-option-title">Recipient’s Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder = 'Type Name'
                    {...register('recipient_name')}
                    value={selectedOrder.fullname}
                    onChange={(e) => {
                      setSelectedOrder({
                        ...selectedOrder,
                        recipient_name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className= "row mt-4">
                  <div className="col-xs-12 col-md-4">
                    <label className="form-label row-option-title">Delivery Area</label>
                    <Select
                      options={cityOptions}
                      placeholder="City"
                      onChange={citySelectHandler}
                      classNamePrefix="react-select-new-city"
                                
                    />
                  </div>
                  <div className="col-xs-12 col-md-4">
                    <label className="form-label row-option-title"></label>
                    <Select
                      options={zoneList}
                      placeholder="Zone"
                      onChange={zoneSelectHandler}
                      classNamePrefix="react-select-new-Zone"
                     
                    />
                  </div>
                  <div className="col-xs-12 col-md-4">
                    <label className="form-label row-option-title"></label>
                    <Select
                      options={areaList}
                      placeholder="Area"
                      onChange={areaSelectHandler}
                      classNamePrefix="react-select-new-area"

                    />
                  </div>
                </div>


                <div className="mt-3 col-12">
                  <label className="form-label row-option-title">Recipient’s Address</label>
                  <textarea
                    type="number"
                    className="form-control"
                    placeholder = 'Enter Full Address'
                    name = "recipient_address"
                    {...register('recipient_address')}
                  />
                </div>

              </div>

              <div className=" col-xs-12 col-md-4">
                <h4>Delivery Details</h4>

                <div className="col-12 mt-3">
                  <label className="form-label row-option-title">Delivery Type </label>
                  <select
                    className="form-select"
                    aria-label="dropdown"
                    name = "delivery_type"
                    {...register('delivery_type')}
                  >
                    <option value="48">Normal Delivery</option>
                    <option value="12">Same Day Delivery</option>
                  </select>
                </div>

                <div className= "row mt-3">
                  <div className="col-xs-12 col-md-6">
                    <label className="form-label row-option-title">Total Weight </label>
                    <select
                      className="form-select"
                      aria-label="dropdown"
                      name = "item_weight"
                      {...register('item_weight')}
                    >
                      <option value="1">0-0.5</option>
                      <option value="2">0.5-1</option>
                      <option value="3">1-1.5</option>
                      <option value="4">1.5-2</option>
                      <option value="5">2-2.5</option>
                      <option value="6">2.5-3</option>
                    </select>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <label className="form-label row-option-title">Quantity </label>
                    <input
                    type="number"
                    className="form-control"
                    placeholder = 'Quantity'
                    name = "item_quantity"
                    {...register('item_quantity')}
                    
                  />                    
                      
                  </div>
                </div>

                <div className="mt-3 col-12">
                  <label className="form-label row-option-title">Amount to Collect </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder = 'Enter Amount in BDT'
                    name = "amount_to_collect"
                    {...register('amount_to_collect')}
                    
                  />
                </div>
                <div className="mt-3 col-12">
                  <label className="form-label row-option-title">Item Description & Price</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder = 'type items name & their price'
                    name = "item_description"
                    {...register('item_description')}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 col-12 mb-5">
              <label className="form-label row-option-title">Special Instructions </label>
              <textarea
                type="text"
                className="form-control"
                placeholder = 'Type Here'
                name = "special_instruction"
                {...register('special_instruction')}
              />
            </div>

            <div className="form-submit-button-start mb-5">
              <button type="submit" className="btn btn-danger">
                Save 
              </button>
              <Link to="/admin/orders/delivery"style={{textDecoration:'none'}} className="btn btn-outline-danger m-2">cancel</Link>
            </div>


          </form>
          


        </div>

        <div className="col-xs-12 col-md-4 bg-white formLeft shadow">
        <div className='mb-1 mt-5'>
          <h4>Cost Of Delevery</h4>

          <div className ='d-flex justify-content-between mt-3'>
          <p>Delivery Fee</p>
            <p>$60</p>
          </div>
          <div className ='d-flex justify-content-between'>
          <p>COD Fee</p>
            <p>$0</p>
          </div>
          <div className ='d-flex justify-content-between'>
            <p>Discount</p>
            <p>$0</p>
          </div>
          <div className ='d-flex justify-content-between'>
            <p>Promo Discount</p>
            <p>$0</p>
          </div>
          <div className ='d-flex justify-content-between'>
            <p>Additional Charge</p>
            <p>$0</p>
          </div>
          <div className ='d-flex justify-content-between'>
            <p>Compansation Cost</p>
            <p>$0</p>
          </div>
          <div className ='totalCount d-flex justify-content-between'>
            <h5>Total Cost</h5>
            <h5>$60</h5>

          </div>
          <div className="mt-3">
          <p>

            Cost might vary depending upon the delivery situations and other circumstances.<br></br><br></br>
            For details: <Link to="/admin/orders/delivery"style={{color:'red'}}>
             Check the Pricing Plan</Link><br></br><br></br>
            ** Pickup Last Entry Time 4 pm<br></br><br></br>
            ** On Demand / Express / Fragile Last Entry Time 12:30 pm, Maximum size of any product should not be over 2CFT (In general)<br></br><br></br>
            ** Use Fragile Type for Cosmetics, Liquide grocery, Herbals, Gift Items,Electronic gadgets, Lights , Glass items, Food items (dry)<br></br><br></br>
            ** Use Express Delivery Inside Dhaka (2-3 hours) for Cooked Foods and other emergency delivery<br></br><br></br>
            ** Inside Dhaka Normal Delivery will take 24-48 hours, On Demand & Fragile take 8 hours, Out Side Dhaka it may take 3-5 days<br></br><br></br>
          </p>
            
          </div>




        </div>

        
      </div>

    </div>

  </div>
  )
}
export default PathaoDelivery;
