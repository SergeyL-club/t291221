import getOrdersBiz from "./bizlato/getOrders";
import logger from "./logger";

export default function initUpdate() {
  logger.info(`Init update biz def orders`);
  bizUpdate(0, 20, 3);
}

async function bizUpdate(list: number, limit: number, maxList: number) {
  getOrdersBiz(list, { skip: limit * list });

  if (list >= maxList) {
    list = 0;
  } else {
    list++;
  }
  setTimeout(() => bizUpdate(list, limit, maxList), 2 * 1000);
}
