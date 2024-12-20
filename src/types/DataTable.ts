const DataTable = {
  name: "종목명",
  currentPrice: "현재가",
  fromYesterday: "전일비",
  differntPercent: "등락률",
  tradingVolume: "거래량",
  marketPrice: "시가",
  highestPrice: "고가",
  lowestPrice: "저가",
  mesuHoga: "매수호가",
  medoHoga: "매도호가",
  totalMesu: "매수총잔량",
  totalMedo: "매도총잔량",
  tradingAmount: "거래대금(백만)",
  totalDifferentPercent: "등락률",
  totalMarketPrice: "시가총액(억)",
  registeredStocks: "상장주식수(천주)",
  faceValue: "액면가",
  foreignerPercent: "외국인보유",
};
type DataTable = keyof typeof DataTable;

export default DataTable;
