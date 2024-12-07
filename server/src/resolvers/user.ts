import { db } from "../db/index.js";
import { users } from "../db/schema.js";

export const userResolver = {
  Query: {
    users: async () => {
      return await db.select().from(users);
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      { name, age, email }: { name: string; age: number; email: string }
    ) => {
      const [newUser] = await db
        .insert(users)
        .values({ name, age, email })
        .returning();

      console.log(newUser);

      return newUser;
    },
  },
};
