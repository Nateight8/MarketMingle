import { GraphQLError } from "graphql";
import GraphqlContext from "../types/types.utils.js";
import { eq } from "drizzle-orm";
import {
  automations,
  integrations,
  keywords,
  listeners,
  subscriptions,
  triggers,
  users,
} from "../db/schema.js";
import { UpdateAutomationArgs } from "../typeDefs/automations.js";

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
        const userAutomations = await db
          .select()
          .from(automations)
          .where(eq(automations.userId, userId));

        console.log(userAutomations);

        console.log("SERVER SAYS HERE US AUTOMATION:", userAutomations);

        // Map over the results to format the data
        const formattedAutomations = userAutomations.map((automation) => ({
          id: automation.id,
          // name: automation.name,
          // createdAt: automation.createdAt,
          // active: automation.active,
          // userId: automation.userId,
        }));

        return formattedAutomations;

        return;
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
          .where(eq(automations.id, id));

        const triggerRecord = await db
          .select()
          .from(triggers)
          .where(eq(triggers.automationId, id));

        const keywordsRecord = await db
          .select()
          .from(keywords)
          .where(eq(keywords.automationId, id));

        const listenersRecord = await db
          .select()
          .from(listeners)
          .where(eq(listeners.automationId, id));

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

        console.log("KEYWORDS HERE", keywordsRecord);

        const automationRecord = {
          name: automation[0].name,
          trigger: triggerRecord[0],
          keywords: keywordsRecord,
          listener: listenersRecord[0],
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
          // userId: newAutomation[0].userId,
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

    updateAutomation: async (
      _: any,
      args: UpdateAutomationArgs,
      context: GraphqlContext
    ) => {
      const { db, session } = context;
      const { active, id, name } = args;

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

      if (!id) {
        throw new GraphQLError("Automation ID is required", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        const updatedAutomation = await db
          .update(automations)
          .set({
            name,
            active: active === undefined ? false : Boolean(active),
          })
          .where(eq(automations.id, id))
          .returning();

        if (!updatedAutomation.length) {
          throw new GraphQLError("Automation not found or update failed", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }

        return {
          message: "Successfully updated",
          success: true,
          automation: updatedAutomation[0],
        };
      } catch (error) {
        console.error("Error updating automation:", error);

        throw new GraphQLError("Failed to update automation", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
  },
};

export default automationResolvers;
