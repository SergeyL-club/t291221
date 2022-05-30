import axios from "axios";

const currency = {
  a: "BTC",
  b: "RUB"
} as const;

type currencyObject = typeof currency;
type currency = currencyObject[keyof currencyObject];

const amountType = {
  a: "currency",
  b: "cryptocurrency",
} as const;

type amountTypeObject = typeof amountType;
type amountType = amountTypeObject[keyof amountTypeObject];

const exchangeType = {
  a: "purchase",
  b: "selling",
} as const;

type exchangeTypeObject = typeof exchangeType;
type exchangeType = exchangeTypeObject[keyof exchangeTypeObject];


interface order {
  id: number;
  type: exchangeType;
  cryptocurrency: currency;
  currency: currency;
  rate: string;
  limitCurrency: {
    min: string;
    max: string;
    realMax: null | string;
  };
  limitCryptocurrency: {
    min: string;
    max: string;
    realMax: null | string;
  };
  paymethod: {
    id: number;
    name: string;
  };
  paymethodId: number;
  owner: string;
  ownerLastActivity: number;
  isOwnerVerificated: boolean;
  safeMode: boolean;
  ownerTrusted: boolean;
  ownerBalance: null | any;
  available: null | any;
  unactiveReason: null | any;
}

export interface responseExchangeBiz {
  total: number;
  data: Array<order>;
}

export default function ({
  amount,
  amountType,
  cryptocurrency,
  currency,
  isOwnerActive,
  isOwnerVerificated,
  lang,
  limit,
  paymethod,
  skip,
  type,
}: {
  amount: number;
  amountType: amountType;
  cryptocurrency: string;
  currency: string;
  isOwnerActive: boolean;
  isOwnerVerificated: boolean;
  lang?: string;
  limit?: number;
  paymethod: string;
  skip?: number;
  type: exchangeType;
}) {
  return axios.get("https://bitzlato.com/api/p2p/public/exchange/dsa/", {
    params: {
      amount,
      amountType,
      cryptocurrency,
      currency,
      isOwnerActive,
      isOwnerVerificated,
      paymethod,
      type,
      lang: lang ? lang : "en",
      skip: skip ? skip : 0,
      limit: limit ? limit : 100,
    },
  });
}
