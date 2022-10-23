import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import * as React from 'react';
import dashboardGraph from '../../db/dashboardGraph.json';

const DashboardGraph = () => {
  const optionsArea: ApexOptions = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      zoom: {
        // autoScaleYaxis: true
      },
      stacked: true,
    },
    // annotations: {
    //   yaxis: [
    //     {
    //       borderColor: '#999',
    //       label: {
    //         style: {
    //           color: '#fff',
    //           background: '#00E396'
    //         }
    //       }
    //     }
    //   ],
    //   xaxis: [
    //     {
    //       x: new Date().getTime(),
    //       borderColor: '#999',
    //       // yAxisIndex: 0,
    //       // label: {
    //       //   style: {
    //       //     color: '#fff',
    //       //     background: '#775DD0'
    //       //   }
    //       // }
    //     }
    //   ]
    // },
    dataLabels: {
      enabled: false // do not display number on each point of graph
    },
    // markers: {
    //   size: 3,
    //   shape: 'circle'
    // },
    xaxis: {
      type: 'datetime',
      categories: dashboardGraph.map((el) => el.date)
      // tickAmount: 6
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    }
  };

  const series: ApexOptions['series'] = [
    {
      name: 'availableBalance',
      data: dashboardGraph.map((el) => el.availableBalance)
    },
    {
      name: 'committedBalance',
      data: dashboardGraph.map((el) => el.committedBalance)
    },
    {
      name: 'total',
      data: dashboardGraph.map((el) => el.total)
    }
  ];

  return (
    <ReactApexChart
      options={optionsArea}
      series={series}
      type='area'
      height='421px'
      width='1000px'
    ></ReactApexChart>
  );
};

export default DashboardGraph;
