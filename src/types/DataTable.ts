export default interface DataTable {
  name: string;
  currentPrice: string;
  fromYesterday: string;
  increasedPercent: string;
  [key: string]: string;
}
