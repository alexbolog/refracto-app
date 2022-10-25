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
        autoScaleYaxis: true
      },
      stacked: true
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
      enabled: false,
      // formatter: (val, opts) => {
      //   return dashboardGraph[opts.dataPointIndex].total;
      // },
      // enabledOnSeries: [1], // display label only on cash, at top of graph
      //TODO: if we want to display total as label, needs to account for filtering to only invested
    },
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
        opacityFrom: 0.2,
        opacityTo: 1,
        stops: [0, 100]
      }
    }
  };

  const series: ApexOptions['series'] = [
    {
      name: 'Available',
      color: '#9ccb38',
      data: dashboardGraph.map((el) => el.availableBalance)
    },
    {
      name: 'Invested',
      color: '#38c1cb',
      // color: '#de415b',
      data: dashboardGraph.map((el) => el.committedBalance)
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
