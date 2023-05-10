import * as React from 'react';
import ProjectInvestmentEvent from '../../../types/projectInvestmentEvent';
import { useGetProjectInvestmentHistory } from '../../../contexts/InvestmentHistory/hooks/useGetProjectInvestmentHistory';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  Tooltip
} from 'chart.js';

const InvestmentAndReturnBarCharts = () => {
  Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip
  );
  const projectInvestments: ProjectInvestmentEvent[] =
    useGetProjectInvestmentHistory();
  const emptyChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Invested',
        data: [],
        backgroundColor: '#6853E8'
      },
      {
        label: 'Profit',
        data: [],
        backgroundColor: '#FFA600'
      }
    ]
  };

  const [chartData, setChartData] = useState(emptyChartData);

  useEffect(() => {
    const newChartData = { ...emptyChartData };

    debugger;
    projectInvestments.forEach((project) => {
      let invested = 0;
      debugger;

      project.investments.forEach((investment) => {
        if (investment.eventType === 'INVEST') {
          debugger;
          if (investment.committedDifference) {
            invested += investment.committedDifference;
          }
        }
      });

      const profit = invested * project.returnPercentage;

      newChartData.labels!.push(project.projectTitle);
      (newChartData.datasets[0].data as number[]).push(invested);
      (newChartData.datasets[1].data as number[]).push(profit);
    });

    setChartData(newChartData);
  }, []);

  return (
    <div className='col-sm-12'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h3>Investments and Returns</h3>
        </div>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default InvestmentAndReturnBarCharts;
