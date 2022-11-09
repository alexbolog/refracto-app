import './style.scss';
import * as React from 'react';
import { useRef } from 'react';
import dashboardGraph from '../../db/dashboardGraph.json';
import { Line } from 'react-chartjs-2';
import gradient from 'chartjs-plugin-gradient';
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip
} from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';

const DashboardGraph2 = () => {
  // const handleOneYearFilter = () => {
  //   resetEndDate();
  //   setZoomInterval(1);
  //   setActiveFilter('year');
  // };
  // const handleOneQuarterFilter = () => {
  //   resetEndDate();
  //   setZoomInterval(0, 3);
  //   setActiveFilter('quarter');
  // };
  // const handleOneMonthFilter = () => {
  //   resetEndDate();
  //   setZoomInterval(0, 1);
  //   setActiveFilter('month');
  // };
  // TODO: autoScaleYaxis when zooming using buttons

  const [isAvailableVisible, setAvailableVisible] = React.useState(true);
  const [isInvestedVisible, setInvestedVisible] = React.useState(true);

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

  const events: any[] = dashboardGraph
    .filter((el) => el.eventType)
    .map(
      (el) =>
        new Object({
          type: 'point',
          radius: 4,
          xValue: el.date,
          yValue: computeMarkerHeight(el.availableBalance, el.committedBalance),
          label: {
            enabled: true,
            content: getLabelForEvent(el)
          }
        })
    );

  const eventTooltips: any = {};

  events.forEach((el) => (eventTooltips[el.xValue] = el.label.content));

  const chartRef = useRef(null);

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    gradient,
    Annotation
  );

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'General Overview Statistics',
        align: 'start' as const
      },
      legend: {
        position: 'bottom' as const,
        labels: {
        }
      },
      tooltip: {
        callbacks: {
          title: (a: any) => {
            const date = a[0].label;
            const label = eventTooltips[date];
            if (label) {
              return label;
            }
          }
        }
      }
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 4,
      }
    },
    scales: {
      y: {
        stacked: true
      }
    },
    annotations: events
  };

  const data = () => {
    return {
      labels: dashboardGraph.map((el) => el.date),
      datasets: [
        {
          label: 'Available',
          borderColor: '#9ccb38',
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(156, 203, 56, 0.5)');
            gradient.addColorStop(1, 'rgba(156, 203, 56,0)');
            return gradient;
          },
          fill: true,
          data: dashboardGraph.map((el) => el.availableBalance)
        },
        {
          label: 'Invested',
          borderColor: '#38c1cb',
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(56, 193, 203, 0.5)');
            gradient.addColorStop(1, 'rgba(56, 193, 203,0)');
            return gradient;
          },
          fill: true,
          data: dashboardGraph.map((el) => el.committedBalance)
        }
      ]
    };
  };

  return (
    <>
      {/*<Button onClick={handleOneYearFilter} disabled={activeFilter === 'year'}>*/}
      {/*  Last Year*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  onClick={handleOneQuarterFilter}*/}
      {/*  disabled={activeFilter === 'quarter'}*/}
      {/*>*/}
      {/*  Last Quarter*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  onClick={handleOneMonthFilter}*/}
      {/*  disabled={activeFilter === 'month'}*/}
      {/*>*/}
      {/*  Last Month*/}
      {/*</Button>*/}
      <Line options={options} data={data()} ref={chartRef}></Line>
    </>
  );
};

export default DashboardGraph2;
