import { eq } from "drizzle-orm";
import GraphqlContext from "../types/types.utils.js";
import { automations, triggers } from "../db/schema.js";

interface CreateTriggerInput {
  type: "DM" | "COMMENT"; // Matches the TriggerType enum
  automationId: string;
}

const triggerResolvers = {
  Mutation: {
    createTrigger: async (
      _parent: any,
      args: CreateTriggerInput,
      ctx: GraphqlContext
    ): Promise<{ success: boolean; message: string }> => {
      const { type, automationId } = args;
      const { db } = ctx;

      try {
        // Check if the related automation exists
        const automationExists = await db
          .select()
          .from(automations) // Replace "automations" with your actual automation table
          .where(eq(automations.id, automationId))
          .limit(1);

        if (automationExists.length === 0) {
          throw new Error("Automation not found");
        }

        // Check if a trigger already exists for the automation
        const existingTrigger = await db
          .select()
          .from(triggers)
          .where(eq(triggers.automationId, automationId))
          .limit(1);

        if (existingTrigger.length > 0) {
          // Update the existing trigger
          await db
            .update(triggers)
            .set({ type })
            .where(eq(triggers.automationId, automationId));

          console.log("Trigger updated for automation:", automationId);

          return {
            success: true,
            message: "Trigger updated successfully",
          };
        }

        // Insert the new trigger
        const newTrigger = await db
          .insert(triggers)
          .values({
            type,
            automationId,
          })
          .returning();

        console.log("NEW TRIGGER:", newTrigger[0]);

        return {
          success: true,
          message: "Trigger created successfully",
        };
      } catch (error) {
        console.error("Error creating trigger:", error);
        return {
          success: false,
          message: "An error occurred while creating the trigger",
        };
      }
    },
  },
  Query: {},
};

export default triggerResolvers;
