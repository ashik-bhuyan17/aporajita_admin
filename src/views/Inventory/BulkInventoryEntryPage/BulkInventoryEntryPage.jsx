import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from '../../../helpers/axios';
import { errorToast, successToast } from '../../../helpers/toast.js';
import Progress from '../../../components/loading/Progress.jsx';
import BulkInventoryEntryTable from '../../../components/table/SpecificPage/Inventory/BulkInventoryEntryTable';
import { columns, columnOptions } from './demoData';
import BulkInventoryEntryTableCopy from '../../../components/table/SpecificPage/Inventory/BulkInventoryEntryTable copy';

function BulkInventoryEntryPage() {
  //state
  const [data, setData] = useState([]);
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //handlers
  function makeReadyVariantData(data) {
    const modifiedVariants = [];
    for (let i = 0; i < data.length; i++) {
      const current = data[i].variant;
      for (let j = 0; j < current.length; j++) {
        modifiedVariants.push({
          productId: data[i].id,
          ...current[j],
          // name: data[i].name,
        });
      }
    }
    setVariants(modifiedVariants);
  }
  //API
  async function getData() {
    try {
      const response = await axiosInstance.get('api/v1/inventory/products/');
      setData(response.data);
      console.log('data1',data)
      makeReadyVariantData(response.data);
      setIsLoading(false);
    } catch (err) {
      errorToast('Error on loading data!, Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  }
  //----------API------END-------

  useEffect(() => {
    //API
    getData();
  }, []);
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <ToastContainer />
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">
            Bulk Inventory Entry
          </h1>
        </div>
        <div className="panel-container">
          {data.length > 0 ? (
           console.log("datadgddddd",columnOptions),
    
            <BulkInventoryEntryTable
              tableHeader={columns}
              tableData={data}
              tableVariants={variants}
              tableFor="product(s)"
              columnOptions={columnOptions}
            />
          ) : (
 
            <BulkInventoryEntryTableCopy
              tableHeader={columns}
              tableData={data}
              tableVariants={variants}
              tableFor="product(s)"
              columnOptions={columnOptions} 
            
            />
            
          )}
        </div>
      </div>
    </div>
  );
}

export default BulkInventoryEntryPage;
