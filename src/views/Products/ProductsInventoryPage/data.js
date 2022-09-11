export const columns = [
  {
    Header: 'Image',
    accessor: 'featured_image',
  },
  {
    Header: 'Product Name',
    accessor: 'name',
  },
  {
    Header: 'Variant Options',
    accessor: 'variant_options',
  },
  {
    Header: 'On Hand',
    accessor: 'on_hand',
  },
  {
    Header: 'Commited',
    accessor: 'commited',
  },
  {
    Header: 'Available to Sell',
    accessor: 'available_to_sell',
  },
  {
    Header: 'Add New',
    accessor: 'add_new',
  },
  {
    Header: 'Details',
    accessor: 'details',
  },
];

export const data = [
  {
    id: 1,
    name: 'Aarong Cotton Pant',
    featured_image: 'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
    on_hand: '27',
    commited: '-3',
    available_to_sell: '30',
  },
  {
    id: 2,
    product_name: 'Raffel Dupatta White',
    imageURL: 'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
    on_hand: '14',
    commited: '-5',
    available_to_sell: '19',
  },
];

export const variants = [
  {
    productId: 1,
    id: 1, size: 38, selling_price: '1000.00', on_hand: '9', commited: '-1', available_to_sell: '10'
  },
  {
    productId: 1,
    id: 2, size: 40, selling_price: '1000.00', on_hand: '9', commited: '-1', available_to_sell: '10'
  },
  {
    productId: 1,
    id: 3, size: 42, selling_price: '1000.00', on_hand: '9', commited: '-1', available_to_sell: '10'
  },
  {
    productId: 2,
    id: 2, size: 40, selling_price: '1400.00', on_hand: '2', commited: '-2', available_to_sell: '4'
  },
  {
    productId: 2,
    id: 2, size: 42, selling_price: '1400.00', on_hand: '12', commited: '-3', available_to_sell: '15'
  },
]