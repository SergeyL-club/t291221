import { object, string, array, TypeOf, number } from "zod";

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    categoryId: string({
      required_error: "categoryId is required",
    }),
    abDesc: string(),
    desc: string(),
    previewIndex: array(number(), {
      required_error: `previewIndex array required, 0-4 length`,
    }).max(4),
    imgs: array(
      object({
        name: string({
          required_error: "Name file required",
        }),
        desc: string(),
        base64: string({
          required_error: "Encoding required",
        }),
      }),
      {
        required_error: "imgs required, length > 4",
      }
    ).min(4),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;

export const deleteOneProductSchema = object({
  body: object({
    id: string({
      required_error: "id is required",
    }),
  }),
});

export type DeleteOneProductInput = TypeOf<typeof deleteOneProductSchema>;
