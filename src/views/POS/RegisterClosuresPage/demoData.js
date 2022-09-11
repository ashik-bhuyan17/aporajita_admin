// import { DownloadCloud } from 'react-feather';

export const columns = [
  {
    Header: 'Opened Date',
    accessor: 'opened_date',
    disableSortBy: true,
  },
  {
    Header: 'Closed Date',
    accessor: 'closed_date',
  },
  {
    Header: 'Register',
    accessor: 'register',
  },
  {
    Header: 'Outlet',
    accessor: 'outlet',
  },
  {
    Header: 'Opened By',
    accessor: 'opened_by',
  },
  {
    Header: 'Closed By',
    accessor: 'closed_by',
  },
  {
    Header: 'Report',
    accessor: 'report',
    disableSortBy: true,
  },
  //   {
  //     id: 'report',
  //     Header: () => 'Report',
  //     Cell: ({ row }) => (
  //       <button type="button" className="btn btn-sm">
  //         <DownloadCloud className="feather-icon-sm" />
  //       </button>
  //     ),
  //   },
];

export const data = [
  {
    id: 1,
    opened_date: 'Sep 20, 2021 at 02:54 PM',
    closed_date: 'Sep 21, 2021 at 02:54 PM',
    register: 'Somikoron',
    outlet: 'Dhanmondi Outlet',
    opened_by: 'Saleh',
    closed_by: 'Shuvo',
  },
  {
    id: 2,
    opened_date: 'Aug 20, 2021 at 02:54 PM',
    closed_date: 'Sep 21, 2021 at 02:54 PM',
    register: 'Somikoron',
    outlet: 'Dhanmondi Outlet',
    opened_by: 'Saleh',
    closed_by: 'Shuvo',
  },
  {
    id: 3,
    opened_date: 'July 20, 2021 at 02:54 PM',
    closed_date: 'Sep 21, 2021 at 02:54 PM',
    register: 'Somikoron',
    outlet: 'Uttara Outlet',
    opened_by: 'Saleh',
    closed_by: 'Shuvo',
  },
];
