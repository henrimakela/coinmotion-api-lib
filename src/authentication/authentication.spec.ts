import {
  createNonce,
  createSignature,
  createHeaders,
  Payload,
} from "./authentication";

import { BalancePayload, createBalancePayload } from "../model/Payload";
describe("Tests for coinmotion api functions", () => {
  it("should create a nonce", () => {
    const nonce = createNonce();
    expect(typeof nonce).toBe("number");
    expect(nonce).not.toBe(undefined);
  });

  it("should create a payload", () => {
    const nonce: number = createNonce();
    const payload: BalancePayload = createBalancePayload(nonce);
    expect(payload).not.toBe(undefined);
    expect(payload.nonce).toBe(nonce);
  });

  it("should create a signature", () => {
    const nonce: number = createNonce();
    const payload: BalancePayload = createBalancePayload(nonce);
    const secret = "123123";
    const signature = createSignature(payload, secret);
    expect(signature).toEqual(createSignature(payload, secret));
    expect(signature).not.toEqual(createSignature(payload, "1223"));
  });

  it("should create headers", () => {
    const key = "123";
    const nonce: number = createNonce();
    const payload: BalancePayload = createBalancePayload(nonce);
    const secret = "123123";
    const signature = createSignature(payload, secret);

    let expected = {
      "Content-Type": "application/json",
      "X-COINMOTION-APIKEY": key,
      "X-COINMOTION-SIGNATURE": signature,
    };

    let result = createHeaders(key, signature);
    expect(result).toEqual(expected);
  });
});
