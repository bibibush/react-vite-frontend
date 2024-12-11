import Stock from "./Stock";

export default interface Invested {
  id: number;
  input: number;
  initialPrice: number;
  currentPrice: number;
  totalPrice: number;
  company: Stock;
}
