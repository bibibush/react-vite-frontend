export default interface DataTable {
  name: string;
  currentPrice: string;
  fromYesterday: string;
  increasedPercent: string;
  tradingVolume?: string;
  marketPrice?: string;
  highestPrice?: string;
  lowestPrice?: string;
}
