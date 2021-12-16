import {
  createNonce,
  createSignature,
  createHeaders,
} from "../authentication/authentication";
import {
  FiatPayload,
  CryptoPayload,
  createFiatPayload,
  createCryptoPayload,
} from "../model/Payload";
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
  let response;
  try {
    const url = "https://api.coinmotion.com/v1/buy";
    const nonce: number = createNonce();
    const payload: CryptoPayload = createCryptoPayload(
      nonce,
      amountInBTC,
      cryptoCurrencyCode
    );
    const signature: string = createSignature(payload, secret);
    const headers = createHeaders(key, signature);
    const response = await axios.post(url, payload, { headers });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (err) {
    throw err;
  }
  return response.data;
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
  let response;
  try {
    const url = "https://api.coinmotion.com/v1/buy";
    const nonce: number = createNonce();
    const payload: FiatPayload = createFiatPayload(
      nonce,
      amountInFiat,
      cryptoCurrencyCode
    );
    const signature: string = createSignature(payload, secret);
    const headers = createHeaders(key, signature);
    response = await axios.post(url, payload, { headers });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (err) {
    throw err;
  }
  return response.data;
};
