import { integrations, subscriptions, User, users } from "../db/schema.js";
import { refreshToken } from "../services/tokenRefresh.js";
import GraphqlContext, { UserInput } from "../types/types.utils.js";
import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    // Get logged in user
    getLoggedInUser: async (_: any, __: any, context: GraphqlContext) => {
      console.log("SERVER SAYS HI");
      const { db, session } = context;
      const { user: loggedInUser } = session;

      try {
        if (!loggedInUser?.id) {
          console.error("User not authenticated, session data:", session);
          throw new GraphQLError("Not authenticated", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }

        //will be using this when creating onboarding
        const sessionId = loggedInUser?.id;
        const userRecord = await db
          .select()
          .from(users)
          .where(eq(users.id, sessionId));

        const userSubscriptionRecord = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.userId, sessionId));

        //integration checks if old users have integrations running
        const userIntegrationRecord = await db
          .select()
          .from(integrations)
          .where(eq(integrations.userId, sessionId));

        if (userIntegrationRecord.length > 0) {
          // <== run this code if user has no integrations

          const token = userIntegrationRecord[0].token; // <==get token
          const today = new Date();
          const timeLeft =
            userIntegrationRecord[0].expiresAt?.getTime()! - today.getTime(); //<== name this
          const timeInDays = Math.round(timeLeft / (1000 * 3600 * 24));

          if (timeInDays < 5) {
            const freshToken = await refreshToken(token); // <== pass token

            //update db with recently fetched token
            const time = new Date();

            const expiresAt = new Date(time.setDate(today.getDate() + 30));

            await db
              .update(integrations)
              .set({ token: freshToken.access_token, expiresAt })
              .where(eq(integrations.userId, sessionId));
          }
        }

        let subscription = userSubscriptionRecord;

        if (userSubscriptionRecord.length === 0) {
          subscription = await db
            .insert(subscriptions)
            .values({
              userId: sessionId,
              plan: "FREE",
            })
            .returning();
        }

        const user = {
          ...userRecord[0],
          subscriptions: subscription,
          integrations: userIntegrationRecord || [],
        };

        return { status: 200, user };
      } catch (error) {
        console.error("Error fetching user:", error);
        // Throw an error with appropriate details
        throw new GraphQLError("Failed to fetch user", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },

    // List all users
    listUsers: async (
      _: any,
      __: any,
      context: GraphqlContext
    ): Promise<User[]> => {
      const { db } = context;

      const users = await db.query.users.findMany();
      console.log(context);

      return users;
    },
  },

  Mutation: {
    // Update an existing user
    updateUser: async (
      _: any,
      { id, userInput }: { id: string; userInput: UserInput }
    ): Promise<User | null> => {
      // Implement logic to update an existing user in the database
      return null;
    },

    // Delete a user
    deleteUser: async (_: any, { id }: { id: string }): Promise<boolean> => {
      // Implement logic to delete a user from the database
      return true;
    },
  },
};

export default resolvers;
