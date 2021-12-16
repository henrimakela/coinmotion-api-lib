import TradingPair from "./TradingPair";

interface Market {
  changeAmount: number;
  changeSign: boolean;
}

export default interface RatesResponse {
  pairs: TradingPair[];
  market: Market;
  fWithdrawalFee: number;
  version: string;
}
