export const columns = [
  {
    Header: 'Image',
    accessor: 'featured_image',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Inventory',
    accessor: 'unit',
  },
  {
    Header: 'Created At',
    accessor: 'created',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    disableSortBy: true,
  },
];

export const data = [
  {
    id: 1,
    name: 'Aarong Cotton Pant',
    imageURL:
      'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
    inventory_quanitity: 10,
    variants: '3',
    created_at: 'Sep 11, 2021',
  },
  {
    id: 2,
    name: 'Raffel Dupatta White',
    imageURL:
      'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
    inventory_quanitity: 20,
    variants: '2',
    created_at: 'Sep 13, 2021',
  },
  {
    id: 3,
    name: 'White Embroidery',
    imageURL:
      'https://via.placeholder.com/150/0000FF/808080%20C/O%20https://placeholder.com/',
    inventory_quanitity: 103,
    variants: '2',
    created_at: 'Sep 20, 2021',
  },
];
