import { and, eq } from "drizzle-orm";
import { integrations } from "../db/schema.js";
import GraphqlContext from "../types/types.utils.js";
import axios from "axios";
import { GraphQLError } from "graphql";
import { generateTokens } from "../services/token.js";

const integrationResolvers = {
  Query: {},

  Mutation: {
    redirectToInstagramOAuth: () => {
      return process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string;
    },
    integrateWithInstagram: async (
      _: any,
      args: { code: string },
      context: GraphqlContext
    ) => {
      const { db, session } = context;
      const { code } = args;

      const sessionUser = session.user;

      if (!sessionUser || !sessionUser.id) {
        console.error("User not authenticated, session data:", session);
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
      const userId = sessionUser.id;

      try {
        //get integrations
        const userIntegrations = await db
          .select({ integrations })
          .from(integrations)
          .where(
            and(
              eq(integrations.userId, userId),
              eq(integrations.name, "INSTAGRAM")
            )
          );

        if (userIntegrations && userIntegrations.length > 0) {
          const token = await generateTokens(code);

          const insta_id = await axios.get(
            `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
          );

          const today = new Date();
          const expire_date = today.setDate(today.getDate() + 60);

          const integrationCreated = await db
            .insert(integrations)
            .values({
              token,
              userId,
              instagramId: insta_id.data.userId,
              expiresAt: new Date(expire_date),
            })
            .returning();

          console.log("INTEGRATION CREATED:", integrationCreated);

          return {};
        }
      } catch (error) {}
    },
  },
};

export default integrationResolvers;
