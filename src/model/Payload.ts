export interface FiatPayload {
  nonce: number;
  amount_cur: number;
  currency_code: string;
}

export interface CryptoPayload {
  nonce: number;
  amount_btc: number;
  currency_code: string;
}

export interface BalancePayload {
  nonce: number;
  parameters: any;
}

export const createBalancePayload = (
  nonce: number,
  parameters: any = {}
): BalancePayload => {
  return { nonce, parameters };
};

export const createFiatPayload = (
  nonce: number,
  amountCur: number,
  currencyCode: string
): FiatPayload => {
  return {
    nonce,
    amount_cur: amountCur,
    currency_code: currencyCode,
  };
};

export const createCryptoPayload = (
  nonce: number,
  amountBTC: number,
  currencyCode: string
): CryptoPayload => {
  return {
    nonce,
    amount_btc: amountBTC,
    currency_code: currencyCode,
  };
};
