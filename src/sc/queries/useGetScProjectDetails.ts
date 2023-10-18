import { ResultsParser } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetProxyProvider } from 'sc/helpers/hooks/useGetProxyProvider';
import { useGetSmartContract } from 'sc/helpers/hooks/useGetSmartContract';

export const useGetScProjectDetails = () => {
  const smartContract = useGetSmartContract();
  const proxy = useGetProxyProvider();
  const getProjectDetails = async (projectIds: number[]) => {
    const interaction = smartContract.methods
      .getProjectDetails(projectIds)
      .check();
    const query = await interaction.buildQuery();
    const queryResponse = await proxy.queryContract(query);
    const { firstValue, returnCode, returnMessage } =
      new ResultsParser().parseQueryResponse(
        queryResponse,
        interaction.getEndpoint()
      );
    if (!returnCode.isSuccess()) {
      console.error('Failed to get project details');
      return false;
    }
    return firstValue?.valueOf();
  };

  return getProjectDetails;
};
