export default interface ProductData {
  asin: string;
  aePrice?: number;
  aedToDollar?: number;
  rate?: number;
  rating?: number;
  comPrice?: number;
  shippingCost?: number;
  importFee?: number;
  totalPrice?: number;
  comRank?: string;
  soldBy?: string;

  // FIXME: remove these temporary fields
  htmlCom: string;
  htmlAe: string;
  htmlAeDollar: string;
}
