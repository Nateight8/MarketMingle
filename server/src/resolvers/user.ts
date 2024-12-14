import {
  integrations as dbIntegrations,
  subscriptions,
  User,
  UserIntegrationSubscription,
  users,
} from "../db/schema.js";
import { refreshToken } from "../services/integrations-token-token.js";
import GraphqlContext, { UserInput } from "../types/types.utils.js";
import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    // Get logged in user
    getLoggedInUser: async (_: any, __: any, context: GraphqlContext) => {
      console.log("SERVER SAYS HI");

      try {
        const { db, session } = context;
        const { user: loggedInUser } = session;
        if (!loggedInUser?.id) {
          console.error("User not authenticated, session data:", session);
          throw new GraphQLError("Not authenticated", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }
        const userId = loggedInUser.id;
        const userWithSubscriptions = await db
          .select({
            users,
            subscriptions,
          })
          .from(users)
          .where(eq(users.id, userId))
          .leftJoin(subscriptions, eq(subscriptions.userId, users.id));

        // Get the logged-in user's integrations
        const loggedUserIntegrations = await db
          .select()
          .from(dbIntegrations)
          .where(eq(dbIntegrations.userId, userWithSubscriptions[0].users.id));

        // Ensure you are extracting the user data and integrating it with the integrations
        const {
          name,
          email,
          image,
          location,
          phoneVerified,
          onboardingCompleted,
          shopname,
          shoptextfont,
          shoptextcolor,
          banner,
        } = userWithSubscriptions[0].users;

        //USER WITH INTEGRATIONS
        const userWithIntegrations = {
          name, // Explicitly return the name field
          email,
          image,
          location,
          phoneVerified,
          onboardingCompleted,
          shopname,
          shoptextfont,
          shoptextcolor,
          banner,
          integrations: loggedUserIntegrations || [],
          subscriptions: userWithSubscriptions[0].subscriptions || [],
        };

        console.log(userWithIntegrations); //<==returned with name

        return userWithIntegrations;
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
