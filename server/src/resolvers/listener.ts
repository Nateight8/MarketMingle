import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { automations, listeners, listenersEnum } from "../db/schema.js";
import GraphqlContext from "../types/types.utils.js";

enum ListenerEnum {
  SMARTAI = "SMARTAI",
  MESSAGE = "MESSAGE",
}

interface InputArgs {
  automationId: string;
  listener: ListenerEnum;
  prompt?: string;
  commentReply?: string;
}

export const listenerResolvers = {
  Mutation: {
    async createListener(_: any, args: InputArgs, ctx: GraphqlContext) {
      try {
        const { automationId, listener, prompt, commentReply } = args;
        const { db } = ctx;

        // Validate input
        if (!automationId || !listener) {
          throw new GraphQLError("Missing required fields");
        }

        // Use a placeholder prompt if none is provided
        const placeholderPrompt = "No specific instructions provided.";
        const resolvedPrompt = prompt || placeholderPrompt;

        // Check if the related automation exists
        const automationExists = await db
          .select()
          .from(automations)
          .where(eq(automations.id, automationId))
          .limit(1);

        if (automationExists.length === 0) {
          throw new GraphQLError("Automation not found");
        }

        // Check if a listener already exists for the automation
        const existingListener = await db
          .select()
          .from(listeners)
          .where(eq(listeners.automationId, automationId))
          .limit(1);

        if (existingListener.length > 0) {
          // Update the existing listener
          await db
            .update(listeners)
            .set({ listener, prompt: resolvedPrompt, commentReply })
            .where(eq(listeners.automationId, automationId));

          return {
            success: true,
            message: "Listener updated successfully.",
          };
        }

        // Insert a new listener
        const newListener = await db
          .insert(listeners)
          .values({
            automationId,
            listener,
            prompt: resolvedPrompt,
          })
          .returning();

        return {
          success: true,
          message: `Listener with ID ${newListener[0].id} created successfully.`,
        };
      } catch (error) {
        console.error("Error creating listener:", error);
        return {
          success: false,
          message: error || "Failed to create listener.",
        };
      }
    },
  },
};
