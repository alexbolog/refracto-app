import './style.scss';
import * as React from 'react';
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
import DateRangePicker from '../../../components/DateRangePicker';
import { formatDate } from '../../../utils';
import ExpandFooter from '../../../components/ExpandFooter';
import { InvestmentEvent } from '../../../types/investmentEvent';
import { toLocaleStringOptions } from '../../../config';
import useGetInvestmentHistory from '../../../contexts/InvestmentHistory/hooks/useGetInvestmentHistory';
import { InvestmentEventType } from '../../../enums';
import GraphDateFilters from '../../../components/GraphDateFilters';

const GeneralStatisticsGraph = () => {
  const dashboardGraph: InvestmentEvent[] = useGetInvestmentHistory();

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

  const chartRef = React.useRef<any>(null);

  const onDatePick = (
    startDate: DateTime,
    endDate: DateTime = DateTime.now()
  ) => {
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

  const mapDashboardData = async (dashboardData: InvestmentEvent[]) => {
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

  const getAnnotationForEvent = (el: InvestmentEvent) => {
    switch (el.eventType) {
      case InvestmentEventType.INVEST: {
        return {
          label:
            'Invested ' +
            el.committedDifference?.toLocaleString(
              undefined,
              toLocaleStringOptions
            ) +
            '$',
          color: '#6853e8'
        };
      }
      case InvestmentEventType.PAYOUT: {
        return {
          label:
            'Payout ' +
            el.availableDifference?.toLocaleString(
              undefined,
              toLocaleStringOptions
            ) +
            '$',
          color: '#63b179'
        };
      }
      case InvestmentEventType.DEPOSIT: {
        return {
          label:
            'Deposited ' +
            el.availableDifference?.toLocaleString(
              undefined,
              toLocaleStringOptions
            ) +
            '$',
          color: '#1586D1'
        };
      }
      case InvestmentEventType.WITHDRAW: {
        return {
          label:
            'Withdrew ' +
            (el.availableDifference
              ? -el.availableDifference
              : -1
            ).toLocaleString(undefined, toLocaleStringOptions) +
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
            return formatDate(
              graphDates[crtElement[0].dataIndex],
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
    <div className='col-12'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h3>General Overview Statistics</h3>
          <GraphDateFilters onReset={resetZoom} onDatePick={onDatePick} />
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
        <ExpandFooter />
      </div>
    </div>
  );
};

export default GeneralStatisticsGraph;
