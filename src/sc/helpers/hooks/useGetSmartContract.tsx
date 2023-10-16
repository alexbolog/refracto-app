import React from 'react';
import scAbi from '../../abi/loan-crowdfund-sc.abi.json';
import {
  AbiRegistry,
  Address,
  SmartContract,
  SmartContractAbi
} from '@multiversx/sdk-core/out';
import { contractAddress } from 'config';

export const useGetSmartContract = () => {
  const getContract = () => {
    const abiRegistry = AbiRegistry.create(scAbi);
    const abi = new SmartContractAbi(abiRegistry);
    const contract = new SmartContract({
      address: new Address(contractAddress),
      abi
    });

    return contract;
  };

  return getContract;
};
