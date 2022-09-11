/* eslint-disable */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { errorToast} from '../../../helpers/toast';
import axiosInstance from '../../../helpers/axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
 
 
function MultiCustomerMessage() {
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const { register , handleSubmit } = useForm();


  //selection states
  
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: '',
    mobile: '',
     
  });
  
  //select handlers
  const initalizeCustomerOptions = (customers) => {
    const selectOptions = customers.map((data) => {
      return {
        ...data,
        value: data.id,
        label: `Name: ${data.first_name} ${data.last_name} Phone: ${data.phone}`,
      };
    });
    return selectOptions;
  };
  
  const customerSelectHandler = (event) => {
    console.log(event);
    setSelectedCustomer(event);
  };
 
  //forms handlers
  const onSubmit = (data) => {
    console.log(data);
    sendData(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.prevent.Default();
    }
  };

  //initialize select
  const customerOptions = initalizeCustomerOptions(customerList);
  //----------API START-------
 
  async function getCustomerData() {
    try {
      const response = await axiosInstance.get(
        'api/v1/customer/customer-profile-list/'
      );
      setCustomerList(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
 
  useEffect(() => {
    getCustomerData();
  }, []);


  async function sendData(data) {
    setIsLoading(true);
    data.mobile = ""
    for(var i =0;i<selectedCustomer.length ; i++ ){
      data.mobile+=  selectedCustomer[i].phone+",";

      

    }

    console.log(data)  
    try {
      await axiosInstance.post('/api/v1/order/adn-sms/send-multi-sms/',data);
      setIsLoading(false);
      e.target.reset();
      console.log("razzak")
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      setIsLoading(false);
    }
  }
  
   
  return (
    <div className='main'>
      <div className="page-title col-xs-12 col-md-6 ">
          <Link to="/admin/apps/multi-message" style={{textDecoration:'none'}} className="btn btn-primary">
              Multi Message
          </Link>
          <Link to="/admin/apps/single-message"style={{textDecoration:'none'}} className="btn btn-info ">
              single Message
          </Link>
          
      </div>
      <div className="col-12  header ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        
        >
          <div className="mb-3" controlId="formBasicEmail">
            <label className="form-label row-option-title required">Customer</label>
              <Select className="dropbox"
                options={customerOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{customerOptions}}
                onChange={customerSelectHandler}
                allowSelectAll={true}            
              />
          </div>
          <div className="mb-3">
            <label className="form-label row-option-title required">Campaign Title</label>
            <input
            type="text"
            className="form-control"
             name = "campaign_title"
            placeholder = 'Write Title'
            {...register('campaign_title')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label row-option-title required">Message</label>
            <textarea
            type="text"
            className="form-control"
             name = "message"
            placeholder = 'Write Message'
            {...register('message')}
            />
          </div>
          <div className="mb-3">
            <input
            type="checkbox"
            className="form-check-input"
            value = '1'
             name = "isPromotional"
            placeholder = ''
            {...register('isPromotional')}
            
            />
            <label className="form-label row-option-title required">Is Promotional</label>
          </div>
          <button  className="btn btn-primary"  type="submit">
             Send
          </button>
        </form>     
      </div>  
    </div>  
  );
}

export default MultiCustomerMessage;
