import React, { useContext } from 'react';
import { ArcElement, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import './style.scss';
import { toLocaleStringOptions } from '../../config';
import { Investment } from '../../types/accountTypes';
import ExpandFooter from '../ExpandFooter';
import DonutChartOptions from './donutChartOptions';
import DonutProjectList from './donutProjectList';

const DonutChartStatisticsCard = ({
  investments,
  title
}: {
  investments: Investment[] | undefined;
  title: string;
}) => {
  const [isExpanded, setExpanded] = React.useState(false);

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

  const totalInvested = investments
    ?.map((project) => project.projectInfo.crowdfundedAmount)
    .reduce((partialSum, crtAmount) => partialSum + crtAmount, 0);

  const chartData = {
    labels: investments?.map((pl) => pl?.projectInfo?.projectTitle),
    datasets: [
      {
        data: investments?.map((pl) => pl?.projectInfo?.crowdfundedAmount),
        backgroundColor: investments?.map((pl) =>
          hexToRgbString(pl?.projectInfo?.colorCodeHex)
        )
      }
    ]
  };

  return (
    <div className='card'>
      <div className='card-body row'>
        <h3>
          <strong>{title}</strong>
        </h3>
        <div className='donut-container d-flex justify-content-center'>
          <Doughnut data={chartData} options={DonutChartOptions} />
          <div className='donut-hole-text'>
            <label>Total Investment</label>
            <label className='fat-number'>
              €{totalInvested?.toLocaleString(undefined, toLocaleStringOptions)}
            </label>
          </div>
        </div>
        <DonutProjectList
          chartData={chartData}
          investments={investments}
          expanded={isExpanded}
        />
      </div>
      <ExpandFooter onExpandToggle={() => setExpanded(!isExpanded)} />
    </div>
  );
};

export default DonutChartStatisticsCard;
