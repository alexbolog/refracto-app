import React, { useContext } from 'react';
import { ArcElement, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import './style.scss';
import ExpandFooter from '../ExpandFooter';
import { toLocaleStringOptions } from '../../config';
import { GeneralContext } from '../../contexts/GeneralContext';

const DonutChartStatisticsCard = () => {
  const { activeProjectInvestments } = useContext(GeneralContext);
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

  const totalInvested = activeProjectInvestments
    ?.map((project) => project.amountInvested)
    .reduce((partialSum, crtAmount) => partialSum + crtAmount, 0);

  const chartData = {
    labels: activeProjectInvestments?.map((pl) => pl.projectTitle),
    datasets: [
      {
        data: activeProjectInvestments?.map((pl) => pl.amountInvested),
        backgroundColor: activeProjectInvestments!.map((pl) =>
          hexToRgbString(pl.colorCodeHex)
        )
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
            <label className='fat-number'>
              €{totalInvested?.toLocaleString(undefined, toLocaleStringOptions)}
            </label>
          </div>
        </div>
        <h4>
          <strong>Projects</strong>
        </h4>
        <div className='projects-list container ml-3 mt-2'>
          {chartData.labels?.map((label, idx) => {
            const color = chartData.datasets[0].backgroundColor[idx];
            const roi =
              activeProjectInvestments![idx].returnPercentage.toLocaleString(
                undefined,
                toLocaleStringOptions
              ) + '%';
            const invested =
              '€' +
              activeProjectInvestments![idx].amountInvested.toLocaleString(
                undefined,
                toLocaleStringOptions
              );
            return (
              <div className='row' key={idx}>
                <div
                  className='col color-box p-0 col-1 mt-auto mb-auto'
                  style={{
                    backgroundColor: color
                  }}
                ></div>
                <div className='col col-xl-5 col-11'>{label}</div>
                <div className='col col-4 col-xl-3'>{roi}</div>
                <div className='col invested-number col-8 col-xl-3 text-blugray-4'>
                  {invested}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ExpandFooter />
    </div>
  );
};

export default DonutChartStatisticsCard;
