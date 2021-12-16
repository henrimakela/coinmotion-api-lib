import { HmacSHA512 } from "crypto-js";

export interface Payload {
  nonce: number;
  parameters: any;
}

/**
 * Creates a nonce that is required for the post requests
 * @returns A nonce
 */
export const createNonce = (): number => {
  return new Date().getTime();
};

/**
 *
 * @param key The api key
 * @param signature The HMAC created with the secret
 * @returns
 */
export const createHeaders = (key: string, signature: string) => {
  return {
    "Content-Type": "application/json",
    "X-COINMOTION-APIKEY": key,
    "X-COINMOTION-SIGNATURE": signature,
  };
};

/**
 * Creates a HMAC with SHA512 from the payload
 * @param payload The request body
 * @param secret The API secret that is generated with the API key
 * @returns HMAC hashed with the secret
 */
export const createSignature = (payload, secret): string => {
  return HmacSHA512(JSON.stringify(payload), secret).toString();
};
