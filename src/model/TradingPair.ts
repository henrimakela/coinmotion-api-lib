export default interface TradingPair {
  currencyCode: string;
  buy: string;
  sell: string;
  fbuy: string;
  fsell: string;
  fbuy2: string;
  fsell2: string;
  low: string;
  fhigh: string;
  fchangep: string;
  changeSign: boolean;
  buyTruncated: number;
  sellTruncated: number;
  changeAmount: number;
  interestRate: string;
}
