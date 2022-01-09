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

export const getRoleSchema = object({
  body: object({
    isMain: boolean({
      required_error: "isMain is required",
    }),
  }),
});

export type GetRoleInput = TypeOf<typeof getRoleSchema>;

export const deleteOneRoleSchema = object({
  body: object({
    roleId: string({
      required_error: "roleId is required",
    }),
  }),
});

export type deleteOneRoleInput = TypeOf<typeof deleteOneRoleSchema>;
