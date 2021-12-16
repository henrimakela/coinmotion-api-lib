import { HmacSHA512 } from "crypto-js";
import axios from "axios";
import RatesResponse from "./model/RatesResponse";
import TradingPair from "./model/TradingPair";
export interface Payload {
  nonce: number;
  parameters: any;
}

export const createNonce = (): number => {
  return new Date().getTime();
};

export const createHeaders = (key: string, signature: string) => {
  return {
    "Content-Type": "application/json",
    "X-COINMOTION-APIKEY": key,
    "X-COINMOTION-SIGNATURE": signature,
  };
};

export const createSignature = (payload, secret): string => {
  return HmacSHA512(JSON.stringify(payload), secret).toString();
};

export const createPayload = (nonce: number, parameters: any = {}): Payload => {
  return { nonce, parameters };
};

export const getBalances = async (key: string, secret: string) => {
  const nonce: number = createNonce();
  const payload: Payload = createPayload(nonce);
  const signature: string = createSignature(payload, secret);
  const headers = createHeaders(key, signature);

  const url = "https://api.coinmotion.com/v1/balances";
  const response = await axios.post(url, payload, { headers });
  return response.data.payload;
};

export const getRates = async () => {
  const response = await axios.get("https://api.coinmotion.com/v2/rates");
  return response.data.payload;
};

/**
 * A function for converting the response from the server to more readable and typed response.
 * @param data raw json response
 * @returns RatesResponse
 */
const constructRatesResponse = (data: any): RatesResponse => {
  let res = {
    market: data.market,
    fWithdrawalFee: data.fWithdrawalFee,
    timestamp: data.timestamp,
    version: data.version,
    pairs: [],
  };

  delete data.market;
  delete data.fWithdrawalFee;
  delete data.timestamp;
  delete data.version;

  let tradingPairs: TradingPair[] = Object.entries<TradingPair>(data).map(
    ([key, value]) => value
  );
  res.pairs = tradingPairs;

  return res;
};
