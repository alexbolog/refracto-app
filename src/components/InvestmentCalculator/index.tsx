import moment from 'moment';
import React from 'react';
import Slider from 'react-input-slider';

const InvestmentCalculator = ({
  projectDetails,
  onInvestmentAmountChange,
  pricePerShare
}: {
  projectDetails: any;
  onInvestmentAmountChange?: (newAmount: number) => void;
  pricePerShare: number;
}) => {
  const [investAmount, setInvestAmount] = React.useState(0);

  const forecastEarnings = () => {
    const monthsUntilDeadline =
      (projectDetails.deadline - moment.now()) / (30 * 24 * 3600 * 1000); // 30 days of 24 hrs, each made of 3600 * 1000 ms
    const monthlyEarnings =
      (investAmount * projectDetails.forecastedAPR) / 100 / 12;
    return investAmount + monthlyEarnings * monthsUntilDeadline;
  };

  const handleInvestmentSliderChange = (amount: number) => {
    if (onInvestmentAmountChange) {
      onInvestmentAmountChange(amount);
    }
    setInvestAmount(amount);
  };

  return (
    <>
      <div className='row mb-1'>
        <div className='col-lg-12 d-flex justify-content-center'>
          Shares to receive: {investAmount / pricePerShare}
        </div>
      </div>
      <div className='row mb-1'>
        <div className='col-lg-12 d-flex justify-content-center'>
          Amount to receive when contract is over:{' '}
          {forecastEarnings().toLocaleString()} $
        </div>
      </div>
      <div className='row mb-1'>
        <div className='col-lg-12 d-flex justify-content-center'>
          <Slider
            axis='x'
            x={investAmount}
            xmin={0}
            xmax={1000}
            onChange={(v) => handleInvestmentSliderChange(v.x)}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-lg-12 d-flex justify-content-center'>
          Amount to invest: {investAmount} $
        </div>
      </div>
    </>
  );
};

export default InvestmentCalculator;
