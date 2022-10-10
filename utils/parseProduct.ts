import ProductData from "@/types/Product";
import ProductContext from "@/types/ProductContext";
import { JSDOM } from "jsdom";

function findElementByText(dom: JSDOM, sel: string, text: string) {
  const elements = Array.from(dom.window.document.querySelectorAll(sel)).filter(
    (el) => el.textContent?.includes(text)
  );
  if (elements.length > 1) {
    console.error("Found several results with same text");
  }
  return elements[0];
}

function parseNumber(string: string | undefined): number | undefined {
  return string === undefined ? undefined : +string;
}

function parseElementText(dom: JSDOM, selector: string): string | undefined {
  const e = dom.window.document.querySelector(selector);
  if (!e || !e.textContent) {
    console.error(`Couldn't find element with selector: ${selector}`);
  }
  return e?.textContent?.trim();
}

export function parseProductComPrice(domCom: JSDOM): number | undefined {
  const selector = ".priceToPay .a-offscreen";
  return parseNumber(parseElementText(domCom, selector)?.slice(1));
}

export function parseProductAePrice(domAe: JSDOM): number | undefined {
  const sel = "#corePrice_feature_div > div > span > span:nth-child(2)";
  return parseNumber(parseElementText(domAe, sel)?.slice(3));
}

export function parseProductAedToDollar(
  domAeDollar: JSDOM
): number | undefined {
  const sel = "#corePrice_feature_div > div > span > span:nth-child(2)";
  return parseNumber(parseElementText(domAeDollar, sel)?.slice(3));
}

export function parseProductRate(domCom: JSDOM): number | undefined {
  const sel = "#acrPopover > span.a-declarative > a > i.a-icon.a-icon-star";
  return parseNumber(parseElementText(domCom, sel)?.split(" ")[0]);
}

export function parseProductRating(domCom: JSDOM): number | undefined {
  const sel = "#acrCustomerReviewText";
  return parseNumber(
    parseElementText(domCom, sel)?.split(" ")?.at(0)?.replace(",", "")
  );
}

export function parseProductShippingCost(domCom: JSDOM): number | undefined {
  const sel =
    ".a-lineitem > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > span:nth-child(1)";
  return parseNumber(parseElementText(domCom, sel)?.slice(1));
}

export function parseProductImportFee(domCom: JSDOM): number | undefined {
  const sel =
    ".a-lineitem > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(3) > span:nth-child(1)";
  return parseNumber(parseElementText(domCom, sel)?.slice(1));
}

export function parseProductTotalPrice(domCom: JSDOM): number | undefined {
  const sel =
    "#a-popover-agShipMsgPopover > table > tbody > tr:nth-child(5) > td.a-span2.a-text-right > span";
  return parseNumber(parseElementText(domCom, sel)?.slice(1));
}

export function parseProductComRank(domCom: JSDOM): string | undefined {
  const sel = ".a-color-secondary.a-size-base.prodDetSectionEntry";
  const th = findElementByText(domCom, sel, "Best Sellers Rank");
  if (!th?.parentElement) return;
  const td = th.parentElement.getElementsByTagName("td")[0];
  if (!td?.textContent) return;
  return td.textContent.trim();
}

export function parseProductSoldBy(domCom: JSDOM): string | undefined {
  const sel =
    "#tabular-buybox > div.tabular-buybox-container > div:nth-child(2) > div > span";
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
  const soldBy = parseProductSoldBy(domCom);

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
    soldBy,
  };
}
