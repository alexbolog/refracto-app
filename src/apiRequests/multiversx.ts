import axios from 'axios';

export const getAccountEsdtBalance = async (address: string, token: string) => {
  const url = `https://devnet-api.multiversx.com/accounts/${address}/tokens/${token}`;
  const { data, status } = await axios.get(url);
  if (status !== 200) {
    return '0';
  }
  return data.balance;
};
