import React from 'react';
import Chart from 'react-apexcharts';
import ProjectInvestmentHistory from '../../../types/projectInvestmentHistory';
import { useGetProjectInvestmentHistory } from '../../../contexts/InvestmentHistory/hooks/useGetProjectInvestmentHistory';
import { InvestmentEvent } from '../../../types/investmentEvent';
import { ApexOptions } from 'apexcharts';
import { INVESTMENT_EVENT_TYPE } from '../../../enums';
import Sidebar from './sidebar';
import { toLocaleStringOptions } from '../../../config';
import { DateTime } from 'luxon';
import Switch from 'react-switch';

interface SeriesData {
  name: string;
  data: number[];
}

const InvestmentAndReturnBarCharts = () => {
  const chartRef = React.useRef<any>(null);
  const [showArchivedProjects, setShowArchivedProjects] = React.useState(false);

  const projectInvestments: ProjectInvestmentHistory[] =
    useGetProjectInvestmentHistory();
  // Prepare data for the chart
  const series: SeriesData[] = [
    { name: 'Invested', data: [] },
    { name: 'Return on Investment', data: [] }
  ];
  const categories: string[] = [];

  let tempInvestedTotal = 0;
  let tempRoiTotal = 0;

  projectInvestments.forEach((crtProjectHistory: ProjectInvestmentHistory) => {
    let invested = 0;

    crtProjectHistory.investments.forEach((crtInvestment: InvestmentEvent) => {
      if (crtInvestment.eventType === INVESTMENT_EVENT_TYPE.INVEST) {
        if (crtInvestment.committedDifference) {
          invested += crtInvestment.committedDifference;
        }
      }
    });

    const roi = invested * crtProjectHistory.returnPercentage;

    tempInvestedTotal += invested;
    tempRoiTotal += roi;

    categories.push(crtProjectHistory.projectTitle);
    series[0].data.push(invested);
    series[1].data.push(roi);
  });

  const [investedTotal, setInvestedTotal] =
    React.useState<number>(tempInvestedTotal);
  const [roiTotal, setRoiTotal] = React.useState<number>(tempRoiTotal);

  const toggleSeries = (seriesName: string) => {
    chartRef.current?.chart.toggleSeries(seriesName);
  };

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
      // stacked: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: '5px',
        borderRadiusApplication: 'end',
        rangeBarGroupRows: false
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories
    },
    yaxis: {
      title: {
        text: 'Amount'
      },
      labels: {
        formatter: (num) => num.toLocaleString(undefined, toLocaleStringOptions)
      }
    },
    title: {
      text: 'Investment and Profit per Project',
      align: 'left'
    },
    colors: ['#6853E8', '#FFA600', '#FF6B45']
  };

  function resetZoom() {
    console.log('reset zoom');
  }
  function onDatePick(startDate: DateTime, endDate?: DateTime) {
    console.log('date pick', startDate, endDate);
  }

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h3>Investments and Returns</h3>
          <Switch
            checked={showArchivedProjects}
            onChange={setShowArchivedProjects}
            checkedIcon={false}
            uncheckedIcon={false}
            handleDiameter={24}
            offColor='#D5DFE7'
            offHandleColor='#6F869B'
            onColor='#E0E4FF'
            onHandleColor='#6853E8'
            draggable={true}
            className={'archived-switch'}
          />
        </div>
        <div className='card-body row'>
          <Chart
            ref={chartRef}
            options={options}
            series={series}
            type='bar'
            height={350}
            className='col-9'
          />
          <Sidebar
            toggleSeriesHandler={toggleSeries}
            investedTotal={investedTotal}
            roiTotal={roiTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentAndReturnBarCharts;
