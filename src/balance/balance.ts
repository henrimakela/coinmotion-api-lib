import axios from "axios";
import {
  Payload,
  createNonce,
  createSignature,
  createHeaders,
} from "../authentication/authentication";
import { BalancePayload, createBalancePayload } from "../model/Payload";

export const getBalances = async (key: string, secret: string) => {
  let response;
  try {
    const nonce: number = createNonce();
    const payload: BalancePayload = createBalancePayload(nonce);
    const signature: string = createSignature(payload, secret);
    const headers = createHeaders(key, signature);

    const url = "https://api.coinmotion.com/v1/balances";
    response = await axios.post(url, payload, { headers });
    if (!response.data.success) {
      throw Error(response.data.message);
    }
  } catch (err) {
    throw err;
  }
  return response.data.payload;
};

export const getRates = async () => {
  let response;
  try {
    response = await axios.get("https://api.coinmotion.com/v2/rates");
    if (!response.data.success) {
      throw Error(response.data.message);
    }
  } catch (err) {
    throw err;
  }
  return response.data.payload;
};
