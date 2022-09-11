import './bulkorder.css';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


function BulkOrder() {
   const [inputFields, setInputFields] = useState([
      { name: '', age: '' }
   ])
   return (
      <div className="App main">
         <div className=" d-flex justify-content-between mt-5 ">
            <h3>Bulk Order</h3>
            <div>
              <Link to="/admin/orders/delivery"style={{textDecoration:'none'}} className="btn btn-outline-danger m-2">
                Import CSV
              </Link>
              <Link to="/admin/orders/delivery"style={{textDecoration:'none'}} className="btn btn-danger m-2">
                Download Sample CSV
              </Link>
               
              
            </div>
         </div>
            <div>
               <form>
               <div className="table_contain mt-4">

                  <table className = "">
                     <thead>
                        <tr>
                           <th>ItemType(*)</th>
                           <th>StoreName(*)</th>
                           <th>MerchantOrderId</th>
                           <th>RecipientName(*)</th>
                           <th>Recipientphone(*)</th>
                           <th>RecipientZone(*)</th>
                           <th>RecipientCity(*)</th>
                           <th>RecipientArea(*)</th>
                           <th>RecipientAddress(*)</th>
                           <th>AmountToCollect(*)</th>
                           <th>ItemQuantity(*)</th>
                           <th>ItemWeight(*)</th>
                           <th>ItemDesc</th>
                           <th>SpecialInstruction</th>
                        </tr>
                        </thead>
                        <tbody>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'    />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'   />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                           <tr>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 <td>
                                    <input name='name'     />
                                 </td>
                                 
                                 
                           </tr>
                        </tbody>
                     </table> 

                  </div>
                  <div className="form-submit-button-start mb-5 mt-3">
                     <button type="submit" className="btn btn-danger">
                        Confirm Orders 
                     </button>
                     <Link to="/admin/orders/delivery"style={{textDecoration:'none'}} className="btn btn-outline-danger m-2">Reset Table</Link>
                     <Link to="/admin/orders/delivery"style={{textDecoration:'none'}} className="btn btn-outline-gray m-2">Go To Error</Link>

                  </div>
               
               </form>
            </div>
         
        </div>
       
      );
}

export default BulkOrder;