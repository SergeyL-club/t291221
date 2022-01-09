import { object, string, boolean, TypeOf } from "zod";

export const createRoleSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
    funClient: boolean(),
    funAdmin: boolean(),
  }),
});

export type CreateRoleInput = TypeOf<typeof createRoleSchema>;
