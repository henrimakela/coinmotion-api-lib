import RatesResponse from "../model/RatesResponse";
import TradingPair from "../model/TradingPair";

/**
 * A function for converting the response from the server to more readable and typed response.
 * @param data raw json response
 * @returns RatesResponse
 */
export const constructRatesResponse = (data: any): RatesResponse => {
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
