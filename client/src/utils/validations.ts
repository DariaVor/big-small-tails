import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
});
export const  UsersListSchema = z.array(UserSchema);