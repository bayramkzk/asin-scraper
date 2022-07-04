import { JSDOM } from "jsdom";
import ProductContext from "@/types/ProductContext";
import ProductData from "@/types/Product";

function parseElementText(dom: JSDOM, selector: string): string {
  const e = dom.window.document.querySelector(selector);
  if (!e || !e.textContent) {
    throw `Couldn't find element with selector: ${selector}`;
  }
  return e.textContent.trim();
}

export function parseProductComPrice(domCom: JSDOM): number {
  const selector = ".a-price.a-text-price :first-child";
  return +parseElementText(domCom, selector).slice(1);
}

export function parseProductAePrice(domAe: JSDOM): number {
  const sel = "#corePrice_feature_div > div > span > span:nth-child(2)";
  return +parseElementText(domAe, sel).slice(3);
}

export function parseProductAedToDollar(domAeDollar: JSDOM): number {
  const sel = "#corePrice_feature_div > div > span > span:nth-child(2)";
  return +parseElementText(domAeDollar, sel).slice(3);
}

export function parseProductRate(domCom: JSDOM): number {
  const sel = "#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star";
  return +parseElementText(domCom, sel).split(" ")[0];
}

export function parseProductRating(domCom: JSDOM): number {
  const sel = "#acrCustomerReviewText";
  return +parseElementText(domCom, sel).split(" ")[0].replace(",", "");
}

export function parseProductShippingCost(domCom: JSDOM): number {
  const sel =
    "#a-popover-agShipMsgPopover > table > tbody > tr:nth-child(2) > td.a-span2.a-text-right > span";
  return +parseElementText(domCom, sel).slice(1);
}

export function parseProductImportFee(domCom: JSDOM): number {
  const sel =
    "#a-popover-agShipMsgPopover > table > tbody > tr:nth-child(3) > td.a-span2.a-text-right > span";
  return +parseElementText(domCom, sel).slice(1);
}

export function parseProductTotalPrice(domCom: JSDOM): number {
  const sel =
    "#a-popover-agShipMsgPopover > table > tbody > tr:nth-child(5) > td.a-span2.a-text-right > span";
  return +parseElementText(domCom, sel).slice(1);
}

export function parseProductComRank(domCom: JSDOM): string {
  const sel =
    "#productDetails_detailBullets_sections1 > tbody > tr:nth-child(2) > td";
  return parseElementText(domCom, sel);
}

export default function parseProductHtml(ctx: ProductContext): ProductData {
  const { htmlCom, htmlAe, htmlAeDollar, asin } = ctx;

  const domCom = new JSDOM(htmlCom);
  const domAe = new JSDOM(htmlAe);
  const domAeDollar = new JSDOM(htmlAeDollar);

  const aePrice = parseProductAePrice(domAe);
  const aedToDollar = parseProductAedToDollar(domAeDollar);
  const rate = parseProductRate(domCom);
  const rating = parseProductRating(domCom);
  const comPrice = parseProductComPrice(domCom);
  const shippingCost = parseProductShippingCost(domCom);
  const importFee = parseProductImportFee(domCom);
  const totalPrice = parseProductTotalPrice(domCom);
  const comRank = parseProductComRank(domCom);

  return {
    asin,
    aePrice,
    aedToDollar,
    rate,
    rating,
    comPrice,
    shippingCost,
    importFee,
    totalPrice,
    comRank,
  };
}
