import React from 'react';
import { ArcElement, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ReactComponent as ExpandIcon } from '../../assets/icons/refracto/arrow_right_alt.svg';
import projectList from '../../db/projectListV2.json';

import './style.scss';

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
    datasets: [
      {
        data: projectList.map((pl) => pl.minCrowdfundingTarget),
        backgroundColor: projectList.map((pl) => hexToRgbString(pl.colorCode))
      }
    ]
  };

  const chartOptions = {
    plugins: {
      title: {
        display: false,
        text: 'Test title',
        align: 'start' as const
      },
      legend: {
        display: false,
        position: 'bottom' as const
      }
    },
    cutout: '80%',
    radius: '100%',
    responsive: true
  };

  return (
    <div className='card'>
      <div className='card-body row'>
        <h3>
          <strong>Proportion of Investments</strong>
        </h3>
        <div className='donut-container d-flex justify-content-center'>
          <Doughnut data={chartData} options={chartOptions} />
          <div className='donut-hole-text'>
            <label>Total Investment</label>
            <label className='fat-number'>€789,096</label>
          </div>
        </div>
        <h4>
          <strong>Projects (Mock Data)</strong>
          <div className='projects-list container'>
            {chartData.labels.map((label, idx) => {
              const color = chartData.datasets[0].backgroundColor[idx];
              const roi = '123%';
              const invested = '€12345';
              return (
                <div className='row' key={idx}>
                  <div
                    className='p-0 col-1 mt-auto mb-auto'
                    style={{
                      backgroundColor: color,
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px'
                    }}
                  ></div>
                  <div className='col-6'>{label}</div>
                  <div className='col'>{roi}</div>
                  <div className='col' style={{ fontWeight: '600' }}>
                    {invested}
                  </div>
                </div>
              );
            })}
          </div>
        </h4>
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
