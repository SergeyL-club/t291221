import { object, string, TypeOf } from "zod";

export const createCategoryServiceSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
  }),
});

export type CreateCategoryServiceInput = TypeOf<
  typeof createCategoryServiceSchema
>;

export const deleteOneCategoryServiceSchema = object({
  body: object({
    id: string({
      required_error: "id is required",
    }),
  }),
});

export type DeleteOneCategoryServiceInput = TypeOf<
  typeof deleteOneCategoryServiceSchema
>;
