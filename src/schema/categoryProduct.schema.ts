import { object, string, boolean, TypeOf } from "zod";

export const createCategoryProductSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
  }),
});

export type CreateCategoryProductInput = TypeOf<
  typeof createCategoryProductSchema
>;

export const deleteOneCategoryProductSchema = object({
  body: object({
    id: string({
      required_error: "id is required",
    }),
  }),
});

export type DeleteOneCategoryProductInput = TypeOf<
  typeof deleteOneCategoryProductSchema
>;
