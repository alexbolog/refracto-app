const DonutChartOptions = {
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

export default DonutChartOptions;
