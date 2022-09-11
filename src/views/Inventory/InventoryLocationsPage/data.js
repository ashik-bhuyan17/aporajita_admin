export const columns = [
  {
    Header: 'Location Name',
    accessor: 'location_name',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Address Line 1',
    accessor: 'address1',
  },
  {
    Header: 'Address Line 2',
    accessor: 'address2',
  },
  {
    Header: 'City',
    accessor: 'city',
  },
  {
    Header: 'Province',
    accessor: 'division',
  },
  {
    Header: 'Country',
    accessor: 'country',
  },
  {
    Header: 'Post Code',
    accessor: 'postal_code',
  },
  {
    Header: 'Active',
    accessor: 'is_active',
  },
  {
    Header: '',
    accessor: 'is_default',
    disableSortBy: true,
  },
];

export const data = [
  {
    id: 1,
    location_name: 'Dhanmondi',
    phone: '01762850108',
    address_line_1: '2201/1, Sukrabad Mirpur Rd, Dhaka 1207',
    address_line_2: 'First Floor',
    city: 'Dhaka',
    province: 'Dhaka',
    country: 'Bangladesh',
    postal_code: '1207',
    active: 'Yes',
    is_default: true,
  },
  {
    id: 2,
    location_name: 'Mirpur',
    phone: '01762850108',
    address_line_1: '2201/1, Mirpur 10, Dhaka 2207',
    address_line_2: 'Second Floor',
    city: 'Dhaka',
    province: 'Dhaka',
    country: 'Bangladesh',
    postal_code: '2207',
    active: 'Yes',
    is_default: false,
  },
];
