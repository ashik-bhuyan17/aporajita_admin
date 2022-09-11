export const columns = [
  {
    Header: 'Image',
    accessor: 'featured_image',
  },
  {
    Header: 'Variant Options',
    accessor: 'variant_options',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Selling Price (BDT)',
    accessor: 'price',
  },
  {
    Header: 'Cost Price (BDT)',
    accessor: 'cost_price',
  },
  {
    Header: 'Compare At Price (BDT)',
    accessor: 'compare_at_price',
  },
  {
    Header: 'On Sale',
    accessor: 'on_sale',
  },
  {
    Header: 'Bar Code',
    accessor: 'bar_code',
  },
];

export const data = [
  {
    id: 1,
    name: 'Aarong Cotton Pant',
    price: '1000.00',
    imageURL:
      'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
    variants: [
      { id: 1, size: 38, name: 'Aarong Cotton Pant', selling_price: '1000.00' },
      { id: 2, size: 40, name: 'Aarong Cotton Pant', selling_price: '1000.00' },
      { id: 3, size: 42, name: 'Aarong Cotton Pant', selling_price: '1000.00' },
    ],
  },
  {
    id: 2,
    name: 'Raffel Dupatta White',
    price: '1400.00',
    imageURL:
      'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
    variants: [
      {
        id: 1,
        size: 38,
        name: 'Raffel Dupatta White',
        selling_price: '1400.00',
      },
      {
        id: 2,
        size: 40,
        name: 'Raffel Dupatta White',
        selling_price: '1400.00',
      },
    ],
  },
  {
    id: 3,
    name: 'White Embroidery',
    price: '1200.00',
    imageURL:
      'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
    variants: [
      { id: 2, size: 40, name: 'White Embroidery', selling_price: '1200.00' },
      { id: 3, size: 42, name: 'White Embroidery', selling_price: '1200.00' },
    ],
  },
];

export const variants = [
  {
    productId: 1,
    id: 1,
    size: 38,
    name: 'Aarong Cotton Pant',
    selling_price: '1000.00',
  },
  {
    productId: 1,
    id: 2,
    size: 40,
    name: 'Aarong Cotton Pant',
    selling_price: '1000.00',
  },
  {
    productId: 1,
    id: 3,
    size: 42,
    name: 'Aarong Cotton Pant',
    selling_price: '1000.00',
  },
  {
    productId: 2,
    id: 2,
    size: 40,
    name: 'Raffel Dupatta White',
    selling_price: '1400.00',
  },
  {
    productId: 2,
    id: 2,
    size: 42,
    name: 'Raffel Dupatta White',
    selling_price: '1400.00',
  },
  {
    productId: 3,
    id: 1,
    size: 38,
    name: 'White Embroidery',
    selling_price: '1200.00',
  },
  {
    productId: 3,
    id: 2,
    size: 40,
    name: 'White Embroidery',
    selling_price: '1200.00',
  },
];

export const columnOptions = [
  {
    value: 'Name',
    label: 'Name',
    accessor: 'name',
  },
  {
    value: 'Selling Price (BDT)',
    label: 'Selling Price (BDT)',
    accessor: 'price',
  },
  {
    value: 'Cost Price (BDT)',
    label: 'Cost Price (BDT)',
    accessor: 'cost_price',
  },
  {
    value: 'Compare At Price (BDT)',
    label: 'Compare At Price (BDT)',
    accessor: 'compare_at_price',
  },
  {
    value: 'On Sale',
    label: 'On Sale',
    accessor: 'on_sale',
  },
  {
    value: 'Bar Code',
    label: 'Bar Code',
    accessor: 'bar_code',
  },
];
