import axios from "axios";
import {
  Payload,
  createNonce,
  createSignature,
  createPayload,
  createHeaders,
} from "../authentication/authentication";

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
