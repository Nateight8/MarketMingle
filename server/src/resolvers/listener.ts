import { eq } from "drizzle-orm";
import GraphqlContext from "../types/types.utils.js";
import { listeners, automations } from "../db/schema.js"; // Make sure to import the tables

interface CreateListenerInput {
  automationId: string;
  listener: "SMARTAI" | "MESSAGE"; // Enum matches ListenerType
  prompt: string;
  commentReply: string | null;
}

interface CreateListenerResponse {
  success: boolean;
  message: string;
}

const listenerResolvers = {
  Mutation: {
    createListener: async (
      _parent: any,
      args: CreateListenerInput,
      ctx: GraphqlContext
    ): Promise<CreateListenerResponse> => {
      const { automationId, listener, prompt, commentReply } = args;
      const { db } = ctx;

      try {
        // Check if the related automation exists
        const automationExists = await db
          .select()
          .from(automations)
          .where(eq(automations.id, automationId))
          .limit(1);

        if (automationExists.length === 0) {
          throw new Error("Automation not found");
        }

        // Insert the new listener
        const newListener = await db.insert(listeners).values({
          automationId,
          listener,
          prompt,
          commentReply,
          dmCount: 0, // Default values for dmCount and commentCount
          commentCount: 0,
        });

        return {
          success: true,
          message: "Listener created successfully",
        };
      } catch (error: any) {
        console.error("Error creating listener:", error.message);
        return {
          success: false,
          message:
            error.message || "An error occurred while creating the listener",
        };
      }
    },
  },
  Query: {},
};

export default listenerResolvers;
