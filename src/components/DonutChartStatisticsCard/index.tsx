import React from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ReactComponent as ExpandIcon } from '../../assets/icons/refracto/arrow_right_alt.svg';
import projectList from '../../db/projectListV2.json';

const DonutChartStatisticsCard = () => {
  Chart.register(ArcElement);
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };

  const hexToRgbString = (hex: string) => {
    const rgb = hexToRgb(hex);
    return `rgb(${rgb?.r}, ${rgb?.g}, ${rgb?.b})` ?? 'rgb(0,0,0)';
  };

  const chartData = {
    labels: projectList.map((pl) => pl.projectName),
    title: 'test',
    datasets: [
      {
        label: 'Test label',
        data: projectList.map((pl) => pl.minCrowdfundingTarget),
        backgroundColor: projectList.map((pl) => hexToRgbString(pl.colorCode))
      }
    ]
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Test title',
        align: 'start' as const
      },
      legend: {
        position: 'bottom' as const,
        display: true
      }
    }
  };

  return (
    <div className='card'>
      <div className='card-body row'>
        <div className='col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center'>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
      <div
        className='card-footer d-flex justify-content-end'
        style={{ padding: '0' }}
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

export default DonutChartStatisticsCard;
