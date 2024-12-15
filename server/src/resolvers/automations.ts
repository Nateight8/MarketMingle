import { GraphQLError } from "graphql";
import GraphqlContext from "../types/types.utils.js";
import { eq } from "drizzle-orm";
import {
  automations,
  integrations,
  keywords,
  listeners,
  posts,
  subscriptions,
  triggers,
  users,
} from "../db/schema.js";

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
        const userAutomation = await db
          .select()
          .from(automations)
          .where(eq(automations.userId, userId))
          .leftJoin(keywords, eq(automations.id, keywords.automationId)) // <==join on automationId,
          .leftJoin(listeners, eq(automations.id, listeners.automationId)); // <== join on automationId,

        console.log(userAutomation);

        // Flatten the automation results
        const flattenedAutomations = userAutomation.map((row) => ({
          id: row.automation.id,
          name: row.automation.name,
          createdAt: row.automation.createdAt,
          active: row.automation.active,
          userId: row.automation.userId,
          keywords: row.keyword,
          listeners: row.listener,
        }));

        return flattenedAutomations;
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

    getAutomation: async (
      _: any,
      arg: { id: string },
      context: GraphqlContext
    ) => {
      const { db, session } = context;
      const { id } = arg;

      const user = session.user;

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
        // const user = await db.select().from(users).where(eq(users.id, userId));

        const automation = await db
          .select()
          .from(automations)
          .where(eq(automations.id, id))
          .leftJoin(keywords, eq(automations.id, keywords.automationId))
          .leftJoin(listeners, eq(automations.id, listeners.automationId))
          .leftJoin(triggers, eq(automations.id, triggers.automationId));

        const userSubscriptionRecord = await db
          .select({ plan: subscriptions.plan }) // Only fetch subscription plan
          .from(subscriptions)
          .where(eq(subscriptions.userId, userId));

        const userIntegrationRecord = await db
          .select({
            integrationName: integrations.name,
            token: integrations.token,
          }) // Only fetch specific fields
          .from(integrations)
          .where(eq(integrations.userId, userId));

        const userRecord = await db
          .select()
          .from(users)
          .where(eq(users.id, userId));

        const automationRecord = {
          ...automation[0],
          user: {
            ...userRecord[0],
            integrations: userIntegrationRecord,
            subscriptions: userSubscriptionRecord,
          },
        };

        console.log("AUTOMATION RECORD: ", automationRecord);

        return automationRecord;
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

  Mutation: {
    //Create automation
    createAutomation: async (_: any, __: any, context: GraphqlContext) => {
      const { db, session } = context;

      const user = session.user;

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
        const newAutomation = await db
          .insert(automations)
          .values({
            userId,
          })
          .returning();

        if (!newAutomation[0] || !newAutomation[0].id) {
          console.error(
            "Automation creation failed, database response:",
            newAutomation
          );
          throw new GraphQLError("Failed to create automation", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          });
        }

        return {
          id: newAutomation[0].id,
          userId: newAutomation[0].userId,
        };
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
