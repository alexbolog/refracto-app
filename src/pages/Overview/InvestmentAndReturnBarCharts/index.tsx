import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import ProjectInvestmentHistory from '../../../types/projectInvestmentHistory';
import { useGetProjectInvestmentHistory } from '../../../contexts/InvestmentHistory/hooks/useGetProjectInvestmentHistory';
import { InvestmentEvent } from '../../../types/investmentEvent';
import { ApexOptions } from 'apexcharts';
import { InvestmentEventType, isProjectStatusActive } from '../../../enums';
import Sidebar from './sidebar';
import { toLocaleStringOptions } from '../../../config';

import './style.scss';
import ToggleSwitch from '../../../components/ToggleSwitch';
import { RatingSelect } from '../../AvailableProjects/Filters/FilterBox/RatingSelect';

interface SeriesData {
  name: string;
  data: number[];
}

const InvestmentAndReturnBarCharts = () => {
  const chartRef = React.useRef<any>(null);
  const [showArchivedProjects, setShowArchivedProjects] = React.useState(false);

  const [projectNames, setProjectNames] = React.useState<string[]>([]);
  const [investedTotal, setInvestedTotal] = React.useState<number>(0);
  const [roiTotal, setRoiTotal] = React.useState<number>(0);
  const projectInvestments: ProjectInvestmentHistory[] =
    useGetProjectInvestmentHistory();
  // Prepare data for the chart
  const initialSeries = [
    { name: 'Invested', data: [] },
    { name: 'Return on Investment', data: [] }
  ];

  const initialOptions: ApexOptions = {
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
      categories: []
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

  const [series, setSeries] = React.useState<SeriesData[]>(initialSeries);
  const [options, setOptions] = React.useState<ApexOptions>({});
  let tempInvestedTotal = 0;
  let tempRoiTotal = 0;
  const tempProjectNamesToShow: string[] = [];

  useEffect(() => {
    projectInvestments
      .filter(
        (crtProjectHistory: ProjectInvestmentHistory) =>
          showArchivedProjects ||
          isProjectStatusActive(crtProjectHistory.status)
      )
      .forEach((crtProjectHistory: ProjectInvestmentHistory) => {
        let invested = 0;

        const newSeries: SeriesData[] = initialSeries;
        const newOptions: ApexOptions = initialOptions;

        crtProjectHistory.investments.forEach(
          (crtInvestment: InvestmentEvent) => {
            if (crtInvestment.eventType === InvestmentEventType.INVEST) {
              if (crtInvestment.committedDifference) {
                invested += crtInvestment.committedDifference;
              }
            }
          }
        );

        const roi = invested * crtProjectHistory.returnPercentage;

        tempInvestedTotal += invested;
        tempRoiTotal += roi;
        tempProjectNamesToShow.push(crtProjectHistory.projectTitle);

        newOptions.xaxis?.categories.push(crtProjectHistory.projectTitle);
        newSeries[0].data.push(invested);
        newSeries[1].data.push(roi);

        setSeries(newSeries);
        setOptions(newOptions);
        setProjectNames(tempProjectNamesToShow);
      });
    setInvestedTotal(tempInvestedTotal);
    setRoiTotal(tempRoiTotal);
  }, [showArchivedProjects]);

  const toggleSeries = (seriesName: string) => {
    chartRef.current?.chart.toggleSeries(seriesName);
  };

  // const setProjectVisibility = (
  //   projectName: string,
  //   visible: boolean
  // ): void => {
  //   // hide the x-axis category with the same name
  //   const tempOptions = options;
  //   if (visible) {
  //     tempOptions.xaxis?.categories.push(projectName);
  //   } else {
  //     const foundCategoryIndex = options.xaxis?.categories.findIndex(
  //       (crtCategory: string) => crtCategory === projectName
  //     );
  //     if (foundCategoryIndex !== undefined && foundCategoryIndex !== -1) {
  //       tempOptions.xaxis?.categories.splice(foundCategoryIndex, 1);
  //     }
  //   }
  //   setOptions(tempOptions);
  // };

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h3>Investments and Returns</h3>
          <div className='barchart-filter-container'>
            <label className='archived-switch-label'>
              Show Archived Projects
            </label>
            <ToggleSwitch
              checked={showArchivedProjects}
              onChange={setShowArchivedProjects}
            />
            {/*<RatingSelect onChange={() => {}} />*/}
          </div>
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
