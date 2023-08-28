import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export const environment: EnvironmentsEnum = EnvironmentsEnum.devnet;

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgq4gdcg0k83u7lpv4s4532w3au9y9h0vm70eqq6m8qk2';

export const dAppName = 'Refracto';
export const NUMBER_OF_SHARES_PER_PROJECT = 1_000_000;

export const toLocaleStringOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
};

export const toLocaleStringOptionsNoDecimals = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
};

// TODO: generate a new wallet connect id here: https://cloud.walletconnect.com/app
export const walletConnectV2ProjectId = '9b1a9564f91cb659ffe21b73d5c4e2d8';
export const relayUrl = 'wss://relay.walletconnect.com';
export const walletConnectDeepLink =
  'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://xportal.com/';
export const supabaseConfig = {
  url: 'https://ovzvepwxbmkdpomlubgd.supabase.co',
  // url: 'http://localhost:54321',
  anonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92enZlcHd4Ym1rZHBvbWx1YmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxNjY3NjUsImV4cCI6MjAwNDc0Mjc2NX0.zYKGpyf8FAYg0zN7mAmmCQu0EU6B5w_jYFEQdJ4cktk'
};
