export const columns = [
  {
    Header: 'Order ID',
    accessor: 'order_id',
  },
  {
    Header: 'Customer',
    accessor: 'customer',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone_number',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Fulfilment',
    accessor: 'fulfilment',
  },
  {
    Header: 'Total',
    accessor: 'total_price',
  },
  {
    Header: 'Order Type',
    accessor: 'order_type',
  },
  {
    Header: 'Payment Method',
    accessor: 'payment_method',
  },
  {
    Header: 'Received at',
    accessor: 'received_at',
  },
];

export const data = [
  {
    id: 1,
    order_id: 'ORD-1',
    phone_number: '01712345678',
    status: 'Rejected',
    fulfilment: 'Not Fulfilled',
    total_price: 'BDT 1000.0',
    order_type: 'Manual Order',
    payment_method: 'Cash on delivery',
    received_at: 'Sep 20, 2021 at 02:14 PM',
  },
];
