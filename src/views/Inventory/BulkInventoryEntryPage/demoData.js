export const columns = [
  {
    Header: 'Image',
    accessor: 'image',
  },
  {
    Header: 'Variant Options',
    accessor: 'variant_options',
  },
  {
    Header: 'SKU',
    accessor: 'sku',
  },
  {
    Header: 'Barcode',
    accessor: 'bar_code',
  },
  {
    Header: 'Cost Price (BDT)',
    accessor: 'cost_price',
  },
  {
    Header: 'Online',
    accessor: 'online',
    type: 'inventory_location',
  },
  // {
  //   Header: 'In Store',
  //   accessor: 'in_store',
  //   type: 'inventory_location'
  // },
];

export const data = [
  {
    id: 1,
    product_name: 'Aarong Cotton Pant',
    imageURL:
      'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
  },
  {
    id: 2,
    product_name: 'Raffel Dupatta White',
    imageURL:
      'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
  },
];

export const variants = [
  {
    productId: 1,
    id: 1,
    size: 38,
    cost_price: '1000.00',
    on_hand: '9',
    commited: '-1',
    available_to_sell: '10',
    quantity: 9,
  },
  {
    productId: 1,
    id: 2,
    size: 40,
    cost_price: '1000.00',
    quantity: 39,
  },
  {
    productId: 1,
    id: 3,
    size: 42,
    cost_price: '1000.00',
    quantity: 10,
  },
  {
    productId: 2,
    id: 2,
    size: 40,
    cost_price: '1400.00',
    quantity: 49,
  },
  {
    productId: 2,
    id: 2,
    size: 42,
    cost_price: '1400.00',
    quantity: 43,
  },
];

export const columnOptions = [
  { value: 'Online', label: 'Online', accessor: 'online' },
  { value: 'In Store', label: 'In Store', accessor: 'in_store' },
];
