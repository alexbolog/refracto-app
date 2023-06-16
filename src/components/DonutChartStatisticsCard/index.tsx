import React, { useContext } from 'react';
import { ArcElement, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import './style.scss';
import ExpandFooter from '../ExpandFooter';
import { toLocaleStringOptions } from '../../config';
import DonutChartOptions from './donutChartOptions';
import DonutProjectList from './donutProjectList';
import { AccountContext } from '../../contexts/AccountContext';

const DonutChartStatisticsCard = () => {
  const [isExpanded, setExpanded] = React.useState(false);

  const { activeProjectInvestments } = useContext(AccountContext);
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

  return (
    <div className='card'>
      <div className='card-body row'>
        <h3>
          <strong>Proportion of Investments</strong>
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
          activeProjectInvestments={activeProjectInvestments}
          expanded={isExpanded}
        />
      </div>
      <ExpandFooter onExpandToggle={() => setExpanded(!isExpanded)} />
    </div>
  );
};

export default DonutChartStatisticsCard;
