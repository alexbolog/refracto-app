import { useGetSmartContract } from 'sc/helpers/hooks/useGetSmartContract';
import { useSendTransactionWrapper } from 'sc/helpers/hooks/useSendTransactionWrapper';

export const useCreateProject = () => {
  const contract = useGetSmartContract();
  const sendTx = useSendTransactionWrapper();

  const createProject = async ({
    projectId,
    projectName,
    projectPaymentToken,
    dailyInterestRate,
    dailyPenaltyFeeRate,
    developerWallet,
    sharePricePerUnit,
    cfStartTimestamp,
    cfEndTimestamp,
    cfTargetMin,
    cfTargetMax,
    loanDuration
  }: CreateProjectPayload) => {
    console.log('createProject', {
      projectId,
      projectName,
      projectPaymentToken,
      dailyInterestRate,
      dailyPenaltyFeeRate,
      developerWallet,
      sharePricePerUnit,
      cfStartTimestamp,
      cfEndTimestamp,
      cfTargetMin,
      cfTargetMax,
      loanDuration
    });
    const interaction = contract.methods
      .create([
        projectId,
        projectName,
        projectPaymentToken,
        dailyInterestRate,
        dailyPenaltyFeeRate,
        developerWallet,
        sharePricePerUnit,
        cfStartTimestamp,
        cfEndTimestamp,
        cfTargetMin,
        cfTargetMax,
        loanDuration
      ])
      .withGasLimit(35_000_000);

    await sendTx(interaction);
  };
  return createProject;
};

export interface CreateProjectPayload {
  projectId: number;
  projectName: string;
  projectPaymentToken: string;
  dailyInterestRate: number;
  dailyPenaltyFeeRate: number;
  developerWallet: string;
  sharePricePerUnit: number;
  cfStartTimestamp: number;
  cfEndTimestamp: number;
  cfTargetMin: number;
  cfTargetMax: number;
  loanDuration: number;
}
