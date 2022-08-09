import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { NUMBER_OF_SHARES_PER_PROJECT } from 'config';
import moment from 'moment';
import React from 'react';
import Slider from 'react-input-slider';
import InvestModalInput from './InvestModalInput';
import InvestModalPaperwork from './InvestModalPaperwork';

const InvestModal = ({
  projectDetails,
  closeModal
}: {
  projectDetails: any;
  closeModal: () => void;
}) => {
  const { address } = useGetAccountInfo();
  const loggedIn = Boolean(address);
  const [didMount, setDidMount] = React.useState(false);
  const [displayPaperwork, setDisplayPaperwork] = React.useState(false);
  const [pricePerShare, setPricePerShare] = React.useState(0);
  const [remainingShares, setRemainingShares] = React.useState(0);
  const [investmentAmount, setInvestmentAmount] = React.useState(0);

  React.useEffect(() => {
    setPricePerShare(
      projectDetails.crowdfundingTarget / NUMBER_OF_SHARES_PER_PROJECT
    );
    setRemainingShares(
      (1 - projectDetails.progress) * NUMBER_OF_SHARES_PER_PROJECT
    );
    setDidMount(true);
  }, []);

  const handleNavigateForward = (inputInvestAmount: number) => {
    setInvestmentAmount(inputInvestAmount);
    console.log(inputInvestAmount);
    setDisplayPaperwork(true);
  };

  const handleNavigateBack = () => {
    setDisplayPaperwork(false);
  };

  const handleUserAgreement = () => {
    window.alert('user agreed to buy');
  };

  return !didMount ? null : displayPaperwork ? (
    <InvestModalPaperwork
      projectDetails={projectDetails}
      closeModal={closeModal}
      canProceed={loggedIn}
      onNavigateBack={handleNavigateBack}
      onUserAgreement={handleUserAgreement}
      pricePerShare={pricePerShare}
      sharesToReceive={investmentAmount / pricePerShare}
      investmentAmount={investmentAmount}
    />
  ) : (
    <InvestModalInput
      projectDetails={projectDetails}
      closeModal={closeModal}
      canProceed={loggedIn}
      onProceed={handleNavigateForward}
      pricePerShare={pricePerShare}
      remainingShares={remainingShares}
    />
  );
};

export default InvestModal;
