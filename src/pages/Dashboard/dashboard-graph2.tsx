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
import Zoom from 'chartjs-plugin-zoom';
import { Button } from 'react-bootstrap';
import dayjs from 'dayjs';

const DashboardGraph2 = () => {
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

  const chartRef = React.useRef(null);

  const handleOneYearFilter = () => {
    const a = chartRef;
    debugger;
    // resetEndDate();
    // setZoomInterval(1);
    // setActiveFilter('year');
  };

  const [activeFilter, setActiveFilter] = React.useState('');

  const [isAvailableVisible, setAvailableVisible] = React.useState(true);
  const [isInvestedVisible, setInvestedVisible] = React.useState(true);

  const eventTooltips: any = {};
  const [graphLabels, setGraphLabels] = React.useState<any[]>([]);
  const [graphDates, setGraphDates] = React.useState<any[]>([]);
  const [graphDataAvailable, setGraphDataAvailable] = React.useState<any[]>([]);
  const [graphDataInvested, setGraphDataInvested] = React.useState<any[]>([]);
  const [graphEvents, setGraphEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
    dashboardGraph.forEach((el) => {
      const dayjsDate = dayjs(el.date);
      graphDates.push(dayjsDate);
      graphLabels.push(dayjsDate.format("MMM 'YY"));
      // graphLabels.push({
      //   date: dayjsDate,
      //   xLabelShort: dayjsDate.format("MMM 'YY"),
      //   xLabelLong:
      // });
      graphDataAvailable.push(el.availableBalance);
      graphDataInvested.push(el.committedBalance);
      if (el.eventType) {
        const annotationForEvent = getAnnotationForEvent(el);
        graphEvents.push({
          type: 'point',
          radius: 4,
          xValue: el.date,
          yValue: computeMarkerHeight(el.availableBalance, el.committedBalance),
          annotation: annotationForEvent,
          backgroundColor: annotationForEvent?.color,
          borderColor: 'white'
        });
      }
    });
  }, []);

  const getAnnotationForEvent = (el: {
    availableBalance: number;
    committedBalance: number;
    eventType?: string;
    availableDifference?: number;
    committedDifference?: number;
  }) => {
    // TODO: we can group this in an 'event' nested field
    switch (el.eventType) {
      case 'INVEST': {
        return {
          label: 'Invested ' + el.committedDifference + '$',
          color: '#38c1cb'
        };
      }
      case 'PAYOUT': {
        return {
          label: 'Payout ' + el.availableDifference + '$',
          color: '#38c1cb'
        };
      }
      case 'DEPOSIT': {
        return {
          label: 'Deposited ' + el.availableDifference + '$',
          color: '#9ccb38'
        };
      }
      case 'WITHDRAW': {
        return {
          label:
            'Withdrew ' +
            (el.availableDifference ? -el.availableDifference : -1) +
            '$',
          color: '#de415c'
        };
      }

      default: {
        return {
          label: el.eventType,
          color: 'black'
        };
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

  graphEvents.forEach((el) => (eventTooltips[el.xValue] = el.annotation.label));

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
    Annotation,
    Zoom
  );

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'General Overview Statistics',
        align: 'start' as const
      },
      legend: {
        position: 'bottom' as const
      },
      tooltip: {
        callbacks: {
          footer: (a: any) => {
            const date = a[0].label;
            const label = eventTooltips[date];
            if (label) {
              return label;
            }
          }
        }
      },
      zoom: {
        // pan: {
        //   enabled: true,
        //   mode: 'x' as const
        // },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          drag: {
            enabled: true,
            backgroundColor: 'rgba(144, 202, 249, 0.4)',
            borderColor: 'rgba(13, 71, 161, 0.4)',
            borderWidth: 1
          },
          // drag: true,
          mode: 'x' as const
        }
      }
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 4
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    },
    scales: {
      y: {
        stacked: true
      },
      x: {
        ticks: {
          callback: (val: any) => {
            const crtDate = dayjs(dashboardGraph[val].date);
            if (crtDate.day() < 10) {
              return crtDate.format("MMM 'YY");
            }
          }
        }
      }
    },
    annotations: graphEvents
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
          data: graphDataAvailable
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
          data: graphDataInvested
        }
      ]
    };
  };

  return (
    <>
      <Button onClick={handleOneYearFilter} disabled={activeFilter === 'year'}>
        Last Year
      </Button>
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
