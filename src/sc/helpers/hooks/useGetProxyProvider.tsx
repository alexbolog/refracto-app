import React from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';

export const useGetProxyProvider = () => {
  const { chainID } = useGetNetworkConfig();
  const getProxyProvider = () => {
    return new ProxyNetworkProvider(getGatewayUrl());
  };

  const getGatewayUrl = () => {
    switch (chainID) {
      case '1':
        return 'https://gateway.multiversx.com';
      case 'T':
        return 'https://testnet-gateway.multiversx.com';
      case 'D':
      default:
        return 'https://devnet-gateway.multiversx.com';
    }
  };

  return getProxyProvider();
};
