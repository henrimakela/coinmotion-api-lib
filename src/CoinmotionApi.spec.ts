import * as CoinmotionApi from "./CoinmotionApi";

describe("Tests for coinmotion api functions", () => {
  it("should create a nonce", () => {
    const nonce = CoinmotionApi.createNonce();
    expect(typeof nonce).toBe("number");
    expect(nonce).not.toBe(undefined);
  });

  it("should create a payload", () => {
    const nonce: number = CoinmotionApi.createNonce();
    const payload: CoinmotionApi.Payload = CoinmotionApi.createPayload(nonce);
    expect(payload).not.toBe(undefined);
    expect(payload.nonce).toBe(nonce);
  });

  it("should create a signature", () => {
    const nonce: number = CoinmotionApi.createNonce();
    const payload: CoinmotionApi.Payload = CoinmotionApi.createPayload(nonce);
    const secret = "123123";
    const signature = CoinmotionApi.createSignature(payload, secret);
    expect(signature).toEqual(CoinmotionApi.createSignature(payload, secret));
    expect(signature).not.toEqual(
      CoinmotionApi.createSignature(payload, "1223")
    );
  });

  it("should create headers", () => {
    const key = "123";
    const nonce: number = CoinmotionApi.createNonce();
    const payload: CoinmotionApi.Payload = CoinmotionApi.createPayload(nonce);
    const secret = "123123";
    const signature = CoinmotionApi.createSignature(payload, secret);

    let expected = {
      "Content-Type": "application/json",
      "X-COINMOTION-APIKEY": key,
      "X-COINMOTION-SIGNATURE": signature,
    };

    let result = CoinmotionApi.createHeaders(key, signature);
    expect(result).toEqual(expected);
  });
});
