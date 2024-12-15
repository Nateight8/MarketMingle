import { GraphQLError } from "graphql";
import GraphqlContext from "../types/types.utils.js";
import { eq } from "drizzle-orm";
import { automations, keywords, listeners } from "../db/schema.js";

const automationResolvers = {
  Query: {
    listAutomations: async (_: any, __: any, context: GraphqlContext) => {
      const { db, session } = context;

      const { user } = session;

      if (!user || !user?.id) {
        console.error("User not authenticated, session data:", session);
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const userId = user.id;

      try {
        // const automation = await db
        //   .select()
        //   .from(automations)
        //   .where(eq(automations.userId, userId))
        //   .leftJoin(keywords, eq(keywords.automationId, userId))
        //   .leftJoin(listeners, eq(automations.userId, userId));

        const userAutomation = await db
          .select()
          .from(automations)
          .where(eq(automations.userId, userId))
          .leftJoin(keywords, eq(automations.id, keywords.automationId)) // <==join on automationId,
          .leftJoin(listeners, eq(automations.id, listeners.automationId)); // <== join on automationId,

        // const userAutomation = await db.query.automations.findMany({
        //   where: eq(automations.userId, userId),
        //   with: {
        //     keywords: true,
        //     listeners: true,
        //   },
        // });

        return userAutomation;
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
  },

  Mutation: {},

  //   Automation: {
  //     // Resolve the user field in Automation
  //     user: async (
  //       parent: { userId: string },
  //       _: any,
  //       context: GraphqlContext
  //     ) => {
  //       // Logic to resolve the user field for an automation
  //     },
  //   },
};

export default automationResolvers;
