import { object, string, boolean, TypeOf, array, any } from "zod";

export const inputUpdateBiz = object({
  list: array(any()),
});

export type InputUpdateBiz = TypeOf<typeof inputUpdateBiz>;
