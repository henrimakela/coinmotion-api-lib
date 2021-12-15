import { HmacSHA512 } from "crypto-js";

export interface Payload {
  nonce: number;
  parameters: any;
}

export const createNonce = (): number => {
  return new Date().getTime();
};

export const createHeaders = (key: string, signature: string) => {
  const contentType = "application/json";
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
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const getRates = async () => {
  const response = await fetch("https://api.coinmotion.com/v2/rates");
  return response.json();
};
