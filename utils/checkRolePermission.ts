import { Role } from "@prisma/client";

/**
 * Check if the user has the permission to perform the action.
 *
 * ```
 * |           |            |            | session.role |      |
 * |           |            | superadmin | admin        | user |
 * |           | superadmin | -          | -            | -    |
 * | body.role | admin      | +          | -            | -    |
 * |           | user       | +          | +            | -    |
 * ```
 */
export default function checkRolePermission(
  currentRole: Role,
  requestRole: Role | undefined
) {
  return (
    currentRole !== "USER" &&
    (requestRole === undefined ||
      (requestRole !== "SUPERADMIN" &&
        (currentRole !== "ADMIN" || requestRole !== "ADMIN")))
  );
}
