import { eq } from "drizzle-orm";
import { integrations, users } from "../db/schema.js";
import GraphqlContext from "../types/types.utils.js";
import { GraphQLError } from "graphql";
import { fetchInstagramPosts } from "../utils/fetch-ig-posts.js";

interface Post {
  id: string;
  postid: string;
  caption?: string;
  media: string;
  mediaType: "IMAGE" | "CAROUSEL_ALBUM" | "TEXT";
  automationId: string;
}

const postResolvers = {
  Query: {
    async getSocialPosts(_: any, __: any, context: GraphqlContext) {
      const { session, db } = context;

      try {
        const currentUser = session.user;

        if (!currentUser || !currentUser.id) {
          console.error("User not authenticated, session data:", session);
          throw new GraphQLError("Not authenticated", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const userIntegrations = await db
          .select()
          .from(integrations)
          .where(eq(integrations.userId, currentUser.id));

        if (!userIntegrations.length || !userIntegrations[0].token) {
          throw new GraphQLError("Integration token not found", {
            extensions: { code: "INTEGRATION_ERROR" },
          });
        }

        const integrationToken = userIntegrations[0].token;
        const parsedPosts = await fetchInstagramPosts(integrationToken);

        if (!parsedPosts || !parsedPosts.data) {
          throw new GraphQLError("Invalid data from Instagram API", {
            extensions: { code: "EXTERNAL_API_ERROR" },
          });
        }

        const socialPost = parsedPosts.data.map((post: any) => ({
          id: post.id,
          postid: post.id,
          caption: post.caption,
          media: post.media_url,
          mediaType: post.media_type,
          automationId: currentUser.id,
        }));

        return socialPost;
      } catch (error) {
        console.error("Error in getPosts resolver:", error);
        throw new GraphQLError("Failed to retrieve posts", {
          extensions: { code: "RESOLVER_ERROR" },
        });
      }
    },
  },
};

export default postResolvers;
