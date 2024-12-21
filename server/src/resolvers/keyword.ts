import { eq } from "drizzle-orm";
import GraphqlContext from "../types/types.utils.js";
import { keywords, automations } from "../db/schema.js";

interface CreateKeywordsInput {
  keywords: string[]; // Array of words
  automationId: string;
}

const keywordResolvers = {
  Mutation: {
    async createKeywords(
      _: any,
      args: CreateKeywordsInput,
      ctx: GraphqlContext
    ) {
      const { automationId, keywords: words } = args;
      const { db } = ctx;

      try {
        // Validate inputs (optional, if you want additional checks)
        if (!automationId || !Array.isArray(words) || words.length === 0) {
          return {
            success: false,
            message:
              "Invalid inputs. Provide a valid automationId and keywords array.",
          };
        }

        // Delete existing keywords for the automationId
        await db
          .delete(keywords)
          .where(eq(keywords.automationId, automationId));

        console.log("DELETED EXISTING KEYWORDS");

        // Insert each keyword into the database
        const insertPromises = words.map(async (word) => {
          await db.insert(keywords).values({ word, automationId });
        });

        // Wait for all insertions to complete
        await Promise.all(insertPromises);

        return {
          success: true,
          message: "Keywords successfully created or updated.",
        };
      } catch (error) {
        console.error("Error creating or updating keywords:", error);

        return {
          success: false,
          message: `Failed to create or update keywords: ${error}`,
        };
      }
    },
  },
  Query: {
    async getKeywordsByAutomation() {},
  },
};

export default keywordResolvers;
