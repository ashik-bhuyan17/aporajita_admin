export const columns = [
  {
    Header: 'TO Number',
    accessor: 'to_number',
  },
  {
    Header: 'From Location',
    accessor: 'from_location',
  },
  {
    Header: 'To Location',
    accessor: 'to_location',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Total Transferred',
    accessor: 'total_transferred',
  },
  {
    Header: 'Total Received',
    accessor: 'total_received',
  },
  {
    Header: 'Created Date',
    accessor: 'created_date',
  },
  {
    Header: 'Due Date',
    accessor: 'due_date',
  },
];

export const data = [
  {
    id: 1,
    to_number: 'TO-1',
    location_name: 'Dhanmondi Main Outlet',
    from_location: 'Dhanmondi',
    to_location: 'Uttara',
    status: 'Open',
    total_transferred: 100,
    total_received: 0,
    created_date: 'Sep 10, 2021 at 05:54 PM',
    due_date: 'Sep 17, 2021 at 12:00 AM',
  },
  {
    id: 2,
    to_number: 'TO-2',
    location_name: 'Dhanmondi Main Outlet',
    from_location: 'Dhanmondi',
    to_location: 'Uttara',
    status: 'Sent',
    total_transferred: 100,
    total_received: 0,
    created_date: 'Sep 21, 2021 at 05:54 PM',
    due_date: 'Sep 27, 2021 at 12:00 AM',
  },
  {
    id: 3,
    to_number: 'TO-3',
    location_name: 'Chittagong Outlet',
    from_location: 'Hathazari',
    to_location: 'Uttara',
    status: 'Received',
    total_transferred: 100,
    total_received: 100,
    created_date: 'Sep 01, 2021 at 05:54 PM',
    due_date: 'Sep 07, 2021 at 12:00 AM',
  },
  {
    id: 4,
    to_number: 'TO-4',
    location_name: 'Chittagong Outlet',
    from_location: 'Hathazari',
    to_location: 'Uttara',
    status: 'Partially Received',
    total_transferred: 100,
    total_received: 90,
    created_date: 'Sep 11, 2021 at 05:54 PM',
    due_date: 'Sep 12, 2021 at 12:00 AM',
  },
];
