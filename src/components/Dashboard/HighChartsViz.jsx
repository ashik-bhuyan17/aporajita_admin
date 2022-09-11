import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';

export default function HighChartsViz({
  vizID,
  vizData,
  colLeft,
  colRightLink,
  infoBox,
}) {
  const defaultVizData = [
    {
      name: '06 AM',
      y: 0,
    },
    {
      name: '07 AM',
      y: 0,
    },
    {
      name: '08 AM',
      y: 0,
    },
    {
      name: '09 AM',
      y: 0,
    },
    {
      name: '10 AM',
      y: 0,
    },
    {
      name: '11 AM',
      y: 0,
    },
    {
      name: '12 PM',
      y: 0,
    },
    {
      name: '01 PM',
      y: 0,
    },
    {
      name: '02 PM',
      y: 0,
    },
    {
      name: '03 PM',
      y: 0,
    },
    {
      name: '04 PM',
      y: 0,
    },
    {
      name: '05 PM',
      y: 0,
    },
    {
      name: '06 PM',
      y: 0,
    },
    {
      name: '07 PM',
      y: 0,
    },
    {
      name: '08 PM',
      y: 0,
    },
    {
      name: '09 PM',
      y: 0,
    },
    {
      name: '10 PM',
      y: 0,
    },
    {
      name: '11 PM',
      y: 0,
    },
    {
      name: '12 AM',
      y: 0,
    },
    {
      name: '01 AM',
      y: 0,
    },
    {
      name: '02 AM',
      y: 0,
    },
    {
      name: '03 AM',
      y: 0,
    },
    {
      name: '04 AM',
      y: 0,
    },
    {
      name: '05 AM',
      y: 0,
    },
  ];
  const allTimes = [
    '06 AM',
    '07 AM',
    '08 AM',
    '09 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '01 PM',
    '02 PM',
    '03 PM',
    '04 PM',
    '05 PM',
    '06 PM',
    '07 PM',
    '08 PM',
    '09 PM',
    '10 PM',
    '11 PM',
    '12 AM',
    '01 AM',
    '02 AM',
    '03 AM',
    '04 AM',
    '05 AM',
  ];

  useEffect(() => {
    console.log(vizData);

    Highcharts.chart(vizID, {
      chart: {
        height: 150,
      },

      plotOptions: {
        series: {
          allowPointSelect: true,
        },
      },
      legend: {
        enabled: false,
      },

      title: {
        text: null,
      },

      yAxis: {
        title: {
          enabled: false,
        },
      },

      xAxis: {
        categories: allTimes,
      },

      series: [
        {
          color: 'rgb(122, 111, 190)',
          name: colLeft,
          data:
            vizData !== undefined && vizData.length > 0
              ? vizData
              : defaultVizData,
          marker: {
            radius: 2,
          },
        },
      ],
    });
  }, [vizData]);

  return (
    <div className="dashboard-white-panel-container shadow-sm">
      <div className="row">
        <div className="col-left">
          <span>{colLeft}</span>
          <div className="info-box">
            {infoBox.title} {infoBox.value}
          </div>
        </div>
        <p className="col-right">
          <Link to={colRightLink}>View Details</Link>
        </p>
        <div id={vizID}></div>
      </div>
    </div>
  );
}
