import { GraphQLError } from "graphql";
import GraphqlContext from "../types/types.utils.js";
import { automations, listeners, triggers, keywords } from "../db/schema.js";

enum ListenerEnum {
  MESSAGE = "MESSAGE",
  COMMENT = "SMARTAI",
}

enum TriggerEnum {
  MESSAGE = "DM",
  COMMENT = "COMMENT",
}

interface Args {
  prompt: string;
  automationId: string;
  commentReply: string;
  listener: ListenerEnum;
  type: TriggerEnum;
  keywords: string[];
}

const automationSetup = {
  Mutation: {
    createAutomationSetup: async (
      _: any,
      args: Args,
      context: GraphqlContext
    ) => {
      const { automationId, commentReply, listener, prompt, type } = args;
      const { db, session } = context;

      console.log("DATA FROM DB", args);

      const user = session.user;

      if (!user) {
        console.error("User not authenticated, session data:", session);
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      try {
        // Start a database transaction
        await db.transaction(async (trx) => {
          // Step 1: Insert listener
          const createdListener = await trx
            .insert(listeners)
            .values({
              automationId,
              prompt,
              commentReply,
              listener: listener as "MESSAGE" | "SMARTAI",
            })
            .returning();

          console.log("Created Listener:", createdListener);

          // Create Trigger with the provided `type` (based on listener type)
          const createdTrigger = await trx
            .insert(triggers)
            .values({ automationId, type }) // Use the `type` passed in args
            .onConflictDoUpdate({
              target: [automations.id], // Conflict check based on `automationId`
              set: {
                type: type, // Update the type if there is a conflict
              },
            });

          console.log("Trigger created/updated:", createdTrigger);

          // Insert Keyword and handle conflict using `onConflictDoUpdate`
          const createdKeyword = await trx
            .insert(keywords)
            .values({ automationId, word: "Placeholder text" }) // Example word
            .onConflictDoUpdate({
              target: [keywords.automationId, keywords.word],
              set: { word: "Placeholder text" }, // Update logic
            });

          console.log("Keyword created/updated:", createdKeyword);

          console.log("Created Keyword:", createdKeyword);

          console.log("Updated Automation Status");

          return {
            success: true,
            message: "Automation setup created successfully",
            listenerId: createdListener[0]?.id,
          };
        });
      } catch (error) {
        console.error("Error creating listener, trigger, or keyword:", error);
        throw new GraphQLError(
          "Failed to create listener and related entries",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          }
        );
      }
    },
  },
};

export default automationSetup;
