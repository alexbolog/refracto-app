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
import Dropdown from '../../../components/Dropdown';

interface SeriesData {
  name: string;
  data: number[];
}

const InvestmentAndReturnBarCharts = () => {
  const chartRef = React.useRef<any>(null);
  const [showArchivedProjects, setShowArchivedProjects] = React.useState(false);

  const [allProjects, setAllProjects] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [filteredProjects, setFilteredProjects] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [investedTotal, setInvestedTotal] = React.useState<number>(0);
  const [roiTotal, setRoiTotal] = React.useState<number>(0);
  const projectInvestments: ProjectInvestmentHistory[] =
    useGetProjectInvestmentHistory();

  const [series, setSeries] = React.useState<SeriesData[]>([]);
  const [options, setOptions] = React.useState<ApexOptions>({});

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

  useEffect(() => {
    const newProjects = projectInvestments
      .filter(
        (crtProjectHistory: ProjectInvestmentHistory) =>
          showArchivedProjects ||
          isProjectStatusActive(crtProjectHistory.status)
      )
      .map((crtProjectHistory: ProjectInvestmentHistory) => ({
        label: crtProjectHistory.projectTitle,
        value: crtProjectHistory.projectId
      }));
    setAllProjects(newProjects);
    setFilteredProjects(newProjects);
  }, [showArchivedProjects]);

  useEffect(() => {
    let tempInvestedTotal = 0;
    let tempRoiTotal = 0;
    projectInvestments
      .filter((crtProjectHistory: ProjectInvestmentHistory) =>
        filteredProjects.some(
          (project) => project.value === crtProjectHistory.projectId
        )
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

        newOptions.xaxis?.categories.push(crtProjectHistory.projectTitle);
        newSeries[0].data.push(invested);
        newSeries[1].data.push(roi);

        setSeries(newSeries);
        setOptions(newOptions);
      });
    setInvestedTotal(tempInvestedTotal);
    setRoiTotal(tempRoiTotal);
  }, [filteredProjects]);

  const toggleSeries = (seriesName: string) => {
    chartRef.current?.chart.toggleSeries(seriesName);
  };

  const onFilterChange = (selectedProjectNames: string[]) => {
    const newFilteredProjects = allProjects.filter((project) =>
      selectedProjectNames.includes(project.value)
    );
    setFilteredProjects(newFilteredProjects);
  };

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
            <Dropdown
              options={allProjects}
              onChange={onFilterChange}
              label={'Select Projects'}
            />
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
