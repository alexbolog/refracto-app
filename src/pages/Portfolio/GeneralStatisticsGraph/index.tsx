import './style.scss';
import * as React from 'react';
import dashboardGraph from '../../../dbNew/dashboardGraph.json';
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
  TimeScale,
  Title,
  Tooltip
} from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import Zoom from 'chartjs-plugin-zoom';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';
import { ReactComponent as ExpandIcon } from '../../../assets/icons/refracto/arrow_right_alt.svg';
import DateRangePicker from '../../../components/DateRangePicker';

const GeneralStatisticsGraph = () => {
  const chartRef = React.useRef<any>(null);

  const handleOneYearFilter = () => {
    const now = DateTime.now();
    const oneYearAgo = now.minus({ years: 1 });
    chartRef?.current.zoomScale('x', { min: oneYearAgo, max: now }, 'normal');
  };
  const handleOneQuarterFilter = () => {
    const now = DateTime.now();
    const oneQuarterAgo = now.minus({ quarters: 1 });
    chartRef?.current.zoomScale(
      'x',
      { min: oneQuarterAgo, max: now },
      'normal'
    );
  };
  const handleOneMonthFilter = () => {
    const now = DateTime.now();
    const oneMonthAgo = now.minus({ months: 1 });
    chartRef?.current.zoomScale('x', { min: oneMonthAgo, max: now }, 'normal');
  };

  const onDatePick = (startDate: DateTime, endDate: DateTime) => {
    chartRef?.current.zoomScale(
      'x',
      { min: startDate, max: endDate },
      'normal'
    );
  };

  const resetZoom = () => {
    chartRef?.current.resetZoom();
  };

  const eventTooltips: any = {};
  const graphDates: any[] = [];
  const graphDataAvailable: any[] = [];
  const graphDataInvested: any[] = [];
  const graphEvents: any[] = [];

  const mapDashboardData = async (dashboardData: any[]) => {
    dashboardData.forEach((el) => {
      const date = DateTime.fromISO(el.date);
      graphDates.push(date);
      graphDataAvailable.push(el.availableBalance);
      graphDataInvested.push(el.committedBalance);
      if (el.eventType) {
        const annotationForEvent = getAnnotationForEvent(el);
        graphEvents.push({
          type: 'point',
          radius: 4,
          xValue: date,
          yValue: el.availableBalance + el.committedBalance,
          annotation: annotationForEvent,
          backgroundColor: annotationForEvent?.color,
          borderColor: 'white'
        });
        eventTooltips[date.toUnixInteger()] = annotationForEvent.label;
      }
    });
  };

  React.useEffect(() => {
    mapDashboardData(dashboardGraph).then(() => resetZoom());
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
          color: '#6853e8'
        };
      }
      case 'PAYOUT': {
        return {
          label: 'Payout ' + el.availableDifference + '$',
          color: '#63b179'
        };
      }
      case 'DEPOSIT': {
        return {
          label: 'Deposited ' + el.availableDifference + '$',
          color: '#1586D1'
        };
      }
      case 'WITHDRAW': {
        return {
          label:
            'Withdrew ' +
            (el.availableDifference ? -el.availableDifference : -1) +
            '$',
          color: '#ff6b45'
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
    Zoom,
    TimeScale
  );

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false
        // text: 'General Overview Statistics',
        // align: 'start' as const
      },
      legend: {
        position: 'bottom' as const,
        onClick: () => undefined
      },
      tooltip: {
        callbacks: {
          title: (crtElement: any) => {
            return graphDates[crtElement[0].dataIndex].toLocaleString(
              DateTime.DATE_MED
            );
          },
          footer: (crtElement: any) => {
            const date = graphDates[crtElement[0].dataIndex];
            const label = eventTooltips[date.toUnixInteger()];
            if (label) {
              return label;
            }
          }
        }
      },
      zoom: {
        limits: {
          x: {
            min: 'original' as const,
            max: 'original' as const
          }
        },
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
        type: 'time' as const,
        time: {
          unit: 'month' as const
        },
        suggestedMin: DateTime.now().minus({ years: 1 }).toISO(),
        suggestedMax: DateTime.now().toISO()
      }
    },
    annotations: graphEvents
  };

  const data = () => {
    return {
      labels: graphDates,
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
    <div className='card w-100'>
      <div className='card-header d-flex justify-content-between'>
        <h3>General Overview Statistics</h3>
        <div>
          <button
            className='btn btn-outline-primary mr-2 active'
            onClick={resetZoom}
          >
            Reset
          </button>
          <button
            className='btn btn-outline-primary mr-2'
            onClick={handleOneYearFilter}
          >
            Last Year
          </button>
          <button
            className='btn btn-outline-primary mr-2'
            onClick={handleOneQuarterFilter}
          >
            Last Quarter
          </button>
          <button
            className='btn btn-outline-primary mr-2'
            onClick={handleOneMonthFilter}
          >
            Last Month
          </button>
          <DateRangePicker onChange={onDatePick}></DateRangePicker>
        </div>
      </div>
      <div
        className='card-body d-flex justify-content-center'
        style={{ maxHeight: '70%' }}
      >
        <Line
          options={options}
          data={data()}
          ref={chartRef}
          style={{ maxHeight: '100%' }}
        ></Line>
      </div>
      <div
        className='card-footer d-flex justify-content-end'
        style={{ padding: '0', margin: '0' }}
      >
        <p
          className='text-primary'
          style={{ padding: '15px', marginRight: '10px', cursor: 'pointer' }}
        >
          Expand <ExpandIcon />
        </p>
      </div>
    </div>
  );
};

export default GeneralStatisticsGraph;
