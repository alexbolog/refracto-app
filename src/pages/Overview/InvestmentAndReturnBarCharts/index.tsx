import React from 'react';
import Chart from 'react-apexcharts';
import ProjectInvestmentEvent from '../../../types/projectInvestmentEvent';
import { useGetProjectInvestmentHistory } from '../../../contexts/InvestmentHistory/hooks/useGetProjectInvestmentHistory';
import { InvestmentEvent } from '../../../types/investmentEvent';
import { ApexOptions } from 'apexcharts';
import { INVESTMENT_EVENT_TYPE } from '../../../enums';
import Sidebar from './sidebar';

interface SeriesData {
  name: string;
  data: number[];
}

const InvestmentAndReturnBarCharts = () => {
  const projectInvestments: ProjectInvestmentEvent[] =
    useGetProjectInvestmentHistory();
  // Prepare data for the chart
  const series: SeriesData[] = [
    { name: 'Invested', data: [] },
    { name: 'Profit', data: [] }
  ];
  const categories: string[] = [];

  projectInvestments.forEach((project: ProjectInvestmentEvent) => {
    let invested = 0;
    let profit = 0;

    project.investments.forEach((investment: InvestmentEvent) => {
      if (investment.eventType === INVESTMENT_EVENT_TYPE.INVEST) {
        if (investment.committedDifference) {
          invested += investment.committedDifference;
        }
      }
    });

    profit = invested * project.returnPercentage;

    categories.push(project.projectTitle);
    series[0].data.push(invested);
    series[1].data.push(profit);
  });

  // TODO: disable series invested/profit on click
  // chart.toggleSeries('Income');

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
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
      }
    },
    title: {
      text: 'Investment and Profit per Project',
      align: 'left'
    },
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']
  };

  return (
    <div className='col-sm-12'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h3>Investments and Returns</h3>
        </div>
        <div id='card-body'>
          <Chart options={options} series={series} type='bar' height={350} />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default InvestmentAndReturnBarCharts;
