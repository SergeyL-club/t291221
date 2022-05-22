import axios from "axios";
import {
  createOrderBiz,
  deleteManyOrderBiz,
} from "../../service/orderBiz.service";

const bizlatoGlobalKey = {
  kty: "EC",
  alg: "ES256",
  crv: "P-256",
  x: "1mhdqZIXFnUTA4a97wahJ0J7B_7T7K_CI5wD9k95gIQ",
  y: "gJkspER2-vxuh9MicRn809ITdVK2IUXedC-aZyJQkFQ",
};

const bizlatoSecretKey = {
  kty: "EC",
  alg: "ES256",
  crv: "P-256",
  x: "SwmcDjau30RJGoyOXvUN2VCqQAPzdBb5tJjlhNy9bOs",
  y: "bunR7ojnPEG4za-_nAfo7QDwLsuxFCRPy8ttkifz25I",
  d: "dt2sBRybFImb_YKKK0aopIQQclP4k7pXCFCBLt4u5pw",
};

interface response {
  total: number;
  data: Array<order>;
}

interface order {
  available: null | boolean;
  cryptocurrency: string;
  currency: string;
  id: number;
  isOwnerVerificated: boolean;
  limitCryptocurrency: {
    min: string;
    max: string;
    realMax: string | null;
  };
  limitCurrency: {
    min: string;
    max: string;
    realMax: string | null;
  };
  owner: string;
  ownerBalance: null | string;
  ownerLastActivity: number;
  ownerTrusted: boolean;
  paymethod: {
    id: number;
    name: string;
  };
  paymethodId: number;
  rate: string;
  safeMode: boolean;
  type: string;
  unactiveReason: null | string;
}

interface input {
  limit?: number;
  skip?: number;
  type?: string;
  currency?: string;
  cryptocurrency?: string;
  isOwnerVerificated?: boolean;
  isOwnerTrusted?: boolean;
  isOwnerActive?: boolean;
  lang?: string;
}

export default async function chilkatExample(list: number, input?: input) {
  if (!input) {
    input = {};
  }
  if (!input.limit) {
    input.limit = 20;
  }
  if (!input.skip) {
    input.skip = 0;
  }
  if (!input.type) {
    input.type = "purchase";
  }
  if (!input.currency) {
    input.currency = "RUB";
  }
  if (!input.cryptocurrency) {
    input.cryptocurrency = "BTC";
  }
  if (!input.isOwnerVerificated) {
    input.isOwnerVerificated = true;
  }
  if (!input.isOwnerTrusted) {
    input.isOwnerTrusted = false;
  }
  if (!input.isOwnerActive) {
    input.isOwnerActive = false;
  }
  if (!input.lang) {
    input.lang = "ru";
  }

  axios
    .get("https://bitzlato.com/api2/p2p/public/exchange/dsa/", {
      params: input,
    })
    .then(async function (res) {
      await deleteManyOrderBiz({ list: list });

      let data: Array<order> = (<response>res.data).data;
      data.forEach(async function (order) {
        await createOrderBiz({
          list: list,
          id: order.id,
          crypto: order.cryptocurrency,
          currency: order.currency,
          limits: {
            crypto: order.limitCryptocurrency,
            currency: order.limitCurrency,
          },
          paymethod: order.paymethod,
          rate: order.rate,
          type: order.type,
        });
      });
    })
    .catch((e) => console.log(e.message));
}
