import HighChartsViz from './HighChartsViz';
import vizData from './demoData';
import { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/axios';

function GridView() {
  const [salesVizData, setSalesVizData] = useState({
    total: 0,
    data: [],
  });
  const [ordersVizData, setOrdersVizData] = useState({
    total: 0,
    data: [],
  });
  const [paymentsVizData, setPaymentsVizData] = useState({
    total: 0,
    data: [],
  });
  const [discountsVizData, setDiscountsVizData] = useState({
    total: 0,
    data: [],
  });
  const [customersVizData, setCustomersVizData] = useState({
    total: 0,
    data: [],
  });
  const [messagesVizData, setMessagesVizData] = useState({
    total: 0,
    data: [],
  });
  const [topPorductsVizData, setTopProductsVizData] = useState({
    total: 0,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const vizDataShaper = async (givenData) => {
    const reshapedAMData = [
      {
        name: '01 AM',
        y: 0,
      },
      {
        name: '02 AM',
        y: 0,
      },
      {
        name: '03 AM',
        y: 0,
      },
      {
        name: '04 AM',
        y: 0,
      },
      {
        name: '05 AM',
        y: 0,
      },
      {
        name: '06 AM',
        y: 0,
      },
      {
        name: '07 AM',
        y: 0,
      },
      {
        name: '08 AM',
        y: 0,
      },
      {
        name: '09 AM',
        y: 0,
      },
      {
        name: '10 AM',
        y: 0,
      },
      {
        name: '11 AM',
        y: 0,
      },
      {
        name: '12 AM',
        y: 0,
      },
    ];
    const reshapedPMData = [
      {
        name: '01 PM',
        y: 0,
      },
      {
        name: '02 PM',
        y: 0,
      },
      {
        name: '03 PM',
        y: 0,
      },
      {
        name: '04 PM',
        y: 0,
      },
      {
        name: '05 PM',
        y: 0,
      },
      {
        name: '06 PM',
        y: 0,
      },
      {
        name: '07 PM',
        y: 0,
      },
      {
        name: '08 PM',
        y: 0,
      },
      {
        name: '09 PM',
        y: 0,
      },
      {
        name: '10 PM',
        y: 0,
      },
      {
        name: '11 PM',
        y: 0,
      },
      {
        name: '12 PM',
        y: 0,
      },
    ];
    for (let i = 0; i < givenData.am.length; i++) {
      const index = Number(givenData.am[i].name.substr(0, 2));
      console.log(reshapedAMData[index - 1], givenData.am[i]);
      reshapedAMData[index - 1].y = Number(givenData.am[i].y);
    }
    reshapedAMData.unshift(reshapedAMData.pop());
    console.log(reshapedAMData);
    for (let i = 0; i < givenData.pm.length; i++) {
      const index = Number(givenData.pm[i].name.substr(0, 2));
      console.log(reshapedPMData[index - 1], givenData.pm[i]);
      reshapedPMData[index - 1].y = Number(givenData.pm[i].y);
    }
    reshapedPMData.unshift(reshapedPMData.pop());
    console.log(reshapedPMData);
    let data = [...reshapedAMData, ...reshapedPMData];
    const firstHalf = data.slice(0, 6);
    const secondHalf = data.slice(6);
    console.log(firstHalf, secondHalf);
    data = [...secondHalf, ...firstHalf];
    console.log(data);
    return data;
  };

  //API
  async function getData(type) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `api/v1/inventory/dashboard/?param=${type}`
      );
      console.log(response.data);
      const data = await vizDataShaper(response.data);
      type === 'sales' &&
        setSalesVizData({
          total: response.data.total,
          data,
        });
      type === 'orders' &&
        setOrdersVizData({
          total: response.data.total,
          data,
        });
      type === 'payments' &&
        setPaymentsVizData({
          total: response.data.total,
          data,
        });
      type === 'discounts' &&
        setDiscountsVizData({
          total: response.data.total,
          data,
        });
      type === 'customers' &&
        setCustomersVizData({
          total: response.data.total,
          data,
        });
      type === 'messages' &&
        setMessagesVizData({
          total: response.data.total,
          data,
        });

      setIsLoading(false);
    } catch (err) {
      errorToast('An error occured');
      console.error(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData('sales');
    getData('orders');
    getData('payments');
    getData('discounts');
    getData('customers');
    getData('messages');
  }, []);
  return (
    <div className="row mt-3">
      <div className="col-xs-12 col-md-3 mb-3">
        <HighChartsViz
          vizID="TotalSales"
          vizData={salesVizData.data}
          colLeft="Total Sales"
          colRightLink="/admin/reports/sales-over-time"
          infoBox={{ title: 'BDT', value: salesVizData.total }}
        />
      </div>
      <div className="col-xs-12 col-md-3 mb-3">
        <HighChartsViz
          vizID="OrdersCount"
          vizData={ordersVizData.data}
          colLeft="Orders Count"
          colRightLink="/admin/orders"
          infoBox={{ title: '', value: ordersVizData.total }}
        />
      </div>
      <div className="col-xs-12 col-md-3 mb-3">
        <HighChartsViz
          vizID="Gross Profit"
          vizData={[]}
          colLeft="Gross Profit"
          colRightLink="/admin/orders"
          infoBox={{ title: 'BDT', value: '0.0' }}
        />
      </div>
      <div className="col-xs-12 col-md-3 mb-3">
        <HighChartsViz
          vizID="TotalPayments"
          vizData={paymentsVizData.data}
          colLeft="Total Payments"
          colRightLink="/admin/reports/payments-over-time"
          infoBox={{ title: 'BDT', value: paymentsVizData.total }}
        />
      </div>
      <div className="col-xs-12 col-md-3 mb-3">
        <HighChartsViz
          vizID="Discounts"
          vizData={discountsVizData.data}
          colLeft="Discounts"
          colRightLink="/admin/reports/sales-by-discount"
          infoBox={{ title: 'BDT', value: discountsVizData.total }}
        />
      </div>
      <div className="col-xs-12 col-md-3 mb-3">
        <HighChartsViz
          vizID="Visitors"
          vizData={[]}
          colLeft="Total Visitors"
          colRightLink="/admin/reports/visitor-report"
          infoBox={{ title: '', value: '0' }}
        />
      </div>
      <div className="col-xs-12 col-md-3">
        <HighChartsViz
          vizID="CustomersCount"
          vizData={customersVizData.data}
          colLeft="Customers Count"
          colRightLink="/admin/customers"
          infoBox={{ title: '', value: customersVizData.total }}
        />
      </div>
      <div className="col-xs-12 col-3">
        <HighChartsViz
          vizID="CustomersMessages"
          vizData={messagesVizData.data}
          colLeft="Customers Messages"
          colRightLink="/admin/reports/customer-message-report"
          infoBox={{ title: '', value: messagesVizData.total }}
        />
      </div>
    </div>
  );
}

export default GridView;
