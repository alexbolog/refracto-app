import './style.scss';

import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import * as React from 'react';
import dashboardGraph from '../../db/dashboardGraph.json';
import { Button } from 'react-bootstrap';
import dayjs from 'dayjs';

const DashboardGraph = () => {
  const [activeFilter, setActiveFilter] = React.useState('');
  const [endDate, setEndDate] = React.useState(dayjs());
  const [isAvailableVisible, setAvailableVisible] = React.useState(true);
  const [isInvestedVisible, setInvestedVisible] = React.useState(true);

  const resetEndDate = () => {
    setEndDate(dayjs());
  };

  const setZoomInterval = (years: number, months?: number) => {
    let stDate = endDate.subtract(years, 'year');
    if (months) {
      stDate = stDate.subtract(months, 'month');
    }
    setStartDate(stDate);
  };

  const [startDate, setStartDate] = React.useState(dayjs().subtract(2, 'year'));

  const getLabelForEvent = (el: {
    date: string;
    availableBalance: number;
    committedBalance: number;
    total: number;
    eventType?: string;
    availableDifference?: number;
    committedDifference?: number;
  }) => {
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
        return (
          'Withdrew ' +
          (el.availableDifference ? -el.availableDifference : -1) +
          '$'
        );
      }

      default: {
        return el.eventType;
      }
    }
  };

  const computeMarkerHeight = (available: number, invested: number) => {
    if (!isAvailableVisible && !isInvestedVisible) {
      return undefined;
    }
    let y = 0;
    if (isAvailableVisible) {
      y += available;
    }
    if (isInvestedVisible) {
      y += invested;
    }
    return y;
  };

  const events: PointAnnotations[] = dashboardGraph
    .filter((el) => el.eventType)
    .map(
      (el) =>
        new Object({
          x: dayjs(el.date).valueOf(),
          y: computeMarkerHeight(el.availableBalance, el.committedBalance),
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
      stacked: true,
      events: {
        legendClick: (event: any, chartContext: number) => {
          if (chartContext === 0) {
            setAvailableVisible(!isAvailableVisible);
          }
          if (chartContext === 1) {
            setInvestedVisible(!isInvestedVisible);
          }
        },
        beforeZoom: () => {
          setActiveFilter('');
        },
        scrolled: () => {
          setActiveFilter(''); // Does not work
        },
      },
      toolbar: {
        tools: {
          reset: false,
          pan: false,
        }
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    annotations: {
      points: events
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      categories: dashboardGraph.map((el) => el.date),
      min: startDate.valueOf(),
      max: endDate.valueOf()
    },
    tooltip: {
      x: {
        show: false
        // format: 'dd MMM yyyy'
      },
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

  const handleOneYearFilter = () => {
    resetEndDate();
    setZoomInterval(1);
    setActiveFilter('year');
  };
  const handleOneQuarterFilter = () => {
    resetEndDate();
    setZoomInterval(0, 3);
    setActiveFilter('quarter');
  };
  const handleOneMonthFilter = () => {
    resetEndDate();
    setZoomInterval(0, 1);
    setActiveFilter('month');
  };
  // TODO: autoScaleYaxis when zooming using buttons

  return (
    <>
      <Button onClick={handleOneYearFilter} disabled={activeFilter === 'year'}>
        Last Year
      </Button>
      <Button
        onClick={handleOneQuarterFilter}
        disabled={activeFilter === 'quarter'}
      >
        Last Quarter
      </Button>
      <Button
        onClick={handleOneMonthFilter}
        disabled={activeFilter === 'month'}
      >
        Last Month
      </Button>
      <ReactApexChart
        options={optionsArea}
        series={series}
        type='area'
        height='421px'
        width='1000px'
      ></ReactApexChart>
    </>
  );
};

export default DashboardGraph;
