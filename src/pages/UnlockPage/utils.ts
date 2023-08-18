import { getSupabaseAuthHeaders } from 'apiRequests/backend/accountApi';
import axios from 'axios';
import { environment } from 'config';
import {
  WALLET_PROVIDER_DEVNET,
  WALLET_PROVIDER_MAINNET,
  WALLET_PROVIDER_TESTNET
} from '@multiversx/sdk-web-wallet-provider';
export async function validateConnection(
  address: string,
  authToken: string,
  signature: string
): Promise<boolean> {
  try {
    return await getSupabaseAuthHeaders(address, authToken, signature);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getWalletProviderEnv = () => {
  switch (environment) {
    case 'devnet':
      return WALLET_PROVIDER_DEVNET;
    case 'mainnet':
      return WALLET_PROVIDER_MAINNET;
    case 'testnet':
      return WALLET_PROVIDER_TESTNET;
    default:
      throw new Error('Invalid environment in config');
  }
};

export const getChainId = () => {
  switch (environment) {
    case 'devnet':
      return 'D';
    case 'mainnet':
      return '1'; // Mainnet Chain ID
    case 'testnet':
      return 'T'; // Testnet Chain ID
    default:
      throw new Error('Invalid environment in config');
  }
};
