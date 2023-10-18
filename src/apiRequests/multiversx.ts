import axios from 'axios';
import { REFRACTO_LOAN_SHARE_TOKEN_ID } from 'config';

export const getAccountEsdtBalance = async (address: string, token: string) => {
  const url = `https://devnet-api.multiversx.com/accounts/${address}/tokens/${token}`;
  const { data, status } = await axios.get(url);
  if (status !== 200) {
    return '0';
  }
  return data.balance;
};

export const getAccountSharesBalance = async (address: string) => {
  const url = `https://devnet-api.multiversx.com/accounts/${address}/nfts?collections=${REFRACTO_LOAN_SHARE_TOKEN_ID}`;
  const { data, status } = await axios.get(url);
  if (status !== 200) {
    return [];
  }
  return data;
};

export const getLoanShareHoldersAmount = async (nonce: number) => {
  let hexNonce = nonce.toString(16);
  if (hexNonce.length % 2 === 1) {
    hexNonce = '0' + hexNonce;
  }
  console.log('NONCE', nonce);
  const url = `https://devnet-api.multiversx.com/nfts/${REFRACTO_LOAN_SHARE_TOKEN_ID}-${hexNonce}/accounts/count`;
  const { data, status } = await axios.get(url);
  if (status !== 200) {
    return 0;
  }
  return parseInt(data);
};
