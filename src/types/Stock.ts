export default interface Stock {
  id: number;
  name: string;
  code: string;
  color: string;
  isDomestic: boolean;
  price: string;
  increased: string | null;
  decreased: string | null;
}
