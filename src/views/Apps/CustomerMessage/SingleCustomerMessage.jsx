/* eslint-disable */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { errorToast} from '../../../helpers/toast';
import axiosInstance from '../../../helpers/axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Singlecustomermessage() {
    //states
    const [isLoading, setIsLoading] = useState(true);
    const [customerList, setCustomerList] = useState([]);
    const [deliveryAreaList, setDeliveryAreaList] = useState();
    const [smsCheckbox, setSMSCheckbox] = useState(true);
    const { register , handleSubmit } = useForm();
  
    //selection states
    
    const [selectedCustomer, setSelectedCustomer] = useState({
      name: '',
      phone: '',
       
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
      event.name = event.first_name + ' ' + event.last_name;
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
    console.log("customeroption")
   
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
    data.mobile = selectedCustomer.phone;
    console.log(data)
      
    try {
      await axiosInstance.post('/api/v1/order/adn-sms/send-single-sms/',data);

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
            <div className="mb-3">
              <label className="form-label row-option-title">Customer</label>
              <Select
                options={customerOptions}
                placeholder=""
                onChange={customerSelectHandler}
                classNamePrefix="react-select-new-order"
              />
            </div>
            <div className="mb-3">
              <label className="form-label row-option-title">Message</label>
                <textarea
                    type="text"
                    className="form-control"
                    name = "message"
                    placeholder = 'Write Message'
                    {...register('message')} 
                  />
            </div>
            <button  className="btn btn-primary"  type="submit">
             Send
             </button>
          </form>     
        </div>  
      </div>  
    );
}

export default Singlecustomermessage;
