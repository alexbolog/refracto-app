import React from 'react';
import scAbi from '../../abi/loan-crowdfund-sc.abi.json';
import faucetScAbi from '../../abi/demo-usdc-faucet.abi.json';

import {
  AbiRegistry,
  Address,
  SmartContract,
  SmartContractAbi
} from '@multiversx/sdk-core/out';
import { DEMO_USDC_FAUCET_SC_ADDRESS, contractAddress } from 'config';

const getContract = (abiJson: any, address: string) => {
  const abiRegistry = AbiRegistry.create(abiJson);
  const abi = new SmartContractAbi(abiRegistry);
  const contract = new SmartContract({
    address: new Address(address),
    abi
  });

  return contract;
};

export const useGetSmartContract = () => {
  return getContract(scAbi, contractAddress);
};

export const useGetFaucetSmartContract = () => {
  return getContract(faucetScAbi, DEMO_USDC_FAUCET_SC_ADDRESS);
};
