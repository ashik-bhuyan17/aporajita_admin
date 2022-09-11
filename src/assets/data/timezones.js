const timezones = [
  {
    value: 'America/New_York',
    text: '(GMT-05:00) Eastern Time (US & Canada)',
  },
  {
    value: 'Pacific/Midway',
    text: '(GMT-11:00) International Date Line West',
  },
  {
    value: 'Pacific/Midway',
    text: '(GMT-11:00) Midway Island',
  },
  {
    value: 'Pacific/Pago_Pago',
    text: '(GMT-11:00) American Samoa',
  },
  {
    value: 'Pacific/Honolulu',
    text: '(GMT-10:00) Hawaii',
  },
  {
    value: 'America/Anchorage',
    text: '(GMT-09:00) Alaska',
  },
  {
    value: 'PST8PDT',
    text: '(GMT-08:00) Pacific Time (US & Canada)',
  },
  {
    value: 'America/Tijuana',
    text: '(GMT-08:00) Tijuana',
  },
  {
    value: 'MST7MDT',
    text: '(GMT-07:00) Mountain Time (US & Canada)',
  },
  {
    value: 'MST',
    text: '(GMT-07:00) Arizona',
  },
  {
    value: 'America/Chihuahua',
    text: '(GMT-07:00) Chihuahua',
  },
  {
    value: 'MST',
    text: '(GMT-07:00) Mazatlan',
  },
  {
    value: 'CST6CDT',
    text: '(GMT-06:00) Central Time (US & Canada)',
  },
  {
    value: '-0600',
    text: '(GMT-06:00) Saskatchewan',
  },
  {
    value: 'CST6CDT',
    text: '(GMT-06:00) Guadalajara',
  },
  {
    value: 'CST6CDT',
    text: '(GMT-06:00) Mexico City',
  },
  {
    value: 'America/Monterrey',
    text: '(GMT-06:00) Monterrey',
  },
  {
    value: 'CST6CDT',
    text: '(GMT-06:00) Central America',
  },
  {
    value: 'EST5EDT',
    text: '(GMT-05:00) Indiana (East)',
  },
  {
    value: 'America/Bogota',
    text: '(GMT-05:00) Bogota',
  },
  {
    value: 'America/Lima',
    text: '(GMT-05:00) Lima',
  },
  {
    value: 'America/Lima',
    text: '(GMT-05:00) Quito',
  },
  {
    value: 'America/Halifax',
    text: '(GMT-04:00) Atlantic Time (Canada)',
  },
  {
    value: 'America/Caracas',
    text: '(GMT-04:30) Caracas',
  },
  {
    value: 'America/Santiago',
    text: '(GMT-04:00) La Paz',
  },
  {
    value: 'America/Santiago',
    text: '(GMT-04:00) Santiago',
  },
  {
    value: 'America/La_Paz',
    text: '(GMT-03:30) Newfoundland',
  },
  {
    value: 'America/Sao_Paulo',
    text: '(GMT-03:00) Brasilia',
  },
  {
    value: 'America/Argentina/Buenos_Aires',
    text: '(GMT-03:00) Buenos Aires',
  },
  {
    value: 'America/Guyana',
    text: '(GMT-04:00) Georgetown',
  },
  {
    value: 'America/Godthab',
    text: '(GMT-03:00) Greenland',
  },
  {
    value: 'Atlantic/South_Georgia',
    text: '(GMT-02:00) Mid-Atlantic',
  },
  {
    value: 'Atlantic/Azores',
    text: '(GMT-01:00) Azores',
  },
  {
    value: 'Atlantic/Cape_Verde',
    text: '(GMT-01:00) Cape Verde Is.',
  },
  {
    value: 'Europe/Dublin',
    text: '(GMT+00:00) Dublin',
  },
  {
    value: 'Europe/London',
    text: '(GMT+00:00) Edinburgh',
  },
  {
    value: 'Europe/Lisbon',
    text: '(GMT+00:00) Lisbon',
  },
  {
    value: 'Europe/London',
    text: '(GMT+00:00) London',
  },
  {
    value: 'Africa/Casablanca',
    text: '(GMT+00:00) Casablanca',
  },
  {
    value: 'Africa/Monrovia',
    text: '(GMT+00:00) Monrovia',
  },
  {
    value: 'UTC',
    text: '(GMT+00:00) UTC',
  },
  {
    value: 'Europe/Belgrade',
    text: '(GMT+01:00) Belgrade',
  },
  {
    value: 'Europe/Bratislava',
    text: '(GMT+01:00) Bratislava',
  },
  {
    value: 'Europe/Budapest',
    text: '(GMT+01:00) Budapest',
  },
  {
    value: 'Europe/Ljubljana',
    text: '(GMT+01:00) Ljubljana',
  },
  {
    value: 'Europe/Prague',
    text: '(GMT+01:00) Prague',
  },
  {
    value: 'Europe/Sarajevo',
    text: '(GMT+01:00) Sarajevo',
  },
  {
    value: 'Europe/Skopje',
    text: '(GMT+01:00) Skopje',
  },
  {
    value: 'Europe/Warsaw',
    text: '(GMT+01:00) Warsaw',
  },
  {
    value: 'Europe/Zagreb',
    text: '(GMT+01:00) Zagreb',
  },
  {
    value: 'Europe/Brussels',
    text: '(GMT+01:00) Brussels',
  },
  {
    value: 'Europe/Copenhagen',
    text: '(GMT+01:00) Copenhagen',
  },
  {
    value: 'Europe/Madrid',
    text: '(GMT+01:00) Madrid',
  },
  {
    value: 'Europe/Paris',
    text: '(GMT+01:00) Paris',
  },
  {
    value: 'Europe/Amsterdam',
    text: '(GMT+01:00) Amsterdam',
  },
  {
    value: 'Europe/Berlin',
    text: '(GMT+01:00) Berlin',
  },
  {
    value: 'Europe/Zurich',
    text: '(GMT+01:00) Bern',
  },
  {
    value: 'Europe/Rome',
    text: '(GMT+01:00) Rome',
  },
  {
    value: 'Europe/Stockholm',
    text: '(GMT+01:00) Stockholm',
  },
  {
    value: 'Europe/Vienna',
    text: '(GMT+01:00) Vienna',
  },
  {
    value: 'Africa/Algiers',
    text: '(GMT+01:00) West Central Africa',
  },
  {
    value: 'Europe/Bucharest',
    text: '(GMT+02:00) Bucharest',
  },
  {
    value: 'Africa/Cairo',
    text: '(GMT+02:00) Cairo',
  },
  {
    value: 'Europe/Helsinki',
    text: '(GMT+02:00) Helsinki',
  },
  {
    value: 'Europe/Kiev',
    text: '(GMT+02:00) Kyiv',
  },
  {
    value: 'Europe/Riga',
    text: '(GMT+02:00) Riga',
  },
  {
    value: 'Europe/Sofia',
    text: '(GMT+02:00) Sofia',
  },
  {
    value: 'Europe/Tallinn',
    text: '(GMT+02:00) Tallinn',
  },
  {
    value: 'Europe/Vilnius',
    text: '(GMT+02:00) Vilnius',
  },
  {
    value: 'Europe/Athens',
    text: '(GMT+02:00) Athens',
  },
  {
    value: 'Europe/Istanbul',
    text: '(GMT+02:00) Istanbul',
  },
  {
    value: 'Europe/Minsk',
    text: '(GMT+03:00) Minsk',
  },
  {
    value: 'Asia/Jerusalem',
    text: '(GMT+02:00) Jerusalem',
  },
  {
    value: 'Africa/Harare',
    text: '(GMT+02:00) Harare',
  },
  {
    value: 'Africa/Maseru',
    text: '(GMT+02:00) Pretoria',
  },
  {
    value: 'Europe/Moscow',
    text: '(GMT+04:00) Moscow',
  },
  {
    value: 'Europe/Moscow',
    text: '(GMT+04:00) St. Petersburg',
  },
  {
    value: 'Europe/Volgograd',
    text: '(GMT+04:00) Volgograd',
  },
  {
    value: 'Asia/Kuwait',
    text: '(GMT+03:00) Kuwait',
  },
  {
    value: 'Asia/Riyadh',
    text: '(GMT+03:00) Riyadh',
  },
  {
    value: 'Africa/Nairobi',
    text: '(GMT+03:00) Nairobi',
  },
  {
    value: 'Asia/Baghdad',
    text: '(GMT+03:00) Baghdad',
  },
  {
    value: 'Asia/Tehran',
    text: '(GMT+03:30) Tehran',
  },
  {
    value: 'Asia/Muscat',
    text: '(GMT+04:00) Abu Dhabi',
  },
  {
    value: 'Asia/Muscat',
    text: '(GMT+04:00) Muscat',
  },
  {
    value: 'Asia/Baku',
    text: '(GMT+04:00) Baku',
  },
  {
    value: 'Asia/Tbilisi',
    text: '(GMT+04:00) Tbilisi',
  },
  {
    value: 'Asia/Yerevan',
    text: '(GMT+04:00) Yerevan',
  },
  {
    value: 'Asia/Kabul',
    text: '(GMT+04:30) Kabul',
  },
  {
    value: 'Asia/Yekaterinburg',
    text: '(GMT+06:00) Ekaterinburg',
  },
  {
    value: 'Asia/Karachi',
    text: '(GMT+05:00) Islamabad',
  },
  {
    value: 'Asia/Karachi',
    text: '(GMT+05:00) Karachi',
  },
  {
    value: 'Asia/Tashkent',
    text: '(GMT+05:00) Tashkent',
  },
  {
    value: 'Asia/Kolkata',
    text: '(GMT+05:30) Chennai',
  },
  {
    value: 'Asia/Kolkata',
    text: '(GMT+05:30) Kolkata',
  },
  {
    value: 'Asia/Kolkata',
    text: '(GMT+05:30) Mumbai',
  },
  {
    value: 'Asia/Kolkata',
    text: '(GMT+05:30) New Delhi',
  },
  {
    value: 'Asia/Kathmandu',
    text: '(GMT+05:45) Kathmandu',
  },
  {
    value: 'Asia/Thimphu',
    text: '(GMT+06:00) Astana',
  },
  {
    value: 'Asia/Dhaka',
    text: '(GMT+06:00) Dhaka',
  },
  {
    value: 'Asia/Kolkata',
    text: '(GMT+05:30) Sri Jayawardenepura',
  },
  {
    value: 'Asia/Almaty',
    text: '(GMT+06:00) Almaty',
  },
  {
    value: 'Asia/Novosibirsk',
    text: '(GMT+07:00) Novosibirsk',
  },
  {
    value: 'Asia/Rangoon',
    text: '(GMT+06:30) Rangoon',
  },
  {
    value: 'Asia/Bangkok',
    text: '(GMT+07:00) Bangkok',
  },
  {
    value: 'Asia/Bangkok',
    text: '(GMT+07:00) Hanoi',
  },
  {
    value: 'Asia/Jakarta',
    text: '(GMT+07:00) Jakarta',
  },
  {
    value: 'Asia/Krasnoyarsk',
    text: '(GMT+08:00) Krasnoyarsk',
  },
  {
    value: 'Asia/Shanghai',
    text: '(GMT+08:00) Beijing',
  },
  {
    value: 'Asia/Chongqing',
    text: '(GMT+08:00) Chongqing',
  },
  {
    value: 'Asia/Hong_Kong',
    text: '(GMT+08:00) Hong Kong',
  },
  {
    value: 'Asia/Urumqi',
    text: '(GMT+08:00) Urumqi',
  },
  {
    value: 'Asia/Kuala_Lumpur',
    text: '(GMT+08:00) Kuala Lumpur',
  },
  {
    value: 'Asia/Singapore',
    text: '(GMT+08:00) Singapore',
  },
  {
    value: 'Asia/Taipei',
    text: '(GMT+08:00) Taipei',
  },
  {
    value: 'Australia/Perth',
    text: '(GMT+08:00) Perth',
  },
  {
    value: 'Asia/Irkutsk',
    text: '(GMT+09:00) Irkutsk',
  },
  {
    value: 'Asia/Ulaanbaatar',
    text: '(GMT+08:00) Ulaan Bataar',
  },
  {
    value: 'Asia/Seoul',
    text: '(GMT+09:00) Seoul',
  },
  {
    value: 'Asia/Tokyo',
    text: '(GMT+09:00) Osaka',
  },
  {
    value: 'Asia/Tokyo',
    text: '(GMT+09:00) Sapporo',
  },
  {
    value: 'Asia/Tokyo',
    text: '(GMT+09:00) Tokyo',
  },
  {
    value: 'Asia/Yakutsk',
    text: '(GMT+10:00) Yakutsk',
  },
  {
    value: 'Australia/Darwin',
    text: '(GMT+09:30) Darwin',
  },
  {
    value: 'Australia/Adelaide',
    text: '(GMT+09:30) Adelaide',
  },
  {
    value: 'Australia/Canberra',
    text: '(GMT+10:00) Canberra',
  },
  {
    value: 'Australia/Melbourne',
    text: '(GMT+10:00) Melbourne',
  },
  {
    value: 'Australia/Sydney',
    text: '(GMT+10:00) Sydney',
  },
  {
    value: 'Australia/Brisbane',
    text: '(GMT+10:00) Brisbane',
  },
  {
    value: 'Australia/Hobart',
    text: '(GMT+10:00) Hobart',
  },
  {
    value: 'Asia/Vladivostok',
    text: '(GMT+11:00) Vladivostok',
  },
  {
    value: 'Pacific/Guam',
    text: '(GMT+10:00) Guam',
  },
  {
    value: 'Pacific/Port_Moresby',
    text: '(GMT+10:00) Port Moresby',
  },
  {
    value: 'Asia/Magadan',
    text: '(GMT+12:00) Magadan',
  },
  {
    value: 'Asia/Magadan',
    text: '(GMT+12:00) Solomon Is.',
  },
  {
    value: 'Pacific/Noumea',
    text: '(GMT+11:00) New Caledonia',
  },
  {
    value: 'Pacific/Fiji',
    text: '(GMT+12:00) Fiji',
  },
  {
    value: 'Asia/Kamchatka',
    text: '(GMT+12:00) Kamchatka',
  },
  {
    value: 'Pacific/Majuro',
    text: '(GMT+12:00) Marshall Is.',
  },
  {
    value: 'Pacific/Auckland',
    text: '(GMT+12:00) Auckland',
  },
  {
    value: 'Pacific/Auckland',
    text: '(GMT+12:00) Wellington',
  },
  {
    value: 'Pacific/Tongatapu',
    text: "(GMT+13:00) Nuku'alofa",
  },
  {
    value: 'Pacific/Fakaofo',
    text: '(GMT+13:00) Tokelau Is.',
  },
  {
    value: 'Pacific/Apia',
    text: '(GMT+13:00) Samoa',
  },
];

export default timezones;
