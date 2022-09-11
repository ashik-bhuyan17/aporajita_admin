export const columns = [
  {
    Header: 'Sale',
    accessor: 'id',
  },
  {
    Header: 'Source',
    accessor: 'Order_reference',
  },
  {
    Header: 'Outlet',
    accessor: 'outlet',
  },
  {
    Header: 'Customer',
    accessor: 'fullname',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Payment Status',
    accessor: 'payment_status',
  },
  {
    Header: 'Total Price',
    accessor: 'order_total',
  },
  {
    Header: 'Created Date',
    accessor: 'created',
  },
];

export const data = [
  {
    id: 1,
    sale: 'S-1',
    source: 'In Store',
    outlet: 'Dhanmondi Main Outlet',
    customer: 'Shuvo',
    status: 'Completed',
    payment_status: 'Paid',
    total_price: 'BDT 1000.0',
    created_date: 'Sep 20, 2021 at 02:54 PM',
  },
];
