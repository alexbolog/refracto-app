import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import * as React from 'react';
import { MockDataDashboardGraph } from './mock-data-dashboard-graph';

const DashboardGraph = () => {
  const optionsArea: ApexOptions = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      zoom: {
        autoScaleYaxis: true
      }
    },
    annotations: {
      yaxis: [
        {
          borderColor: '#999',
          label: {
            style: {
              color: '#fff',
              background: '#00E396'
            }
          }
        }
      ],
      xaxis: [
        {
          x: new Date().getTime(),
          borderColor: '#999',
          // yAxisIndex: 0,
          label: {
            style: {
              color: '#fff',
              background: '#775DD0'
            }
          }
        }
      ]
    },
    // dataLabels: {
    //   enabled: false
    // },
    markers: {
      size: 5,
      shape: 'circle'
    },
    xaxis: {
      type: 'datetime',
      min: new Date('01 Mar 2012').getTime(),
      tickAmount: 6
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

  const series: ApexAxisChartSeries = MockDataDashboardGraph;

  return (
    <ReactApexChart
      options={optionsArea}
      series={series}
      type='area'
    ></ReactApexChart>
  );
};

export default DashboardGraph;
