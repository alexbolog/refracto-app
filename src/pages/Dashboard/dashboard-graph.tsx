import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import * as React from 'react';
import dashboardGraph from '../../db/dashboardGraph.json';

const DashboardGraph = () => {
  const getLabelForEvent = (
    el:
      | {
          date: string;
          availableBalance: number;
          committedBalance: number;
          total: number;
          eventType?: undefined;
          availableDifference?: undefined;
          committedDifference?: undefined;
        }
      | {
          date: string;
          availableBalance: number;
          committedBalance: number;
          total: number;
          eventType: string;
          availableDifference: number;
          committedDifference?: undefined;
        }
      | {
          date: string;
          availableBalance: number;
          committedBalance: number;
          total: number;
          eventType: string;
          availableDifference: number;
          committedDifference: number;
        }
  ) => {
    // TODO: we can group this in an 'event' nested field
    switch (el.eventType) {
      case 'INVEST': {
        return 'Invested ' + el.committedDifference + '$';
      }
      case 'PAYOUT': {
        return 'Payout ' + el.availableDifference + '$';
      }
      case 'DEPOSIT': {
        return 'Deposited ' + el.availableDifference + '$';
      }
      case 'WITHDRAW': {
        return 'Withdrew ' + (-el.availableDifference) + '$';
      }

      default: {
        return el.eventType;
      }
    }
  };

  const events: XAxisAnnotations[] = dashboardGraph
    .filter((el) => el.eventType)
    .map(
      (el) =>
        new Object({
          x: new Date(el.date).getTime(),
          label: {
            text: getLabelForEvent(el)
          }
        })
    );

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

  const optionsArea: ApexOptions = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      zoom: {
        autoScaleYaxis: true
      },
      stacked: true
    },
    annotations: {
      // yaxis: [
      //   {
      //     borderColor: '#999',
      //     label: {
      //       style: {
      //         color: '#fff',
      //         background: '#00E396'
      //       }
      //     }
      //   }
      // ],
      xaxis: events
    },
    dataLabels: {
      enabled: false
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
