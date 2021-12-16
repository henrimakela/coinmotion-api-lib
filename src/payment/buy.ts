import {
  createNonce,
  createSignature,
  createHeaders,
} from "../authentication/authentication";
import axios from "axios";

/**
 * Buy crypto with crypto
 * @param key The API Key
 * @param secret The API Secret generated for the account
 * @param cryptoCurrencyCode Cryptocurrency to buy. See rates for available currencies. If not given, will default to btc for backwards compatibility.
 * @param amountInBTC Amount in Sats
 * @returns
 */
export const buyWithCrypto = async (
  key: string,
  secret: string,
  cryptoCurrencyCode: string,
  amountInBTC: number
) => {
  const url = "https://api.coinmotion.com/v1/buy";
  const nonce: number = createNonce();
  const payload = {
    nonce,
    amount_btc: amountInBTC,
    currency_code: cryptoCurrencyCode,
  };
  const signature: string = createSignature(payload, secret);
  const headers = createHeaders(key, signature);

  const response = await axios.post(url, payload, { headers });
  return response;
};

/**
 * Buy crypto with fiat
 * @param key The API Key
 * @param secret The API Secret generated for the account
 * @param cryptoCurrencyCode Cryptocurrency to buy. See rates for available currencies. If not given, will default to btc for backwards compatibility.
 * @param amountInFiat Amount in user’s currency in cents
 * @returns
 */
export const buyWithFiat = async (
  key: string,
  secret: string,
  cryptoCurrencyCode: string,
  amountInFiat: number
) => {
  const url = "https://api.coinmotion.com/v1/buy";
  const nonce: number = createNonce();
  const payload = {
    nonce,
    amount_cur: amountInFiat,
    currency_code: cryptoCurrencyCode,
  };
  const signature: string = createSignature(payload, secret);
  const headers = createHeaders(key, signature);

  const response = await axios.post(url, payload, { headers });
  return response;
};
